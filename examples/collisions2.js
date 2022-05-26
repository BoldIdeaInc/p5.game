// Collisions
// Collision between groups
// function called upon collision

let asteriskAnimation;
let asteriskStretchAnimation;
let dotAnimation;
let boxAnimation;

let obstacles;
let collectibles;
let asterisk;

function preload() {
  asteriskAnimation = loadAnimation('assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  asteriskStretchAnimation = loadAnimation('assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  dotAnimation = loadAnimation('assets/small_circle0001.png', 'assets/small_circle0001.png');
  boxAnimation = loadAnimation('assets/box0001.png', 'assets/box0003.png');
}

function setup() {
  createCanvas(800, 400);

  // create a user controlled sprite
  asterisk = createSprite(asteriskAnimation, 400, 200);
  asterisk.addAnimation('stretch', asteriskStretchAnimation);

  //create 2 groups
  obstacles = new Group();
  collectibles = new Group();

  // create 4 boxes at random locations
  for (var i=0; i<4; i++) {
    var box = createSprite(boxAnimation, random(0, width), random(0, height));
    obstacles.add(box);
  }

  // create 10 dots at random locations
  for (var j=0; j<10; j++) {
    var dot = createSprite(dotAnimation, random(0, width), random(0, height));
    collectibles.add(dot);
  }
}



function draw() {
  background(255, 255, 255);

  // make the asterisk glide toward the mouse
  asterisk.velocity.x = (mouseX-asterisk.position.x)/10;
  asterisk.velocity.y = (mouseY-asterisk.position.y)/10;

  // Make asterisk collide against all the sprites in the group `obstacles`
  asterisk.collide(obstacles);

  // You can define a function to be called when sprites overlap, collide,
  // displace, or bounce (see collect() function below)
  asterisk.overlap(collectibles, collect);

  drawSprites();
}

// the first parameter will be the sprite calling the function
// the second parameter will be the sprite its colliding with
function collect(asterisk, collected) {
  // show the animation
  asterisk.changeAnimation('stretch');

  // when the stretch animation completes, call the `resetAsterisk` function
  // (see definition below)
  asterisk.animation.onComplete = resetAsterisk;

  // `collected` is the sprite the asterisk collided with
  collected.remove();
}

function resetAsterisk() {
  asterisk.changeAnimation('normal');
}
