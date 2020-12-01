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



function Stars(){
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

                        properties.color.r= Math.random()*(255-250)+250;
                        properties.color.g= Math.random()*(255-250)+250;
                        properties.color.b= Math.random()*(255-250)+250;
                        properties.color.a= Math.random()*(0.8-0.1)+0.1;

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

}    
setTimeout(Stars,6000); 


(function(){
        const earth =document.querySelector('.earth');
        const canvas= document.querySelector("canvas");
        const frames = [...document.querySelectorAll('.frame')];
        const planets = [...document.querySelectorAll('.planet')]
         let posX; 
         let posY;
         let x;
         let y;

      function scrambler(){
              
        
        const link = document.querySelector('.earth>a');
        const text = [...link.textContent];
        const char='aboutme';
        const alfabet = 'abcdefghijklmnopqrstuvwxyz! <>-_ \\/[]{}—=+*^?#________';
        let index=0;
        let thirdIndex =0;
        let min = 0;
        let i=0;

        setTimeout(function letterRoll(){
                if(text[i] == char[i]){
                        min++;
                        i++;
                }
                else if(i == char.length) return 

                index = Math.floor(Math.random()*(text.length-min))+min;
                thirdIndex  = Math.floor(Math.random()*alfabet.length);
                if(index < char.length) text.splice(index,1,alfabet[thirdIndex]);   
                link.textContent = text.join(' ');
                setTimeout(letterRoll,1)                    
        }, 1000)

      }

        scrambler();


         document.addEventListener('mousemove',(e)=>{
                 planets.forEach( (pl, i)=>{
                         posX = earth.offsetLeft;
                         posY = earth.offsetTop;
                         if(i ==  0){
                                 x =  e.clientX/50;
                                 y =  e.clientY/50;
                                 pl.style.transform = `translate(${x}px, ${y}px)`;
                                }
                        if(i==1){
                                x =  e.clientX/30;
                                y =  e.clientY/30;
                                pl.style.transform = `translate(${x}px, ${y}px)`;
                }
                        if(i==2){
                                x =  e.clientX/70;
                                y =  e.clientY/70;
                                pl.style.transform = `translate(${x}px, ${y}px)`;
                }
                        if(i==3){
                                x =  e.clientX/90;
                                y =  e.clientY/90;
                                pl.style.transform = `translate(${x}px, ${y}px)`;
                }
                         else{  
                                x =  e.clientX/300;
                                y =  e.clientY/300;
                                canvas.style.transform = `translate(${x}px, ${y}px)`;}
                })
        })
        
       const changeFrame = (index)=>{
               frames[index].classList.toggle('activeFrame')

       } 
        planets.forEach((planet, index) => {
          planet.addEventListener('click', function(){
          this.classList.add('trans');
          this.style.transform = `scale(${60}) translateX(${-50}px)`;
          this.style.opacity = 0.1;

          changeFrame(index);
          
        }) 
        })

}() )

