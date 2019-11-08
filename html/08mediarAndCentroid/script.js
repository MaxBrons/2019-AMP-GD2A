const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let grid = new Grid();

let A = new Point(new Vector2d(600,200),15,"red","A",true);
let B = new Point(new Vector2d(300,600),15,"red","B",true);
let C = new Point(new Vector2d(900,600),15,"red","C",true);

let mAB = new Point(new Vector2d(600,200),10,"yellow","A",false);
let mBC = new Point(new Vector2d(300,600),10,"yellow","B",false);
let mCA = new Point(new Vector2d(900,600),10,"yellow","C",false);

let bPoint = new Point(new Vector2d(100,100),20,"blue","111",false);

let S = new Point(new Vector2d(0,0),10,"white","S",false);
let l = new LinearFunction(1,1);
let m = new LinearFunction(1,1);
let n = new LinearFunction(1,1);

let mABC = new LinearFunction(1,1);
let mBCA = new LinearFunction(1,1);
let mCAB = new LinearFunction(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  grid.draw(context);

  l.defineLineWithTwoPoint(A,B);
  m.defineLineWithTwoPoint(B,C);
  n.defineLineWithTwoPoint(C,A);

  mBCA.slope = -1/l.slope;
  mBCA.intercept = mAB.position.dy -mBCA.slope*mAB.position.dx;
  mCAB.slope = -1/n.slope;
  mCAB.intercept = mBC.position.dy -mCAB.slope*mBC.position.dx;
  mABC.slope = -1/m.slope;
  mABC.intercept = mCA.position.dy -mABC.slope*mCA.position.dx;

  mAB.position.dx = (A.position.dx + B.position.dx)/2;
  mAB.position.dy = (A.position.dy + B.position.dy)/2;
  mBC.position.dx = (B.position.dx + C.position.dx)/2;
  mBC.position.dy = (B.position.dy + C.position.dy)/2;
  mCA.position.dx = (C.position.dx + A.position.dx)/2;
  mCA.position.dy = (C.position.dy + A.position.dy)/2;

  S.position.dx = mABC.intersection(mBCA).x;
  S.position.dy = mABC.intersection(mBCA).y;

  bPoint.position.dx = mABC.intersection(mBCA).x;
  bPoint.position.dy = mABC.intersection(mBCA).y;

  bPoint.drawEmpty(context);

  l.draw(context);
  m.draw(context);
  n.draw(context);

  mABC.draw(context);
  mBCA.draw(context);
  mCAB.draw(context);

  C.draw(context);
  A.draw(context);
  B.draw(context);

  mAB.draw(context);
  mBC.draw(context);
  mCA.draw(context);

  let dx = bPoint.position.dx - A.position.dx;
  let dy = bPoint.position.dy - A.position.dy;
  bPoint.radius = Math.sqrt((dx*dx)+ (dy*dy)); 

  S.draw(context);
}
animate();