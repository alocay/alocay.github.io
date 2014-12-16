var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position, radius, ms, mf, fov) {
        _super.call(this, position, radius, ms, mf, fov);
		this.targetLocation = null;
		this.isFlashlightOn = true;
		this.fovRangeOptions = [
			{fov: 180, range: 75},
			{fov: 60, range: 200},
			{fov: 20, range: 300},
			{fov: 5, range: 600},
		];
		this.currentFovOption = 1;
		this.hasKey = false;
		this.lightFadeOutMask = null;
    }
	
	Player.prototype.run = function (environment) {
		if (this.fieldOfViewArea) {
			this.fieldOfViewArea.remove();
		}
		
		if (this.lightFadeOutMask) {
			this.lightFadeOutMask.remove();
		}
		
		this.moveToTargetLocation();
		this.updatePosition(environment);
		
		this.fieldOfViewArea = environment.getFieldOfVisionPath(this);
		this.lightFadeOutMask = this.createLightFadeOutMask();
		
		if (window.DEBUG_GAME_EXTRA) {
			this.fieldOfViewArea.fullySelected = true;
		}
	};
	
    Player.prototype.createLightFadeOutMask = function () {
        var startFill = new RGBColor(0,0,0,0.0);
        var midFill = new RGBColor(0,0,0,0.5);
        var endFill = new RGBColor(0,0,0,1); 
        var fadeOutGradient = new Gradient([startFill, midFill, endFill], 'radial');
        
        var mask = this.fieldOfViewArea.clone();
        mask.fillColor = {
            gradient: fadeOutGradient,
            origin: this.position,
            destination: this.position.add(this.visionVector.normalize(this.fieldOfViewDistance))
        };
        
        return mask;
    };
    
	Player.prototype.moveToTargetLocation = function() {
		var distThreshold = 1;
		if (this.targetLocation) {
			if (this.position.getDistance(this.targetLocation) < distThreshold) {
				this.targetLocation = null;
				this.vector = new Point();
			}
			else {
				this.acceleration = this.seek(this.targetLocation);
			}
		}
	}
	
	Player.prototype.cycleThroughFov = function() {
		this.currentFovOption = (this.currentFovOption + 1) % this.fovRangeOptions.length;
		this.fieldOfView = this.fovRangeOptions[this.currentFovOption].fov;
		this.fieldOfViewDistance = this.fovRangeOptions[this.currentFovOption].range;
	};
	
    return Player;
})(Mob);