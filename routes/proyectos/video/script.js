const myVideo = document.querySelector("#myVideo");
const playPauseButton = document.querySelector("#playPause");
const muteButton = document.querySelector("#mute");
const fullScreenButton = document.querySelector("#fullScreen");
const volumeBar = document.querySelector("#volumeBar");
const progressBar = document.querySelector("#progressBar");

const buttonsContent = {
  play: '<img width="20px" height="20px" src="/assets/play.png" alt="Play" />',
  pause: '<img width="20px" height="20px" src="/assets/pause.png" alt="Pause" />',
  mute: '<img width="20px" height="20px" src="/assets/mute.png" alt="Mute" />',
  unmute: '<img width="20px" height="20px" src="/assets/unmute.png" alt="Unmute" />',
  fullScreen: '<img width="20px" height="20px" src="/assets/fullscreen.png" alt="Full Screen" />',
};

const initialConfig = {
  volume: 0.2,
  muted: false,
  paused: true,
  fullScreen: false,
};

let auxVolume = 0;

playPauseButton.addEventListener("click", playPauseVideo);
muteButton.addEventListener("click", muteVideo);
fullScreenButton.addEventListener("click", fullScreenVideo);
volumeBar.addEventListener("change", changeVolume);
progressBar.addEventListener("change", changeProgressBar);

myVideo.addEventListener("timeupdate", function () {
  const percentage = Math.floor((100 / myVideo.duration) * myVideo.currentTime);
  document.querySelector("#progressBar").value = percentage;
  document.querySelector("#progressBar").innerHTML = percentage + "% played";

  if (myVideo.ended) playPauseButton.innerHTML = buttonsContent.play;
});

window.onload = loadInitialConfig();

function loadInitialConfig() {
  myVideo.volume = initialConfig.volume;
  myVideo.muted = initialConfig.muted;
  myVideo.paused = initialConfig.paused;
  myVideo.fullScreen = initialConfig.fullScreen;
  volumeBar.value = initialConfig.volume;

  playPauseButton.innerHTML = buttonsContent.play;
  muteButton.innerHTML = buttonsContent.unmute;
  fullScreenButton.innerHTML = buttonsContent.fullScreen;
}

function playPauseVideo() {
  if (myVideo.paused) {
    myVideo.play();
    playPauseButton.innerHTML = buttonsContent.pause;
  } else {
    myVideo.pause();
    playPauseButton.innerHTML = buttonsContent.play;
  }
}

function muteVideo() {
  if (!myVideo.muted) {
    myVideo.muted = true;
    muteButton.innerHTML = buttonsContent.mute;
    auxVolume = myVideo.volume;
    volumeBar.value = 0;
  } else {
    myVideo.muted = false;
    muteButton.innerHTML = buttonsContent.unmute;
    volumeBar.value = auxVolume;
    if (volumeBar.value == 0) volumeBar.value = initialConfig.volume;

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
  if (myVideo.volume == 0) {
    myVideo.muted = true;
    muteButton.innerHTML = buttonsContent.mute;
  } else {
    myVideo.muted = false;
    muteButton.innerHTML = buttonsContent.unmute;
  }


}

function changeProgressBar() {
  const time = myVideo.duration * (progressBar.value / 100);
  myVideo.currentTime = time;

  if (progressBar.value == 100) playPauseButton.innerHTML = buttonsContent.play;
  else if (myVideo.paused) playPauseButton.innerHTML = buttonsContent.play;
  else playPauseButton.innerHTML = buttonsContent.pause;
}
