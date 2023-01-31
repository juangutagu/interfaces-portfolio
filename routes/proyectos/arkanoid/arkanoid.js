let x = 200;
let y = 400;
let dx = Number(randomDx());
let dy = -4;
let ctx;
let WIDTH;
let HEIGHT;
let paddlex;
let paddleh = 10;
let paddlew = 75;
let rightDown = false;
let leftDown = false;
let canvasMinX = 0;
let canvasMaxX = 0;
let intervalId = 0;
let bricks;
let NROWS = 5;
let NCOLS = 5;
let BRICKWIDTH;
let BRICKHEIGHT = 15;
let PADDING = 1;
let PADDLE_PADDING = 40;
let lifes = 3;

function init() {
  lifes = 3;

  ctx = $("#canvas")[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  paddlex = WIDTH / 2;
  BRICKWIDTH = WIDTH / NCOLS - 1;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  intervalId = setInterval(draw, 10);
}

function randomDx() {
  simbolo = Math.random() > 0.5 ? "" : "-";
  return simbolo.concat(Math.random() * 5);
}

function resetBall() {
  x = 200;
  y = 400;
  dx = Number(randomDx());
  dy = -4;
}

function circle(x, y, r) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.fill();
}

function rect(x, y, w, h) {
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.closePath();
  ctx.fill();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  rect(0, 0, WIDTH, HEIGHT);
}

function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

function onMouseMove(evt) {
  if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
    paddlex = Math.max(evt.pageX - canvasMinX - paddlew / 2, 0);
    paddlex = Math.min(WIDTH - paddlew, paddlex);
  }
}

$(document).mousemove(onMouseMove);

function initbricks() {
  bricks = new Array(NROWS);
  for (i = 0; i < NROWS; i++) {
    bricks[i] = new Array(NCOLS);
    for (j = 0; j < NCOLS; j++) {
      bricks[i][j] = NROWS - i;
    }
  }
}

function drawbricks() {
  for (i = 0; i < NROWS; i++) {
    for (j = 0; j < NCOLS; j++) {
      ctx.fillStyle = rowcolors[bricks[i][j] - 1];
      if (bricks[i][j] !== 0) {
        rect(j * (BRICKWIDTH + PADDING) + PADDING, i * (BRICKHEIGHT + PADDING) + PADDING, BRICKWIDTH, BRICKHEIGHT);
      }
    }
  }
}

function drawLifes(lifes) {
    let heart = "♥";
    let hearts = heart.repeat(lifes);
    ctx.fillStyle = "red";
    ctx.textAlign = "left";
    ctx.textBaseline = "bottom";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText(hearts, 10, HEIGHT - 10);
}
