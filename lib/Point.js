class Point {
    constructor(position, radius, color, label, dragable = false) {
        this.position = position;
        this.radius = radius;
        this.color = color;
        this.label = label || "";
        this.dragable = dragable;

        if (this.dragable)
            this.drag();
    }

    draw(context) {
        context.beginPath();
        context.strokeStyle = "blue";
        context.fillStyle = this.color;
        context.arc(this.position.dx, this.position.dy, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
        context.closePath();
        context.fillStyle = "black";
        context.fillText(this.label, this.position.dx - 20, this.position.dy - this.radius - 10);
    }

    drawEmpty(context) {
        context.beginPath();
        context.strokeStyle = "blue";
        context.arc(this.position.dx, this.position.dy, this.radius, 0, 2 * Math.PI);
        context.stroke();
        context.closePath();
    }

    pos(pos) {
        this.position.dx = pos.dx;
        this.position.dy = pos.dy;
    }

    drag() {
        let difference = new Vector2d(0, 0);
        let mousePoint;
        let dragging = false;

        window.addEventListener('mousedown', (evt) => {
            mousePoint = new Vector2d(evt.clientX, evt.clientY);
            difference.differencevector(this.position, mousePoint);
            if (difference.magnitude <= this.radius) dragging = true;
        });

        window.addEventListener('mousemove', (evt) => {
            mousePoint = new Vector2d(evt.clientX, evt.clientY);
            difference.differencevector(this.position, mousePoint);
            if (difference.magnitude <= this.radius) 
                canvas.style.cursor = "pointer";
            else canvas.style.cursor = "default";

            if (dragging) {
                this.position.dx = evt.clientX;
                this.position.dy = evt.clientY;
            }
        });

        window.addEventListener('mouseup', () => dragging = false);
    }
}