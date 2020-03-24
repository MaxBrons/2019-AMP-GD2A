const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ball = new DPoint(new Vector2d(200,300),new Vector2d(6,6), new Vector2d(0,0),20,"white");
let bumper = new Point(new Vector2d(canvas.width/2,canvas.height/2),canvas.height/4,"white");
let distance;

ball.rad = new Vector2d(1,1);
ball.tan = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,canvas.width,canvas.height);

  ball.rad.dx = (bumper.position.dx - ball.pos.dx);
  ball.rad.dy = (bumper.position.dy - ball.pos.dy);

  if(ball.pos.dx < ball.radius || ball.pos.dx > canvas.width -  ball.radius){
    ball.vel.dx = -ball.vel.dx;
  }

  if(ball.pos.dy < ball.radius || ball.pos.dy > canvas.height -  ball.radius){
    ball.vel.dy = -ball.vel.dy;
  }

  distance = ball.rad.magnitude;
  
  ball.rad.magnitude = 1;
  ball.rad.magnitude = ball.rad.dot(ball.vel);
  ball.tan.dx = ball.rad.dy;
  ball.tan.dy = -ball.rad.dx;
  ball.tan.magnitude = 1;
  ball.tan.magnitude = ball.tan.dot(ball.vel);

if(distance < ball.radius + bumper.radius){
  ball.rad.magnitude = -ball.rad.magnitude;
  
  ball.vel.vectorSum(ball.rad,ball.tan);
}
  bumper.draw(context);
  bumper.draw(context,ball.vel,10,"red");
  ball.draw(context);
  ball.tan.draw(context,ball.pos,15,"yellow");
  ball.vel.draw(context,new Vector2d(ball.pos.dx + ball.vel.dx,ball.pos.dy + ball.vel.dy),15,"red");
  ball.rad.draw(context,new Vector2d(ball.pos.dx + ball.vel.dx,ball.pos.dy + ball.vel.dy),15,"yellow");
  ball.update();
}

animate();