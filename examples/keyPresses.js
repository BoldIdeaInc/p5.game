// Keyboard events
// Capturing single key presses and mouse button clicks
//
// press x and z or mouse left and right buttons

let asterisk;
let asteriskAnimation;
let asteriskStretchAnimation;

let ghost;
let ghostAnimation;

let platform;
let platformAnimation;

let GRAVITY = 1;
let JUMP = 15;

function preload() {
  asteriskAnimation = loadAnimation('assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  asteriskStretchAnimation = loadAnimation('assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  ghostAnimation = loadAnimation('assets/ghost_spin0001.png', 'assets/ghost_spin0003.png');
  platformAnimation = loadAnimation('assets/small_platform0001.png', 'assets/small_platform0003.png');
}

function setup() {
  // In this demo we are using the right mouse button, and want to disable the
  // browser's context menu. This is how you can do that:
  let canvas = createCanvas(800, 400);
  canvas.elt.addEventListener('contextmenu', e => e.preventDefault());

  // create our sprites
  ghost = createSprite(ghostAnimation, 600, 200);
  asterisk = createSprite(asteriskAnimation, 200, 200);
  asterisk.addAnimation('stretch', asteriskStretchAnimation);

  // set the collider used for mouse events
  asterisk.setCollider('circle', 0, 0, 64);

  platform = createSprite(platformAnimation, 200, 300);
}

function draw() {
  background(255, 255, 255);

  fill(0);
  textSize(20);
  textAlign(CENTER);
  text('Press x and z, or left/right mouse button', width/2, 20);

  asterisk.velocity.y += GRAVITY;

  if (asterisk.collide(platform)) {
    asterisk.velocity.y = 0;
    asterisk.changeAnimation('normal');
  }

  // keyDown returns true for a cycle if the key was just pressed
  // during this cycle. Useful to capture instant events in the draw cycle
  // without moving game logic to the mousePressed() function
  // mouseWentDown works the same way with mouse input
  if (keyWentDown('x') || mouseWentDown(LEFT)) {
    asterisk.changeAnimation('stretch');
    asterisk.animation.rewind();
    asterisk.velocity.y = -JUMP;
  }

  // same as keyWentDown
  // RIGHT = right mouse button
  if (keyWentUp('z') || mouseWentUp(RIGHT)) {
    ghost.rotation = 0;
  }

  // keyDown is similar to keyIsDown() except it accepts both key codes and characters
  if (keyDown('z') || mouseDown(RIGHT)) {
    ghost.rotation -= 10;
  }

  drawSprites();
}
