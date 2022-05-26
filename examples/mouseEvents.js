// Mouse states and mouse events on sprites
//
// click and hold the mouse button while hovering on the sprites

let asterisk;
let asteriskAnimation;
let asteriskStretchAnimation;
let asteriskCircleAnimation;

let ghost;
let ghostAnimation;

let draggedSprite;

function preload() {
  ghostAnimation = loadAnimation('assets/ghost_spin0001.png', 'assets/ghost_spin0003.png');
  asteriskAnimation = loadAnimation('assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  asteriskStretchAnimation = loadAnimation('assets/asterisk_stretching0001.png', 'assets/asterisk_stretching0008.png');
  asteriskCircleAnimation = loadAnimation('assets/asterisk_circle0001.png', 'assets/asterisk_circle0008.png');
}

function setup() {
  createCanvas(800, 400);

  ghost = createSprite(ghostAnimation, 200, 200);

  // Set `mouseActive` to `true` to detect the mouse position and clicks on this
  // sprite. The collider will be used to detect the mouse
  ghost.mouseActive = true;

  asterisk = createSprite(asteriskAnimation, 600, 200);
  asterisk.addAnimation('stretch', asteriskStretchAnimation);
  asterisk.addAnimation('transform', asteriskCircleAnimation);

  // set the collider will be used for mouse events
  asterisk.setCollider('circle', 0, 0, 64);

  // You can assign functions to be called upon specific mouse events. Within
  // the function, `this` will reference the sprite that triggered the event
  asterisk.onMouseOver = function() {
    this.changeAnimation('stretch');
  };

  asterisk.onMouseOut = function() {
    this.changeAnimation('normal');
  };

  asterisk.onMousePressed = function() {
    this.changeAnimation('transform');
    this.animation.goToFrame(this.animation.getLastFrame());
    if (draggedSprite == null) {
      draggedSprite = this;
    }
  };

  asterisk.onMouseReleased = function() {
    this.changeAnimation('transform');
    this.animation.goToFrame(0);
    if (draggedSprite == this) {
      draggedSprite = null;
    }
  };

}

function draw() {
  background(255, 255, 255);

  if (draggedSprite != null) {
    draggedSprite.position.x = mouseX;
    draggedSprite.position.y = mouseY;
  }

  // if a sprite is mouseActive true I can check if the mouse is over its
  // collider and if the button is pressed
  if (ghost.mouseIsOver) {
    ghost.rotation-= 10;
  }

  ghost.visible = !ghost.mouseIsPressed;

  drawSprites();
}
