var EliteEnemy = (function (_super) {
    __extends(EliteEnemy, _super);
    function EliteEnemy(position) {
        _super.call(this, position);
		this.moveSpeed = 1.5;
        this.sprintSpeed = 2.0;
		this.fieldOfViewDistance = 230;
        this.lightSensitive = true;
    }
	
    return EliteEnemy;
})(Enemy);