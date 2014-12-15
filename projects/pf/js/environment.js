var Environment = (function () {
    function Environment(size) {
        this.repulsors = [];
        this.attractors = [];
		this.obstacles = [];
		this.pathObstacles = [];
		this.size = size;
		this.boids = [];
    }
	
	Environment.prototype.getBoids = function () {
		return this.boids;
	};
	
	Environment.prototype.addObstacle = function (ob) {
		this.obstacles.push(ob);
	};
    
    Environment.prototype.addRepulsor = function (point, radius, strength, fieldSpread, color) {
        color = color ? color : 'red';
        this.repulsors.push(new FieldGenerator(point, radius, strength, fieldSpread, color));
    };
    
    Environment.prototype.addAttractor = function (point, radius, strength, fieldSpread, color) {
        color = color ? color : 'green';
        this.attractors.push(new FieldGenerator(point, radius, strength, fieldSpread, color));
    };
    
    Environment.prototype.addRandomAttractor = function (point) {
        var strength = (Math.random() * 0.05) + 0.0001;
        var radius = Math.floor((Math.random() * 75) + 10);
        var spread = Math.floor((Math.random() * 50) + 10);
        this.attractors.push(new FieldGenerator(point, radius, strength, spread, 'green'));
    };
    
    Environment.prototype.addRandomRepulsor = function (point) {
        var strength = Math.floor((Math.random() * 10) + 1);
        var radius = Math.floor((Math.random() * 75) + 10);
        var spread = Math.floor((Math.random() * 50) + 10);
        this.repulsors.push(new FieldGenerator(point, radius, strength, spread, 'red'));
    };
    
    Environment.prototype.removeGenerator = function (point) {
        var result = this.isInGenerator(point);
        
        if (result.found) {
            if(result.attractor) {
                this.attractors[result.index].remove();
                this.attractors.splice(result.index, 1);
            }
            else {
                this.repulsors[result.index].remove();
                this.repulsors.splice(result.index, 1);
            }
        }
        
        return result.found;
    };
    
    Environment.prototype.isInGenerator = function(point) {
        for (var i = 0; i < this.repulsors.length; i++) {
            if(this.repulsors[i].contains(point)) {
                return { "found": true, "index": i, "attractor": false };
            }
        }
        
        for (var i = 0; i < this.attractors.length; i++) {
            if(this.attractors[i].contains(point)) {
                return { "found": true, "index": i, "attractor": true };
            }
        }
        
        return { "found": false};
    };
	
	Environment.prototype.isInObstacle = function(point) {
		for (var i = 0; i < this.obstacles.length; i++) {
            if(this.obstacles[i].contains(point)) {
                return { "found": true, "index": i };
            }
        }
		
		return { "found": false};
	};
    
    return Environment;
})();