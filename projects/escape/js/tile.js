var Tile = (function () {
    function Tile(pos, res) {
        this.position = pos;
        this.resource = res;
        this.soundPlayed = false;
        this.size = 15;
        this.audio = new Audio(this.resource);
        
        var tl = new Point(this.position.x - (this.size/2), this.position.y - (this.size/2));
        this.body = new Shape.Rectangle(tl, new Size(this.size, this.size));
        this.body.fillColor = 'green';
        this.body.strokeColor = 'black';
    }
    
    Tile.prototype.onStep = function() {
		if (!this.soundPlayed) {
            this.audio.play();
            this.soundPlayed = true;
        }
	};
	
    Tile.prototype.remove = function() {
        if (this.body) {
            this.body.remove();
        }
    };
    
    return Tile;
})();