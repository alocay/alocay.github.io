var Environment = (function () {
    function Environment(size) {
		this.obstacles = [];
		this.player = null
		this.enemies = [];
        this.batteries = [];
        this.tiles = [];
		this.size = size;
        this.key = new LevelKey();
        this.door = new Door();
		this.gameOver = false;
		this.escaped = false;
        
        var border = new Rectangle(new Point(), new Size(size.width, size.height));
		this.borderPath = new Path.Rectangle(border);
        this.borderPath.strokeColor = 'black';
        this.borderPath.strokeWidth = 1;
        this.borderPath.closed = true;
        
		this.compoundVisionPath = null;
        
        this.obstacles.push(this.borderPath);
	}
	
	Environment.prototype.addObstacle = function (ob) {
        ob.strokeWidth = 1;
        ob.strokeColor = 'black';
        ob.fillColor = 'black';
		this.obstacles.push(ob);
	};
    
    Environment.prototype.addEnemy = function (e) {
        this.enemies.push(e);
	};
    
    Environment.prototype.addBattery = function (b) {
        this.batteries.push(b);
	};
    
    Environment.prototype.addTile = function(t) {
        this.tiles.push(t);
    };
    
	Environment.prototype.getFieldOfVisionPath = function(mob) {        
		var halfFov = mob.fieldOfView / 2;
		var startAngle = -1 * halfFov;
		var step = 0.6;
		var visible = [mob.position];
		var vision = mob.visionVector.clone();
		vision.length = mob.fieldOfViewDistance < 0 ? vision.length : mob.fieldOfViewDistance;
		
		for (var i = startAngle; i <= halfFov; i+=step) {
			var r = vision.rotate(i);
			var v = mob.position.add(r);
			var p = new Path([mob.position, v]);
			var intersection = this.getIntersections(p);
			var tries = 0;
			
			if (mob.fieldOfViewDistance < 0) {
				while (!intersection && tries < 20) {
					var extended = vision.add(tries * 2).rotate(i);
					v = v.add(extended);
					p.add(v);
					intersection = this.getIntersections(p);
					tries++;
				}
			}
			
            p.remove();
			
			if (intersection) {
				visible.push(intersection.point);
			}
			else if (mob.fieldOfViewDistance > 0) {
				visible.push(v);
			}
		}
		
		var area = new Path(visible);
        area.strokeWidth = 1;
        area.closed = true;
        area.reduce();
		area.fullySelected = false;
        
        return area;
	}
	
	Environment.prototype.update = function() {
		if (this.compoundVisionPath) {
			this.compoundVisionPath.remove();
		}
		
		this.player.run(this);
        
        for (var i = 0; i < this.batteries.length; i++) {
            var hitBattery = this.batteries[i].body.hitTest(this.player.position);
            if (hitBattery) {
                this.player.addBattery(this.batteries[i]);
                this.batteries[i].pickup();
                this.batteries.splice(i, 1);
            }
        }
        
		var hitKey = this.key.body.hitTest(this.player.position);
		if (hitKey) {
			this.key.pickup();
			this.player.hasKey = true;
		}
		
		var hitDoor = this.door.body.hitTest(this.player.position);
		if (hitDoor) {
			this.door.opened = true;
			this.gameOver = true;
			this.escaped = true;
		}
        
        for (var i = 0; i < this.tiles.length; i++) {
            var hitTile = this.tiles[i].body.hitTest(this.player.position);
            if (hitTile) {
                this.tiles[i].onStep();
            }
        }
        
        for(var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].run(this);
            var caught = this.enemies[i].body.hitTest(this.player.position);
			
			if (caught) {
			    this.gameOver = true;
				this.escape = false;
			}
        }
		
		this.compoundVisionPath = new CompoundPath({
			children: [this.borderPath, this.player.fieldOfViewArea],
			strokeColor: 'black'
		});
		
		if (!window.DEBUG_GAME_EXTRA) {
		    this.compoundVisionPath.fillColor =  'black';
		}
		
		if (window.DEBUG_GAME) {
		    this.compoundVisionPath.opacity =  0.8;
		}
	};
    
	Environment.prototype.getMobsInVision = function(visionPath) {
		var mobs = [];
		for (var i = 0; i < this.enemies.length; i++) {
			var e = this.enemies[i];
			if (visionPath.contains(e.position)) {
				mobs.push(e);
			}
		}
		
		if (visionPath.contains(this.player.position)) {
			mobs.push(this.player);
		}
        
		return mobs;
	};
    
    Environment.prototype.getLightInVision = function(visionPath) {
        var closestLightIntersection = null;
        if (this.player.isFlashlightOn()) {
            var flashlightIntersections = visionPath.getIntersections(this.player.fieldOfViewArea);
            
			var closestDist = Number.MAX_VALUE;
			for (var i = 0; i < flashlightIntersections.length; i++) {
				var dist = flashlightIntersections[i].point.getDistance(this.player.position);
				if (dist < closestDist) {
					closestDist = dist;
					closestLightIntersection = flashlightIntersections[i].point;
				}
			}
        }
        
        return closestLightIntersection;
    };
	
	Environment.prototype.isPlayer = function(mob) {
		return mob === this.player;
	};
	
	Environment.prototype.isPointInBlocks = function(point) {
		for (var i = 1; i < this.obstacles.length; i++) {
			if (this.obstacles[i].contains(point)) {
				return true;
			}
		}
		
		return false;
	};
	
	Environment.prototype.isPointInBounds = function(point) {
		return (point.x > 0 && point.x < this.size.width) && (point.y > 0 && point.y < this.size.height);
	};
	
	Environment.prototype.getIntersections = function(path) {
		var firstPoint = path.firstSegment.point;
		var intersections = [];
		var closestIntersection = -1;
		var closestDistance = Number.MAX_VALUE;
		
		for (var i = 0; i < this.obstacles.length; i++) {
			var inter = path.getIntersections(this.obstacles[i]);
			
			if (inter.length) {
				intersections.push(inter[0]);
			}
		}
		
		for (var i = 0; i < intersections.length; i++) {
			var dist = firstPoint.getDistance(intersections[i].point);
			if (closestIntersection < 0 || dist < closestDistance) {
				closestDistance = dist;
				closestIntersection = i;
			}
		}
		
		if (intersections.length && closestIntersection >= 0) {
			return intersections[closestIntersection];
		}
		else {
			return null;
		}
	};
	
	Environment.prototype.cleanup = function() {
		this.door.remove();
		this.key.remove();
		this.player.remove();
		
		while (this.enemies.length) {
			var e = this.enemies.pop();
			
			if (e.sprite) {
				e.sprite.remove();
			}
			
			e.remove();
		}
		
		while (this.obstacles.length) {
			this.obstacles.pop().remove();
		}
		
		while (this.batteries.length) {
			this.batteries.pop().remove();
		}
		
		if (this.compoundVisionPath) {
			this.compoundVisionPath.remove();
		}
	};
    
    return Environment;
})();