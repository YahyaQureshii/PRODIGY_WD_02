let isRunning = false;
let startTime, updatedTime, difference, interval, lapCount = 1;
let savedTime = 0;

const timeDisplay = document.querySelector('.time-display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

// Clock hands
const secondHand = document.querySelector('.second-hand');
const minuteHand = document.querySelector('.minute-hand');
const hourHand = document.querySelector('.hour-hand');

startStopButton.addEventListener('click', () => {
  if (!isRunning) {
    startTime = new Date().getTime() - savedTime;
    interval = setInterval(updateTime, 1000 / 60); 
    startStopButton.textContent = 'Stop';
  } else {
    clearInterval(interval);
    savedTime = difference;
    startStopButton.textContent = 'Start';
  }
  isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
  clearInterval(interval);
  isRunning = false;
  savedTime = 0;
  difference = 0;
  timeDisplay.textContent = '00:00:00';
  startStopButton.textContent = 'Start';
  laps.innerHTML = '';
  lapCount = 1;

  secondHand.style.transform = `rotate(90deg)`;
  minuteHand.style.transform = `rotate(90deg)`;
  hourHand.style.transform = `rotate(90deg)`;
});

lapButton.addEventListener('click', () => {
  if (isRunning) {
    const li = document.createElement('li');
    li.textContent = `Lap ${lapCount}: ${timeDisplay.textContent}`;
    laps.appendChild(li);
    lapCount++;
  }
});

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor(difference / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  timeDisplay.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

  const secondsDegrees = ((seconds / 60) * 360) + 90;
  const minutesDegrees = ((minutes / 60) * 360) + 90;
  const hoursDegrees = ((hours / 12) * 360) + 90;

  secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
  minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
  hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
}

function pad(unit) {
  return ('0' + unit).slice(-2);
}
