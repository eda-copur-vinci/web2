const button = document.querySelector('button');
const message = document.querySelector('#timerMessage');

const numberOfClick = 10 * 1000;
const timerAfterMouseTouch = 5 * 1000; 
const maxTime = 5; // in s
const expectedClicks = 10;

button.addEventListener('mouseenter', fiveSecCounter);
button.addEventListener('click', clickCounter);

let timeOut;
let click = 0;
let timerReference;

function fiveSecCounter() {
    timeOut = setTimeout(() => {
    alert(`Game over, you did not click 10 times within 5s !`);
    }, timerAfterMouseTouch);
}

function clickCounter() {
  ++click;
  if (click === expectedClicks) {
    clearTimeout(timeOut);
    alert(`You win ! You clicked 10 times within ${maxTime} ms`);
    ;
}


}



