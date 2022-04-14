import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';

const inputDate = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const fieldFormSeconds = document.querySelector('.value[data-seconds]');
const fieldFormMinutes = document.querySelector('.value[data-minutes]');
const fieldFormHours = document.querySelector('.value[data-hours]');
const fieldFormDays = document.querySelector('.value[data-days]');

let inputChooseDate = null;

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDate) {
    inputChooseDate = selectedDate[0].getTime();
    let nowDate = options.defaultDate.getTime();
    if (inputChooseDate < nowDate) {
      Notify.failure('Please choose a date in the future');
      return;
    };

    startBtn.removeAttribute('disabled');
    startBtn.addEventListener('click', onBtnStart);
  },
};

flatpickr(inputDate, options);

function onBtnStart() {
  Notify.info('Start the countdown');
  const timerId = setInterval(() => {
    let result = inputChooseDate - Date.now();
    if (result <= 1) {
      clearInterval(timerId);
      result = 0;
      Notify.success('Selected date has arrived');
    };

    startBtn.setAttribute('disabled', true);
    const timeRest = convertMs(result);

    fieldFormSeconds.textContent = `${pad(timeRest.seconds)}`
    fieldFormMinutes.textContent = `${pad(timeRest.minutes)}`
    fieldFormHours.textContent = `${pad(timeRest.hours)}`
    fieldFormDays.textContent = `${pad(timeRest.days)}`
  }, 1000);
};


function pad(value) {
  return String(value).padStart(2, '0');
};


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};