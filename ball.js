/* global createCanvas, Bodies, NUM_BALLS, newBall, HEIGHT, random, balls, WIDTH,rotate, fill, pop, World,world, push, translate,background, ellipse,
 */
class Ball {
  constructor(x, y, r, c) {
    this.body = Bodies.circle(x, y, r);
    this.radius = r;
    this.diameter = 2 * r;
    this.hue = c;
    this.body.friction = 0;
    this.body.restitution = 0.9;

    World.add(world, this.body);
  }
  display() {
    let pos = this.body.position;
    let angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill(this.hue, 75, 75);
    ellipse(0, 0, this.diameter);
    pop();
  }
}

function generateBalls() {
  for (let i = 0; i < NUM_BALLS; i++) {
    newBall = new Ball(
      random(0, WIDTH),
      random(0, HEIGHT - 200),
      20,
      random(0, 360)
    );
    balls.push(newBall);
  }
}
