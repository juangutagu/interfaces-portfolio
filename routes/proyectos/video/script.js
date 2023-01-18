const myVideo = document.querySelector("#myVideo");
const playPauseButton = document.querySelector("#playPause");
const muteButton = document.querySelector("#mute");
const fullScreenButton = document.querySelector("#fullScreen");
const volumeBar = document.querySelector("#volumeBar");
const progressBar = document.querySelector("#progressBar");

const initialConfig = {
  volume: 0.2,
  muted: false,
  paused: true,
  fullScreen: false,
};

playPauseButton.addEventListener("click", playPauseVideo);
muteButton.addEventListener("click", muteVideo);
fullScreenButton.addEventListener("click", fullScreenVideo);
volumeBar.addEventListener("change", changeVolume);
progressBar.addEventListener("change", changeProgressBar);

myVideo.addEventListener("timeupdate", function () {
  const percentage = Math.floor((100 / myVideo.duration) * myVideo.currentTime);
  document.querySelector("#progressBar").value = percentage;
  document.querySelector("#progressBar").innerHTML = percentage + "% played";

  if (myVideo.ended) playPauseButton.innerHTML = "Replay";
});

window.onload = loadInitialConfig();

function loadInitialConfig() {
  myVideo.volume = initialConfig.volume;
  myVideo.muted = initialConfig.muted;
  myVideo.paused = initialConfig.paused;
  myVideo.fullScreen = initialConfig.fullScreen;
  volumeBar.value = initialConfig.volume;

  playPauseButton.innerHTML = "Play";
  muteButton.innerHTML = "Mute";
  fullScreenButton.innerHTML = "Full Screen";
}

function playPauseVideo() {
  if (myVideo.paused) {
    myVideo.play();
    playPauseButton.innerHTML = "Pause";
  } else {
    myVideo.pause();
    playPauseButton.innerHTML = "Play";
  }
}

function muteVideo() {
  if (myVideo.muted) {
    myVideo.muted = false;
    muteButton.innerHTML = "Mute";
  } else {
    myVideo.muted = true;
    muteButton.innerHTML = "Unmute";
  }
}

function fullScreenVideo() {
  if (myVideo.requestFullscreen) {
    myVideo.requestFullscreen();
  } else if (myVideo.mozRequestFullScreen) {
    myVideo.mozRequestFullScreen();
  } else if (myVideo.webkitRequestFullscreen) {
    myVideo.webkitRequestFullscreen();
  }
}

function changeVolume() {
  myVideo.volume = volumeBar.value;
}

function changeProgressBar() {
  const time = myVideo.duration * (progressBar.value / 100);
  myVideo.currentTime = time;
}
