'use strict';

/* 
* список дата атрибутов
* data-width: задает шиину range в px
* data-type: тип: duble - двойной, single - одинарный
* data-units: отображение единиц измерения
* data-value: применяется к max и к min, 
* задает максимаьное и минимальное значение диапазона соотетственно
*/

// получаем элементы min, max, fill и самого блока range
const min = document.querySelector('.min-range-item');
const max = document.querySelector('.max-range-item');
const rangeBlock = document.querySelector('.range');
let fill = document.querySelector('.range-fill');
const infoBox = document.querySelector('.info');
 

// блоки для вывода текущих параметров сортировки по цене (min - max)
let minInfo = document.querySelector('.min-price');
let maxInfo = document.querySelector('.max-price');


// получаем настройки из data аттрибутов
const dataWidth = +rangeBlock.dataset.width;
const dataType = rangeBlock.dataset.type;
const dataUnits = rangeBlock.dataset.units;
const dataMinVal = +min.dataset.value;
const dataMaxVal = +max.dataset.value;

// получаем начальную точку блока range
const startX = rangeBlock.getBoundingClientRect().x;

// если 2 ползука берём их ширину для расчетов, чтоб не наезжали друг на друга
let shiftMax = max.clientWidth;
let shiftMin = min.clientWidth;

// проверяем настрйки типа, если одинарный - убираем минимальный ползунок
if (dataType === 'single') {
  min.style.display = 'none';
  document.querySelector('.min-box').style.display = 'none';
  shiftMin = 0;
}
if (dataType === 'duble') {
  min.style.display = 'block';
  document.querySelector('.min-box').style.display = 'block';
}

// параметры ползунков
let minValue = startX;
let maxValue = startX + dataWidth - shiftMax;

// задаем стили их дата атрибутов
rangeBlock.style.width = dataWidth + 'px';
infoBox.style.width = dataWidth + 'px';
minInfo.insertAdjacentHTML('beforebegin', dataUnits);
minInfo.insertAdjacentHTML('afterbegin', dataMinVal);
maxInfo.insertAdjacentHTML('beforebegin', dataUnits);
maxInfo.insertAdjacentHTML('afterbegin', dataMaxVal);

// задаем инлайново стили, чтобы потом былм данные
min.style.left = 0 + 'px';
max.style.left = dataWidth - shiftMax + 'px';

/**
 * запускаем функцию при нажатии кнопки мыши
 * @param event {Event} событие
 */
const check = (event) => {

    // чтобы не терять таргет - отслеживаем тот ползунок, на котором было событие mousedown
    let targetMain = event.target;

    // корректные значения допустимые для перемещения ползунка, используются дальше
    let currentMaxValue, currentMinValue;

    /**
     * отслеживаем перемещение мыши и вычисляем координаты ползунка)
     * @param event {Event} событие
     */
    const move = (event) => {

        // у touch события массив эвентов, сводим к одной переменой этим условием
        let e;
        (event.type === 'touchmove') ? e = event.touches[0] : e = event;
        
        // если таргет максимальное значение
        if (targetMain === max) {
            currentMaxValue = maxValue;
            currentMinValue = parseInt(min.style.left) + shiftMin + startX;
        }

        // если таргет минимальное значение
        if (targetMain === min) {
            currentMinValue = minValue;
            currentMaxValue = parseInt(max.style.left) - shiftMax + startX;
        }

        // меняем положение активного ползунка от края и до другого ползунка
        if (e.clientX - (shiftMin / 2) > currentMinValue && e.clientX - (shiftMax / 2) < currentMaxValue) {
            targetMain.style.left = e.clientX - startX - (shiftMax / 2) + 'px';
        } else if (e.clientX < currentMinValue && targetMain === min) {
            targetMain.style.left = 0 + 'px';
        } else if (e.clientX > currentMaxValue && targetMain === max) {
            targetMain.style.left = dataWidth - shiftMax + 'px';
        } else if (e.clientX < currentMinValue && targetMain === max && shiftMin === 0) {
          targetMain.style.left = 0 + 'px';
          }

        // изменяем зарисовку между ползунками
        fill.style.left = min.style.left;
        fill.style.width = parseInt(max.style.left) - parseInt(min.style.left) + shiftMax + 'px';

        // выводим информацию о выбранном диапазоне цен
        let targetPrice;
        (targetMain === max) ? targetPrice = maxInfo : targetPrice = minInfo;
        targetPrice.textContent = parseInt(targetMain.style.left) * (dataMaxVal - dataMinVal ) / (dataWidth - shiftMax) + dataMinVal + '';
    }

    // вешаем слушатель на движение мыши по всему документу
    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);

    /**
     * если отпустили кнопку - удаляем слушатели на перемещение мыши
     */
    let mouseUpFn = () => {
        document.removeEventListener('mousemove', move);
        document.removeEventListener('touchmove', move);
    }

    // ждем отпускания лкм чтобы убить слушатель движения мыши
    document.addEventListener('mouseup', mouseUpFn);
    document.addEventListener('touchend', mouseUpFn);
}

