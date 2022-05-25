//Moving sprites
let ghostAnimation;
let circleAnimation;
let ghost;
let circle;
let direction = 90; //circle initial direction moving down

function preload() {
  ghostAnimation = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  circleAnimation = loadAnimation('assets/asterisk_circle0006.png', 'assets/asterisk_circle0008.png');
}

function setup() {
  createCanvas(800, 400);

  //create the sprites
  ghost = createSprite(ghostAnimation, 600, 200);
  circle = createSprite(circleAnimation, 400, 200);
}

function draw() {
  background(255, 255, 255);

  direction += 2;

  //speed, angle
  circle.setSpeed(3);
  circle.setDirection(direction);

  // you can rotate the sprite according the direction it is moving uncomment this:
  //circle.rotateToDirection = true;

  // You can also apply a force on the sprite toward a point
  ghost.attractionPoint(0.2, mouseX, mouseY);

  // since the force keeps incrementing the speed you can
  // set a limit to it with maxSpeed
  ghost.maxSpeed = 5;

  //draw the sprite
  drawSprites();
}
