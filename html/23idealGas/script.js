const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;
let molecules = fillMoleculesArray(150, 100, 100, Math.floor(width / 100));
function animate() {
  requestAnimationFrame(animate);
  context.clearRect(0, 0, width, height);

  molecules.map((e)=>{
    e.update();
    e.draw(context);
    molecules.map((eo)=>{
      if(e.index != eo.index){
        let distance = new Vector2d(1,1);
        e.nextPos.vectorSum(e.pos,e.vel)
        distance.differencevector(eo.pos,e.nextPos);

        if(distance.magnitude <= e.radius + eo.radius){
          e.rad.dx = distance.dx;
          e.rad.dy = distance.dy;
          eo.rad.dx = distance.dx;
          eo.rad.dy = distance.dy;

          e.rad.magnitude = 1;
          eo.rad.magnitude = 1;

          e.tan.dx = -e.rad.dy;
          e.tan.dy = e.rad.dx;

          eo.tan.dx = -eo.rad.dy;
          eo.tan.dy = eo.rad.dx;

          let temp = new Vector2d(1,1);
          temp.dx = e.rad.dx;
          temp.dy = e.rad.dy;

          e.rad.dx = eo.rad.dx;
          e.rad.dy = eo.rad.dx;

          eo.rad.dx = temp.dx;
          eo.rad.dy = temp.dy;

          e.vel.vectorSum(e.rad,e.tan);
          eo.vel.vectorSum(eo.rad,eo.tan);

          e.color = "red";
          eo.color = "red";
        }
      }
      else {
        e.color = "orange";
        eo.color = "orange";
      }
    });
  })
}
animate();

function fillMoleculesArray(amount, collumnWidth, rowHeight, moleculesOnRow) {
  let array = [];
  
  for (let i = 0; i < amount; i++) {
    let x = (collumnWidth / 2) + i % moleculesOnRow * collumnWidth;
    let y = (rowHeight/2) + Math.floor(i / moleculesOnRow) * rowHeight;
    if(x > 0 && x < width && y > 0 && y < height){
      let molecule = new DPoint(new Vector2d(x, y), new Vector2d(getRandomNumber(-2, 2), getRandomNumber(-2, 2)), new Vector2d(0, 0), 20, "orange", "" + i);
      molecule.rad = new Vector2d(1, 1);
      molecule.tan = new Vector2d(1, 1);
      molecule.nextPos = new Vector2d(1,1);
      molecule.index = i;
      array.push(molecule);
    }
  }
  return array;
}

function getRandomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}