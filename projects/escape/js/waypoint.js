var Waypoint = (function () {
    function Waypoint(pos, pri) {
        this.position = pos;
		this.priority = pri;
		this.neighbors = [];
		this.body = null;
		
		if (window.DEBUG_GAME || window.DEBUG_GAME_EXTRA) {
			this.body = new Shape.Circle(this.position, 5);
			this.body.fillColor = 'orange';
		}
    }
	
	Waypoint.prototype.addNeighbor = function(wp) {
		this.neighbors.push(wp);
	};
	
	Waypoint.prototype.getNextNeighbor = function() {
        var wp = null;
		if (this.neighbors.length == 1) {
			wp = this.neighbors[0];
		}
		else {
            var r = Math.random();
            this.neighbors.sort(neighborsSortFunction);
			
            
			for (var i = 0; i < this.neighbors.length; i++) {
				if (r <= this.neighbors[i].priority) {
                    wp = this.neighbors[i];
                    break;
                }
                
                if (i == (this.neighbors.length - 1)) {
                    wp = this.neighbors[i];
                }
			}
		}
        
        return wp;
	};
	
	Waypoint.prototype.select = function() {
		if ((window.DEBUG_GAME || window.DEBUG_GAME_EXTRA) && this.body) {
			this.body.fillColor = 'red';
		}
	};
	
	Waypoint.prototype.unselect = function() {
		if ((window.DEBUG_GAME || window.DEBUG_GAME_EXTRA) && this.body) {
			this.body.fillColor = 'orange';
		}
	};
	
	Waypoint.prototype.hasNeighbors = function() {
		return this.neighbors.length > 0;
	};
	
	Waypoint.prototype.remove = function() {
		if (this.body) {
			this.body.remove();
		}
	};
	
    function neighborsSortFunction(a, b) {
        if (a.priority < b.priority) {
            return -1;
        }
        else if (a.priority > b.priority) {
            return 1;
        }
        else {
            return 0;
        }
    }
    
    return Waypoint;
})();