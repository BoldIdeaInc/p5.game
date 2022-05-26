// Overlap Point and pixel
//
// The collisions are not checked against bounding boxes but between points or
// image pixels

// Use left and right arrow keys to move the sprite. Its position is adjusted to
// another sprite's opaque pixels

let triangle;
let triangleImage;

let puff;
let puffAnimation;
let puffAnimation2;

let platform;
let platformImage;

let GRAVITY = 1;

function preload() {
  triangleImage = loadImage('assets/triangle.png');
  puffAnimation = loadAnimation('assets/puff_breathing0001.png', 'assets/puff_breathing0009.png');
  puffAnimation2 = loadAnimation('assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  platformImage = loadImage('assets/platform.png');
}

function setup() {
  createCanvas(800, 400);

  triangle = createSprite(triangleImage, 300, 150);
  triangle.debug = true;

  puff = createSprite(puffAnimation, 500, 150);
  puff.addAnimation('transformed', puffAnimation2);
  puff.setCollider('circle', 0, 0, 50);
  puff.debug = true;

  platform = createSprite(platformImage, 400, 300);

  triangle.depth = 10;
}

function draw() {
  background(255, 255, 255);

  //if no arrow input set velocity to 0
  triangle.velocity.x = 0;

  if (keyIsDown(LEFT_ARROW)) {
    triangle.velocity.x = -5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    triangle.velocity.x = 5;
  }

  // You can check a point against the pixels of a sprite. If the bottom of the
  // triangle is not overlapping with the non transparent pixels of the
  // platform, make it fall
  if (platform.overlapPixel(triangle.x, triangle.y+30) === false) {
    triangle.velocity.y += GRAVITY;
  }


  // Instead of checking the colliders or bounding box overlaps you can just
  // check a point against a collider
  if (puff.overlapPoint(triangle.x, triangle.y)) {
    puff.changeAnimation('transformed');
  }

  // If the bottom of the triangle is overlapping the non transparent pixels
  // of the platform move it up one pixel until it doesn't overlap anymore
  while (platform.overlapPixel(triangle.x, triangle.y+30)) {
    triangle.y--;
    triangle.velocity.y = 0;
  }

  drawSprites();
}
