/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, keyIsDown, generateInvaders, levelSelect, Ship, Invader, textAlign, RIGHT, CENTER, LEFT, constrain, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, map */

// Space Invaders by Chris Fair
// September, 2020

//TODO: import graphic for playerShip, import graphics for invaders, look into adding sound effects, make it so ships fire back at hire levels and add powerups
//TOFIX:
const HEIGHT = 600;
const WIDTH = 600;
const RATE_OF_FIRE = 50;
const SCALAR = 50;
const ROWS = HEIGHT / SCALAR;
const COLS = WIDTH / SCALAR;
const NUM_INVADERS = 30;
const invBaseHealth = 3;
let laserV = 4;
let invaderFleet = [];
let playerShip;
let gameIsOver = false;
let playerScore = 0;
let highScore = 0;
let level = 1;

function setup() {
  colorMode(HSB);
  createCanvas(WIDTH, HEIGHT);
  playerShip = new Ship();
  generateInvaders(invBaseHealth);
}

function draw() {
  background(20);
  playerShip.display();
  playerShip.gameOver();
  if (gameIsOver === false) {
    playerShip.move();
    playerShip.attack();
    playerShip.life();
    for (let i = 0; i < invaderFleet.length; i++) {
      invaderFleet[i].move();
      invaderFleet[i].display();
      invaderFleet[i].life();
    }
  } else {
    fill(0, 80, 80);
    textSize(36);
    textAlign(CENTER, CENTER);
    text("Game Over", WIDTH / 2, HEIGHT / 2);
    textSize(16);
    text("Press enter to play again", WIDTH / 2, HEIGHT / 2 + 30);
  }
  levelSelect();
  displayScore();
}

function displayScore() {
  //display score at the top of the screen
  fill(40, 0.9);
  rect(0, 0, WIDTH, 50);
  fill(60, 80, 80);
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Score: " + playerScore, 10, 25);
  textAlign(RIGHT, CENTER);
  text("High Score: " + highScore, WIDTH - 50, 25);
}

function keyPressed() {
  if (keyCode === 13) {
    if ((gameIsOver = true)) {
      gameIsOver = false;
      playerScore = 0;
      playerShip.health = 3;
      level = 1;
      generateInvaders(invBaseHealth);
    }
  }
}
