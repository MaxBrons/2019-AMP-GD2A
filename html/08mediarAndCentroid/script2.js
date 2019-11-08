const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A = new Point(new Vector2d(200,200),20,"lime","red",true);
let B = new Point(new Vector2d(500,500),20,"gold", "red", true);
let C = new Point(new Vector2d(600,200),20,"red", "red", true);

let D = new Point(new Vector2d(30,30),10,"white", "", false);
let E = new Point(new Vector2d(30,30),10,"white", "", false);
let F = new Point(new Vector2d(30,30),10,"white", "black", false);

let S = new Point(new Vector2d(0,0),5,"green", "", false);

let l = new LinearFunction(0,0);
let m = new LinearFunction(0,0);
let n = new LinearFunction(0,0);

let o = new LinearFunction(0,0);
let p = new LinearFunction(0,0);
let q = new LinearFunction(0,0);

let Z = new Point(new Vector2d(100,100), 15, "red", "black",true);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  l.difineLineWithTwoPoints(A,B);
  m.difineLineWithTwoPoints(B,C);
  n.difineLineWithTwoPoints(C,A);

  o.difineLineWithTwoPoints(D,C);
  p.difineLineWithTwoPoints(E,A);
  q.difineLineWithTwoPoints(F,B);

  o.slope =  - 1/l.slope;
  o.intercept = D.position.dy - o.slope*D.position.dx;
  p.slope =  - 1/m.slope;
  p.intercept = E.position.dy - p.slope*E.position.dx;
  q.slope =  - 1/n.slope;
  q.intercept = F.position.dy - q.slope*F.position.dx;

  l.Draw(context);
  m.Draw(context);
  n.Draw(context);

  o.Draw(context);
  p.Draw(context);
  q.Draw(context);

  D.position.dx = (A.position.dx + B.position.dx)/2;
  D.position.dy = (A.position.dy + B.position.dy)/2;
  E.position.dx = (B.position.dx + C.position.dx)/2;
  E.position.dy = (B.position.dy + C.position.dy)/2;
  F.position.dx = (C.position.dx + A.position.dx)/2;
  F.position.dy = (C.position.dy + A.position.dy)/2;

  S.position.dx = q.intersection(p).dx;
  S.position.dy = q.intersection(p).dy;

  Z.position.dx = q.intersection(p).dx;
  Z.position.dy = q.intersection(p).dy;

  A.draw(context);
  B.draw(context);
  C.draw(context);

  D.draw(context);
  E.draw(context);
  F.draw(context);
  Z.drawEmpty(context);

  let dx = Z.position.dx - A.position.dx;
  let dy = Z.position.dy - A.position.dy;
  Z.radius = Math.sqrt((dx*dx)+ (dy*dy)); 

  S.draw(context);
}

animate();





