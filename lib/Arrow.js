class Arrow{
    constructor(x,y){
        this.angle = Math.PI;
        this.x = x;
        this.y = y;
    }

    draw(context){
        let shaftHeight = 20;
        let shaftWidth = 100;
        let arrowHeight = 40;
        let arrowWidth = 40;

        context.fillStyle = "orange";

        context.save();
        context.translate(this.x,this.y);
        context.rotate(this.angle)


        context.beginPath();
        context.moveTo(0,0);
        context.lineTo(0, shaftHeight/2);
        context.lineTo(shaftWidth, shaftHeight/2);
        context.lineTo(shaftWidth, arrowHeight/2);
        context.lineTo(shaftWidth + arrowWidth,0);

        context.lineTo(shaftWidth, -arrowHeight/2);
        context.lineTo(shaftWidth, -shaftHeight/2);
        context.lineTo(0, -shaftHeight/2);
        context.closePath();
        context.stroke();
        context.fill();

        context.restore();
    }
}