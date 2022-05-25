// Sprite drawing order
// new sprite are drawn on top of old ones
// click to sort the sprites depth according to their y coordinates

let boxImage, ghostImage, cloudImage, squareImage;

function setup() {
  createCanvas(800, 400);
  boxImage = loadImage('assets/box0001.png');
  ghostImage = loadImage('assets/ghost_standing0004.png');
  cloudImage = loadImage('assets/cloud_breathing0001.png');
  squareImage = loadImage('assets/square.png');
}

function draw() {
  background(255, 255, 255);

  //every 10 frames
  if(frameCount%10 == 0) {

    //assign a random appearance
    var rnd = floor(random(0, 4));

    let spriteImage;

    if(rnd == 0) {
      spriteImage = boxImage;
    }
    if (rnd == 1) {
      spriteImage = ghostImage;
    }
    if(rnd == 2) {
      spriteImage = cloudImage;
    }
    if(rnd == 3) {
      spriteImage = squareImage;
    }

    //create a sprite in a random position
    let newSprite = createSprite(spriteImage, random(0, width), random(0, height));

    //set a lifespan to avoid consuming all the memory
    newSprite.life = 1000;
  }

  //the newest sprites are drawn on the top
  drawSprites();
}

//unless the depths are directly set
function mousePressed() {

  //set the existing sprites' depths in relation to their position
  for(var i=0; i<allSprites.length; i++) {
    //sprites on the bottom will be drawn first
    allSprites[i].depth = allSprites[i].position.y;

    //you can link the scale to the y position to simulate perspective
    //allSprites[i].scale = map(allSprites[i].position.y, 0, height, 0.2, 1);
  }

}
