var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(position, radius, ms, mf, fov, attackDist) {
		_super.call(this, position, radius, ms, mf, fov);		
		this.attackDistance = attackDist ? attackDist : 150;
        this.obstacleAvoidanceDistance = 10;
		this.moveSpeed = 1.0;
		this.sprintSpeed = 1.5;
        this.maxSpeed = this.moveSpeed;
		this.memoryLengthMS = 5000;
		this.memoryTimeout = null;
		this.remembersPlayerLocation = false;
		this.lastPlayerLocation = null;
        this.lightSensitive = false;
        this.nv = null;
		this.playerFoundIndicator = null;
        this.lightMarker = null;
		this.spriteUrl = "http://i.imgur.com/TUHw5q2.png";
		this.sprite = new Sprite(this.spriteUrl, 8, 350, new Size(44,42));
		this.changeWaypointThreshold = 15
		this.waypoints = [];
		this.useWaypoints = false;
		this.waypointIndex = 0;
		this.waypointReverse = false;
		this.sv = null;
		this.vv = null;
    }
	
	Enemy.prototype.calculateSteer = function (environment) {
		var visibleMobs = [];
        var visibleLight = null;
		var player = null;
        var light = null;
		
		if (this.fieldOfViewArea) {
			visibleMobs = environment.getMobsInVision(this.fieldOfViewArea);
            visibleLight = this.lightSensitive ? environment.getLightInVision(this.fieldOfViewArea) : null;
		}
		
		if (this.playerFoundIndicator) {
			this.playerFoundIndicator.remove();
		}
		
		for (var i = 0; i < visibleMobs.length; i++) {
			if (environment.isPlayer(visibleMobs[i])) {
				player = visibleMobs[i].position;
				break;
			}
		}
        
        if (!player && visibleLight && window.DEBUG_GAME) {
			if (this.lightMarker) {
				this.lightMarker.position = visibleLight;
			}
			else {
				this.lightMarker = new Shape.Circle(visibleLight, 3);
				this.lightMarker.fillColor = 'orange';
			}
        }
		else {
			if (this.lightMarker) {
				this.lightMarker.remove();
			}
		}
		
		this.maxSpeed = this.sprintSpeed;
		
		if (player) {
			if(this.memoryTimeout) {
				clearTimeout(this.memoryTimeout);
			}
		
			this.lastPlayerLocation = player;
			this.acceleration = this.acceleration.add(this.seek(player));
			
			var that = this;
			var memoryCallback = function () {
				that.remembersPlayerLocation = false;
				that.memoryTimeout = null;
				that.lastPlayerLocation = null;
			};
			
			this.remembersPlayerLocation = true;
			this.memoryTimeout = setTimeout(memoryCallback, this.memoryLengthMS);
			
			if(window.DEBUG_GAME) {
				this.playerFoundIndicator = new PointText({
					point: [player.x - 5, player.y - 5],
					fillColor: 'yellow',
					fontWeight: 'bold',
					content: '!'
				});
			}
		}
		else if (this.remembersPlayerLocation) {
			this.acceleration = this.acceleration.add(this.seek(this.lastPlayerLocation));
		}
        else if (visibleLight) {
            this.acceleration = this.acceleration.add(this.seek(visibleLight));
        }
		else {
			this.maxSpeed = this.moveSpeed;
		}
		
		if (this.useWaypoints) {
			this.updateWaypointIndex();
			this.acceleration = this.acceleration.add(this.seek(this.waypoints[this.waypointIndex]));
		}
        
        this.acceleration = this.acceleration.add(this.getRepulsionSteer(environment.obstacles));
	};
	
    Enemy.prototype.getRepulsionSteer = function(obstacles) {
        if (this.nv) {
            this.nv.remove();
        }
        
        var steer = new Point();
        for (var i = 0; i < obstacles.length; i++) {
			var flip = i == 0 ? true : false;
            var ob = obstacles[i];
            var nearestPoint = ob.getNearestPoint(this.position);
            var dist = this.position.getDistance(nearestPoint);
            var delta = new Point();
            
            if (dist < 1) {
                delta.x = -1 * Number.MAX_VALUE;
                delta.y = -1 * Number.MAX_VALUE;
            } 
            else if (dist <= this.obstacleAvoidanceDistance) {            
                var offset = ob.getOffsetOf(nearestPoint);
                var normal = ob.getNormalAt(offset);
                
                if ((normal.x == 0 && (this.position.y < nearestPoint.y)) || (normal.y == 0 && (this.position.x > nearestPoint.x))) {
                    //normal = normal.multiply(-1);
                }
                
				normal = normal.multiply(flip ? -1 : 1);
				
				if (window.DEBUG_GAME) {
					this.nv = drawArrow(nearestPoint, nearestPoint.add(normal), normal);
				}
                
                delta = normal;
            }
            
            delta.length = Math.min(this.maxForce * 5, delta.length);
            steer = steer.add(delta);
        }
        
        return steer;
    };
    
	Enemy.prototype.run = function (environment) {
        this.calculateSteer(environment);
		
		if (this.fieldOfViewArea) {
			this.fieldOfViewArea.remove();
		}
		
		this.updatePosition(environment); 
		
		if (this.vv) {
			this.sv.removeChildren();
			this.sv.remove();
			this.vv.removeChildren();
			this.vv.remove();
		}
		
		this.visionVector = this.vector.clone();
		this.sprite.run(this.position, this.visionVector.angle - 90);
		this.fieldOfViewArea = environment.getFieldOfVisionPath(this);
		
		if(window.DEBUG_GAME) {
			this.fieldOfViewArea.strokeColor = 'red';
			this.fieldOfViewArea.strokeWidth = 1;
		}
	};
    
	Enemy.prototype.getVisionAngle = function(v1, v2) {
		var norm1 = v1.normalize();
		var norm2 = v2.normalize();
		var rads = Math.acos(norm1.dot(norm2) / (norm1.length * norm2.length));
		var angle = rads * (180 / Math.PI);
		
		return angle;
	};
	
	Enemy.prototype.updateWaypointIndex = function() {
		if (this.waypointIndex + 1 == this.waypoints.length) {
			this.waypointReverse = true;
		}
        else if (this.waypointIndex == 0) {
			this.waypointReverse = false;
		}
		
		if (this.position.getDistance(this.waypoints[this.waypointIndex]) < this.changeWaypointThreshold) {
			this.waypointIndex += this.waypointReverse ? -1 : 1;
		}
	};
	
	Enemy.prototype.addWaypoint = function(point) {
		this.waypoints.push(point);
	};
	
	Enemy.prototype.remove = function() {
		this.cleanup();
		
		if (this.nv) {
			this.nv.removeChildren();
			this.nv.remove();
		}
		
		if (this.playerFoundIndicator) {
			this.playerFoundIndicator.remove();
		}
		
        if (this.lightMarker) {
			this.lightMarker.remove();
		}
		
		if(this.memoryTimeout) {
			clearTimeout(this.memoryTimeout);
		}
	};
	
    function drawArrow(start, end, d) {
        var b = d.normalize(3);
        var p1 = new Path([start, end]);
        p1.strokeColor = 'black';
        
        var p2 = new Path([end.add(b.rotate(135)), end, end.add(b.rotate(-135))]);
        p2.strokeColor = 'black';
        
        var vi = new Group([p1, p2]);
        return vi;
    }
	
    return Enemy;
})(Mob);