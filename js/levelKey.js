var LevelKey = (function () {
    function LevelKey() {
        this.position = new Point(530, 360);
        this.body = new Shape.Rectangle(this.position, new Size(10,10));
        this.body.fillColor = 'orange';
        this.body.strokeColor = 'black';
        this.body.strokeWidth = 1;
    }
	
    return LevelKey;
})();