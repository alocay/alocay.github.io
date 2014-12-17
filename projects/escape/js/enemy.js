var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(position, radius, ms, mf, fov, attackDist) {
        _super.call(this, position, radius, ms, mf, fov);
		this.attackDistance = attackDist ? attackDist : 150;
        this.obstacleAvoidanceDistance = 10;
        this.maxSpeed = 1.5;
		this.memoryLengthMS = 5000;
		this.memoryTimeout = null;
		this.remembersPlayerLocation = false;
		this.lastPlayerLocation = null;
        this.nv = null;
		this.playerFoundIndicator = null;
        this.lightMarker = null;
    }
	
	Enemy.prototype.calculateSteer = function (environment) {
		var visibleMobs = [];
        var visibleLight = [];
		var player = null;
        var light = null;
        
        if (this.lightMarker) {
            this.lightMarker.remove();
        }
		
		if (this.fieldOfViewArea) {
			visibleMobs = environment.getMobsInVision(this.fieldOfViewArea);
            visibleLight = environment.getLightInVision(this.fieldOfViewArea);
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
        
        if (!player) {
            for (var i = 0; i < visibleLight.length; i++) {
                light = visibleLight[i];
                break;
            }
            
            if (window.DEBUG_GAME && light) {
                this.lightMarker = new Shape.Circle(light, 5);
                this.lightMarker.fillColor = 'blue';
            }
        }
		
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
        else if (light) {
            this.acceleration = this.acceleration.add(this.seek(light));
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
		
		this.visionVector = this.vector.clone();
		this.fieldOfViewArea = environment.getFieldOfVisionPath(this);
		
		if(window.DEBUG_GAME) {
			this.fieldOfViewArea.strokeColor = 'red';
			this.fieldOfViewArea.strokeWidth = 1;
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