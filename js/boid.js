var Boid = (function () {
	function Boid(position, bodySymbol, env, shared) {
		this.acceleration = new Point();
		this.position = position;
		this.maxForce = 0.03;
		this.radius = 3;
		//var randomAngle = Math.random() * (Math.PI * 2.0);
		//this.vector = new Point(Math.cos(randomAngle), Math.sin(randomAngle));
		this.vector = this.position.add(5);
		this.environment = env;
		this.shared = shared;
		this.sym = bodySymbol;
		this.body = bodySymbol.place(this.position);
		this.vectorIndicator = null;
		this.nv = null;
		this.rv = null;
		this.av = null;
		this.tv = null;
	}
	
	Boid.prototype.setGoal = function (point) {
		this.target = point;
	};
	
	Boid.prototype.run = function (boids, size, obstacles) {
		this.flock(boids);
		this.repel(obstacles);
		this.borders(size);
		this.update();
		this.moveBoid();
	};
	
	Boid.prototype.moveBoid = function () {
		this.body.position = this.position;
	};
	
	Boid.prototype.borders = function (size) {
		var vector = new Point();
		var position = this.position;
		var radius = this.radius;
		if (position.x < -radius) vector.x = size.width + radius;
		if (position.y < -radius) vector.y = size.height + radius;
		if (position.x > size.width + radius) vector.x = -size.width -radius;
		if (position.y > size.height + radius) vector.y = -size.height -radius;
		if (!vector.isZero()) {
			this.position = this.position.add(vector);
		}
	};
	
	Boid.prototype.repel = function(obstacles) {
		var rep = this.avoidObstacles(obstacles).multiply(this.shared.obstacleWeightFactor);
		
		this.acceleration = this.acceleration.add(rep);
	}
	
	Boid.prototype.removeArrow = function(arrow) {
		if (!arrow) {
			return;
		}
		
		var c = arrow.removeChildren();
		for (var j = 0; j < c.length; j++) {
			c[j].remove();
		}
		
		arrow.remove();
	};
	
	Boid.prototype.avoidObstacles = function (obstacles) {
		this.removeArrow(this.rv);
		this.removeArrow(this.nv);
		this.removeArrow(this.tv);
		
		var steer = new Point();
		var dv = this.vector.add(this.acceleration);
		var maxCast = 300;
		var count = 0;
		
		dv.length = Math.min(this.shared.maxSpeed, dv.length);
		
		for (var i = 0; i < obstacles.length; i++) {
			var ob = obstacles[i];
			var nearestPoint = ob.getNearestPoint(this.position);
			var vectorToPoint = this.position.add(nearestPoint);
			var distance = this.position.getDistance(nearestPoint);
			
			if (distance > 0 && distance < this.shared.obstacleAvoidanceDistance) {				
				var castedVector = dv.clone();
				castedVector.length = this.shared.obstacleAvoidanceDistance + this.shared.castedVectorLength;
				var castedPath = Path.Line(this.position, this.position.add(castedVector));
				
				var intersections = castedPath.getIntersections(ob);
				
				if (!intersections.length) {
					continue;
				}
				
				castedPath.remove();
				
				count++;
				var intersectionPoint = intersections[0].point;
				var vectorToIntersection = this.position.add(intersectionPoint);
				
				var offset = ob.getOffsetOf(intersectionPoint);
				var normal = ob.getNormalAt(offset);
				var normalizedNormal = normal.normalize();
				var dot = (vectorToIntersection.dot(normalizedNormal)) * 2;
				var result = normalizedNormal.multiply(dot);
				var reflectedVector = vectorToIntersection.subtract(result);
				
				steer = steer.add(reflectedVector);//.normalize(1 / distance));
				
				if (this.shared.showReflectionVectors) {
					this.tv = this.drawArrow(this.position, intersectionPoint, intersectionPoint.subtract(this.position), 'black');
					this.nv = this.drawArrow(intersectionPoint, intersectionPoint.add(normal), normal, 'red');
					this.rv = this.drawArrow(intersectionPoint, intersectionPoint.add(reflectedVector), reflectedVector, 'purple');
				}
			}
		}
		
		if (count > 0) {
			steer = steer.divide(count);
		}
		
		if (!steer.isZero()) {
			steer.length = this.shared.maxSpeed;
			steer = steer.add(this.vector);
			steer.length = Math.min(this.maxForce, steer.length);
		}
		
		return steer;
	};
	
	/*Boid.prototype.willIntersect = funciton(startSeg1, endSeg1, startSeg1, endSeg2, castDistance) {
		var vector1 = startSeg1.add(endSeg2);
		vector1.length = castDistance;
		var vector2 = startSeg2.add(endSeg2);
		
		var cross1 = vector1.cross(startSeg1);
		var cross2 = vector1.cross(startSeg2);
		
		var cross3 = vector2.cross(startSeg2);
		var cross4 = vector2.cross(endSeg2);
		
		if ((cross1 * cross2) < 0 && (cross3 * cross4) < 0) {
			return { "intersects": true, "path": Path.Line(startSeg1, startSeg1.add(vector1)) };
		}
		
		return null;
	};*/
	
	Boid.prototype.drawArrow = function(start, end, d, color) {
		var b = d.normalize(3);
		var p1 = new Path([start, end]);
		p1.strokeColor = color;
		
		var p2 = new Path([end.add(b.rotate(135)), end, end.add(b.rotate(-135))]);
		p2.strokeColor = color;
		
		var vi = new Group([p1, p2]);
		return vi;
	}
	
	Boid.prototype.seek = function (target) {		
		var desired = target.subtract(this.position);
		desired = desired.normalize();
		desired.length = this.shared.maxSpeed;
		
		var steer = desired.subtract(this.vector);
		steer.length = Math.min(this.maxForce, steer.length);
		return steer;
	};
	
	Boid.prototype.separate = function (boids) {
		var steer = new Point();
		var count = 0;
		for (var i = 0; i < boids.length; i++) {
			var boid = boids[i];
			var vector = this.position.subtract(boid.position);
			var distance = vector.length;
			if (distance > 0 && distance < this.shared.separationDist) {
				steer = steer.add(vector.normalize(1 / distance));
				count++;
			}
		}
		
		if (count > 0) {
			steer = steer.divide(count);
		}
		
		if (!steer.isZero()) {
			steer.length = this.shared.maxSpeed;
			steer = steer.subtract(this.vector);
			steer.length = Math.min(this.maxForce, steer.length);
		}
		
		return steer;
	};
	
	Boid.prototype.align = function (boids) {
		var steer = new Point();
		var count = 0;
		
		for (var i = 0; i < boids.length; i++) {
			var boid = boids[i];
			var distance = this.position.getDistance(boid.position);
			if (distance > 0 && distance < this.shared.cohesionDist) {
				steer = steer.add(boid.vector);
				count++;
			}
		}
		
		if (count > 0) {
			steer = steer.divide(count);
		}
		
		if (!steer.isZero()) {
			steer.length = this.shared.maxSpeed;
			steer = steer.subtract(this.vector);
			steer.length = Math.min(this.maxForce, steer.length);
		}
		
		return steer;
	};
	
	Boid.prototype.cohesion = function (boids) {
		var steer = new Point();
		var count = 0;
		
		for (var i = 0; i < boids.length; i++) {
			var boid = boids[i];
			var distance = this.position.getDistance(boid.position);
			if (distance > 0 && distance < this.shared.cohesionDist) {
				steer = steer = steer.add(boid.position);
				count++;
			}
		}
		
		if (count > 0) {
			steer = steer.divide(count);
			return this.seek(steer);
		}
		
		return steer;
	};
	
	Boid.prototype.flock = function (boids) {
		var tar = this.target ? this.seek(this.target).multiply(this.shared.targetWeightFactor) : new Point();
		var sep = this.separate(boids).multiply(this.shared.separationWeightFactor);
		var ali = this.align(boids).multiply(this.shared.alignmentWeightFactor);
		var coh = this.cohesion(boids).multiply(this.shared.cohesionWeightFactor);
		
		this.acceleration = this.acceleration.add(tar);
		this.acceleration = this.acceleration.add(sep);
		this.acceleration = this.acceleration.add(ali);
		this.acceleration = this.acceleration.add(coh);
	};
	
	Boid.prototype.update = function () {
		this.vector = this.vector.add(this.acceleration);
		this.vector.length = Math.min(this.shared.maxSpeed, this.vector.length);
		
		this.removeArrow(this.vectorIndicator);
		this.removeArrow(this.av);
		
		if (this.shared.showMovementVectors) {
			var v = this.vector.clone();
			v.length = 20;			
			this.vectorIndicator = this.drawArrow(this.position, this.position.add(v), v, 'black');
		}
		
		if (this.shared.showAccelerationVectors) {
			if (!this.acceleration.isZero()) {
				var av = this.acceleration.clone();
				av.length = 25;
				this.av = this.drawArrow(this.position, this.position.add(av), av, 'red');
			}
		}
		
		this.position = this.position.add(this.vector);
		this.acceleration = new Point();
	};
	
	return Boid;
})();