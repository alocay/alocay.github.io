var Door = (function () {
    function Door() {
        this.position = new Point(530, 360);
		this.openRadius = 20;
        this.body = new Shape.Rectangle(this.position, new Size(50, 10));
        this.body.fillColor = 'purple';
        this.body.strokeColor = 'black';
        this.body.strokeWidth = 1;
		this.opened = false;
    }
	
	Door.prototype.open = function(hasKey) {
		if (hasKey) {
			this.opened = true;
		}
		
		return this.opened;
	};
	
    return Door;
})();