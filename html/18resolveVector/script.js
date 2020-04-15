const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let point1 = new Point(new Vector2d(100,100),20,"red","Point", true);
let point2 = new Point(new Vector2d(150,400),20,"red","Point2", true);
let point3 = new Point(new Vector2d(200,500),20,"red","Point2", true);
let grid = new Grid();
let line = new LinearFunction(1,1);

let vector = new Vector2d(1,1);
let vector2 = new Vector2d(1,1);
let vector3 = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  grid.draw(context);
  point1.draw(context);
  point2.draw(context);
  point3.draw(context);

  line.defineLineWithTwoPoint(point1,point2);
  line.draw(context);

  vector.dx = point2.position.dx - point1.position.dx;
  vector.dy =point2.position.dy - point1.position.dy;

  vector2.dx = point3.position.dx - point1.position.dx;
  vector2.dy = point3.position.dy - point1.position.dy;

  vector.draw(context,point1.position,1);
  vector2.draw(context,point1.position,1);

  vector3.dx = vector2.dy;
  vector3.dy = -vector2.dx;

  vector3.draw(context,point1.position,1);

}

animate();