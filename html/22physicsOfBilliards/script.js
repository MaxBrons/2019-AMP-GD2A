const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let ball;
let ball2;
let grid;
let distance;

ball = new DPoint(new Vector2d(200,200),new Vector2d(4,3),new Vector2d(0,0),200,"rgba(100,200,50,0.3)","A");
ball2 = new DPoint(new Vector2d(800,400),new Vector2d(7,6),new Vector2d(0,0),200,"rgba(155,50,255,0.3)","B");

ball.rad = new Vector2d(1,1);
ball.tan = new Vector2d(1,1);

ball2.rad = new Vector2d(1,1);
ball2.tan = new Vector2d(1,1);

function animate(){
  ball.rad.differencevector(ball2.pos,ball.pos);
  ball2.rad.differencevector(ball.pos,ball2.pos);
  distance = ball.rad.magnitude;

  ball.rad.magnitude = 1;
  ball2.rad.magnitude = 1;

  ball.tan.perpendicular(ball.rad);
  ball2.tan.perpendicular(ball2.rad);

  ball.rad.magnitude = ball.vel.dot(ball.rad);
  ball.tan.magnitude = ball.vel.dot(ball.tan);

  ball2.rad.magnitude = ball2.vel.dot(ball2.rad);
  ball2.tan.magnitude = ball2.vel.dot(ball2.tan);

  if(distance< ball.radius + ball2.radius){
    let temp = new Vector2d(1,1);
    temp.dx = ball.rad.dx;
    temp.dy = ball.rad.dy;

    ball.rad.dx = ball2.rad.dx;
    ball.rad.dy = ball2.rad.dy;

    ball2.rad.dx = temp.dx;
    ball2.rad.dy = temp.dy;

    ball.vel.vectorSum(ball.rad,ball.tan);
    ball2.vel.vectorSum(ball2.rad,ball2.tan);
  }

  requestAnimationFrame(animate)
  context.clearRect(0,0,width,height);
  ball.update();
  ball2.update();
  ball.draw(context);
  ball2.draw(context);

  ball.vel.draw(context,ball.pos,35,"grey");
  ball.rad.draw(context,ball.pos,35,"red");
  ball.tan.draw(context,ball.pos,35,"orange");

  ball2.vel.draw(context,ball2.pos,35,"grey");
  ball2.rad.draw(context,ball2.pos,35,"cyan");
  ball2.tan.draw(context,ball2.pos,35,"yellow");
}

animate();