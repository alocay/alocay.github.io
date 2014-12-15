var Flashlight = (function () {
    function Flashlight() {
		this.battery = new Battery();
		this.currentLife = 100;
    }
	
	Flashlight.prototype.setFov = function(fov) {
		this.fieldOfView = fov;
	};
	
	
	
    return Flashlight;
})();