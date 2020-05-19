class DPoint{
    constructor(pos,vel,acc,radius,color,label){
        this.pos = pos;
        this.vel = vel;
        this.acc = acc;
        this.radius = radius;
        this.color = color;
        this.label = label || "";
        this.wayPointTarget = 0;
        this.nextPos = this.pos.add(this.vel);
    }

    update(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.nextPos = this.pos.add(this.vel);

        if(this.pos.dx > canvas.width - this.radius)
        {
            this.pos.sub(this.vel);
            this.vel.dx = - Math.abs(this.vel.dx);
        }
        if(this.pos.dx < this.radius)
        {
            this.pos.sub(this.vel);
            this.vel.dx = Math.abs(this.vel.dx);
        }
        if(this.pos.dy > canvas.height - this.radius)
        {
            this.pos.sub(this.vel);
            this.vel.dy = - Math.abs(this.vel.dy);
        }
        if(this.pos.dy < this.radius)
        {
            this.pos.sub(this.vel);
            this.vel.dy = Math.abs(this.vel.dy);
        }
    }

    draw(context){
        context.beginPath();
        context.strokeStyle = "black";
        context.fillStyle = this.color;
        context.arc(this.pos.dx,this.pos.dy,this.radius,0,2*Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
        context.fillStyle = "black";
        context.fillText(this.label, this.pos.dx-20, this.pos.dy-this.radius-10);
    }
}
