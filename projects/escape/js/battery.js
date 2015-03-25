var Battery = (function () {
    function Battery(position) {
        this.position = position;
        this.charge = 20;
		this.body = new Shape.Rectangle(this.position, new Size(15, 5));
        this.body.fillColor = 'green';
        this.body.strokeColor = 'black';
        this.body.strokeWidth = 1;
    }
    
    Battery.prototype.pickup = function() {
		this.remove();
	};
	
	Battery.prototype.remove = function() {
		if (this.body) {
			this.body.remove();
		}
	};
	
    return Battery;
})();