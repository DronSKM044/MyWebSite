const change = document.getElementById("toggle");
function toggle(){

        change.classList.toggle('active');
}

let clouds=[];
let vertical = 0;
let horizontal = -200;
let moveX =0;
const container = document.querySelector('.container');
for(let i=0; i<10; i++){
        let cloud = document.createElement("div");
        vertical=vertical+Math.floor(Math.random() * 100);
        horizontal=horizontal+Math.floor(Math.random() * 100);

        cloud.style.left = horizontal+"px";
         cloud.style.top = vertical+"px";
         cloud.classList.add("clouds");
         container.appendChild(cloud);
 }



 const canvas =document.getElementById("canvas");
 if(canvas.getContext){
 const ctx = canvas.getContext("2d");} 