/* global createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, collideRectCircle, text, 
          mouseX, mouseY, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, 
          keyCode, keyIsDown, level, invaderFleet,invBaseHealth, generateInvaders, Ship, Invader, textAlign, RIGHT, CENTER, LEFT, constrain, UP_ARROW, LEFT_ARROW, RIGHT_ARROW, DOWN_ARROW, textSize, map */

//used for determining the difficulty of the invaders/level

function levelSelect() {
  let invStartHealth2;
  if (invaderFleet.length <= 0) {
    level++;
    invStartHealth2 = invBaseHealth + 2;
    generateInvaders(invStartHealth2);
  }
}
