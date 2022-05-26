// breakout clone (core mechanics)
//
// Use mouse to control the paddle, click to start

var paddle, ball, wallTop, wallBottom, wallLeft, wallRight;
var bricks;
var MAX_SPEED = 9;
var WALL_THICKNESS = 30;
var BRICK_W = 40;
var BRICK_H = 20;
var BRICK_MARGIN = 4;
var ROWS = 9;
var COLUMNS = 16;

function setup() {
  createCanvas(800, 600);

  paddle = createSprite(100, 10, width/2, height-50);
  paddle.immovable = true;

  wallTop = createSprite(width+WALL_THICKNESS*2, WALL_THICKNESS, width/2, -WALL_THICKNESS/2);
  wallTop.immovable = true;

  wallBottom = createSprite(width+WALL_THICKNESS*2, WALL_THICKNESS, width/2, height+WALL_THICKNESS/2);
  wallBottom.immovable = true;

  wallLeft = createSprite(WALL_THICKNESS, height, -WALL_THICKNESS/2, height/2);
  wallLeft.immovable = true;

  wallRight = createSprite(WALL_THICKNESS, height, width+WALL_THICKNESS/2, height/2);
  wallRight.immovable = true;

  bricks = new Group();

  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 80;

  for (var r = 0; r<ROWS; r++) {
    for (var c = 0; c<COLUMNS; c++) {
      var brick = createSprite(BRICK_W, BRICK_H, offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN));
      brick.shapeColor = color(255, 255, 255);
      bricks.add(brick);
      brick.immovable = true;
    }
  }

  // the easiest way to avoid pesky multiple collision is to
  // have the ball bigger than the bricks
  ball = createSprite(11, 11, width/2, height-200);
  ball.maxSpeed = MAX_SPEED;
  paddle.shapeColor = ball.shapeColor = color(255, 255, 255);
}

function draw() {
  background(247, 134, 131);

  paddle.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);

  ball.bounce(wallTop);
  ball.bounce(wallBottom);
  ball.bounce(wallLeft);
  ball.bounce(wallRight);

  if (ball.bounce(paddle)) {
    var swing = (ball.x - paddle.x) / 3;
    ball.setVelocity(MAX_SPEED, ball.getDirection() + swing);
  }

  ball.bounce(bricks, brickHit);

  drawSprites();
}

function mousePressed() {
  if (ball.velocity.x == 0 && ball.velocity.y == 0) {
    ball.setVelocity(MAX_SPEED, random(90-10, 90+10));
  }
}

function brickHit(ball, brick) {
  brick.remove();
}
