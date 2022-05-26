// Sprite drawing order
// new sprite are drawn on top of old ones
// click to sort the sprites depth according to their y coordinates

let images;

function setup() {
  createCanvas(800, 400);
  images = [
    loadImage('assets/box0001.png'),
    loadImage('assets/ghost_standing0004.png'),
    loadImage('assets/cloud_breathing0001.png'),
    loadImage('assets/square.png')
  ];
}

function draw() {
  background(255, 255, 255);

  //every 10 frames
  if (frameCount % 10 === 0) {

    // get a random image
    let randomImage = random(images);

    //create a sprite in a random position
    let newSprite = createSprite(randomImage, random(0, width), random(0, height));

    //set a lifespan to avoid consuming all the memory
    newSprite.life = 1000;
  }

  // the newest sprites are drawn on the top
  drawSprites();
}

function mousePressed() {
  // you can also set the depth directly.

  // Here we loop through each sprite and set the depth and scale based on its Y position
  for (let i=0; i<allSprites.length; i++) {
    let sprite = allSprites[i];
    allSprites[i].depth = allSprites[i].position.y;
    allSprites[i].scale = allSprites[i].position.y / 400;
  }

}
