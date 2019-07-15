
const points =[];
const hull =[]; 

let leftMost;
let currentVertex;
let index = 0;
let nextIndex = -1;
let nextVertex;
let limit = parseInt(prompt('How many points do you want on the screen?(Recommended:100)','100'));

function setup() {
  createCanvas(500, 500);
  let buffer = 20;
  for (let i = 0; i < limit; i++) {
    points.push(createVector(random(buffer, width - buffer), random(buffer, height - buffer)));
  }
  points.sort((a, b) => a.x - b.x);//returns a positive number anytime a is to the right of b and a negative number anythime a is to the left of b
  leftMost = points[0];
  currentVertex = leftMost;
  hull.push(currentVertex);
  nextVertex = points[1];
  index = 2;
}

function draw() {
  background(0);
  
  stroke(255);
  strokeWeight(8);
  for (let p of points) {
    point(p.x, p.y);
  }
  
  
  stroke(85, 0, 255);
  fill(100, 50, 255, 50);
  beginShape();
  for (let p of hull) {
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
  
  stroke(0, 255, 0);
  strokeWeight(32);
  point(leftMost.x, leftMost.y);
  
  stroke(200, 0, 255);
  strokeWeight(32);
  point(currentVertex.x, currentVertex.y);

  
  stroke(0, 255, 0);
  strokeWeight(2);
  line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);
  
  let checking = points[index];
  stroke(255);
  line(currentVertex.x, currentVertex.y, checking.x, checking.y);
  
  const a = p5.Vector.sub(nextVertex, currentVertex);
  const b = p5.Vector.sub(checking, currentVertex);
  const cross = a.cross(b);//no need for maths here,we have p5 wich is awesome
  
  if (cross.z < 0) {
    nextVertex = checking;
    nextIndex = index;
  }
  
  index = index + 1;
  
  if (index == points.length){
    if (nextVertex == leftMost) {
      console.log('done');
      noLoop();
    } else{
      
    hull.push(nextVertex);
    currentVertex = nextVertex;
    index = 0;
    //points.splice(nextIndex,1)
    nextVertex = leftMost;//reseting the nextVertex so the simulation doesn't get stuck
      
    // noLoop();
  }
  }
}