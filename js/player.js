var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position, radius, ms, mf, fov) {
        _super.call(this, position, radius, ms, mf, fov);
		this.targetLocation = null;
		this.isFlashlightOn = true;
    }
	
	Player.prototype.run = function (environment) {
		if (this.fieldOfViewArea) {
			this.fieldOfViewArea.remove();
		}
		
		this.moveToTargetLocation();
		this.updatePosition(environment);
		this.fieldOfViewArea = environment.getFieldOfVisionPath(this);
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
	
    return Player;
})(Mob);