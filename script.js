"use strict";

const btn_dropMenu = document.getElementById("btn_dropMenu");
const navMenu = document.querySelector(".nav_menu");
btn_dropMenu.addEventListener("click", () => {
  btn_dropMenu.classList.toggle("active");
  navMenu.classList.toggle("active");
});

let isNav = true;

function planetNavigation() {
  const a = [...document.querySelectorAll("a.children")];

  // a.forEach((link) => {
  //   link.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     const href = link.getAttribute("href");
  //     setTimeout(() => {
  //       window.location.href =
  //         "http://127.0.0.1:5500/Projects/MyWebSite/index.html" + href;
  //     }, 2500);
  //     return (isNav = false);
  //   });
  // });
}

let clouds = [];
let vertical = 0;
let horizontal = -200;
let moveX = 0;
const container = document.querySelector(".onEarth");
// for(let i=0; i<10; i++){
//         let cloud = document.createElement("div");
//         vertical=vertical+Math.floor(Math.random() * 100);
//         horizontal=horizontal+Math.floor(Math.random() * 100);

//         cloud.style.left = horizontal+"px";
//          cloud.style.top = vertical+"px";
//          cloud.classList.add("clouds");
//          container.appendChild(cloud);
//  }

function Stars() {
  const canvas = document.getElementById("canvas");
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  const ctx = canvas.getContext("2d");
  const particles = [];
  const properties = {
    particleCount: 50,
    particleMaxVelocity: 0.2,
    color: { r: 1, g: 1, b: 1, a: 1 },
    loopCount: 0,
    img: new Image(10, 10),
  };
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * (3.2 - 1) + 1;
      //speed
      this.velocityX =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
      this.velocityY =
        Math.random() * (properties.particleMaxVelocity * 2) -
        properties.particleMaxVelocity;
    }
    position() {
      this.x += this.velocityX;
      this.y += this.velocityY;
    }
    color() {
      properties.color.r = Math.random() * (255 - 250) + 250;
      properties.color.g = Math.random() * (255 - 250) + 250;
      properties.color.b = Math.random() * (255 - 250) + 250;
      properties.color.a = Math.random() * (0.8 - 0.1) + 0.1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fillStyle = `rgba(${properties.color.r},${properties.color.g},${properties.color.b},${properties.color.a})`;
      ctx.fill();
    }
  }

  function clearCanvas() {
    //Czyscimy canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function reDrawParticles() {
    //dla każdej instancii wywolujemy metody
    for (const i in particles) {
      particles[i].position();
      particles[i].color();
      particles[i].draw();
    }
  }

  function stops() {
    //stop frame
    properties.loopCount++;
  }

  function loop() {
    stops();
    if (properties.loopCount % 10 == 0) {
      clearCanvas();
      reDrawParticles();
      properties.loopCount = 0;
    }
    requestAnimationFrame(loop);
  }

  function init() {
    for (let i = 0; i < properties.particleCount; i++) {
      particles.push(new Particle());
    }
    loop();
  }
  init();
}
setTimeout(Stars, 6000);

(function () {
  const earth = document.querySelector(".earth");
  const canvas = document.querySelector("canvas");
  const frames = [...document.querySelectorAll(".frame")];
  const planets = [...document.querySelectorAll(".planet")];
  let posX;
  let posY;
  let x;
  let y;

  planetNavigation();

  document.addEventListener("mousemove", (e) => {
    if (isNav) {
      planets.forEach((pl, i) => {
        posX = earth.offsetLeft;
        posY = earth.offsetTop;
        if (i == 0) {
          x = e.clientX / 50;
          y = e.clientY / 50;
          pl.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (i == 1) {
          x = e.clientX / 30;
          y = e.clientY / 30;
          pl.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (i == 2) {
          x = e.clientX / 70;
          y = e.clientY / 70;
          pl.style.transform = `translate(${x}px, ${y}px)`;
        }
        if (i == 3) {
          x = e.clientX / 90;
          y = e.clientY / 90;
          pl.style.transform = `translate(${x}px, ${y}px)`;
        } else {
          x = e.clientX / 300;
          y = e.clientY / 300;
          canvas.style.transform = `translate(${x}px, ${y}px)`;
        }
      });
    } else return;
  });

  planets.forEach((planet, index) => {
    planet.addEventListener("click", function () {
      this.classList.add("trans");
      this.style.transform = `scale(${60}) translateX(${-50}px)`;
      this.style.opacity = 0.1;
    });
  });
})();

function oldScram() {
  const data = {
    planets: [...document.querySelectorAll(".planet")],
    alfabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ! <>-_ \\/[]{}—=+*^?#______",
    intervalID: 0,
    arr: [],
    savedText: [],
    increaseIndex: 0,
  };

  data.planets.forEach((planetText) => {
    data.savedText.push(planetText.textContent);
  });

  function textScrambler(item, index) {
    // realizovać logikę zmiany liter dla tej funkcji i w prszypadku opuszczenia obiektu myszką zamienić na odpowidnie słowa
    let compareChar =
      data.alfabet[Math.floor(Math.random() * data.alfabet.length)];
    data.arr.splice(data.increaseIndex, data.increaseIndex, compareChar);
    if (data.savedText[index][data.increaseIndex] == compareChar) {
      data.increaseIndex++;
    } else if (data.savedText[index].length == data.increaseIndex) {
      return;
    }

    data.planets[index].innerHTML = data.arr.join("");
  }

  data.planets.forEach((item, index) => {
    item.addEventListener("mouseover", (e) => {
      clearInterval(data.intervalID); // wyczyscamy interval przy każdym nasunięcią myszki na obiekt
      data.arr = [];

      data.intervalID = setInterval(() => textScrambler(item, index), 20);
    });
    item.addEventListener("mouseout", () => {
      //-- wyczyscamy interval przy każdym opuszczeniu myszki z obiektu
      data.planets[index].innerHTML = data.savedText[index];
      data.increaseIndex = 0;
      clearInterval(data.intervalID);
    });
  });
}

const planets = [...document.querySelectorAll(".planet")];
planets.forEach((planet) => {
  planet.addEventListener("mouseover", () => {
    const aside = planet.querySelector("aside");
    aside.classList.add("show");
  });
  planet.addEventListener("mouseout", () => {
    const aside = planet.querySelector("aside");
    aside.classList.remove("show");
  });
});
