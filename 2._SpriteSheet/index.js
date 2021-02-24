const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let lastTime;
const requiredElapsed = 1000 / 30; //30 fps

const distance = 10;
let fontSize = canvas.width / 90;
const fontType = "Arial";
let fontText = `${fontSize}px ${fontType}`;

let game;
let isGameOver = false;
let difficulty;
let isNew = true;

let animationFrame;

//SPRITES
//character sprite
const bard = new Image();
bard.src  = "./assets/images/character/bard.png";
const spriteWidth = 32;
const spriteHeight = 32;
let bardDownImg = new Img(bard, 0, 1, 0, 1, 3, spriteWidth, spriteHeight);
let bardLeftImg = new Img(bard, 1, 0, 0, 2, 3, spriteWidth, spriteHeight);
let bardRightImg = new Img(bard, 2, 0, 0, 2, 3, spriteWidth, spriteHeight);
let bardUpImg = new Img(bard, 3, 0, 0, 2, 3, spriteWidth, spriteHeight);
//heart sprite
const heart= new Image();
heart.src  = "./assets/images/other/heart.png";
const heartWidth = 16;
const heartHeight = 16;
let heartImg = new Img(heart, 0, 0, 0, 0, 10, heartWidth, heartHeight);
//character
let character = new Character(bardDownImg, spriteWidth, spriteHeight, canvas.width/2, canvas.height/2);
//background
let backgrounds;
//sound
const collectSound = new Sound("./assets/sounds/collect.wav");
const wrongSound = new Sound("./assets/sounds/wrong.wav");
const gameOverSound = new Sound("./assets/sounds/game_over.wav");
const selectSound = new Sound("./assets/sounds/select.wav");

//array of objects
//let gameObjects = game.getCoins();
let gameObjects = [];
gameObjects.push(character);

//difficulty buttons
const easy = document.getElementById("easy");
const medium = document.getElementById("medium");
const hard = document.getElementById("hard");
let difficulties = new Map();
difficulties.set(easy, 3);
difficulties.set(medium, 5);
difficulties.set(hard, 8);


window.addEventListener("load",
    () => {
        backgrounds = new Background().getBackgrounds();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        fontSize = canvas.width / 90;
        fontText = `${fontSize}px ${fontType}`;
        setup();
    }
);

window.addEventListener("resize",
    () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        fontSize = canvas.width / 90;
        fontText = `${fontSize}px ${fontType}`;
        setup();
    }
);

window.addEventListener("keydown", move);

window.addEventListener("keyup", stop);

easy.addEventListener("click", () => setup("easy"));
medium.addEventListener("click", () => setup("medium"));
hard.addEventListener("click", () => setup("hard"));

function stop(e){
    character.source.startColumn = 1;
    character.source.columns = 1;
}

function move(e){
    switch (e.key) {
        case "w":
        case "w":
        case "ArrowUp":
            character.source = bardUpImg;
            character.y -= distance;
            break;
        case "s":
        case "S":
        case "ArrowDown":
            character.source = bardDownImg;
            character.y += distance;
            break;
        case "d":
        case "D":
        case "ArrowRight":
            character.source = bardRightImg;
            character.x += distance;
            break;
        case "a":
        case "A":
        case "ArrowLeft":
            character.source = bardLeftImg;
            character.x -= distance;
            break;
        case "r":
        case "R":
            character.resetPosition(canvas);
            game = new Game();
            isNew = true;
            gameObjects = [];
            gameObjects.push(character);
            isGameOver = false;
            difficulty = '';
            window.cancelAnimationFrame(animationFrame);
            setup();
            break;
    }
    if (character.y < 0 - spriteHeight/2) {
        character.y = canvas.height - spriteHeight/2;
    } else if (character.y > canvas.height - spriteHeight/2){
        character.y = 0 - spriteHeight/2;
    } else if (character.x < 0 - spriteWidth/2){
        character.x = canvas.width - spriteWidth/2;
    } else if (character.x > canvas.width - spriteWidth/2){
        character.x = 0 - spriteWidth/2;
    }
    character.source.startColumn = 0;
    character.source.columns = 2;
}

