const green = new Image();
green.src = "./assets/images/background/green.jpg";
const orange = new Image();
orange.src = "./assets/images/background/orange.jpg";
const blue = new Image();
blue.src = "./assets/images/background/blue.jpg";
const red = new Image();
red.src = "./assets/images/background/red.jpg";
const gray = new Image();
gray.src = "./assets/images/background/gray.jpg";

class Background {
    constructor() {
        this.backgrounds = [gray, green, orange, red, blue];
    }
    getBackgrounds() {
        return this.backgrounds;
    }
}
