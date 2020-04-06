class Vector2d{
    constructor(dx,dy){
      this.dx = dx;
      this.dy = dy;
    }

    differencevector(a,b){
      this.dx = a.dx - b.dx;
      this.dy = a.dy - b.dy;
    }

    vectorSum(a,b){
      this.dx = a.dx + b.dx;
      this.dy = a.dy + b.dy;
    }
  
    add(vector){
      this.dx += vector.dx;
      this.dy += vector.dy;
    }

    sub(vector){
      this.dx -= vector.dx;
      this.dy -= vector.dy;
    }

    scalMul(scal){
      this.dx *= scal;
      this.dy *= scal;
    }
    
    dot(vector){
      return this.dx*vector.dx + this.dy*vector.dy;
    }
    
    get magnitude(){
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
    }

    set magnitude(newMagnitude){
      let tempAngle = this.angle;
      this.dx = newMagnitude*Math.cos(tempAngle);
      this.dy = newMagnitude*Math.sin(tempAngle);
    }

    get angle(){
        return Math.atan2(this.dy,this.dx);
    }

    equals(vector){
      this.dx = vector.dx;
      this.dy = vector.dy;
    }

    perpendicular(vector){
      this.dx = -vector.dy;
      this.dy = vector.dx;
    }

    draw(context,pos,scale,color){
        let shaftHeight = 10;
        let arrowHeight = 20;
        let arrowWidth = 40;
        let shaftWidth = this.magnitude*scale - arrowWidth;
  
        context.fillStyle = color || "white";
  
        context.save();
        context.translate(pos.dx,pos.dy);
        context.rotate(this.angle)
  
        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(0,shaftHeight/2);
        context.lineTo(shaftWidth,shaftHeight/2);
        context.lineTo(shaftWidth,arrowHeight/2);
        context.lineTo(shaftWidth + arrowWidth,0);
        context.lineTo(shaftWidth,-arrowHeight/2);
        context.lineTo(shaftWidth,-shaftHeight/2);
        context.lineTo(0,-shaftHeight/2);
        context.closePath();
        context.stroke();
        context.fill();
  
        context.restore();
    }
}