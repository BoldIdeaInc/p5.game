//Collision detection - custom colliders
//move the mouse. The area responsive to collisions doesn't have to
//match the size of the images

let skizo;
let skizoAnimation;

let sun;
let sunAnimation;

let bubbly;
let bubblyAnimation;

let circle;
let circleAnimation;

function preload() {
  skizoAnimation = loadAnimation('assets/asterisk_normal0001.png', 'assets/small_triangle.png', 'assets/asterisk_circle0006.png', 'assets/small_rectangle.png');
  sunAnimation = loadAnimation('assets/sun1.png', 'assets/sun3.png');
  bubblyAnimation = loadAnimation('assets/bubbly0001.png', 'assets/bubbly0004.png');
  circleAnimation = loadAnimation('assets/asterisk_circle0006.png', 'assets/asterisk_circle0008.png');
}

function setup() {
  createCanvas(800, 400);

  skizo = createSprite(skizoAnimation, 150, 200);
  // slow down skizo animation
  skizo.animation.frameDelay = 8;

  sun = createSprite(sunAnimation, 400, 200);
  // The sun has semi transparent parts, we only want the center to be used for collisions
  // so we set a circular collider to it with a custom radius.
  // parameters are: "circle" collider type, offset x, offset y, radius
  sun.setCollider('circle', 0, 0, 60);

  bubbly = createSprite(bubblyAnimation, 650, 180);
  // The bulbbly sprite collider area should be just the square part, not the bubbles
  // parameters are: "rectangle" collider type, offset x, offset y, width, height
  bubbly.setCollider('rectangle', 0, 26, 75, 75);

  circle = createSprite(circleAnimation, 0, 0);
  circle.setCollider('circle', -2, 2, 55);

  // Show collider boxes on all sprites
  allSprites.debug = true;
}

function draw() {
  background(255, 255, 255);

  // follow the mouse
  circle.velocity.x = (mouseX-circle.x)/10;
  circle.velocity.y = (mouseY-circle.y)/10;

  circle.collide(skizo);
  circle.collide(sun);
  circle.collide(bubbly);

  drawSprites();
}
