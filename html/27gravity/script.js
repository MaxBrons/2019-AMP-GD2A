const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let earth = new DPoint(new Vector2d(width / 2, height / 2), new Vector2d(0,0), new Vector2d(0, 0), 50, "blue", "earth");
let moon = new DPoint(new Vector2d(width / 3, height / 3), new Vector2d(1,1), new Vector2d(0, 0), 20, "gray", "moon");
let distanceEarthMoon = new Vector2d(0, 0)
let distanceMoonEarth = new Vector2d(0, 0)

function animate() {
  context.clearRect(0, 0, width, height);

  distanceEarthMoon.differencevector(moon.pos, earth.pos);
  distanceMoonEarth.differencevector(earth.pos, moon.pos);

  let r = distanceEarthMoon.magnitude;

  distanceEarthMoon.magnitude = 800 / (r * r);
  distanceMoonEarth.magnitude = 800 / (r * r);

  earth.acc.equals(distanceEarthMoon);
  moon.acc.equals(distanceMoonEarth);

  earth.update();
  moon.update();

  earth.draw(context);
  moon.draw(context);

  distanceEarthMoon.draw(context, earth.pos, 50, "rgba(255,255,255,0.4)");
  distanceMoonEarth.draw(context, moon.pos, 50, "rgba(255,255,0,0.4)");
}

setInterval(animate, 10);