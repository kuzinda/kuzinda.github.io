var a = 0;
var run = setInterval(frames, 50);
function frames() {
  a = a + 1;
  if (a == 101) {
    clearInterval(run);
  } else {
    var counter = document.querySelector(".num");
    counter.textContent = a + "%";
  }
}