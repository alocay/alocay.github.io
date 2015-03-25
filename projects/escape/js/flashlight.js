var Flashlight = (function () {
    function Flashlight() {
        this.isOn = true;
		this.fovRangeOptions = [
			{fov: 180, range: 75},
			{fov: 60, range: 200},
			{fov: 20, range: 300},
			{fov: 5, range: 600},
		];
        
        this.eyeSightFov = 40;
        this.eyeSightRange = 60;
        
        this.totalBattery = 100;
        this.batteryLifeInSec = 180;
        this.onFrameRunsPerSec = 60;
        this.batteryUsageRate = (this.totalBattery / this.batteryLifeInSec) / this.onFrameRunsPerSec;
		this.currentFovOption = 1;
		this.batteryLife = 100;
        this.inOverdrive = false;
        this.forcedOff = false;
    }
    
    Flashlight.prototype.cycle = function() {
		this.currentFovOption = (this.currentFovOption + 1) % this.fovRangeOptions.length;
	};
    
    Flashlight.prototype.getFov = function () {
        return this.isOn ? this.fovRangeOptions[this.currentFovOption].fov : this.eyeSightFov;
    };
    
    Flashlight.prototype.getRange = function () {
        return this.isOn ? this.fovRangeOptions[this.currentFovOption].range : this.eyeSightRange;
    };
	
    Flashlight.prototype.insertBattery = function (battery) {
        this.batteryLife += battery.charge;
        this.batteryLife = this.batteryLife > 100 ? 100 : this.batteryLife;
    };
    
    Flashlight.prototype.getBatteryLife = function () {
        return this.batteryLife > 0 ? (this.batteryLife | 0) : 0;
    };
    
    Flashlight.prototype.toggle = function () {
        if (this.batteryLife > 0) {        
            this.isOn = !this.isOn;
            this.playerTurnedOff = !this.isOn
        }
    };
    
    Flashlight.prototype.updateBattery = function () {
        if (!this.On && this.playerTurnedOff) {
            return;
        }
        
        if (this.batteryLife > 0) {
            this.isOn = true;
            
            if (this.inOverdrive) {
                this.batteryLife -= (this.batteryUsageRate * 3);
            }
            else {
                this.batteryLife -= this.batteryUsageRate;
            }
            
            if (this.batteryLife <= 0) {
                this.batteryLife = 0;
                this.isOn = false;
            }
        }
    };
    
    Flashlight.prototype.getFadeOutGradient = function() {
        var startFill = new RGBColor(0,0,0,0.0);
        var midFill = new RGBColor(0,0,0,0.5);
        var endFill = new RGBColor(0,0,0,1);
        
        if (!this.isOn) {
            startFill = new RGBColor(0,0,0,0.6);
            midFill = new RGBColor(0,0,0,0.8);
            endFill = new RGBColor(0,0,0,1);
        }
        
        return new Gradient([startFill, midFill, endFill], 'radial');
    };
	
    return Flashlight;
})();