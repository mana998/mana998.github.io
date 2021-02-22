const defaultWait = 5000;
const waitDifference = 500;
const defaultAmount = 2;
const maxSublevel = 5;
const maxLevel = 5;
const defaultHP = 4;

//SPRITES
//coin sprite
const gold = new Image();
gold.src  = "./assets/gold.png";
const silver = new Image();
silver.src  = "./assets/silver.png";
const ruby = new Image();
ruby.src  = "./assets/ruby.png";
const coins = [gold, silver, ruby];

class Game {
    constructor () {
        this.level = 1;
        this.subLevel = 0;
        this.wait = defaultWait + 500;
        this.amount = defaultAmount - 1;
        this.hp = defaultHP;
        this.gameObjects = [];
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
            this.gameObjects.push(this.getCoin(coins[Math.floor(Math.random()*3)], x, y));
            x += 50;
        }
        return this.gameObjects;
    }

    getCoin(type, x, y){
        return new Img(type, 0, 0, 0, 4, 10, 16, 16, x, y);
    }

}