let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlearray = [];

// handle mouse

const mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;

  console.log(mouse.x, mouse.y);
});

ctx.fillStyle = "#F23827";

ctx.font = "60px Verdana";

ctx.fillText("WEB DEVELOPER", canvas.width / 2 - 200, canvas.height / 2);

const data = ctx.getImageData(0, 0, 500, 500);

class Particle {
  constructor(x, y) {
    this.x = x + 100;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
  }
}
