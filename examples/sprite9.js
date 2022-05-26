// Dynamically drawn sprites
// sprite with a custom drawing function follows the mouse
// and changes shape according to its speed

let stretchy;
let face;

function preload() {
  face = loadImage('assets/face.png');
}

function setup() {
  createCanvas(800, 400);

  // Sometimes image sequences are not enough and you may want to use p5's
  // drawing function while retaining the built-in features of the sprite class.

  // We start by creating a 10x10 "placeholder" sprite
  stretchy = createSprite(10, 10, 400, 200);

  // To do so you can override the draw() function of the sprite
  // and make it display anything you want in its current position.
  // In javascript function and methods can be assigned like variables
  stretchy.draw = function() {
    // the center of the sprite will be point 0,0
    // `this` in this function will reference the sprite itself
    fill(237, 205, 0);

    // get the current speed and direction
    let currentDirection = this.getDirection();
    let currentSpeed = this.getSpeed();

    // using p5 functions, make the ellipse stretch in the direction
    // proportionally to its speed
    push();
    rotate(radians(currentDirection));
    ellipse(0, 0, 100+currentSpeed, 100-currentSpeed);
    pop();

    // this.deltaX and this.deltaY are the position increment
    // since the last frame, move the face image toward the direction
    image(face, this.deltaX*2, this.deltaY*2);
  };

  stretchy.maxSpeed = 10;
}

function draw() {
  background(255, 255, 255);

  // follow the mouse, with the speed is inversely proportional to the mouse distance
  let distance = stretchy.getDistanceTo(mouseX, mouseY);
  let direction = stretchy.getDirectionTo(mouseX, mouseY);

  stretchy.setVelocity(distance / 10, direction);

  drawSprites();
}
