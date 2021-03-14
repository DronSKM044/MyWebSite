let canvas = document.querySelector(".canvas");
let ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particlearray = [];

// handle mouse

const mouse = {
  x: null,
  y: null,
  radius: 100,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;

  // console.log(mouse.x, mouse.y);
});

ctx.fillStyle = "#F23827";

ctx.font = "30px Arial";

ctx.fillText("Web Developer", 40, 80);

const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 1;
    this.baseX = this.x;
    this.baseY = this.y;
    this.density = Math.random() * 40 + 5;
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
    let maxDistance = mouse.radius;
    let force = (maxDistance - distance) / maxDistance;
    let directionX = forceDirectionX * force * this.density;
    let directionY = forceDirectionY * force * this.density;
    if (distance < mouse.radius) {
      this.x -= directionX;
      this.y -= directionY;
    } else {
      if (this.x !== this.baseX) {
        let dx = this.x - this.baseX;
        this.x -= dx / 5;
      }
      if (this.y !== this.baseY) {
        let dy = this.y - this.baseY;
        this.y -= dy / 5;
      }
    }
  }
}

function init() {
  particlearray == [];
  for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
    for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
      if (
        textCoordinates.data[y * 4 * textCoordinates.width + x * 4 + 3] > 128
      ) {
        let positionX = x;
        let positionY = y;
        particlearray.push(new Particle(positionX * 5, positionY * 5));
      }
    }
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
  connect();
  requestAnimationFrame(animate);
}

animate();

function connect() {
  let opacity = 1;
  for (let a = 0; a < particlearray.length; a++) {
    for (let b = a; b < particlearray.length; b++) {
      let dx = particlearray[a].x - particlearray[b].x;
      let dy = particlearray[a].y - particlearray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 14) {
        opacity = 1 - distance / 14;
        ctx.strokeStyle = "rgba(0,0,0," + opacity + ")";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(particlearray[a].x, particlearray[a].y);
        ctx.lineTo(particlearray[b].x, particlearray[b].y);
        ctx.stroke();
      }
    }
  }
}
