const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let checkpoint = true;
let allCheckpoints = [];
let pointTarget = 1;

let point = new DPoint(new Vector2d(200,300), new Vector2d(0,0), new Vector2d(0,0),1, "purple", "Point");
let A = new Point(new Vector2d(200,300),20,"red","A",true);
let B = new Point(new Vector2d(500,400),20,"blue","B",true);
let C = new Point(new Vector2d(100,200),20,"red","C",true);
let D = new Point(new Vector2d(600,150),20,"blue","D",true);
let grid = new Grid();

allCheckpoints.push(A,B,C,D);

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  drawLine();
  allCheckpoints.forEach(Element => Element.draw(context));
  point.draw(context);
  grid.draw(context);

  allCheckpoints[pointTarget].position.draw(context,new Vector2d(0,0),1,"purple");

  checkTarget();

  point.pos.draw(context,new Vector2d(0,0),1,"blue");
  point.vel.draw(context,point.pos,5,"red");
}

function drawLine(){
  context.beginPath();
  context.strokeStyle = "black";
  context.setLineDash([5,15]);
  for (let i = 0; i < allCheckpoints.length; i++) {
    try{
      context.moveTo(allCheckpoints[i].position.dx,allCheckpoints[i].position.dy);
      context.lineTo(allCheckpoints[i+1].position.dx,allCheckpoints[i+1].position.dy);  
    }
    catch{
      context.moveTo(allCheckpoints[allCheckpoints.length-1].position.dx,allCheckpoints[allCheckpoints.length-1].position.dy);
      context.lineTo(allCheckpoints[0].position.dx,allCheckpoints[0].position.dy);  
    }
    
  }
  context.closePath();
  context.stroke();
  context.setLineDash([0]);
}

function checkTarget() {
  if(checkpoint == true && pointTarget < allCheckpoints.length){
    point.vel.differencevector(allCheckpoints[pointTarget].position,point.pos);  
  }

  if(point.vel.magnitude < 1)
  {
    pointTarget++;
    if(pointTarget >= allCheckpoints.length)
      pointTarget = 0;
  }
  point.vel.scalMul(0.05);
  point.update();
}

animate();
