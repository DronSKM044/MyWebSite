const change = document.getElementById("toggle");
function toggle(){

        change.classList.toggle('active');
}

let clouds=[];
let vertical = 0;
let horizontal = -200;
let moveX =0;
const container = document.querySelector('.container');
// for(let i=0; i<10; i++){
//         let cloud = document.createElement("div");
//         vertical=vertical+Math.floor(Math.random() * 100);
//         horizontal=horizontal+Math.floor(Math.random() * 100);

//         cloud.style.left = horizontal+"px";
//          cloud.style.top = vertical+"px";
//          cloud.classList.add("clouds");
//          container.appendChild(cloud);
//  }







let property = {
        opacity:1,
        radius: Math.floor(Math.random()*10), 
        step:0,
        particlesCount:50,
}
let particlesArray = [];

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height =innerHeight;

class Particle{
        constructor(x,y,radius,opacity){
                this.x = x;
                this.y = y;
                this.radius = radius;
                this.opacity =opacity =Math.floor( Math.random()*10)/10
                
        }
        draw(){
                ctx.beginPath();       
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
                ctx.closePath();
                ctx.fillStyle = `rgba(255,255,255,${this.opacity})`
                ctx.fill()       
        }
        updateOpacity(){
              this.opacity < 0.9 ? this.opacity +=0.1 : this.opacity = 0.1; 
        // return this.opacity = 0
}
        changePosition(){
                this.x = this.x+2;
                this.y = this.y+2;
                this.radius= this.radius-0.1;
        }



}


for(let i= 0; i<=property.particlesCount; i++){
        const particle = new Particle(innerWidth - Math.floor(Math.random()*1000),innerHeight - Math.floor(Math.random()*1000), 2);
        
        particlesArray.push(particle);   
}
function animate(){
        for(let i in particlesArray){
                // particlesArray[i].clear()
               particlesArray[i].changePosition();
               particlesArray[i].draw();
        }
        
 setTimeout(animate,100)

}
function starVisible(){
for(let i in particlesArray){
        particlesArray[i].draw();
}
animate()
console.log(particlesArray);
}
setTimeout(starVisible,2000)





// function loop(){
//         particle.draw()
//         if (property.step <1){
//         console.log("ok");
//         requestAnimationFrame(loop);
//         property.step++;
// }
//         else 
//         console.log(property.step);

// }



