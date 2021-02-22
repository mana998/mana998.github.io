class Img extends GameObject{
    constructor (src, startRow, startColumn, rows, columns, speed, width, height, x, y) {
        super(x, y, width, height);
        this.src = src
        //start of animation
        this.startRow = startRow;
        this.startColumn = startColumn;
        //length of animation
        this.rows = rows;
        this.columns = columns;
        //current position
        this.currentRow = startRow;
        this.currentColumn = startColumn;
        //speed - higher number means slower
        this.speed = speed;
        this.currentSpeed = 0;
    }

    draw (ctx, x, y, width, height) {
        if (!x) x = this.x;
        if (!y) y = this.y;
        if (!width) width = this.width;
        if (!height) height = this.height;
        let startWidth = this.currentColumn * width;
        let startHeight = this.currentRow * height;
        this.currentSpeed++;
        if (this.currentSpeed === this.speed) {
            this.currentColumn++;
            this.currentSpeed = 0;
        }
        if (this.currentColumn > this.columns) {
            this.currentColumn = this.startColumn;
            this.currentRow++;
            if (this.currentRow > this.rows){
                this.currentRow = this.startRow;
            }
        }
        ctx.drawImage(this.src, startWidth, startHeight, width, height, x, y, this.width, this.height);
    }
}