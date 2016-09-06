var canvasWidth = 800;
var canvasHeight = 600;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
var radius = 50;
var clippingRegion = { //剪区域
        x: randomNumber(canvas.width, radius),
        y: randomNumber(canvas.height, radius),
        r: radius
    }
    ;

image.src = 'image.jpg';
image.onload = function () {
    initCanvas();
};


function randomNumber(length, radius) {
    return Math.random() * (length - 2 * radius) + radius;
}

function initCanvas() {
    clippingRegion = {
        x: randomNumber(canvas.width, radius),
        y: randomNumber(canvas.height, radius),
        r: radius
    };

    draw(image);
}

function draw(image) {
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();
    setClippingRegion(clippingRegion);
    console.log(clippingRegion.r);
    context.drawImage(image, 0, 0);
    context.restore()
}

function setClippingRegion(clippingRegion) { //设置剪区域
    context.beginPath();
    context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
    context.clip();
}

function show() {
    window.timer = setInterval(function () {
        clippingRegion.r += 20;
        var endValue = Math.max(canvas.width, canvas.height) * 2;
        draw(image);
        if (clippingRegion.r >= endValue) {
            clearInterval(window.timer);
            window.timer = null;
        }
    }, 30);
}

function reset() {
    clearInterval(window.timer);
    window.timer = null;
    initCanvas();
}