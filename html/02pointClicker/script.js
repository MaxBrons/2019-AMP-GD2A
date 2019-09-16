const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let circle = [];
let circlesClicked = 0;

for(let i = 0; i < 10; i++)
    drawCircle();

function drawCircle(){
    let color = "rgb(" + getRandNumber(255) + "," + getRandNumber(255) + "," + getRandNumber(255) + ")";
    let rvar = new Point(new Vector2d(getRandNumber(width),getRandNumber(height)),100,color);
    circle.push(rvar);

    for (let index = 0; index < circle.length; index++) {
        circle[index].draw(context);
    }

    function getRandNumber(max){
        let ans = Math.floor(Math.random() * max);
        return ans;
    }
}

let difference = new Vector2d(0,0);

window.addEventListener('click', (evt)=>{
    let mousePoint = new Vector2d(evt.clientX, evt.clientY);
    for (let i = 0; i < circle.length; i++) {
        difference.differencevector(circle[i].position, mousePoint);
        if(difference.magnitude <= circle[i].radius &&circle[i].color != "orange")
        {
            circlesClicked++;
            circle[i].color = "orange";
            circle[i].draw(context);
        }

        if(circlesClicked == 10)
        {
            circlesClicked = 0;
            location.reload();
        } 
    }  
});