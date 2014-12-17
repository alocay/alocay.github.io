var Environment = (function () {
    function Environment(size) {
		this.obstacles = [];
		this.size = size;
		this.boids = [];
    }
	
	Environment.prototype.getBoids = function () {
		return this.boids;
	};
    
    Environment.prototype.addObstacle = function (ob) {
        this.obstacles.push(ob);
    }
    
    Environment.prototype.removeObstacles = function () {
        for (var i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].remove();
        }
    }
    
    return Environment;
})();