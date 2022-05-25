// Setting a sprite lifespan and visibility
// click on the canvas to create self destructing sprite and toggle visibility

let splatAnimation;
let cloudAnimation;
let cloud;

function preload() {
  cloudAnimation = loadAnimation('assets/cloud_breathing0001.png', 'assets/cloud_breathing0009.png');
  splatAnimation = loadAnimation('assets/asterisk_explode0001.png', 'assets/asterisk_explode0011.png');
}

function setup() {
  createCanvas(800, 400);

  cloud = createSprite(cloudAnimation, 400, 200);
  cloud.setSpeed(3);
}

function draw() {
  background(255, 255, 255);

  // sprites' visibility can be turned on an off
  // and invisible sprite is still updating normally
  if (mouseIsPressed) {
    cloud.visible = false;
  } else {
    cloud.visible = true;
  }

  if (cloud.position.x > width) {
    cloud.x = 0;
  }

  //draw the sprites
  drawSprites();
}

//every mouse press
function mousePressed() {
  // create a sprite and set it to self-destruct after 40 frames
  var splat = createSprite(splatAnimation, mouseX, mouseY);
  splat.life = 40;
}
