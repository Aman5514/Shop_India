const searchbtn = document.getElementById("searchbtn");
const menu = document.getElementById("menu");
const sideMenu = document.getElementById("sidemenu")
const mainContainer = document.getElementById("main_container")

searchbtn.addEventListener("click", (event)=>
{
    event.preventDefault();
    
});

menu.addEventListener("click",()=>
{
    sideMenu.classList.toggle("active")
    mainContainer.classList.toggle("active_main_container")
    menu.classList.toggle("active_menu")
    
});
