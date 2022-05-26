// Collision detection
// move the mouse to see behavior
// click to show sprite bounding boxes (debug mode)

let box, asterisk, cloud, circle;
let boxAnimation, asteriskAnimation, cloudImage, circleImage;

function preload() {
  circleImage = loadImage('assets/plain_circle.png');
  boxAnimation = loadAnimation('assets/box0001.png', 'assets/box0003.png');
  asteriskAnimation = loadAnimation('assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  asteriskRoundAnimation = loadAnimation('assets/asterisk_circle0006.png', 'assets/asterisk_circle0008.png');
  cloudAnimation = loadAnimation('assets/cloud_breathing0001.png', 'assets/cloud_breathing0009.png');
}

function setup() {
  createCanvas(800, 400);

  // create 4 sprites
  circle = createSprite(circleImage, 400, 200);
  box = createSprite(boxAnimation, 200, 200);
  cloud = createSprite(cloudAnimation, 600, 200);
  asterisk = createSprite(asteriskAnimation, 400, 200);

  // add an extra animation for the asterisk
  asterisk.addAnimation('round', asteriskRoundAnimation);


}

function draw() {
  background(255, 255, 255);

  // make the asterisk follow the mouse
  asterisk.x = mouseX;
  asterisk.y = mouseY;

  // check and resolve the inteactions between sprites

  // sprite.overlap() returns true if overlapping occours
  // By default the check is performed on the image's bounding box
  // (press mouse button to visualize the bounding box)
  if (asterisk.overlap(circle)) {
    asterisk.changeAnimation('round');
  } else {
    asterisk.changeAnimation('normal');
  }

  // When using collide(), if overlapping, the sprite will be placed in the
  // closest non-overlapping position
  asterisk.collide(box);

  // displace() is the opposite of collide: the sprite in the parameter will
  // be pushed away by the sprite calling the function
  asterisk.displace(cloud);

  // if debug is set to `true`, the bounding boxes, centers and depths are shown
  asterisk.debug = mouseIsPressed;
  circle.debug = mouseIsPressed;
  box.debug = mouseIsPressed;
  cloud.debug = mouseIsPressed;

  // Note: you can also set .debug on sprite groups such as `allSprites`

  drawSprites();
}
