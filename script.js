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

  // console.log(mouse.x, mouse.y);
});

ctx.fillStyle = "#F23827";

ctx.font = "60px Verdana";

ctx.fillText("WEB DEVELOPER", canvas.width / 2 - 200, canvas.height / 2);

const data = ctx.getImageData(0, 0, 500, 500);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 3;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 30 + 1;
  }
  draw() {
    ctx.fillStyle = "#F23827";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
    let forceDirectionX = dx / distance;
    let forceDirectionY = dy / distance;
    if (distance < 100) {
      this.x += forceDirectionX;
      this.y += forceDirectionY;
    } else {
      this.size = 3;
    }
  }
}

function init() {
  particlearray == [];
  for (let i = 0; i < 1000; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particlearray.push(new Particle(x, y));
  }
}
init();
console.log(particlearray);
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlearray.length; i++) {
    particlearray[i].draw();
    particlearray[i].update();
  }
  requestAnimationFrame(animate);
}

animate();
