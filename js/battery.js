var Battery = (function () {
    function Battery(position) {
        this.position = position;
		this.totalLife = 100;
		this.currentLife = 100;
    }
	
    return Battery;
})();