function setup(dif){
    if (!difficulty && dif){
        game = new Game();
        selectSound.play()
        document.getElementById("buttons").style.display = "none";
        game.coinAmount = difficulties.get(document.getElementById(dif));
        difficulty = dif;
        isGameOver = false;
        draw();
    } else if (!difficulty && !dif){
        if (!game) {
            game = new Game();
        }
        document.getElementById("buttons").style.display = "block";
        isGameOver = true;
        drawBackground();
    }
}

function draw(now){
                //img, startx, starty, width, height, posx, posy,  new width, new height
    //ctx.drawImage(moneyImg, 64, 0, 16, 16, 0, 0, 16, 16);
    animationFrame = requestAnimationFrame(draw);
    if (!lastTime) {
        lastTime = now;
    }
    const elapsed = now - lastTime;
    if (elapsed > requiredElapsed) {
        drawBackground();
        update();
        if (isGameOver) {
            //need to set size
            writeText(canvas.width/2, canvas.height/2 - fontSize, "GAME OVER", "black", "center", `${fontSize*2}px ${fontType}`);
            writeText(canvas.width/2, canvas.height/2 + fontSize, "Press R to Restart", "black");
        } else {
            game.detectCollisions();
            drawBackground();
            for (const gameObject of gameObjects) {
                if (gameObject.isColliding && !gameObject.source){
                    if(gameObjects[0].src === gameObject.src){
                        if (gameObjects[0] !== gameObject) {
                            game.switchPosition(gameObjects[0], gameObject);
                        }
                        gameObjects.shift();
                        collectSound.play();
                    } else {
                        game.loseHP();
                        (game.hp > 0) ? wrongSound.play() : gameOverSound.play();
                        character.resetPosition(canvas);
                    }
                    //console.log(game.hp);
                } else {
                    drawImage(gameObject);
                }
            }
            drawLives();
            writeText(canvas.width - fontSize, canvas.height - fontSize, "Press R to Restart", "black", "right");
            writeText(fontSize, fontSize, `Level ${game.level}-${game.subLevel}`, "black", "left");
            writeText(fontSize, canvas.height - fontSize, `Difficulty: ${difficulty}`, "black", "left");
        }
    }
}

function drawLives() {
    heartImg.x = canvas.width - heartWidth * 3/2;
    heartImg.y = heartHeight * 1/2;
    for (let i = 0; i < game.hp; i++){
        drawImage(heartImg);
        heartImg.x -= heartWidth * 3/2;
    }
}

function writeText(x, y, text, color, align, font) {
    ctx.font = font || fontText;
    ctx.fillStyle = color;
    ctx.textAlign = align || "center";
    ctx.fillText(text, x, y);
}

function drawBackground() {
    console.log(game.subLevel);
    console.log(backgrounds[1]);
    let selected = game.level || 1;
    let grassPattern = ctx.createPattern(backgrounds[selected - 1], "repeat"); 
    ctx.fillStyle = grassPattern;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawImage(img){
    img.draw(ctx);
}

 function update(){
    if (game.hp > 0) {
        if (gameObjects.length === 1){
            game.nextLvl();
            gameObjects = game.getCoins();
            showCoinsOrder();
            //show order and then continue
            setTimeout(function(){
                character.resetPosition(canvas);
                game.repositionCoins(canvas, character);
                //character.resetPosition(canvas);
                gameObjects.push(character);
            }, game.wait);
        }
    } else {
        isGameOver = true;
    }
}

function showCoinsOrder(){
    let y = (canvas.height - game.coinHeight) / 2;
    let x = (canvas.width - gameObjects.length * game.coinWidth * 3/2) / 2;
    for (let gameObject of gameObjects) {
        gameObject.x = x;
        gameObject.y = y;
        drawImage(gameObject);
        x += game.coinWidth * 3/2;
    }
}
