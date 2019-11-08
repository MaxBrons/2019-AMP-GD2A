const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let grid = new Grid();

let A = new Point(new Vector2d(200,200),20,"red","1",true);
let B = new Point(new Vector2d(500,500),20,"red", "2", true);
let C = new Point(new Vector2d(600,200),20,"red", "3", true);

let D = new Point(new Vector2d(30,30),10,"white", "4", false);
let E = new Point(new Vector2d(30,30),10,"white", "5", false);
let F = new Point(new Vector2d(30,30),10,"white", "6", false);

let S = new Point(new Vector2d(0,0),5,"yellow", "7", false);

let l = new LinearFunction(0,0);
let m = new LinearFunction(0,0);
let n = new LinearFunction(0,0);

let o = new LinearFunction(0,0);
let p = new LinearFunction(0,0);
let q = new LinearFunction(0,0);

let Z = new Point(new Vector2d(100,100), 15, "red", "8",true);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  grid.draw(context);

  l.defineLineWithTwoPoint(A,B);
  m.defineLineWithTwoPoint(B,C);
  n.defineLineWithTwoPoint(C,A);

  o.defineLineWithTwoPoint(D,C);
  p.defineLineWithTwoPoint(E,A);
  q.defineLineWithTwoPoint(F,B);

  o.slope =  - 1/l.slope;
  o.intercept = D.position.dy - o.slope*D.position.dx;
  p.slope =  - 1/m.slope;
  p.intercept = E.position.dy - p.slope*E.position.dx;
  q.slope =  - 1/n.slope;
  q.intercept = F.position.dy - q.slope*F.position.dx;

  D.position.dx = (A.position.dx + B.position.dx)/2;
  D.position.dy = (A.position.dy + B.position.dy)/2;
  E.position.dx = (B.position.dx + C.position.dx)/2;
  E.position.dy = (B.position.dy + C.position.dy)/2;
  F.position.dx = (C.position.dx + A.position.dx)/2;
  F.position.dy = (C.position.dy + A.position.dy)/2;

  S.position.dx = q.intersection(p).x;
  S.position.dy = q.intersection(p).y;

  Z.position.dx = q.intersection(p).x;
  Z.position.dy = q.intersection(p).y;

  Z.drawEmpty(context);

  l.draw(context);
  m.draw(context);
  n.draw(context);

  o.draw(context);
  p.draw(context);
  q.draw(context);

  A.draw(context);
  B.draw(context);
  C.draw(context);

  D.draw(context);
  E.draw(context);
  F.draw(context);
  
  let dx = Z.position.dx - A.position.dx;
  let dy = Z.position.dy - A.position.dy;
  Z.radius = Math.sqrt((dx*dx)+ (dy*dy)); 

  S.draw(context);
}

animate();





