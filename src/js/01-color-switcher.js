function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const bodyBackground = document.querySelector('body')

let timerId = null;

stopBtn.setAttribute('disabled', true);

function onChangeBackgroundColor() {
  timerId = setInterval(() => bodyBackground.style.backgroundColor = getRandomHexColor(), 1000);
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
}

function onStopChangeColor() {
  clearInterval(timerId);
  stopBtn.setAttribute('disabled', true);
  startBtn.removeAttribute('disabled');
}

startBtn.addEventListener('click', onChangeBackgroundColor)
stopBtn.addEventListener('click', onStopChangeColor)