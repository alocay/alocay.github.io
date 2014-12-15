var Mob = (function () {
    function Mob(environment) {
        this.mobRadius = 7.5;
        this.maxSpeed = 2;
        this.mass = 50;
        this.position = new Point(50,50);
        this.vector = new Point();
        this.body = new Shape.Ellipse({
            center: [10, 10],
            size: [15, 15],
            fillColor: 'black'
        });
        
        this.state = "idle";
        this.environment = environment;
        this.moveable = false;
        this.showPathVisual = false;
        this.pathVisualShowing = false;
        this.pathVisualSteps = 1000;
		this.astarGoal = null;
    }
    
    Mob.prototype.isInObstacle = function (point) {
        var resultG = this.environment.isInGenerator(point);
		var resultO = this.environment.isInObstacle(point);
        return resultG.found || resultO.found;
    };
	
	Mob.prototype.setGoal = function (point) {
		astarGoal = point;
	};
	
	Mob.prototype.getNeighbors = function (point) {
		var n = [];
		var vector = this.position.add(10);
		vector = vector.normalize(5);
		for (var i = 0; i < 360; i += 10) {
			var p = (point.add(vector)).rotate(i, point);
			
			if (!this.isInObstacle(p)) {
				n.push(p);
			}
		}
		
		return n;
	};
	
	Mob.prototype.getLowestPriority = function(set) {
		var lowest = Number.MAX_VALUE;
		var index = null;
		var lowestItem = null;
		
		for (var i = 0; i < set.length; i++) {
			var item = set[i];
			
			if (item.priority < lowest) {
				lowest = item.priority;
				index = i;
			}
		}
		
		if (index != null) {
			lowestItem = set[index].point;
			set.splice(index, 1);
		}
		
		if(!lowestItem) {
			var jeoit = 0;
		}
		
		return lowestItem;
	};
	
	Mob.prototype.getCost = function (start, target) {
		return target.subtract(start).length;
	};
	
	Mob.prototype.closedsetContains = function (set, point) {
		for (var i = 0; i < set.length; i++) {
			if (set[i].x == point.x && set[i].y == point.y) {
				return true;
			}
		}
		
		return false;
	};
	
	Mob.prototype.aStarVisual = function (start, target) {
		this.aStarPath(this.position, astarGoal);
	};
	
	Mob.prototype.aStarPath = function (start, target) {
		var closedset = [];
		var openset = [];
		var came_from = {};
		var cost_so_far = {};
		
		openset.push({ "point": start, "priority": 0});
		came_from[start] = null;
		cost_so_far[start] = 0;
		var c = 0;
		var current = null;
		
		while(openset.length > 0 && c < 10000) {
			current = this.getLowestPriority(openset);
			
			var fromGoal = current.subtract(target);
			
			if ((current.x == target.x && current.y == target.y) || fromGoal.length <= 5) {
				console.log("Out!");
				break;
			}
			
			if (current.x == 50 && current.y == 50) {
				var jdlsjf = 0;
			}
			
			//closedset.push(current);
			var neighbors = this.getNeighbors(current);
			for (var i = 0; i < neighbors.length; i++) {
				var n = neighbors[i];
				
				if (n.x == 50 && n.y == 50) {
					var jld = 0;
				}
				
				if (current.x == 50 && current.y == 50) {
					var lksjd = 0;
				}
				
				//if (this.closedsetContains(closedset, n)) {
					//continue;
				//}
				
				var new_cost = cost_so_far[current] + this.getCost(current, n);
				
				if (!cost_so_far[n] || new_cost < cost_so_far[n]) {
					cost_so_far[n] = new_cost;
					var pri = new_cost + this.getCost(n, target);
					
					//nc = new Shape.Circle(n, 3);
					//nc.fillColor = new Color(pri * 100 % 255, 0, 0);
					
					if(isNaN(pri)) {
						var ouoi = 0;
					}
					
					
					
					openset.push({ "point": n, "priority": pri });
					came_from[n] = current;
				}
			}
			
			c++;
		}
		
		this.createPathVisual(came_from, current, start);
	};
	
	Mob.prototype.createVisual = function(point) {
		var p = new Shape.Circle(point, 5);
		p.fillColor = 'blue';
	}
	
	Mob.prototype.createPathVisual = function(came_from, current, start) {
		var path = new Path([current]);
		while (came_from[current] && !(current.x == start.x && current.y == start.y)) {
			current = came_from[current];
			path.add(current);
		}
		
		path.strokeColor = 'blue';
	};
    
    Mob.prototype.findRepulsion = function(start, repulsor) {
        var desired = repulsor.point.subtract(start);
        var dist = desired.length;
        var angle = Math.atan2(repulsor.point.y - start.y, repulsor.point.x - start.x);
        var delta = new Point();
        
        if (dist < repulsor.radius) {
            delta.x = -1 * Math.cos(angle) * Number.MAX_VALUE;
            delta.y = -1 * Math.sin(angle) * Number.MAX_VALUE;
        }
        
        if (repulsor.radius <= dist <= (repulsor.fieldSpread + repulsor.radius)) {
            delta.x = -1 * repulsor.strength * (repulsor.fieldSpread + repulsor.radius - dist) * Math.cos(angle);
            delta.y = -1 * repulsor.strength * (repulsor.fieldSpread + repulsor.radius - dist) * Math.sin(angle);
        }
        
        if (dist > (repulsor.fieldSpread + repulsor.radius)) {
            delta.x = delta.y = 0;
        }
        
        return delta;
    };
    
    Mob.prototype.findAttraction = function (start, attractor) {
        var desired = attractor.point.subtract(start);
        var dist = desired.length;
        var angle = Math.atan2(attractor.point.y - start.y, attractor.point.x - start.x);
        var delta = new Point();
        
        if (dist < attractor.radius) {
            delta.x = 0;
            delta.y = 0;
        }
        
        if (attractor.radius <= dist <= (attractor.fieldSpread + attractor.radius)) {
            delta.x = attractor.strength * (dist - attractor.radius) * Math.cos(angle);
            delta.y = attractor.strength * (dist - attractor.radius) * Math.sin(angle);
        }
        
        if (dist > (attractor.fieldSpread + attractor.radius)) {
            delta.x = attractor.strength * attractor.fieldSpread * Math.cos(angle);
            delta.y = attractor.strength * attractor.fieldSpread * Math.sin(angle);
        }
        
        return delta;
    };
    
    Mob.prototype.getFieldDelta = function (start) {
        var delta = new Point();
        var deltaOb = new Point();
        for (var i = 0; i < this.environment.attractors.length; i++) {
            delta = delta.add(this.findAttraction(start, this.environment.attractors[i]));
        }
        
        for (var i = 0; i < this.environment.repulsors.length; i++) {
            deltaOb = deltaOb.add(this.findRepulsion(start, this.environment.repulsors[i]));
        }
        
        return (deltaOb.add(delta));
    };
    
    Mob.prototype.getNextLocationDelta = function (start, abs) {
        var delta = this.getFieldDelta(start);
        
        if (abs) {
            delta.length = Math.abs(delta.length);
        }
        
        return delta;
    };
    
    Mob.prototype.showPath = function () {
        if (this.visualPath) {
            this.visualPath.remove();
        }
    
        this.visualPath = new Path();
        var pos = this.position.clone();
        this.visualPath.add(pos);
        
        for (var i = 0; i < this.pathVisualSteps; i++) {
            var delta = this.getNextLocationDelta(pos);
            pos = pos.add(delta);
            this.visualPath.add(pos);
        }
        
        this.visualPath.strokeColor = 'blue';
        this.visualPath.strokeWidth = 2;
    };
    
    Mob.prototype.updatePos = function() {
        if (this.moveable) {
            var delta = this.getFieldDelta(this.position);
          
            this.vector = this.vector.add(delta);
            
            this.vector.length = Math.min(this.maxSpeed, this.vector.length);
            this.position = this.position.add(this.vector);
        }
    };

    Mob.prototype.runMob = function() {
        if (this.showPathVisual && !this.visualPath) {
            this.showPath();
        }
        else if (!this.showPathVisual && this.visualPath) {
            this.visualPath.remove();
            this.visualPath = null;
        }
        
        this.updatePos();
        this.body.position = this.position;
    };
    
    return Mob;
})();