let ballr = 10;
let rowcolors = ["#EB0093", "#0008DB", "#00A308", "#FFFD0A", "#FF1C0A"];
let paddlecolor = "#FFFFFF";
let ballcolor = "#FFFFFF";
let backcolor = "#000000";

function init() {
  lifes = 3;
  brokenBricks = 0;

  ctx = $("#canvas")[0].getContext("2d");
  WIDTH = $("#canvas").width();
  HEIGHT = $("#canvas").height();
  paddlex = WIDTH / 2;
  BRICKWIDTH = WIDTH / NCOLS - 1;
  canvasMinX = $("#canvas").offset().left;
  canvasMaxX = canvasMinX + WIDTH;
  intervalId = setInterval(draw, 10);
}

function draw() {
  ctx.fillStyle = backcolor;
  clear();
  ctx.fillStyle = ballcolor;
  circle(x, y, ballr);

  // if (ball2) circle(x2, y2, ballr);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  ctx.fillStyle = paddlecolor;
  rect(paddlex, HEIGHT - paddleh - PADDLE_PADDING, paddlew, paddleh);

  drawbricks();
  drawLifes(lifes);

  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;
  row = Math.floor(y / rowheight);
  col = Math.floor(x / colwidth);

  handleBall(row, col, 1);
  checkBonus();

  // if breaks bonusBricks, generate a bonus
  if (brokenBricks >= bonusBricks && !bonusActive) {
    // draw bonus sliding down
    bonusy += bonusdy;
    drawBonus();

    // if bonus is out of canvas, reset bonus
    if (bonusy > HEIGHT) {
      console.log("out");
      resetBonus();
    }
    // if bonus is in the paddle, activate bonus
    else if (bonusy + ballr > HEIGHT - paddleh - PADDLE_PADDING) {
      if (bonusx > paddlex && bonusx < paddlex + paddlew) {
        activateBonus();
      }
    }
  }
}

function play() {
  clearInterval(intervalId);
  resetBall();
  init();
  initbricks();
  resetBonus();

  draw();
}

function gameOver() {
  clearInterval(intervalId);
  ctx.fillStyle = "white";
  ctx.font = "bold 40px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Game Over", WIDTH / 2, HEIGHT / 2);
}

play();
