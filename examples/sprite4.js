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
  //angleMode(DEGREES);

  //create the sprites
  circle = createSprite(circleAnimation, 400, 200);
  ghost = createSprite(ghostAnimation, 600, 200);
}

function draw() {
  background(255, 255, 255);

  direction += 2;

  //speed, angle
  circle.setSpeed(3);
  circle.setDirection(direction);

  // You can also set both at once using setVelocity():
  // circle.setVelocity(3, direction);

  // You can rotate the sprite according its direction:
  circle.rotateToDirection = true;

  // here we increase the ghost speed each frame, but limit it to 10
  var currentGhostSpeed = ghost.getSpeed();
  if (currentGhostSpeed < 20) {
    ghost.setSpeed(currentGhostSpeed + 2);
  }

  // We then set the ghost to move in the direction of the mouse pointer
  var directionToPointer = ghost.getDirectionTo(mouseX, mouseY);
  ghost.setDirection(directionToPointer);

  // Note: you can only set the direction of a sprite if the sprite has a speed greater than 0.

  // if we get within 5 pixels of the mouse, position the sprite exactly on the pointer and stop.
  var distanceToPointer = ghost.getDistanceTo(mouseX, mouseY);
  if (distanceToPointer < 10) {
    ghost.x = mouseX;
    ghost.y = mouseY;
    ghost.setSpeed(0);
  }

  // draw all sprites
  drawSprites();
}
