const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let grid = new Grid();

let A = new Point(new Vector2d(200,200),20,"red","A",true);
let B = new Point(new Vector2d(900,600),20,"red","B",true);
let C = new Point(new Vector2d(400,400),20,"yellow","C",true);
let S = new Point(new Vector2d(0,0),20,"white","S",false);
let m = new LinearFunction(1,1);
let l = new LinearFunction(0,0);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  grid.draw(context);

  l.defineLineWithTwoPoint(A,B);
  m.slope = -1/l.slope;
  m.intercept = C.position.dy -m.slope*C.position.dx;

  S.position.dx = l.intersection(m).x;
  S.position.dy = l.intersection(m).y;

  l.draw(context);
  m.draw(context);
  C.draw(context);
  A.draw(context);
  B.draw(context);
  S.draw(context);
}
animate();