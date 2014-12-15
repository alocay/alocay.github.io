var FieldGenerator = (function () {
    function FieldGenerator(p, r, s, sp, c) {
        this.point = p;
        this.radius = r;
        this.strength = s;
        this.fieldSpread = sp;
        this.body = new Shape.Circle(this.point, this.radius);
        this.body.fillColor = c ? c : 'green';
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