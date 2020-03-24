const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let bumper, player,rad,tan;

function setUp(){
  bumper = new Point(new Vector2d(canvas.width/2,canvas.height/2),100,"red");
  player = {};
  player.pos = new Vector2d(100,100);
  player.vel = new Vector2d(7,8);
  player.point = new Point(new Vector2d(player.pos.dx,player.pos.dy),20,"pink");

  rad = new Vector2d(1,1);
  tan = new Vector2d(1,1);
  animate();
}

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,canvas.width,canvas.height);
  bumper.draw(context);
  player.pos.add(player.vel);
  player.point.pos(player.pos);

  if(player.pos.dx < player.point.radius || player.pos.dx > canvas.width - player.point.radius){
    player.vel.dx = -player.vel.dx;
  }
  if(player.pos.dy < player.point.radius || player.pos.dy > canvas.height - player.point.radius){
    player.vel.dy = -player.vel.dy;
  }
  rad.magnitude = 3;
  tan.magnitude = 3;
  rad.magnitude = player.vel.dot(rad);
  tan.magnitude = player.vel.dot(tan);
  rad.draw(context,player.pos.dx,player.pos.dy,10);
  tan.draw(context,player.pos.dx,player.pos.dy,10);

  rad.dx = bumper.position.dx - player.pos.dx;
  rad.dy = bumper.position.dy - player.pos.dy;

  tan.dx = -rad.dy;
  tan.dy = rad.dx;

  if(rad.magnitude < player.point.radius + bumper.radius){
    rad.magnitude = 1;
    tan.magnitude = 1;
    rad.magnitude = player.vel.dot(rad);
    tan.magnitude = player.vel.dot(tan);
    rad.draw(context,new Vector2d(player.pos.dx,player.pos.dy),10);
    tan.draw(context,new Vector2d(player.pos.dx,player.pos.dy),10);
    rad.angle += Math.PI;
    player.vel.vectorSum(rad,tan);
  }

  player.vel.draw(context,new Vector2d(player.pos.dx,player.pos.dy),10);

  player.point.draw(context);
}

setUp();