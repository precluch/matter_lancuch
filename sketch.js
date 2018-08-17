var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies,
  Constraint = Matter.Constraint,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint;

var engine,
  world,
  particles = [],
  boundaries = [],
  ground,
  r,
  mConstraint;


function setup() {
  var canvas = createCanvas(0.99*windowWidth, 0.99*windowHeight);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);

  r = height / 40;
  var prev = null;

  for (var x = width / 2; x < 1.4 * height; x += 3 * r) {
    var fixed = false;
    if (!prev) {
      fixed = true;
    }

    var p = new Particle(x, 100, r, fixed)
    particles.push(p);

    if (prev) {
      var options = {
        bodyA: p.body,
        bodyB: prev.body,
        length: 3 * r,
        stiffness: 0.4
      }
      var constraint = Constraint.create(options);
      World.add(world, constraint);
    }
    prev = p;
  }

  boundaries.push(new Boundary(width / 2, height, width, 20, 0));


  var canvasMouse = Mouse.create(canvas.elt);
  canvasMouse.pixelRatio = pixelDensity();
  var options = {
    mouse: canvasMouse,

  }
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}

function draw() {
  background(51);
  //  console.log(box1);

  for (var i = 0; i < boundaries.length; i++) {
    boundaries[i].show();
  }

  for (var i = 0; i < particles.length; i++) {
    particles[i].show()
  }

  if (mConstraint.body) {
    var pPos = mConstraint.body.position;
    var mPos = mConstraint.mouse.position;
    var offset = mConstraint.constraint.pointB;
    
    strokeWeight(5)
    stroke(255, 0, 0);
    line(pPos.x + offset.x, pPos.y + offset.y, mPos.x, mPos.y);

    stroke(random(100, 255), random(100, 255), random(100, 255));
    fill(random(100, 255), random(100, 255), random(100, 255));
    ellipse(pPos.x, pPos.y, 2*r, 2*r);
    
  }
}

// function mouseDragged() {
//   particles.push(new Particle(mouseX, mouseY, random(1, 1)));
// }