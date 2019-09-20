const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let circle = [];

for(let i = 0; i < 10; i++)
    drawCircle();

function drawCircle(){
    let color = "rgb(" + getRandNumber(255) + "," + getRandNumber(255) + "," + getRandNumber(255) + ")";
    let rvar = new Point(new Vector2d(getRandNumber(width),getRandNumber(height)),10,color);
    circle.push(rvar);
}

context.beginPath();
context.moveTo(circle[0].position.dx,circle[0].position.dy);
    for (let i = 0; i < circle.length; i++) {
        circle[i].draw(context);        
        context.lineTo(circle[i].position.dx,circle[i].position.dy);
    }
    context.fill();
    context.stroke();
    context.closePath();

function getRandNumber(max){
    let ans = Math.floor(Math.random() * max);
    return ans;
}
