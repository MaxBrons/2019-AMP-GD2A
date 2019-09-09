const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let circle = [];

animate();
function animate(){
    context.clearRect(0,0,width,height);
    requestAnimationFrame(animate);   
    let color = "rgb(" + getRandNumber(255) + "," + getRandNumber(255) + "," + getRandNumber(255) + ")";
    let rvar = new Point(new Vector2d(getRandNumber(width),getRandNumber(height)),100,color);
    circle.push(rvar);

    for (let index = 0; index < circle.length; index++) {
        circle[index].radius++;
        circle[index].draw(context);

        if(circle[index].radius > 200)
           circle.splice(index,1);
    }
}

function getRandNumber(max){
    let ans = Math.floor(Math.random() * max);
    return ans;
}