let isStarted = false;
let time = 0;
let timerId;
let laps = [];

let timerRef = document.querySelector("#timer");
let startButton = document.querySelector("#start");
let stopButton = document.querySelector("#stop");
let resetButton = document.querySelector("#reset");
let lapButton = document.querySelector("#lap");
let lapsRef = document.querySelector("#laps");

function convert(ms) {
  let milliseconds = Math.floor((ms % 1000) / 10);
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  milliseconds = milliseconds < 10 ? "0" + milliseconds : milliseconds;

  return minutes + ":" + seconds + ":" + milliseconds;
}

function start() {
  if (isStarted) {
    pause();
  } else {
    isStarted = true;
    startButton.textContent = "Pause";
    timerId = setInterval(() => {
      time += 10;
      timerRef.textContent = convert(time);
    }, 10);
  }
}

function pause() {
  isStarted = false;
  startButton.textContent = "Start";
  clearInterval(timerId);
}

function stop() {
  pause();
  time = 0;
  timerRef.textContent = "00:00:00";
}

function reset() {
  laps = [];
  lapsRef.textContent = "";
  if (isStarted) {
    stop();
    start();
  } else {
    stop();
  }
}

function lap() {
  laps.push(convert(time));
  let div = document.createElement("div");
  div.textContent = `${laps.length}. ${laps[laps.length - 1]}`;
  lapsRef.appendChild(div);
  lapsRef.scrollTop = lapsRef.scrollHeight;
}

timerRef.textContent = "00:00:00";

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);
