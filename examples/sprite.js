// Sprite creation
// Click to create a new sprite with random speed

function setup() {
  createCanvas(800, 400);
}

function draw() {
  background(255, 255, 255);

  fill(0);
  textAlign(CENTER);
  text('Click to create a new sprite', width/2, height/2);

  // draw all the sprites added to the sketch so far
  // the positions will be updated automatically at every cycle
  drawSprites();
}

function mousePressed() {
  // Create a sprite at the mouse position and store it in a temporary variable
  // Here we pass the width, height, x-position and y-position. This creates a
  // rectangular "placeholder" sprite (no sprite image)
  var s = createSprite(30, 30, mouseX, mouseY);

  // now you can use the variable to set properties
  // e.g. a random velocity on the x and y coordinates
  s.velocity.x = random(-5, 5);
  s.velocity.y = random(-5, 5);
}
