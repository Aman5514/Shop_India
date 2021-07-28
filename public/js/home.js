const menuBtn = document.querySelector(".menubtn");
const closebtn = document.querySelector(".close");
const Slidemenu = document.querySelector(".sliding-menu");

 menuBtn.addEventListener("click",()=>
 {
    Slidemenu.classList.add("active-slide-menu");
 })
 closebtn.addEventListener("click",()=>
 {
   Slidemenu.classList.remove("active-slide-menu");
 })