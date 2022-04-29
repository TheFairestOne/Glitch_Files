// Be sure to name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, map */

// Purple Rain Project

let drops = [];

function setup() {
  createCanvas(600, 500);
  //background (230, 230, 250);
  let rainBaseV = 2;
  //drops = new Rain();
  for (let i = 0; i < 600; i++) {
    drops[i] = new Rain();
  }
}

function draw() {
  background(230, 230, 250);
  for (let i = 0; i < drops.length; i++) {
    drops[i].fall();
    drops[i].show();
  }
}

class Rain {
  constructor() {
    this.x = random(width);
    this.y = random(-500, -50);
    //this z value is implemented to create an artificial parallax effect
    this.z = random(0, 20);
    this.l = map(this.z, 0, 20, 10, 20);
    this.t = map(this.z, 0, 20, 1, 3);
    //starting speed slightly faster than the speed when the raindrops reset since the drawing starts blank
    this.V = map(this.z, 0, 20, 5, 18);
  }

  fall() {
    if (this.y > 0) {
      //including analog for gravity
      this.y += this.V + this.y * 0.01;
    } else {
      this.y += this.V;
    }
    if (this.y > height) {
      this.y = random(-300, 0);
      this.V = map(this.z, 0, 20, 5, 10);
    }
  }
  show() {
    stroke(138, 43, 226);
    strokeWeight(this.t);
    line(this.x, this.y, this.x, this.y + this.l);
    //line (this.x, this.y, this.x, this.y + random (10, 30))
  }
}
