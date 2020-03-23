const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let checkpoint = true;
let dPoints = [];
let allCheckpoints = [];
let pointTarget = 1;

let point = new DPoint(new Vector2d(600,150), new Vector2d(0,0), new Vector2d(0,0),1, "purple", "Point");
let point2 = new DPoint(new Vector2d(200,300), new Vector2d(0,0), new Vector2d(0,0),1, "blue", "Point2");
let A = new Point(new Vector2d(200,300),20,"red","A",true);
let B = new Point(new Vector2d(500,400),20,"blue","B",true);
let C = new Point(new Vector2d(100,200),20,"red","C",true);
let D = new Point(new Vector2d(600,150),20,"blue","D",true);
let grid = new Grid();

dPoints.push(point,point2);
allCheckpoints.push(A,B,C,D);

function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  grid.draw(context);
  allCheckpoints.forEach(Element => Element.draw(context));
  dPoints.forEach(p => p.draw(context));
  dPoints.forEach(p => p.pos.draw(context,new Vector2d(0,0),1,"blue"));
  dPoints.forEach(p => p.vel.draw(context, p.pos,5,"red"));
  dPoints.forEach(element => {
    allCheckpoints[element.wayPointTarget].position.draw(context,new Vector2d(0,0),1,"purple");
  });
  drawLine();
  checkTarget();
}

function drawLine(){
  context.beginPath();
  context.strokeStyle = "black";
  context.setLineDash([5,15]);
  for (let i = 0; i < allCheckpoints.length; i++) {
    if(i+1 <= allCheckpoints.length-1){
      context.moveTo(allCheckpoints[i].position.dx,allCheckpoints[i].position.dy);
      context.lineTo(allCheckpoints[i+1].position.dx,allCheckpoints[i+1].position.dy);  
    }
    else{
      context.moveTo(allCheckpoints[allCheckpoints.length-1].position.dx,allCheckpoints[allCheckpoints.length-1].position.dy);
      context.lineTo(allCheckpoints[0].position.dx,allCheckpoints[0].position.dy);  
    }
    
  }
  context.closePath();
  context.stroke();
  context.setLineDash([0]);
}

function checkTarget() {
  for (let i = 0; i < dPoints.length; i++) {

    if(checkpoint == true && dPoints[i].wayPointTarget < allCheckpoints.length){
      dPoints[i].vel.differencevector(allCheckpoints[dPoints[i].wayPointTarget].position,dPoints[i].pos);  
    }

    if(dPoints[i].vel.magnitude < 1)
    {
      dPoints[i].wayPointTarget++;
      pointTarget++
      if(dPoints[i].wayPointTarget >= allCheckpoints.length)
        dPoints[i].wayPointTarget = 0; wayPointTarget = 0;
    }
    dPoints[i].vel.scalMul(0.05);
    dPoints[i].update();
  }
}

animate();
