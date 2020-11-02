"use strict";
const btn_dropMenu = document.getElementById("btn_dropMenu");
const navMenu = document.querySelector(".nav_menu");
btn_dropMenu.addEventListener('click', ()=>{
        btn_dropMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
})













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



(function(){
        const canvas = document.getElementById("canvas");
        canvas.width=innerWidth;
        canvas.height = innerHeight;
        const ctx = canvas.getContext("2d");
       const particles=[];
       const  properties={
                particleCount:50,
                particleMaxVelocity:0.2,
                color:{r:1, g:1,b:1,a:1},
                loopCount:0,
                img:new Image(10,10)
        }
        class Particle{
                constructor(){
                        this.x = Math.random()*canvas.width;
                        this.y = Math.random()*canvas.height;
                        this.radius = (Math.random()*(3.2-1))+1;
                        //speed
                        this.velocityX = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;
                        this.velocityY = Math.random()*(properties.particleMaxVelocity*2)-properties.particleMaxVelocity;


                }
                position(){
                        this.x+=this.velocityX;
                        this.y+=this.velocityY;
                }
                color(){

                        properties.color.r= Math.random()*(255+1)-1;
                        properties.color.g= Math.random()*(255+1)-1;
                        properties.color.b= Math.random()*(255+1)-1;
                        properties.color.a= Math.random()*(0.8+0.1)-0.1;
                        console.log()

                }
                draw(){

                        // properties.img.src = 'https://mdn.mozillademos.org/files/5397/rhino.jpg';
                        // ctx.drawImage(properties.img,canvas.width/2,canvas.height/2)

                        ctx.beginPath();
                        ctx.arc(this.x,this.y, this.radius , 0, Math.PI*2);
                        ctx.closePath();
                        ctx.fillStyle=`rgba(${properties.color.r},${properties.color.g},${properties.color.b},${properties.color.a})`
                        ctx.fill();
                }
        }

        function clearCanvas(){
                //Czyscimy canvas
                ctx.clearRect(0,0,canvas.width,canvas.height)
        }
        function reDrawParticles(){
                //dla każdej instancii wywolujemy metody 
                for (const i in particles) {
                        particles[i].position();
                        particles[i].color();
                        particles[i].draw();
                }
        }

        function stops(){
                //stop frame
                properties.loopCount++;
        }

        function loop(){
                stops();
                if(
                        properties.loopCount%10==0
                ){
                clearCanvas();
                reDrawParticles();
                properties.loopCount=0;
        }
        requestAnimationFrame(loop);
        }

       function init(){
               for(let i=0; i<properties.particleCount; i++){
                       particles.push(new Particle);
               }
              loop();
       }  
      init();

}())

