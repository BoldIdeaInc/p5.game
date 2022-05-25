// Changing the sprites' animations
// position and transformations: rotation, scale, mirror
// move the mouse and click
// press and hold the up and down keys

let ghost;
let standingAnimation;
let movingAnimation;
let spinningAnimation;

function preload() {
  // The `loadAnimation()` method returns an animation that can be store in a variable
  // Parameters: first frame, last frame
  standingAnimation = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  movingAnimation = loadAnimation('assets/ghost_walk0001.png', 'assets/ghost_walk0004.png');
  spinningAnimation = loadAnimation('assets/ghost_spin0001.png', 'assets/ghost_spin0003.png');

  // The standingAnimation doesn't quite line up with the other ones, so we adjust it here.
  // We can use `offX` and `offY` to set the distance of animation from the center of the sprite.
  standingAnimation.offY = 18;
}

function setup() {
  createCanvas(800, 300);

  // create a sprite, using `standingAnimation` as the default animation
  // Paramters: animation, x, y
  ghost = createSprite(standingAnimation, 400, 150);

  // Note: Each of the sprite's animations has a label.
  // The default animation will have a label called "normal".

  // Use `addAnimation()` to add additional animations to the sprite
  // Parameters: label, animation
  ghost.addAnimation('moving', movingAnimation);
  ghost.addAnimation('spinning', spinningAnimation);
}

function draw() {
  background(255, 255, 255);

  // In this example, we use `changeAnimation(label)` to change the animation
  // depending on what the mouse is doing.

  // if mouse is to the left
  if (mouseX < ghost.x - 10) {
    ghost.changeAnimation('moving');
    // flip horizontally
    ghost.mirrorX(-1);
    // negative x velocity: move left
    ghost.velocity.x = -2;
  } else if (mouseX > ghost.x + 10) {
    ghost.changeAnimation('moving');
    // unflip
    ghost.mirrorX(1);
    ghost.velocity.x = 2;
  } else {
    // if close to the mouse, don't move
    ghost.changeAnimation('normal');
    ghost.velocity.x = 0;
  }

  if (mouseIsPressed) {
    // the rotation is not part of the spinning animation
    ghost.rotation -= 10;
    ghost.changeAnimation('spinning');
  } else {
    ghost.rotation = 0;
  }

  // up and down keys to change the scale
  // note that scaling the image quality deteriorates
  // and scaling to a negative value flips the image
  if (keyIsDown(UP_ARROW)) {
    ghost.scale += 0.05;
  }

  if (keyIsDown(DOWN_ARROW)) {
    ghost.scale -= 0.05;
  }

  // draw the sprite
  drawSprites();
}
