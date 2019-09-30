class Grid{
    constructor(dx,dy,xmod,ymod,color){
        this.dx = 20 || dx;
        this.dy = 20 || dy;
        this.xmod = 100 || xmod;
        this.ymod = 100 || ymod;
        this.color = "red" || color;
    }

    draw(context){
        for(let y = 0; y < canvas.height; y +=this.dy){
            context.beginPath();
            context.moveTo(0,y);
            context.lineTo(canvas.width,y);
            context.strokeStyle = this.color;
            context.closePath();
            context.stroke();
        }

        for(let x = 0; x < canvas.width; x +=this.dx){
            context.beginPath();
            context.moveTo(x,0);
            context.lineTo(x,canvas.height);
            context.strokeStyle = this.color;
            context.closePath();
            context.stroke();
        }
    }
}