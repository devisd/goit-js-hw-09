import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  } else {
    Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  }
}

const form = document.querySelector('form');
const createBtn = document.querySelector('button');
let DELAY = 0;
let STEP = 0;
let AMOUNT = 0;
let amountValue = 0;

form.elements.delay.addEventListener('input', onInput);
form.elements.step.addEventListener('input', onStep);
form.elements.amount.addEventListener('input', onAmount);
createBtn.addEventListener('click', onCreatePromise);

function onInput() {
  DELAY = form.elements.delay.value;
}
function onStep() {
  STEP = form.elements.step.value;
}
function onAmount() {
  AMOUNT = form.elements.amount.value;
}

function onCreatePromise(e) {
  e.preventDefault();

  return new Promise(() => {
    const interval = setInterval(() => {
      amountValue += 1;
      console.log(AMOUNT);
      console.log(amountValue);

      if (amountValue === Number(AMOUNT)) {
        clearInterval(interval);
      }
      setTimeout(() => {
      createPromise();
    }, DELAY);
    }, STEP);
  })
}
