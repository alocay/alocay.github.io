var Environment = (function () {
    function Environment(size) {
		this.obstacles = [];
		this.player = null
		this.enemies = [];
		this.size = size;
        this.key = new LevelKey();
        this.door = new Point();
        
        var border = new Rectangle(new Point(), new Size(size.width, size.height));
		this.borderPath = new Path.Rectangle(border);
        this.borderPath.strokeColor = 'black';
        this.borderPath.strokeWidth = 1;
        this.borderPath.closed = true;
        
		this.compoundVisionPath = null;
        
        this.obstacles.push(this.borderPath);
		
		this.inters = [];
	}
	
	Environment.prototype.addObstacle = function (ob) {
        ob.strokeWidth = 1;
        ob.strokeColor = 'black';
        ob.fillColor = 'black';
		this.obstacles.push(ob);
	};
    
	Environment.prototype.getFieldOfVisionPath = function(mob) {
		var halfFov = mob.fieldOfView / 2;
		var startAngle = -1 * halfFov;
		var step = 0.6;
		var lengthFactor = 50;
		var visible = [mob.position];
		var vision = mob.visionVector.clone();
		vision.length = mob.fieldOfViewDistance < 0 ? vision.length : mob.fieldOfViewDistance;
		
		for (var i = 0; i < this.inters.length; i++) {
			this.inters.pop().remove();
		}
		
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
		
		this.compoundVisionPath = new CompoundPath({
			children: [this.borderPath, this.player.fieldOfViewArea],
			strokeColor: 'black'
		});
		
		//this.compoundVisionPath.fillColor = 'black';
        
        for(var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].run(this);
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
    
    return Environment;
})();