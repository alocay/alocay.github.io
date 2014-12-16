var FieldGenerator = (function () {
    function FieldGenerator(p, r, s, sp, c) {
        this.point = p;
        this.radius = r;
        this.strength = s;
        this.fieldSpread = sp;
        this.body = new Group({
            children: [],
            position: this.point
        });
        
        var color = c ? c : 'green';
        var outerShape = new Path.Circle(this.point, this.radius);
        
        outerShape.fillColor = {
            gradient: {
                stops: [[tinycolor(color).toHexString(), 0.4], [tinycolor(color).darken(10).toHexString(), 0.7], [tinycolor(color).darken(5).toHexString(), 1]],
                radial: true
            },
            origin: this.point,
            destination: outerShape.bounds.rightCenter
        };
        
        this.spread = new Shape.Circle(this.point, this.fieldSpread + this.radius);
        this.spread.strokeColor = 'black';
        this.label = new PointText(this.point);
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
    
    return FieldGenerator;
})();