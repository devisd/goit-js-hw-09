function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]')
const stopBtn = document.querySelector('[data-stop]')
const bodyBackground = document.querySelector('body')

startBtn.addEventListener('click', onChangeBackgroundColor)

function onChangeBackgroundColor() {
    return bodyBackground.style.backgroundColor = getRandomHexColor()
}

stopBtn.addEventListener('click', onStopChangeColor)

function onStopChangeColor() {
  console.log('stop');
}