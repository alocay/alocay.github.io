var Sprite = (function () {
    function Sprite(url, nof, sw, size) {
		this.spriteUrl = url;
        this.numberOfFrames = nof;
		this.spriteSize = size;
		this.spriteSheetWidth = sw;
		this.frameIndex = 0;
		//this.fullSpriteSheet.visible = false;
		this.fullSpriteSheet = null;
		this.currentSprite = null;
    }
    
    Sprite.prototype.run = function(pos, rot) {
		this.clearSprite();
		this.fullSpriteSheet = new Raster(this.spriteUrl);
		this.frameIndex = (this.frameIndex + 1) % this.numberOfFrames;
		var point = new Point(this.frameIndex * this.spriteSheetWidth / this.numberOfFrames, 0);
		this.currentSprite = this.fullSpriteSheet.getSubRaster(new Rectangle(point, this.spriteSize));
		this.currentSprite.position = pos;
		this.currentSprite.rotate(rot);
		this.fullSpriteSheet.remove();
	};
	
	Sprite.prototype.clearSprite = function() {
		if (this.currentSprite) {
			this.currentSprite.remove();
		}
	};
	
	Sprite.prototype.remove = function() {
		this.clearSprite();
		
		if (this.fullSpriteSheet) {
			this.fullSpriteSheet.remove();
		}
	};
	
    return Sprite;
})();