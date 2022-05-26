//mouse events on sprites while using the camera
// rollover sprites to trigger mouse events

var s1;
var s2;

function setup() {
  createCanvas(800, 400);
  s1 = createSprite(200, 200, width/2, height/2);

  s1.onMouseOver = function() {
    this.rotation += 10;
  }

  s2 = createSprite(20, 20, 30, 30);

  s2.onMouseOver = function() {
    this.rotation += 10;
  }
}

function draw() {
  background('#FFFFFF');

  camera.position.x++;

  if (s1.mouseIsOver) {
    s1.shapeColor=color('#ff0000');
  } else {
    s1.shapeColor=color('#224477');
  }

  drawSprite(s1);

  if(s2.mouseIsOver) {
    s2.shapeColor=color('#ff0000');
  } else {
    s2.shapeColor=color('#224477');
  }

  // when camera is off, anything drawn will be drawn in the screen space (like a UI)
  camera.off();
  drawSprite(s2);
}
