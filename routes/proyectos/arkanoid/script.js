let ballr = 10;
let rowcolors = ["#EB0093", "#89d0ff", "#00A308", "#FFFD0A", "#FF1C0A"];
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
let img = new Image();
img.src = "/assets/arkanoid_background.jpeg";

function draw() {
  // clear canvas
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  
  // background image
  ctx.drawImage(img, 0, 0, WIDTH, HEIGHT+146);

  // draw ball
  ctx.fillStyle = ballcolor;
  if (ball1) circle(x, y, ballr);
  if (ball2) circle(x2, y2, ballr);

  if (rightDown) paddlex += 5;
  else if (leftDown) paddlex -= 5;
  ctx.fillStyle = paddlecolor;
  rect(paddlex, HEIGHT - paddleh - PADDLE_PADDING, paddlew, paddleh);

  drawbricks();
  drawLifes(lifes);

  rowheight = BRICKHEIGHT + PADDING;
  colwidth = BRICKWIDTH + PADDING;

  if (ball1) {
    row = Math.floor(y / rowheight);
    col = Math.floor(x / colwidth);
    handleBall(row, col);
  }

  if (ball2) {
    row2 = Math.floor(y2 / rowheight);
    col2 = Math.floor(x2 / colwidth);
    handleBall2(row2, col2);
  }

  checkBonus();

  // if breaks bonusBricks, generate a bonus
  if (brokenBricks >= bonusBricks && !bonusActive) {
    // draw bonus sliding down
    bonusy += bonusdy;
    drawBonus();

    // if bonus is out of canvas, reset bonus
    if (bonusy > HEIGHT) {
      console.log("BONUS OUT");
      resetBonus();
    }
    // if bonus is in the paddle, activate bonus
    else if (bonusy + ballr > HEIGHT - paddleh - PADDLE_PADDING) {
      if (bonusx > paddlex && bonusx < paddlex + paddlew) {
        activateBonus();
      }
    }
  }

  // if newBall, generate a new ball bonus
  if (newBall) {
    ballbonusy += bonusdy;
    drawBonus(true);

    if (ballbonusy > HEIGHT) {
      console.log("BALL BONUS OUT");
      newBall = false;
    }
    // if bonus is in the paddle, activate bonus
    else if (ballbonusy + ballr > HEIGHT - paddleh - PADDLE_PADDING) {
      if (ballbonusx > paddlex && ballbonusx < paddlex + paddlew) {
        newBall = false;
        if (ball1 && !ball2) {
          resetBall(2);
          ball2 = true;
        } else if (ball2 && !ball1) {
          resetBall(1);
          ball1 = true;
        }
      }
    }
  } else {
    randomBall();
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
