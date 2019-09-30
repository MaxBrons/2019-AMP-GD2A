const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let circle = [];
let labelInt = 0;

for(let i = 0; i < 10; i++)
    {
      labelInt++;
      drawCircle();
    }

//////////////////////////////////////
function drawCircle(){
    let color = "black";
    let rvar = new Point(new Vector2d(getRandNumber(width),getRandNumber(height)),25,color,(String)(labelInt));
    circle.push(rvar);
}
function getRandNumber(max){
    let ans = Math.floor(Math.random() * max);
    return ans;
}

/////////////////////////////////////////////
for (let i = 0; i < circle.length; i++) {
  circle[i].drag();
}

//////////////////////////////////////////////////
function animate(){
  context.clearRect(0,0,canvas.width,canvas.height);
  requestAnimationFrame(animate);

  context.beginPath();
  context.fillStyle = "rgba(100,205,50,0.4)";
  context.moveTo(circle[0].position.dx,circle[0].position.dy);
  /////////////////////////////////////////////////////////////
  for (let i = 0; i < circle.length; i++) {        
          context.lineTo(circle[i].position.dx,circle[i].position.dy);
      }
      context.closePath();
      context.fill();
      context.stroke();

  for (let i = 0; i < circle.length; i++) {
    circle[i].draw(context);
  }
}
  animate();