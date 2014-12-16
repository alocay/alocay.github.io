var FieldGenerator = (function () {
    function FieldGenerator(p, r, s, sp, c, rv) {
        this.point = p;
        this.radius = r;
        this.strength = s;
        this.fieldSpread = sp;
        this.body = new Path.Circle(this.point, this.radius);
        
        var color = c ? c : 'green';
        
		var gradientStops = [
			[tinycolor(color).toHexString(), 0.2], 
			[tinycolor(color).darken(5).toHexString(), 0.4],
			[tinycolor(color).darken(10).toHexString(), 0.6],
			[tinycolor(color).darken(15).toHexString(), 0.8],
			[tinycolor(color).darken(20).toHexString(), 1]
		];
		
		if (color != 'green') {
			gradientStops = [
				[tinycolor(color).toHexString(), 0.2], 
				[tinycolor(color).darken(5).toHexString(), 0.4],
				[tinycolor(color).darken(15).toHexString(), 0.6],
				[tinycolor(color).darken(25).toHexString(), 0.8],
				[tinycolor(color).darken(35).toHexString(), 1]
			];
		}
		
        this.body.fillColor = {
            gradient: {
                stops: gradientStops,
                radial: true
            },
            origin: this.point,
            destination: this.body.bounds.rightCenter
        };
        
        this.spread = new Shape.Circle(this.point, this.fieldSpread + this.radius);
		this.spread.strokeColor = 'black';
		this.spread.visible = rv
		;
        this.label = new PointText(this.point.subtract(new Point(this.radius / 3, 0)));
        this.label.content = this.strength.toFixed(5);
		
        this.visualPath = null;
    }
    
    FieldGenerator.prototype.remove = function () {
        this.body.remove();
        this.spread.remove();
        this.label.remove();
    };
    
    FieldGenerator.prototype.contains = function (point) {
        return this.body.contains(point);
    };
	
	FieldGenerator.prototype.toggleRangeIndicators = function () {
		this.spread.visible = !this.spread.visible;
	};
    
    return FieldGenerator;
})();