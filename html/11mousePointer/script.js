const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let array = [];

for (let i = 0; i < 30; i++) {
  let arrow = new Arrow();
  array.push(arrow);
}
let angle;
let mouse = {};

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  for (let i = 0; i < array.length; i++) {
    array[i].angle = Math.atan2(mouse.y-canvas.height/2, mouse.x-canvas.width/2);
    array.draw(context);
  }
}

animate();

window.addEventListener("mousemove",(evt)=>{
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});





