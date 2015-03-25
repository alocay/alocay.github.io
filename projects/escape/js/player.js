var Player = (function (_super) {
    __extends(Player, _super);
    function Player(position, radius, ms, mf, fov, fovd) {
        _super.call(this, position, radius, ms, mf, fov, fovd);
		this.maxSpeed = 2.0;
		this.targetLocation = null;
		this.flashlight = new Flashlight();
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
        this.flashlight.updateBattery();
		
        this.fieldOfView = this.flashlight.getFov();
		this.fieldOfViewDistance = this.flashlight.getRange();
        
		this.fieldOfViewArea = environment.getFieldOfVisionPath(this);
		this.lightFadeOutMask = this.createLightFadeOutMask();
		
		if (window.DEBUG_GAME_EXTRA) {
			this.fieldOfViewArea.fullySelected = true;
		}
	};
	
    Player.prototype.createLightFadeOutMask = function () {
        var fadeOutGradient = this.flashlight.getFadeOutGradient();
        
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
	};
    
    Player.prototype.HasKey = function () {
        return this.hasKey;
    };
    
    Player.prototype.addBattery = function (battery) {
        this.flashlight.insertBattery(battery);
    };
	
    Player.prototype.toggleFlashlight = function () {
        this.flashlight.toggle();
    };
    
    Player.prototype.isFlashlightOn = function () {
        return this.flashlight.isOn;
    };
    
    Player.prototype.getFlashlightBatteryLife = function () {
        return this.flashlight.getBatteryLife();
    };
    
    Player.prototype.getFlashlightBatteryLife = function () {
        return this.flashlight.getBatteryLife();
    };
    
	Player.prototype.cycleThroughFov = function() {
		this.flashlight.cycle();
	};
	
	Player.prototype.remove = function() {
		this.cleanup();
		
		if (this.lightFadeOutMask) {
			this.lightFadeOutMask.remove();
		}
	};
	
    return Player;
})(Mob);