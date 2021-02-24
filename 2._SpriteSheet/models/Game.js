const defaultWait = 5000;
const waitDifference = 500;
const defaultAmount = 2;
const maxSublevel = 5;
const maxLevel = 5;
const defaultHP = 4;

//SPRITES
//coin sprite
const gold = new Image();
gold.src = "./assets/images/collect/gold.png";
const silver = new Image();
silver.src = "./assets/images/collect/silver.png";
const ruby = new Image();
ruby.src = "./assets/images/collect/ruby.png";
const gemBlue = new Image();
gemBlue.src = "./assets/images/collect/gemBlue.png";
const gemGreen = new Image();
gemGreen.src = "./assets/images/collect/gemGreen.png";
const gemGold = new Image();
gemGold.src = "./assets/images/collect/gemGold.png";
const gemSilver = new Image();
gemSilver.src = "./assets/images/collect/gemSilver.png";
const gemRuby = new Image();
gemRuby.src = "./assets/images/collect/gemRuby.png";
const coins = [gold, silver, ruby, gemBlue, gemGreen, gemGold, gemSilver, gemRuby];
const coinWidth = 16;
const coinHeight = 16;

class Game {
    constructor () {
        this.level = 1;
        this.subLevel = 0;
        this.wait = defaultWait + 500;
        this.amount = defaultAmount;
        this.hp = defaultHP;
        this.gameObjects = [];
        this.coinWidth = coinWidth;
        this.coinHeight = coinHeight;
        this.coinAmount = defaultAmount;
    }

    update(){
        this.wait = defaultWait - this.level * waitDifference;
        this.amount = defaultAmount + this.subLevel;
    }

    loseHP(){
        this.hp--;
    }

    gainHP(){
        this.hp++;
    }

    nextLvl(){
        if (this.subLevel < maxSublevel) {
            this.subLevel++;
        } else {
            this.level++;
            this.subLevel = 1;
        }
        if (this.level > maxLevel){
            return false;
        }
        this.gainHP();
        this.update();
        return true;
    }

    getCoins(){
        let x = 50;
        let y = 50;
        this.gameObjects = [];
        for (let i = 0; i < this.amount; i++) {
            this.gameObjects.push(this.getCoin(coins[Math.floor(Math.random()*this.coinAmount)], x, y));
            x += 50;
        }
        return this.gameObjects;
    }

    getCoin(type, x, y){
        let length = (type <= 2) ? 4 : 3;
        return new Img(type, 0, 0, 0, length, 10, coinWidth, coinHeight, x, y);
    }

    rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
        // Check x and y for overlap
        if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
            return false;
        }
        return true;
    }
    
    detectCollisions(){
        let obj1;
        let obj2;
    
        // Reset collision state of all objects
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].isColliding = false;
        }
    
        // Start checking for collisions
        for (let i = 0; i < this.gameObjects.length; i++) {
            obj1 = this.gameObjects[i];
    
            for (let j = i + 1; j < this.gameObjects.length; j++)
            {
                obj2 = this.gameObjects[j];
    
                // Compare object1 with object2
                if (this.rectIntersect(obj1.x, obj1.y, obj1.width, obj1.height, obj2.x, obj2.y, obj2.width, obj2.height)){
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                }
            }
        }
    }

    repositionCoins(canvas, character){
        for (let i = 0; i < this.gameObjects.length; i++) {
            let isColliding = false;
            do {
                this.gameObjects[i].x = Math.floor(Math.random()*canvas.width);
                this.gameObjects[i].y = Math.floor(Math.random()*canvas.height);
                //make sure coins are displayed fully on screen
                if (this.gameObjects[i].x < coinWidth) this.gameObjects[i].x += coinWidth;
                if (this.gameObjects[i].x > canvas.width - coinWidth) this.gameObjects[i].x -= coinWidth;
                if (this.gameObjects[i].y < coinHeight) this.gameObjects[i].y += coinHeight;
                if (this.gameObjects[i].y > canvas.height - coinHeight) this.gameObjects[i].y -= coinHeight;
                for (let j = 0; j < i; j++) {
                    isColliding = this.rectIntersect(this.gameObjects[i].x, this.gameObjects[i].y, this.gameObjects[i].width, this.gameObjects[i].height, this.gameObjects[j].x, this.gameObjects[j].y, this.gameObjects[j].width, this.gameObjects[j].height);
                    if (isColliding) {break;}
                }
                isColliding = this.rectIntersect(this.gameObjects[i].x, this.gameObjects[i].y, this.gameObjects[i].width, this.gameObjects[i].height, character.x, character.y, character.width, character.height);
            } while (isColliding);
        }
    }

    switchPosition(obj1, obj2) {
        let index1 = this.gameObjects.indexOf(obj1);
        let index2 = this.gameObjects.indexOf(obj2);
        let tempObject = this.gameObjects[index1];
        this.gameObjects[index1] = this.gameObjects[index2];
        this.gameObjects[index2] = tempObject;
    }
}