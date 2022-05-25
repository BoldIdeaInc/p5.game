// Changing the sprites' appearance
// press the mouse and move the cursor to control the animations

let boxSprite;
let testSprite;
let animatedSprite;
let anotherAnimatedSprite;

function setup() {
  createCanvas(800, 300);

  // assets should be preloaded in the preload() function
  // to avoid delays in the visualization
  // but they can be loaded in setup() and draw() as well
  let img = loadImage('assets/asterisk.png');
  let animation = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  let otherAnimation = loadAnimation('assets/cloud_breathing0001.png', 'assets/cloud_breathing0005.png');

  //create a sprite with a placeholder rectangle as visual component (w, h, x, y)
  boxSprite = createSprite(50, 100, 100, 150);

  //change the color of the placeholder
  boxSprite.shapeColor = color(222, 125, 2);

  // create a sprite and associate an existing image as visual component (img, x, y)
  testSprite = createSprite(img, 300, 150);

  // create a sprite and associate an existing animation as visual component (animation, x, y)
  animatedSprite = createSprite(animation, 500, 150);
  anotherAnimatedSprite = createSprite(otherAnimation, 700, 150);
}

function draw() {
  background(255, 255, 255);

  // All the methods and properties of the current animation will be accessible from the .animation
  // property of the sprite. The following are just some examples of changing sprite appearance
  // based on mouse input.

  // stop/play a sprite animation
  if (mouseIsPressed) {
    animatedSprite.animation.stop();
  } else {
    animatedSprite.animation.play();
  }

  // change the frame in relation to the mouse x position
  let percentage = mouseX / width;
  let frame = round(anotherAnimatedSprite.animation.getLastFrame() * percentage);
  anotherAnimatedSprite.animation.changeFrame(frame);

  // draw all the sprites
  drawSprites();
}
