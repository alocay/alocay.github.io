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
		if (this.neighbors.length == 1) {
			return this.neighbors[0];
		}
		else {
			var wp = null;
			var largest = 0;
			for (var i = 0; i < this.neighbors.length; i++) {
				var r = Math.random();
				var l = r * this.neighbors[i].priority;
				if (!wp || l > largest) {
					wp = this.neighbors[i];
					largest = l;
				}
			}
			
			return wp;
		}
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
	
    return Waypoint;
})();