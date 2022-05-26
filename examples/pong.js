// pong clone
// use mouse to control both paddles

var paddleA, paddleB, ball, wallTop, wallBottom;
var MAX_SPEED = 10;

function setup() {
  createCanvas(800, 400);
  //frameRate(6);

  paddleA = createSprite(10, 100, 30, height/2);
  paddleA.immovable = true;

  paddleB = createSprite(10, 100, width-28, height/2);
  paddleB.immovable = true;

  wallTop = createSprite(width, 30, width/2, -30/2);
  wallTop.immovable = true;

  wallBottom = createSprite(width, 30, width/2, height+30/2);
  wallBottom.immovable = true;

  ball = createSprite(10, 10, width/2, height/2);
  ball.maxSpeed = MAX_SPEED;

  paddleA.shapeColor = paddleB.shapeColor = ball.shapeColor = color(255, 255, 255);

  ball.setSpeed(MAX_SPEED, -180);
}

function draw() {
  background(0);

  paddleA.y = constrain(mouseY, paddleA.height/2, height-paddleA.height/2);
  paddleB.y = constrain(mouseY, paddleA.height/2, height-paddleA.height/2);

  ball.bounce(wallTop);
  ball.bounce(wallBottom);

  var swing;
  if (ball.bounce(paddleA)) {
    swing = (ball.y-paddleA.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
  }

  if (ball.bounce(paddleB)) {
    swing = (ball.y-paddleB.y)/3;
    ball.setSpeed(MAX_SPEED, ball.getDirection()-swing);
  }

  if (ball.x < 0) {
    ball.x = width/2;
    ball.y = height/2;
    ball.setSpeed(MAX_SPEED, 0);
  }

  if (ball.x > width) {
    ball.x = width/2;
    ball.y = height/2;
    ball.setSpeed(MAX_SPEED, 180);
  }

  drawSprites();
}
