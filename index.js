const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//Colors
const colorOn = "#3399ff";
const colorOnBorder = "#2466a8";
const colorOnGradient1 = "#66b3ff";
const colorOnGradient2 = "#80bfff";
const colorOff = "#243342";
const colorOffBorder = "#243542";
const colorBackground = "#242526";

//Size
let size = 7;
let xStart ;
let xDifference;
let yDifference;
let yStart;
let sizeBorder;

//Text
const colorText = "#cccccc";
let fontText;


window.addEventListener("load",
    () => {
        changeSizeValues();
        setup();
        setInterval(setup, 1000);
    }
);

window.addEventListener("keydown",
    ({key}) => {
        console.log(key);
        if (key == "+"){
            size++;
        } else if (key == "-"){
            size--;
        }
        if (size > 10) {
            size = 10;
        } else if (size < 5) {
            size = 5;
        }
        console.log(size);
        changeSizeValues();
        setup();
    }
);

function changeSizeValues(){
    xStart = (canvas.width / 2) - (size * 10);
    xDifference = size * 4;
    yDifference = size * 6;
    yStart = (canvas.height / 3);
    sizeBorder = size * 0.2;
    fontText = `${size*1.5}px Arial`;
}

function setup(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    xStart = (canvas.width / 2) - (size * 10);
    yStart = (canvas.height / 3);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    let x = xStart;
    let y = yStart;
    let now = new Date();
    let hour = now.getHours().toString(2).padStart(5, 0);
    let minute = now.getMinutes().toString(2).padStart(6, 0);
    let second = now.getSeconds().toString(2).padStart(6, 0);
    writeText(x + size*10, y - yDifference * 1.25, "-     SIZE     +",  `${size*3}px Arial`);
    writeText(x + size*10, y - (yDifference * 0.8), "(Press +/- to resize)",  `${size*1.5}px Arial`);
    showTime(hour, x, y);
    y += yDifference;
    showTime(minute, x, y);
    y += yDifference;
    showTime(second, x, y);
}

function showTime(time, x, y){
    for (let i = 0; i < time.length; i++){
        writeText(x, y - size * 2, Math.pow(2, time.length - 1 - i));
        drawLight(x,y, time[i]);
        x += xDifference;
    }
}

function drawBackground(){
    ctx.fillStyle = colorBackground;
    //ctx.fillRect(175,175,150,150);
    ctx.fillRect(0,0,canvas.width,canvas.height);
}

function writeText(x, y, text, font){
    ctx.font = font || fontText;
    ctx.fillStyle = colorText;
    ctx.textAlign = "center";
    ctx.fillText(text, x, y);
}

function drawLight(x,y, isOn){
    ctx.beginPath();
    if (isOn == 1){
        drawCircle(x, y, size, colorOn);
        ctx.lineWidth = sizeBorder;
        ctx.strokeStyle = colorOnBorder;
        ctx.stroke();
        drawCircle(x, y, size * 0.6, colorOnGradient1);
        drawCircle(x, y, size * 0.4, colorOnGradient2);
    } else {
        drawCircle(x, y, size, colorOff);
        ctx.lineWidth = sizeBorder;
        ctx.strokeStyle = colorOffBorder;
        ctx.stroke();
    }
}

function drawCircle(x, y, radius, color){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}