//flappy bird-like
//mouse click or x to flap

var GRAVITY = 0.3;
var FLAP = -7;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var bird, ground;
var pipes;
var gameOver;
var birdImg, pipeImg, groundImg, bgImg;


function preload() {
  birdImg = loadImage('assets/flappy_bird.png');
  pipeImg = loadImage('assets/flappy_pipe.png');
  groundImg = loadImage('assets/flappy_ground.png');
  bgImg = loadImage('assets/flappy_bg.png');
}

function setup() {
  createCanvas(400, 600);

  bird = createSprite(birdImg, width/2, height/2);
  bird.rotateToDirection = true;
  bird.velocity.x = 4;
  bird.setCollider('circle', 0, 0, 20);

  ground = createSprite(groundImg, 800/2, GROUND_Y+100); //image 800x200

  pipes = new Group();
  gameOver = true;
  updateSprites(false);

  camera.position.y = height/2;
}

function draw() {

  if (gameOver && keyWentDown('x')) {
    newGame();
  }

  if (!gameOver) {
    if (keyWentDown('x')) {
      bird.velocity.y = FLAP;
    }

    bird.velocity.y += GRAVITY;

    if (bird.y<0) {
      bird.y = 0;
    }

    if (bird.y+bird.height/2 > GROUND_Y) {
      die();
    }

    if (bird.overlap(pipes)) {
      die();
    }

    // spawn pipes
    if (frameCount % 60 === 0) {
      var pipeH = random(50, 300);
      var pipe = createSprite(80, pipeH, bird.x + width, GROUND_Y-pipeH/2+1+100);
      pipe.addImage(pipeImg);
      pipes.add(pipe);

      //top pipe
      if(pipeH<200) {
        pipeH = height - (height-GROUND_Y)-(pipeH+MIN_OPENING);
        pipe = createSprite(80, pipeH, bird.x + width, pipeH/2-100);
        pipe.addImage(pipeImg);
        pipe.mirrorY(-1);
        pipes.add(pipe);
      }
    }

    //get rid of passed pipes
    for (var i = 0; i<pipes.length; i++) {
      if (pipes[i].x < bird.x-width/2) {
        pipes[i].remove();
      }
    }
  }

  camera.position.x = bird.x + width/4;

  //wrap ground
  if (camera.position.x > ground.x-ground.width+width/2) {
    ground.x += ground.width;
  }

  background(247, 134, 131);
  camera.off();
  image(bgImg, 0, GROUND_Y-190);
  camera.on();

  drawSprites(pipes);
  drawSprite(ground);
  drawSprite(bird);
}

function die() {
  updateSprites(false);
  gameOver = true;
}

function newGame() {
  pipes.removeSprites();
  gameOver = false;
  updateSprites(true);
  bird.x = width/2;
  bird.y = height/2;
  bird.velocity.y = 0;
  ground.x = 800/2;
  ground.y = GROUND_Y+100;
}

function mousePressed() {
  if(gameOver) {
    newGame();
  }
  bird.velocity.y = FLAP;
}
