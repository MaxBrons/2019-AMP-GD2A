const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let grid = new Grid();
let pointArray = fillPointsArray(); 
let ball = new DPoint(new Vector2d(10,100),new Vector2d(1,4),new Vector2d(0,0),10,"black", " ");
ball.rad = new Vector2d(1,1);
ball.tan = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  grid.draw(context);
  ball.update();
  ball.draw(context);

  pointArray.map((bumper) => {
    let distVector = new Vector2d(1,1);
    distVector.differencevector(bumper.position, ball.pos);
    //distVector.draw(context, ball.pos,1,"white");
    
    if(distVector.magnitude < ball.radius + bumper.radius){
      bumper.color ="red";
      ball.rad.dx = distVector.dx;
      ball.rad.dy = distVector.dy;

      ball.tan.dx = -ball.rad.dy;
      ball.tan.dy = ball.rad.dx;

      ball.rad.magnitude = 1;
      ball.tan.magnitude = 1;

      ball.rad.magnitude = ball.rad.dot(ball.vel);
      ball.tan.magnitude = ball.tan.dot(ball.vel);

      ball.rad.magnitude = -ball.rad.magnitude;
      ball.vel.vectorSum(ball.rad, ball.tan);

      // ball.tan.draw(context, ball.pos,2,"orange");
      // ball.rad.draw(context, ball.pos,2,"orange");
      // ball.vel.draw(context,new Vector2d(ball.pos.dx + ball.vel.dx,ball.pos.dy + ball.vel.dy),15,"red");
    }
    else{
      bumper.color = "yellow";
    }
    bumper.draw(context);
    bumper.draw(context,ball.vel,1,"red");
  });  
}

function fillPointsArray(){
  let array = [];

  let startCollumWidth = 100;
  let collumWidth = 200;

  let startRowWidth = 100;
  let rowHeight = 200;

  let numberOnRow = Math.floor(width/collumWidth);
  let numberOfPoints = Math.floor(height/rowHeight) * numberOnRow;

  for (let i = 0; i < numberOfPoints; i++) {
    let x = startCollumWidth + (i % numberOnRow) * collumWidth;
    let y = startRowWidth + Math.floor(i/numberOnRow) * rowHeight;
    let point = new Point(new Vector2d(x,y),50,"yellow", "Index: " + i);
    array.push(point);
  }
  return array;
}

animate();