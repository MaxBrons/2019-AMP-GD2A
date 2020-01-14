const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let points = [];

const GetRandom = (max)=>{
  return Math.random() * max;
}

for (let i = 0; i < 10; i++) {
  const point = new DPoint(new Vector2d(GetRandom(1500),GetRandom(500)),new Vector2d(GetRandom(30),GetRandom(15)),new Vector2d(0,1),20,"yellow","point");
  points.push(point);
}
function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  for (let i = 0; i < points.length; i++) {
    points[i].draw(context);
    points[i].vel.draw(context,points[i].pos, 5,"red");
    points[i].update();    
  }
}

animate();