const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let circle = [];

let A = new Point(new Vector2d(200,200),15,"blue",'1',true);
let B = new Point(new Vector2d(500,300),15,"red",'2',true);
let C = new Point(new Vector2d(100,500),15,"yellow",'3',true);
let D = new Point(new Vector2d(200,500),15,"orange",'4',true);
let S = new Point(new Vector2d(500,100),10,"grey",'5',false);
circle.push(A),circle.push(B),circle.push(C),circle.push(D);

let l = new LinearFunction(1,1);
let l_2 = new LinearFunction(1,1);

let grid = new Grid();

function animate() {
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);

  l.defineLineWithTwoPoint(A,B);
  l_2.defineLineWithTwoPoint(C,D);
  l.draw(context);
  l_2.draw(context);
  grid.draw(context);

  S.position.dx = l.intersection(l_2).x;
  S.position.dy = l.intersection(l_2).y;

  for(let i = 0; i < circle.length; i++){
    circle[i].draw(context);
  }
  S.draw(context);
}
animate();


