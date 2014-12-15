var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position, radius, ms, mf, fov) {
        _super.call(this, position, radius, ms, mf, fov);
		this.targetLocation = null;
		this.isFlashlightOn = true;
		this.fovRangeOptions = [
			{fov: 180, range: 75},
			{fov: 60, range: 200},
			{fov: 30, range: 300},
			{fov: 5, range: 600},
		];
		this.cuurentFovOption = 1;
		this.hasKey = false;
    }
	
	Player.prototype.run = function (environment) {
		if (this.fieldOfViewArea) {
			this.fieldOfViewArea.remove();
		}
		
		this.moveToTargetLocation();
		this.updatePosition(environment);
		
		this.fieldOfViewArea = environment.getFieldOfVisionPath(this);
		
		if (window.DEBUG_GAME_EXTRA) {
			this.fieldOfViewArea.fullySelected = true;
		}
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
		this.cuurentFovOption = (this.cuurentFovOption + 1) % this.fovRangeOptions.length;
		this.fieldOfView = this.fovRangeOptions[this.cuurentFovOption].fov;
		this.fieldOfViewDistance = this.fovRangeOptions[this.cuurentFovOption].range;
	};
	
    return Player;
})(Mob);