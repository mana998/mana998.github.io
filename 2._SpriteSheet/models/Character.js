class Character extends GameObject{
    constructor (source, width, height, x, y) {
        super(x, y, width, height);
        this.source = source;
    }

    draw(ctx){
        this.source.draw(ctx, this.x, this.y, this.width, this.height);
    }

    resetPosition(canvas){
        this.x = canvas.width/2;
        this.y = canvas.height/2;
    }
}