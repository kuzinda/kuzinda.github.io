//const defaultSelect = () => {
  //const element = document.querySelector('.default');
  //const choices = new Choices(element, {
    //searchEnabled: false,
  //});

//};

//defaultSelect();

let select = function () {
    let selectHeader = document.querySelectorAll('.select__header'); //обьявляем модуль родителя
    let selectItem = document.querySelectorAll('.select__item'); //  что бы нужный пункт подставлялся в исх значение

    selectHeader.forEach(item => {
        item.addEventListener('click', selectToggle)
    }); //на каждый item вызывает функцию клика

    selectItem.forEach(item => {
        item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
        this.parentElement.classList.toggle('is-active');
    } //будем исктаь родит элемент, и перключать класс is-active

    function selectChoose() { //  что бы нужный пункт подставлялся в исх значение
        let text = this.innerText,
            select = this.closest('.select'),
            currentText = select.querySelector('.select__current');
        currentText.innerText = text;
        select.classList.remove('is-active');

    }

};


select();

document.querySelectorAll ('.tabs-triggers__item').forEach((item) => ///находим эдементы кнопок и запусукаем цикл
   item.addEventListener('click', function (e){ //навешиваем слушатель, при клике на элмеент, мы останавливаем её
    e.preventDefault();
    const id = e.target.getAttribute('href').replace ('#', '');


    document.querySelectorAll('.tabs-triggers__item').forEach((child) => child.classList.remove('tabs-triggers__item--active')//находим кнопки,дочение элеенты,  и у дочерних  удалился клсс active
    );  
    
    document.querySelectorAll('.tabs-content__item').forEach((child) => child.classList.remove('tabs-triggers__item--active')//тоэе самое для контейнеров
    ); 


    item.classList.add('tabs-triggers__item--active');
    document.getElementById(id).classList.add('tabs-content__item--active');
   })

);

document.querySelector('.tabs-triggers__item').click();



