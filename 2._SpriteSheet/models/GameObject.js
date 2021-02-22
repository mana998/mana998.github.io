class GameObject {
    constructor (x, y, width, height) {
        //position
        this.x = x;
        this.y = y;
        //size
        this.width = (width) ? width : 0;
        this.height = (height) ? height : 0;
        this.isColliding = false;
    }
}