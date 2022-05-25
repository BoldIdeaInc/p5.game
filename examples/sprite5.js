// Accessing and deleting sprites
// click to create new sprites

let spriteImage;
let GRAVITY = 0.2;

function setup() {
  createCanvas(800, 400);
}

function preload() {
  spriteImage = loadImage('assets/asterisk.png');
}

function draw() {
  background(255, 255, 255);

  fill(0);
  textAlign(CENTER);
  text('Click to create a new sprite', width/2, height-20);

  // the best way to organize sprites is to use a custom group (see Group class)
  // however, all sprites are automatically added to a default group allSprites
  // that you can access like a normal array of objects

  for (let i=0; i<allSprites.length; i++) {
    let mySprite = allSprites[i];

    // adding a speed at 90 degrees (down)
    // equivalent to: mySprite.velocity.y += GRAVITY;
    mySprite.addVelocity(GRAVITY, 90);

    // even if they are out of the canvas, sprites keep getting updated
    // consuming precious memory
    // use Sprite.remove() to remove a sprite from the sketch
    if(mySprite.position.y > height + 100) {
      mySprite.remove();
    }
  }

  if (frameCount % 10 === 0) {
    console.log(`Sprite in the scene: ${allSprites.length}`);
  }

  // draw the sprites
  drawSprites();
}

// every mouse press
function mousePressed() {
  // Create a sprite at mouse position
  let newSprite = createSprite(spriteImage, mouseX, mouseY);
}
