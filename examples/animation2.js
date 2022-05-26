// Controlling animations
// click, press and hold to see different behaviors
let circle, explode, sleep, glitch;

function preload() {
  sleep = loadAnimation('assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  explode = loadAnimation('assets/asterisk_explode0001.png', 'assets/asterisk_explode0011.png');
  glitch = loadAnimation('assets/asterisk.png', 'assets/triangle.png', 'assets/square.png', 'assets/cloud.png', 'assets/star.png', 'assets/mess.png', 'assets/monster.png');
  circle = loadAnimation('assets/asterisk_circle0000.png', 'assets/asterisk_circle0008.png');
}

function setup() {
  createCanvas(800, 300);

  // by default animations loop, but you can disable it by setting `looping` to `false`.
  circle.looping = false;

  // animations play by default, but you can make it stopped
  glitch.stop();
}

function draw() {
  background(255, 255, 255);

  // playing an pausing an animation
  if (mouseIsPressed) {
    sleep.play();
  } else {
    sleep.stop();
  }

  // if we're on the last frame, go to frame 7 instead if the first frame
  // Here we check if the animation has finished by seeing if the current frame is the last frame
  if (explode.getFrame() === explode.getLastFrame()) {
    explode.changeFrame(7);
  }

  // playing backward or forward toward a specific frame
  // returns to the initial frame if click and hold
  if (mouseIsPressed) {
    circle.goToFrame(0);
  } else {
    circle.goToFrame(circle.getLastFrame());
  }

  animation(sleep, 100, 150);
  animation(explode, 300, 150);
  animation(glitch, 500, 150);
  animation(circle, 700, 150);

}

function mousePressed() {
  // rewind on mouse pressed - change frame to 0
  explode.rewind();

  // move ahead one frame
  glitch.nextFrame();

  // you can also use `previousFrame()` to back one frame
  //glitch.previousFrame();
}
