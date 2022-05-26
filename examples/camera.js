// Virtual camera
// move the mouse around
//
// The sprite follows the mouse but appears at the center of the sketch because
// the camera is following it

let ghost;
let ghostAnimation;

let bg;

let frameImage;

//the scene is twice the size of the canvas
let SCENE_W = 1600;
let SCENE_H = 800;


function preload() {
  frameImage = loadImage('assets/frame.png');
  rockAnimation = loadAnimation('assets/rocks0.png', 'assets/rocks3.png');
  ghostAnimation = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  ghostMovingAnimation = loadAnimation('assets/ghost_walk0001.png', 'assets/ghost_walk0004.png');

  // adjust the y-offset of the moving animation
  ghostMovingAnimation.offY = 18;

}

function setup() {
  createCanvas(800, 400);

  //create a sprite and add the 3 animations
  ghost = createSprite(400, 200, 50, 100);
  ghost.addAnimation('moving', ghostMovingAnimation);

  // create a group for background elements
  bg = new Group();

  // create some background for visual reference
  for (let i=0; i<80; i++) {
    // create a sprite and set the animation to one of 3 frames
    let rock = createSprite(rockAnimation, random(-width, SCENE_W+width), random(-height, SCENE_H+height));
    rock.animation.playing = false;
    rock.animation.changeFrame(i % 3);
    bg.add(rock);
  }
}

function draw() {
  background(255, 255, 255);

  // mouse trailer, the speed is inversely proportional to the mouse distance
  ghost.velocity.x = (camera.mouseX - ghost.position.x) / 20;
  ghost.velocity.y = (camera.mouseY - ghost.position.y) / 20;

  // a camera is created automatically at the beginning

  //.5 zoom is zooming out (50% of the normal size)
  if(mouseIsPressed) {
    camera.zoom = 0.5;
  } else {
    camera.zoom = 1;
  }

  //set the camera position to the ghost position
  camera.position.x = ghost.position.x;
  camera.position.y = ghost.position.y;

  //limit the ghost movements
  if (ghost.position.x < 0) {
    ghost.position.x = 0;
  }
  if (ghost.position.y < 0) {
    ghost.position.y = 0;
  }
  if (ghost.position.x > SCENE_W) {
    ghost.position.x = SCENE_W;
  }
  if (ghost.position.y > SCENE_H) {
    ghost.position.y = SCENE_H;
  }

  // draw the rocks first
  drawSprites(bg);

  // draw a shadow using p5 drawing
  noStroke();
  fill(0, 0, 0, 20);
  ellipse(ghost.position.x, ghost.position.y+90, 80, 30);

  // draw character on the top
  drawSprite(ghost);

  // You can turn on and off the camera at any point to restore the normal
  // drawing coordinates, the frame will be drawn at the absolute 0,0 (try to
  // see what happens if you don't turn it off)
  camera.off();
  image(frameImage, 0, 0);
}
