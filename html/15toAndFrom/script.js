const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let checkpoint = true;

let point = new DPoint(new Vector2d(200,300), new Vector2d(0,0), new Vector2d(0,0),1, "purple", "Point");
let A = new Point(new Vector2d(200,300),20,"red","A",true);
let B = new Point(new Vector2d(500,400),20,"blue","B",true);
let grid = new Grid();

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  drawLineAB();
  A.draw(context);
  B.draw(context);
  point.draw(context);
  grid.draw(context);

  B.position.draw(context,new Vector2d(0,0),1,"purple");

  checkTarget();

  point.pos.draw(context,new Vector2d(0,0),1,"blue");
  point.vel.draw(context,point.pos,5,"red");
}

function drawLineAB(){
  context.beginPath();
  context.strokeStyle = "black";
  context.setLineDash([5,15]);
  context.moveTo(A.position.dx,A.position.dy);
  context.lineTo(B.position.dx,B.position.dy);
  context.closePath();
  context.stroke();
  context.setLineDash([0]);
}

function checkTarget() {
  if(point.vel.magnitude <= .5 && checkpoint)
    checkpoint = false;
  else if(point.vel.magnitude <= .5 && !checkpoint)
    checkpoint = true;

  if(checkpoint == true){
    point.vel.differencevector(B.position,point.pos);   
  }
  else{
    point.vel.differencevector(A.position,point.pos);   
  }
  point.vel.scalMul(0.05);
  point.update();
}

animate();
