// Sprite Groups
// different groups are drawn in a diffent order and accessed as arrays

let asteriskAnimation;
let cloudAnimation;
let ghostAnimation;
let clouds;
let ghosts;
let asterisk;

function preload() {
  asteriskAnimation = loadAnimation('assets/asterisk_normal0001.png', 'assets/asterisk_normal0003.png');
  ghostAnimation = loadAnimation('assets/ghost_standing0001.png', 'assets/ghost_standing0007.png');
  cloudAnimation = loadAnimation('assets/cloud_pulsing0001.png', 'assets/cloud_pulsing0007.png');
}

function setup() {
  createCanvas(800, 400);

  // in games you often have many sprites having similar properties behaviors
  // (e.g. pills and ghosts in pacMan)
  // You can use groups to organize and access them without having many global
  // variables. A sprite can belong to multiple groups.

  // create empty groups
  ghosts = new Group();
  clouds = new Group();

  asterisk = createSprite(asteriskAnimation, random(0, width), random(0, height));

  // assign new sprites to the respective groups
  for (let i = 0; i<6; i++) {
    let newGhost = createSprite(ghostAnimation, random(0, width), random(0, height));
    ghosts.add(newGhost);
  }

  for (let j = 0; j<6; j++) {
    let newCloud = createSprite(cloudAnimation, random(0, width), random(0, height));
    // set a rotation speed
    newCloud.rotationSpeed = -2;
    // another way to add a sprite to a group
    newCloud.addToGroup(clouds);
  }
}

function draw() {
  background(255, 255, 255);

  // a group can be accessed like an array
  // the removed objects will be automatically removed from the groups as well
  for (let i=0; i<ghosts.length; i++) {
    let ghost = ghosts[i];

    // moving all the ghosts y following a sin function (sinusoid)
    ghost.y += sin(frameCount/10);
  }

  asterisk.x = mouseX;
  asterisk.y = mouseY;

  // instead of drawing all sprites with drawSprites();
  // you can draw them selectively by group or single instance
  // in the order you want

  // e.g. even if the clouds should appear on the top of the ghosts
  // I impose a rendering before the others sprites
  drawSprites(clouds);
  drawSprites(ghosts);
  drawSprite(asterisk);
}
