const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let carVelocity = 3;

let car = new Image();
car.src = 'car.png';
car.position = new Vector2d(0,0);
car.velocity = new Vector2d(carVelocity,0);

let frontwheel = new Image();
frontwheel.src = "wheel.png";
frontwheel.position = new Vector2d(0,0);

let rearwheel = new Image();
rearwheel.src = "wheel.png";
rearwheel.position = new Vector2d(0,0);

car.addEventListener('load',()=>{
  car.position.dy = height - car.height;
  animate();
});

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);

  car.position.add(car.velocity)
  context.drawImage(car, car.position.dx, car.position.dy);

  frontwheel.position.vectorSum(car.position, new Vector2d(132,120));
  context.drawImage(frontwheel, frontwheel.position.dx, frontwheel.position.dy);
  
  rearwheel.position.vectorSum(car.position, new Vector2d(672,120));
  context.drawImage(rearwheel, rearwheel.position.dx, rearwheel.position.dy);
  clampCar();
}

function clampCar(){
  if(car.position.dx > width){
    car.position.dx = -car.width;
  }
}