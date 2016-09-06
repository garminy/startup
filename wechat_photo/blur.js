var canvasWidth = 800;
var canvasHeight = 600;

var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');

canvas.width = canvasWidth;
canvas.height = canvasHeight;

var image = new Image();
var radius = 50;

image.src = 'image.jpg';
image.onload = function () {
    photo.initCanvas();
};

var photo = {
    initCanvas: function () {
        var _this = this;
        _this.clippingRegion = {
            x: _this.randomNumber(canvas.width, radius),
            y: _this.randomNumber(canvas.height, radius),
            r: radius
        };

        _this.draw(image);
    },
    randomNumber: function (length, radius) {
        return Math.random() * (length - 2 * radius) + radius;
    },
    draw: function (image) {
        var _this = this;
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.save();
        _this.setClippingRegion(_this.clippingRegion);
        context.drawImage(image, 0, 0);
        context.restore()
    },
    setClippingRegion: function (clippingRegion) {
        context.beginPath();
        context.arc(clippingRegion.x, clippingRegion.y, clippingRegion.r, 0, Math.PI * 2, false);
        context.clip();
    },
    show: function () {
        var _this = this;
        window.timer = setInterval(function () {
            _this.clippingRegion.r += 20;
            var endValue = Math.max(canvas.width, canvas.height) * 2;
            _this.draw(image);
            if (_this.clippingRegion.r >= endValue) {
                clearInterval(window.timer);
                window.timer = null;
            }
        }, 30);
    },
    reset: function () {
        clearInterval(window.timer);
        window.timer = null;
        this.initCanvas();
    }
};

document.getElementById('reset-btn').onclick = function(){
    photo.reset();
};
document.getElementById('show-btn').onclick = function(){
    photo.show();
};