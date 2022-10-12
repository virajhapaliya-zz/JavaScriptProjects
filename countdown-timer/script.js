const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minuteEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const newYears = "1 Jan 2023";

function countdown() {
  const newYearsDate = new Date(newYears);
  const currentYearsDate = new Date();

  const totalSeconds = (newYearsDate - currentYearsDate) / 1000;

  const days = Math.floor(totalSeconds / 3600 / 24);
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const seconds = Math.floor(totalSeconds) % 60;

  daysEl.innerHTML = days;
  hoursEl.innerHTML = formatTime(hours);
  minuteEl.innerHTML = formatTime(minutes);
  secondsEl.innerHTML = formatTime(seconds);
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}
// Init call
countdown();

setInterval(countdown, 1000);
