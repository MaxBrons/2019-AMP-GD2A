class Point {
    constructor(position,radius,color){
        this.position = position;
        this.radius = radius;
        this.color = color;
    }

    draw(context){
        context.beginPath();
        context.strokeStyle = "blue";
        context.fillStyle = this.color;
        context.arc(this.position.dx,this.position.dy,this.radius,0,2*Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
    }
}