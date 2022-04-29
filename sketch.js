//Ball Pit. Click on objects to drag them around. Press a key to generate more balls.
//by Chris Fair, September, 2020

/* global createCanvas, Boundary, background, Bucket,generateBalls, collidePointCircle, collideCircleCircle, mouseX, mouseY,ellipse, ball1, Matter, colorMode, Ball, random, CENTER, HSB, fill, rectMode, rect,
 */

// module aliases
let Engine = Matter.Engine,
  //Render = Matter.Render,
  World = Matter.World,
  Mouse = Matter.Mouse,
  MouseConstraint = Matter.MouseConstraint,
  Constraint = Matter.Constraint,
  Bodies = Matter.Bodies;

let engine;
let world;
let ball1;
let ground;
let leftWall;
let rightWall;
const WIDTH = 600;
const HEIGHT = 600;
const NUM_BALLS = 50;
let balls = [];
let newBall;
let boundaries = [];
let mConstraint;
let bucket = [];

function setup() {
  //using let canvas in order to access the mouse location for Mouse.create(canvas.elt)
  let canvas = createCanvas(WIDTH, HEIGHT);
  colorMode(HSB);
  engine = Engine.create();
  world = engine.world;

  Engine.run(engine);

  boundaries.push(new Boundary(WIDTH / 2, HEIGHT, WIDTH, 100));
  boundaries.push(new Boundary(0, HEIGHT / 2, 100, HEIGHT));
  boundaries.push(new Boundary(WIDTH, HEIGHT / 2, 100, HEIGHT));

  //World.add(world, [ground, leftWall, rightWall]);

  bucket.push(new Bucket(WIDTH - 150, HEIGHT - 150, 120, 20));
  bucket.push(new Bucket(WIDTH - 200, HEIGHT - 200, 20, 100));
  bucket.push(new Bucket(WIDTH - 100, HEIGHT - 200, 20, 100));
  //TODO: trying to make a bucket, still a work in progress
  //   let optionsConstraint1 = {
  //       bodyA:bucket[1].body,
  //       bodyB:bucket[2].body,
  //       length:100,
  //       damping:0.1,
  //       stiffness:1,
  //       pointA: {
  //         x:0,
  //         y:-50
  //       },
  //       pointB: {x:0,y:-50}
  //   }
  //   let constraint1 = Constraint.create(optionsConstraint1);

  //     let optionsConstraint2 = {
  //       bodyA:bucket[1].body,
  //       bodyB:bucket[2].body,
  //       length:100,
  //       damping:0.1,
  //       stiffness:1,
  //       pointA: {
  //         x:0,
  //         y:50
  //       },
  //       pointB: {x:0,y:50}
  //   }
  //   let constraint2 = Constraint.create(optionsConstraint2);

  //     let optionsConstraint3 = {
  //       bodyA:bucket[0].body,
  //       bodyB:bucket[1].body,
  //       length:1,
  //       damping:0.1,
  //       stiffness:1,
  //       pointA: {
  //         x:-50,
  //         y:0
  //       },
  //       pointB: {x:0,y:-50}
  //   }
  //   let constraint3 = Constraint.create(optionsConstraint3);
  //     let optionsConstraint4 = {
  //       bodyA:bucket[0].body,
  //       bodyB:bucket[2].body,
  //       length:10,
  //       damping:0.1,
  //       stiffness:1,
  //       pointA: {
  //         x:50,
  //         y:0
  //       },
  //       pointB: {x:0,y:-50}
  //   }
  //   let constraint4 = Constraint.create(optionsConstraint4);
  //   World.add(world, constraint1, constraint2, constraint3, constraint4);

  generateBalls();
  let mouse = Mouse.create(canvas.elt);
  let options = {
    //mouse: canvasmouse
  };
  mConstraint = MouseConstraint.create(engine, options);
  World.add(world, mConstraint);
}
function draw() {
  background(90);
  for (let i = 0; i < boundaries.length; i++) {
    boundaries[i].display();
  }
  for (let i = 0; i < bucket.length; i++) {
    bucket[i].display();
  }
  for (let i = 0; i < balls.length; i++) {
    balls[i].display();
  }
}
function keyPressed() {
  newBall = new Ball(random(0, WIDTH), 20, 20, random(0, 360));
  balls.push(newBall);
}