rangeBlock.addEventListener('mousedown', check);
rangeBlock.addEventListener('touchstart', check);

var inputsRy = {
    sliderWidth: 300,
    minRange: 0,
    maxRange: 50, 
    outputWidth:30, // output width
    thumbWidth: 24, // thumb width
    thumbBorderWidth: 1,
    trackHeight: 2,
    theValue: [15, 34] // theValue[0] < theValue[1]
  };
  var isDragging0 = false;
  var isDragging1 = false;
  
  var range = inputsRy.maxRange - inputsRy.minRange;
  var rangeK = inputsRy.sliderWidth / range;
  var container = document.querySelector(".container");
  var thumbRealWidth = inputsRy.thumbWidth + 2 * inputsRy.thumbBorderWidth;
  
  // styles
  var slider = document.querySelector(".slider");
  slider.style.height = inputsRy.trackHeight + "px";
  slider.style.width = inputsRy.sliderWidth + "px";
  slider.style.paddingLeft = (inputsRy.theValue[0] - inputsRy.minRange) * rangeK + "px";
  slider.style.paddingRight = inputsRy.sliderWidth - inputsRy.theValue[1] * rangeK + "px";
  
  var track = document.querySelector(".track");
  track.style.width = inputsRy.theValue[1] * rangeK - inputsRy.theValue[0] * rangeK + "px";
  
  var thumbs = document.querySelectorAll(".thumb");
  for (var i = 0; i < thumbs.length; i++) {
  
    thumbs[i].style.width = thumbs[i].style.height = inputsRy.thumbWidth + "px";
    console.log(inputsRy.thumbWidth + "px");
    thumbs[i].style.borderWidth = inputsRy.thumbBorderWidth + "px";
    thumbs[i].style.top = -(inputsRy.thumbWidth / 2 + inputsRy.thumbBorderWidth - inputsRy.trackHeight / 2) + "px";
    thumbs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK - (thumbRealWidth / 2) + "px";
  
  }
  var outputs = document.querySelectorAll(".output");
  for (var i = 0; i < outputs.length; i++) {
    console.log(thumbs[i])
    outputs[i].style.width = outputs[i].style.height = outputs[i].style.lineHeight = outputs[i].style.left = inputsRy.outputWidth + "px";
    outputs[i].style.top = -(Math.sqrt(2 * inputsRy.outputWidth * inputsRy.outputWidth) + inputsRy.thumbWidth / 2 - inputsRy.trackHeight / 2) + "px";
    outputs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
    outputs[i].innerHTML = "<p>" + inputsRy.theValue[i] + "</p>";
  }
  
  //events
  
  thumbs[0].addEventListener("mousedown", function(evt) {
    isDragging0 = true;
  }, false);
  thumbs[1].addEventListener("mousedown", function(evt) {
    isDragging1 = true;
  }, false);
  container.addEventListener("mouseup", function(evt) {
    isDragging0 = false;
    isDragging1 = false;
  }, false);
  container.addEventListener("mouseout", function(evt) {
    isDragging0 = false;
    isDragging1 = false;
  }, false);
  
  container.addEventListener("mousemove", function(evt) {
    var mousePos = oMousePos(this, evt);
    var theValue0 = (isDragging0) ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[0];
    console.log(theValue0);
    var theValue1 = (isDragging1) ? Math.round(mousePos.x / rangeK) + inputsRy.minRange : inputsRy.theValue[1];
  
    if (isDragging0) {
  
      if (theValue0 < theValue1 - (thumbRealWidth / 2) &&
        theValue0 >= inputsRy.minRange) {
        inputsRy.theValue[0] = theValue0;
        thumbs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - (thumbRealWidth / 2) + "px";
        outputs[0].style.left = (theValue0 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
        outputs[0].innerHTML = "<p>" + theValue0 + "</p>";
        slider.style.paddingLeft = (theValue0 - inputsRy.minRange) * rangeK + "px";
        track.style.width = (theValue1 - theValue0) * rangeK + "px";
  
      }
    } else if (isDragging1) {
  
      if (theValue1 > theValue0 + (thumbRealWidth / 2) &&
        theValue1 <= inputsRy.maxRange) {
        inputsRy.theValue[1] = theValue1;
        thumbs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - (thumbRealWidth / 2) + "px";
        outputs[1].style.left = (theValue1 - inputsRy.minRange) * rangeK - inputsRy.outputWidth / 2 + "px";
        outputs[1].innerHTML = "<p>" + theValue1 + "</p>";
        slider.style.paddingRight = (inputsRy.maxRange - theValue1) * rangeK + "px";
        track.style.width = (theValue1 - theValue0) * rangeK + "px";
  
      }
    }
  
  }, false);
  
  // helpers
  
  function oMousePos(elmt, evt) {
    var ClientRect = elmt.getBoundingClientRect();
    return { //objeto
      x: Math.round(evt.clientX - ClientRect.left),
      y: Math.round(evt.clientY - ClientRect.top)
    }
  }