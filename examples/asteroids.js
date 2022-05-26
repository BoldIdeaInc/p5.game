// asteroid clone (core mechanics only)
//
// arrow keys to move + x to shoot

var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage, shipThrust, asteroidImages;
var MARGIN = 40;

function preload() {
  bulletImage = loadImage('assets/asteroids_bullet.png');
  shipImage = loadImage('assets/asteroids_ship0001.png');
  particleImage = loadImage('assets/asteroids_particle.png');
  shipThrust = loadAnimation('assets/asteroids_ship0002.png', 'assets/asteroids_ship0007.png');
  asteroidImages = [
    loadImage('assets/asteroid0.png'),
    loadImage('assets/asteroid1.png'),
    loadImage('assets/asteroid2.png'),
  ];
}

function setup() {
  createCanvas(800, 600);

  ship = createSprite(shipImage, width/2, height/2);
  ship.addAnimation('thrust', shipThrust);
  ship.setCollider('circle', 0, 0, 20);
  ship.maxSpeed = 6;
  ship.friction = 0.02;

  asteroids = new Group();
  bullets = new Group();

  for (var i = 0; i<8; i++) {
    var angle = random(360);
    var px = width/2 + 1000 * cos(radians(angle));
    var py = height/2 + 1000 * sin(radians(angle));
    createAsteroid(3, px, py);
  }
}

function draw() {
  background(0);

  fill(255);
  textAlign(CENTER);
  text('Controls: Arrow Keys + X', width/2, 20);

  for (var i=0; i<allSprites.length; i++) {
    var s = allSprites[i];
    if (s.x<-MARGIN) {
      s.x = width+MARGIN;
    }
    if (s.x>width+MARGIN) {
      s.x = -MARGIN;
    }
    if (s.y<-MARGIN) {
      s.y = height+MARGIN;
    }
    if (s.y>height+MARGIN) {
      s.y = -MARGIN;
    }
  }

  asteroids.overlap(bullets, asteroidHit);

  ship.bounce(asteroids);

  if (keyDown(LEFT_ARROW)) {
    ship.rotation -= 4;
  }
  if (keyDown(RIGHT_ARROW)) {
    ship.rotation += 4;
  }
  if (keyDown(UP_ARROW)) {
    ship.addVelocity(0.2, ship.rotation);
    ship.changeAnimation('thrust');
  } else {
    ship.changeAnimation('normal');
  }

  if (keyWentDown('x')) {
    var bullet = createSprite(bulletImage, ship.x, ship.y);
    bullet.setVelocity(10+ship.getSpeed(), ship.rotation);
    bullet.life = 30;
    bullets.add(bullet);
  }

  drawSprites();
}

function createAsteroid(type, x, y) {
  img = random(asteroidImages);
  var a = createSprite(img, x, y);
  a.setVelocity(2.5-(type/2), random(360));
  a.rotationSpeed = 0.5;

  // a.debug = true;
  a.type = type;

  if (type == 2) {
    a.scale = 0.6;
  }
  if (type == 1) {
    a.scale = 0.3;
  }

  a.mass = 2 + a.scale;
  a.setCollider('circle', 0, 0, 50);
  asteroids.add(a);
  return a;
}

function asteroidHit(asteroid, bullet) {
  var newType = asteroid.type-1;

  if (newType > 0) {
    createAsteroid(newType, asteroid.x, asteroid.y);
    createAsteroid(newType, asteroid.x, asteroid.y);
  }

  for (var i=0; i<10; i++) {
    var p = createSprite(bulletImage, bullet.x, bullet.y);
    p.addImage(particleImage);
    p.setVelocity(random(3, 5), random(360));
    p.friction = 0.05;
    p.life = 15;
  }

  bullet.remove();
  asteroid.remove();
}
