class Vector2d{
    constructor(dx,dy){
        this.dx = dx;
        this.dy = dy;
    }

    differencevector(a,b){
        this.dx = a.dx - b.dx;
        this.dy = a.dy - b.dy;
    }

    get magnitude(){
        return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
    }

}