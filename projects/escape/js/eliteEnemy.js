var EliteEnemy = (function (_super) {
    __extends(EliteEnemy, _super);
    function EliteEnemy(position) {
        var ms = 1.5;
        var sps = 2.0;
        var fov = 60;
		var fovd = 230;
        var lightSen = true;
        _super.call(this, position, null, ms, sps, null, fov, fovd, lightSen);
    }
	
    return EliteEnemy;
})(Enemy);