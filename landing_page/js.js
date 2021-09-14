var menuButton = document.querySelector (".menu-button");

var menu = document.querySelector('.header__nav');

menuButton.addEventListener('click', function (){

menuButton.classList.toggle ('menu-button-active');
menu.classList.toggle ('header__active');

});

var menuButton = document.querySelector (".menu-button"); 

var link = document.querySelector('.header__menu');

var menuClose = document.querySelector('.header__nav');

link.addEventListener('click', function (){

link.classList.toggle ('link-active');

menuButton.classList.remove ('menu-button-active'); 

menuClose.classList.toggle ('header__active');

});