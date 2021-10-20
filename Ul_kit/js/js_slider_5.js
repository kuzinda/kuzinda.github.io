var s = document.createElement('style');
document.head.appendChild(s);

var inputDiv = document.querySelector('#inputDiv');
var w = parseInt(window.getComputedStyle(inputDiv, null).getPropertyValue("width"));

var elInput = document.querySelector("#rage-5[type='range']");
elInput.style.width = w +"px";
var inputMin = elInput.getAttribute('min');
var inputMax = elInput.getAttribute('max');
var k = w/(inputMax - inputMin);

var etiqueta = document.querySelector('#etiqueta');
var ew = parseInt(window.getComputedStyle(etiqueta, null).getPropertyValue("width"));


etiqueta.innerHTML = elInput.value;
etiqueta.style.left =  ((elInput.value * k) - (ew/2))+"px";
s.textContent ="#rage-5[type=range]::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, #18A0FB "+elInput.value+"%,#E0E0E0 "+elInput.value+"%)}"
s.textContent +="#rage-5[type=range]::-moz-range-track{ background-image:-moz-linear-gradient(left, #18A0FB "+elInput.value+"%,#E0E0E0  "+elInput.value+"%)}"



elInput.addEventListener('input',function(){
	
etiqueta.innerHTML =elInput.value;
etiqueta.style.left =  ((elInput.value * k) - (ew/2))+"px";
s.textContent ="#rage-5[type=range]::-webkit-slider-runnable-track{ background-image:-webkit-linear-gradient(left, #18A0FB "+elInput.value+"%,#E0E0E0 "+elInput.value+"%)}"
s.textContent +="#rage-5[type=range]::-moz-range-track{ background-image:-moz-linear-gradient(left, #18A0FB "+elInput.value+"%,#E0E0E0 "+elInput.value+"%)}"

}, false);