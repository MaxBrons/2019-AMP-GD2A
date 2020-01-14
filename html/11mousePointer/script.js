const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let arrows = [];

for (let i = 0; i < 30; i++) {
  let arrow = new Arrow();
  arrows.push(arrow);
}
let angle;
let mouse = {};

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  for (let i = 0; i < arrows.length; i++) {
    arrows[i].angle = Math.atan2(mouse.y-canvas.height/2, mouse.x-canvas.width/2);
    arrows.draw(context);
  }
}

animate();

window.addEventListener("mousemove",(evt)=>{
  mouse.x = evt.clientX;
  mouse.y = evt.clientY;
});





