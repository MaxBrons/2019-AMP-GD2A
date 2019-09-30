const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let circle = [];

let f = new LinearFunction(0,0);

let A = new Point(new Vector2d(200,200),15,"blue",'1',true);
let B = new Point(new Vector2d(500,300),15,"red",'2',true);
circle.push(A); circle.push(B);

function animate() {
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);
  f.defineLineWithTwoPoint(A,B);
  for(let x = 0; x < width ; x += 5){
    let point = new Point(new Vector2d(x, f.y(x)),4,"black");
    point.draw(context);
  }
  A.draw(context), B.draw(context);
}

animate();


