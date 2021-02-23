const defaultWait = 5000;
const waitDifference = 500;
const defaultAmount = 2;
const maxSublevel = 5;
const maxLevel = 5;
const defaultHP = 4;

//SPRITES
//coin sprite
const gold = new Image();
gold.src = "./assets/gold.png";
const silver = new Image();
silver.src = "./assets/silver.png";
const ruby = new Image();
ruby.src = "./assets/ruby.png";
const gemBlue = new Image();
gemBlue.src = "./assets/gemBlue.png";
const gemGreen = new Image();
gemGreen.src = "./assets/gemGreen.png";
const gemGold = new Image();
gemGold.src = "./assets/gemGold.png";
const gemSilver = new Image();
gemSilver.src = "./assets/gemSilver.png";
const gemRuby = new Image();
gemRuby.src = "./assets/gemRuby.png";
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

}