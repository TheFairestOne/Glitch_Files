/* global createCanvas, rectMode, CENTER, Bodies, NUM_BALLS, rect, newBall, random, balls, WIDTH,rotate, fill, pop, World,world, push, translate,background, ellipse,
 */

class Boundary {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    let options = { isStatic: true };
    this.body = Bodies.rectangle(x, y, w, h, options);

    World.add(world, this.body);
  }

  display() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(0);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
