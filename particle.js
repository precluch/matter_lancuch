function Particle(x, y, r, fixed) {

  var options = {
    friction: 0,
    restitution: 0.6,
    isStatic: fixed
  };
  this.body = Bodies.circle(x, y, r, options);
  World.add(world, this.body);

  this.r = r;

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);

    strokeWeight(1);
    stroke(255);
    fill(127);
    ellipse(0, 0, this.r*2);
    line(0,0,r,0);

    pop();
  }
}