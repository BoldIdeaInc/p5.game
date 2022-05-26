// Collision detection - Bouncing behavior
// press mouse to show collider boxes

let circleAnimation;
let boxAnimation;
let circles;
let boxes;

function preload() {
  circleAnimation = loadAnimation('assets/asterisk_circle0006.png', 'assets/asterisk_circle0008.png');
  boxAnimation = loadAnimation('assets/box0001.png', 'assets/box0003.png');
}

function setup() {
  createCanvas(800, 400);

  circles = new Group();

  for (let i=0; i<20; i++) {
    let circle = createSprite(circleAnimation, random(0, width), random(0, height));
    circle.setCollider('circle', -2, 2, 55);
    circle.setSpeed(random(2, 3), random(0, 360));

    // `scale` affects the size of the collider
    circle.scale = random(0.5, 1);
    // `mass` determines the force exchange in case of bounce
    circle.mass = circle.scale;
    // `restitution` is the dispersion of energy at each bounce
    // if = 1 the circles will bounce forever
    // if < 1 the circles will slow down
    // if > 1 the circles will accelerate until they glitch
    // circle.restitution = 0.9;
    circles.add(circle);
  }

  boxes = new Group();

  for (let j=0; j<4; j++) {
    let box = createSprite(boxAnimation, random(0, width), random(0, height));
    // setting `immovable` to true makes the sprite immune to bouncing and
    // displacements as if with infinite mass
    box.immovable = true;

    // rotation rotates the collider too but it will always be an axis oriented
    // bounding box, that is an orthogonal rectangle. Try changing the angle to
    // 45 to see the behavior.
    if (j%2 === 0) {
      box.rotation = 90;
    }

    boxes.add(box);
  }
}



function draw() {
  background(255, 255, 255);

  // circles bounce against each others and against boxes
  circles.bounce(circles);

  // boxes are "immovable"
  circles.bounce(boxes);

  // all sprites bounce at the screen edges
  for (let i=0; i<allSprites.length; i++) {
    let s = allSprites[i];
    if(s.x<0) {
      s.x = 1;
      s.velocity.x = abs(s.velocity.x);
    }

    if(s.x>width) {
      s.x = width-1;
      s.velocity.x = -abs(s.velocity.x);
    }

    if(s.y<0) {
      s.y = 1;
      s.velocity.y = abs(s.velocity.y);
    }

    if(s.y>height) {
      s.y = height-1;
      s.velocity.y = -abs(s.velocity.y);
    }
  }

  allSprites.debug = mouseIsPressed;

  drawSprites();
}
