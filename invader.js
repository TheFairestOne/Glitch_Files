/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, keyIsDown, COLS, ROWS, NUM_INVADERS, abs, level, round, invStartHealth, SCALAR, playerScore, invaderFleet, playerShip, RATE_OF_FIRE, WIDTH, HEIGHT, constrain, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, map */

let invBaseSpeed = 2;
const HEALTH_COLOR = 120;

class Invader {
  constructor(x, y, startHealth, xspeed, yspeed) {
    this.x = x;
    this.y = y;
    this.yspeed = yspeed;
    this.xspeed = xspeed;
    this.width = SCALAR;
    this.height = SCALAR;
    this.health = startHealth;
    this.startHealth = startHealth;
    //this.invaderFleet = [];
    this.hue = HEALTH_COLOR;
  }

  life() {
    //console.log("health =" + this.health);
    //for checking collisions between players lasers and invaders
    for (let i = 0; i < playerShip.lasersFired.length; i++) {
      if (
        collideCircleCircle(
          playerShip.lasersFired[i].x,
          playerShip.lasersFired[i].y,
          10,
          this.x,
          this.y,
          this.width
        )
      ) {
        this.health--;
        this.hue = ((this.health - 1) / this.startHealth) * HEALTH_COLOR;
        //below is for removing lasers after impact
        playerShip.lasersFired.splice(i, 1);

        for (let i = 0; i < invaderFleet.length; i++) {
          if (invaderFleet[i].health <= 0) {
            invaderFleet.splice(i, 1);
            playerScore++;
          }
        }
      }
    }
    //  }
  }

  move() {
    //this needs to be fixed/made less complicated.
    if (level >= 3) {
      if (this.x > WIDTH / 2) {
        if (this.x >= WIDTH - this.width / 2) {
          this.xspeed = -invBaseSpeed;
          //this.y += this.height;
        } else if (this.x <= WIDTH / 2 + this.width / 2) {
          this.xspeed = invBaseSpeed;
          //this.y += this.height;
        }
      } else {
        if (this.x >= WIDTH / 2 - this.width / 2) {
          this.xspeed = -invBaseSpeed;
          //this.y += this.height;
        } else if (this.x <= this.width / 2) {
          this.xspeed = invBaseSpeed;
          //this.xspeed = abs(this.xspeed);
          //this.y += this.height;
        }
      }
    } else {
      if (abs(this.xspeed) > 0) {
        if (this.x > WIDTH - this.width / 2) {
          this.xspeed = -this.xspeed;
          //this.xspeed = -invBaseSpeed;
          //this.y += this.yspeed;
          this.y += this.height;
        } else if (this.x < this.width / 2) {
          this.xspeed = abs(this.xspeed);
          //this.xspeed = invBaseSpeed;
          //this.y += this.yspeed;
          this.y += this.height;
        }
      }
    }
    //console.log(invaderFleet.xspeed);
    //console.log("x speed = "+ invaderFleet[2].xspeed)
    //console.log("x speed : "+invaderFleet[3].xspeed)
    this.x += this.xspeed;
    this.y += this.yspeed;
  }
  display() {
    // for (let i = 0; i < this.invaderFleet.length; i++){
    //   ellipse (this.invaderFleet[i].x, this.invaderFleet[i].y, this.width, this.height);
    // }
    fill(this.hue, 80, 80);
    ellipse(this.x, this.y, this.width, this.height);
    // for (let i = 0; i < this.invaderFleet.length; i++){
    //   ellipse (this.invaderFleet[i].x, this.invaderFleet[i].y, this.width, this.height);
    // }
    // this.invaderFleet.push({x:this.x +this.width,y:this.y - this.height});
  }
}

//update this to pass in the start health via the function arguments/parameters
function generateInvaders(health) {
  let invStartHealth = health;
  if (level >= 3) {
    let xpos = round(random(0, WIDTH / SCALAR - 1) * SCALAR);
    let xposArr = [];
    let yposArr = [];
    for (let i = 0; i < COLS; i++) {
      xposArr[i] = i * SCALAR + SCALAR / 2;
      //console.log("xposArr = "+xposArr[i])
    }
    for (let i = 0; i < ROWS; i++) {
      yposArr[i] = i * SCALAR;
      //console.log("yposArr = "+yposArr[i])
    }
    for (let i = 0; i < NUM_INVADERS / 3; i++) {
      let xpos = random(xposArr);
      let ypos = random(yposArr);
      for (let i = 0; i < yposArr.length; i++) {
        if (yposArr[i] == ypos) {
          yposArr.splice(i, 1);
        }
      }
      ypos = 100 - ypos;
      invaderFleet[i] = new Invader(
        xpos,
        ypos,
        invStartHealth,
        invBaseSpeed,
        0
      );
      // console.log("x position = " + invaderFleet[i].x);
      // console.log("x speed = " + invaderFleet[i].xspeed);
    }
  }
  if (level >= 2) {
    let xpos = round(random(0, WIDTH / SCALAR - 1) * SCALAR);
    let xposArr = [];
    let yposArr = [];
    for (let i = 0; i < COLS; i++) {
      xposArr[i] = i * SCALAR + SCALAR / 2;
      //console.log("xposArr = "+xposArr[i])
    }
    for (let i = 0; i < ROWS; i++) {
      yposArr[i] = i * SCALAR;
      //console.log("yposArr = "+yposArr[i])
    }
    for (let i = 0; i < NUM_INVADERS / 3; i++) {
      let xpos = random(xposArr);
      let ypos = 100 - random(yposArr);
      invaderFleet[i] = new Invader(
        xpos,
        ypos,
        invStartHealth,
        0,
        0.2 * invBaseSpeed
      );
    }
  }
  if (level <= 1) {
    for (let j = 0; j < NUM_INVADERS / 10; j++) {
      for (let i = 0; i < 10; i++) {
        let x = j * 10 + i;
        invaderFleet[x] = new Invader(
          WIDTH - 100 - i * SCALAR,
          100 - j * 2 * SCALAR,
          invStartHealth,
          invBaseSpeed,
          0
        );
      }
    }
  }
}
