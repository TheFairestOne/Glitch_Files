/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, keyIsDown, laserV, collideLineCircle, RATE_OF_FIRE, textStyle, textAlign, CENTER, BOLD, invaderFleet, playerShip, WIDTH, HEIGHT, constrain, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, map */

class Ship {
  constructor() {
    this.width = 50;
    this.x = WIDTH / 2 - this.width / 2;
    this.y = HEIGHT - 40;
    this.height = 25;
    this.lasersFired = [];
    this.health = 3;
    this.laserV = laserV;
  }

  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    this.x = constrain(this.x, 0, WIDTH - this.width);

    for (let i = 0; i < this.lasersFired.length; i++) {
      this.lasersFired[i].y -= this.laserV;
      if (this.lasersFired[i].y < 0) {
        this.lasersFired.splice(i, 1);
      }
    }
  }
  attack() {
    //pressing or holding down the space bar fires lasers
    let keyInput = 0;
    if (keyIsDown(32)) {
      this.lasersFired.push({ x: this.x + this.width / 2, y: this.y });
      //console.log ("fired");
    }
    //console.log(this.lasersFired.length);
    //reducing the lasers fired so its not just a constant line of red circles overlapping.
    for (let i = 1; i < this.lasersFired.length; i++) {
      if (this.lasersFired[i].y - this.lasersFired[i - 1].y < RATE_OF_FIRE) {
        this.lasersFired.splice(i, 1);
        //console.log(this.lasersFired.length);
      }
    }
  }
  life() {
    //if invaders collide with ship, reduce ship health by 1
    for (let i = 0; i < invaderFleet.length; i++) {
      if (
        collideRectCircle(
          this.x,
          this.y,
          this.width,
          this.height,
          invaderFleet[i].x,
          invaderFleet[i].y,
          invaderFleet[i].width
        ) ||
        collideLineCircle(
          0,
          HEIGHT,
          WIDTH,
          HEIGHT,
          invaderFleet[i].x,
          invaderFleet[i].y,
          invaderFleet[i].width
        )
      ) {
        this.health--;
        //below is for removing invaders after impact with ship
        invaderFleet.splice(i, 1);
      }
    }
  }
  display() {
    fill(200, 80, 80);
    rect(this.x, this.y, this.width, this.height);
    fill(255);
    textSize(10);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Ship Health:" + this.health, this.x, this.y, this.width, this.height);
    for (let i = 0; i < this.lasersFired.length; i++) {
      fill(0, 80, 80);
      ellipse(this.lasersFired[i].x, this.lasersFired[i].y, 10);
    }
  }
  gameOver() {
    if (this.health <= 0) {
      gameIsOver = true;
      if (playerScore > highScore) {
        highScore = playerScore;
      }
    }
  }
}

// function keyPressed (){

//   if (keyCode === 32){
//     playerShip.attack();
//   }
// }
