var Mob = (function () {
    function Mob(position, radius, ms, mf, fov, fovd) {
        this.radius = radius ? radius : 5;
        this.maxSpeed = ms ? ms : 1.0;
        this.maxForce = mf ? mf : 0.15;
        this.position = position ? position : new Point();
        this.vector = new Point();
		this.visionVector = new Point(0, 100);
		this.fieldOfView = fov ? fov : 60;
		this.fieldOfViewDistance = fovd ? fovd : 200;
        this.body = new Path.Circle(this.position, this.radius);        
        this.moveable = true;
		this.acceleration = new Point();
		this.fieldOfViewArea = null;
        
        this.body.fillColor = 'red';
        this.v = null;
    }
    
	Mob.prototype.seek = function (target) {		
		var desired = target.subtract(this.position);
		desired = desired.normalize();
		desired.length = this.maxSpeed;
        
		var steer = desired.subtract(this.vector);
		steer.length = Math.min(this.maxForce, steer.length);
		return steer;
	};
    
    Mob.prototype.updatePosition = function(environment) {
        if (this.v) {
            this.v.remove();
        }
        
        if (this.moveable) {          
            this.vector = this.vector.add(this.acceleration);
            
            this.vector.length = Math.min(this.maxSpeed, this.vector.length);
			var temp = this.position.add(this.vector);
			
            this.v = drawArrow(this.position, temp, this.vector);
            
			if (environment.isPointInBlocks(temp) || !environment.isPointInBounds(temp)) {
				this.vector = new Point();
			}
			else {			
				this.position = temp;
				this.body.position = this.position;
			}
		
			this.acceleration = new Point();
        }
    };
    
    Mob.prototype.move = function(environment, point) {
        if (!environment.isPointInBlocks(point) && environment.isPointInBounds(point)) {
            this.position = point;
        }
    };
	
	Mob.prototype.cleanup = function() {
		if (this.fieldOfViewArea) {
			this.fieldOfViewArea.remove();
		}
		
		if (this.body) {
			this.body.remove();
		}
	};
    
    Mob.prototype.setVisionVector = function(point) {
        this.visionVector = this.position.subtract(point).multiply(-1).normalize(100);
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
    
    return Mob;
})();