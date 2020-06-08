const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

canvas.width = width;
canvas.height = height;
let sun, earth, earth_base_position;
let size_factor = 0.3;

let minPlaneten = 4;
let maxplaneten = 4;
let minMaanen = 0;
let maxMaanen = 4;
let planetBrightnes = 100;
let distanceBetweenPlanets = 300;
let planet_speed = getRandomNumber(10, 50);
let angel_speed = 0.01;
let moon_speed = getRandomNumber(10, 50);

let planetArray = fillPlanetArray();
sun = new Point(new Vector2d(width / 2, height / 2), 150 * size_factor, "yellow", "sun");

function animate() {
  context.clearRect(0, 0, width, height);
  requestAnimationFrame(animate);

  planetArray.map(_planet => {
    _planet.moonarray.map(_moon => {
      _moon.draw(context);
      _moon.position.vectorSum(_moon.base_position, _planet.position);
      _moon.base_position.angle += _moon.moonspeed / 10;
    })
    _planet.draw(context);
    _planet.position.vectorSum(_planet.base_position, sun.position);
    _planet.base_position.angle += _planet.planetspeed / 100;
  });

  planet_speed *= 2.1
  sun.draw(context);
}

function fillPlanetArray() {
  let array = [];
  let numberOfPlanets = getRandomNumber(minPlaneten, maxplaneten);
  for (let i = 0; i < numberOfPlanets; i++) {
    let numberOfMoons = getRandomNumber(minMaanen, maxMaanen);
    let moon_speed = getRandomNumber(10, 50);
    let _planet = new Point(new Vector2d(distanceBetweenPlanets * i * size_factor, distanceBetweenPlanets * i * size_factor + distanceBetweenPlanets), getRandomNumber(10, 50) * size_factor, "lightblue", "earth");
    
    _planet.base_position = new Vector2d(distanceBetweenPlanets * i * size_factor + (distanceBetweenPlanets * size_factor), distanceBetweenPlanets * i * size_factor + (distanceBetweenPlanets * size_factor));
    _planet.planetspeed = planet_speed / _planet.base_position.magnitude;
    _planet.color = "rgb(" + (255 / _planet.base_position.magnitude) * planetBrightnes * getRandomNumber(1, 4) + "," + (255 / _planet.base_position.magnitude) * planetBrightnes * getRandomNumber(1, 4) + "," + (255 / _planet.base_position.magnitude) * planetBrightnes * getRandomNumber(1, 4) + ")"
    _planet.moonarray = [];

    for (let i = 0; i < numberOfMoons; i++) {
      let _moon = new Point(new Vector2d(50 * i * size_factor, 50 * i * size_factor + 50), getRandomNumber(10, 20) * size_factor, "grey", "moon");
      _moon.base_position = new Vector2d(50 * i * size_factor + (50 * size_factor), 50 * i * size_factor + (50 * size_factor));
      _moon.moonspeed = moon_speed / _moon.base_position.magnitude;
      _planet.moonarray.push(_moon);
    }
    array.push(_planet);
  }
  return array;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

animate();