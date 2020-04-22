const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

const width = window.innerWidth;
const height = window.innerHeight;

canvas.width = width;
canvas.height = height;

let A,B,difference;

A = new DPoint(new Vector2d(200,200),new Vector2d(1,3),new Vector2d(0,0),40,"yellow","A");
B = new DPoint(new Vector2d(500,400),new Vector2d(-1,-2),new Vector2d(0,0),60,"blue","B");
difference = new Vector2d(1,1);

//add mass
A.mass = A.radius * A.radius;
B.mass = B.radius * B.radius;

//radial component
A.rad = new Vector2d(1,1);
B.rad = new Vector2d(1,1);

//tangiale component
A.tan = new Vector2d(1,1);
B.tan = new Vector2d(1,1);

function animate(){
  requestAnimationFrame(animate);
  context.clearRect(0,0,width,height);
  A.update();
  B.update();
  difference.differencevector(B.pos,A.pos);

  B.draw(context);
  A.draw(context);
  A.vel.draw(context, A.pos , 20, "white");
  B.vel.draw(context, B.pos , 20, "white");

  A.rad.draw(context, A.pos , 20, "red");
  A.tan.draw(context, A.pos , 20, "red");

  B.rad.draw(context, B.pos , 20, "orange");
  B.tan.draw(context, B.pos , 20, "orange");

  A.rad.dx = difference.dx;
  A.rad.dy = difference.dy;

  B.rad.dx = difference.dx;
  B.rad.dy = difference.dy;

  A.rad.magnitude = 1;
  B.rad.magnitude = 1;

  A.rad.magnitude = A.rad.dot(A.vel);
  B.rad.magnitude = B.rad.dot(B.vel);

  A.tan.dx = -A.rad.dy;
  A.tan.dy = A.rad.dx;

  B.tan.dx = -B.rad.dy;
  B.tan.dy = B.rad.dx;

  if(difference.magnitude <= A.radius + B.radius){
    let Msum = A.mass + B.mass;
    let MAB = A.mass = B.mass;
    let MBA = B.mass - A.mass;

    let P = new Vector2d(1,1);
    let Q = new Vector2d(1,1);
    let R = new Vector2d(1,1);
    let S = new Vector2d(1,1);

    P.equals(A.rad);
    Q.equals(B.rad);
    R.equals(A.rad);
    S.equals(B.rad);

    P.scalMul(MAB/Msum);
    Q.scalMul(2*B.mass/Msum);
    R.scalMul(2*A.mass/Msum);
    S.scalMul(MBA/Msum);

    A.rad.vectorSum(P,Q);
    B.rad.vectorSum(R,S);
    A.vel.vectorSum(A.rad,A.tan);
    B.vel.vectorSum(B.rad,B.tan);

    A.tan.magnitude = A.tan.dot(A.vel);
    B.tan.magnitude = A.tan.dot(B.vel);

  } else {
    //difference.draw(context,A.pos,1,"green");
  }
}

animate();