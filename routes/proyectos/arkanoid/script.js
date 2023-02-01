let ballr = 10;
let rowcolors = ["#EB0093", "#0008DB", "#00A308", "#FFFD0A", "#FF1C0A"];
let paddlecolor = "#FFFFFF";
let ballcolor = "#FFFFFF";
let backcolor = "#000000";

function draw() {
  ctx.fillStyle = backcolor;
  clear();
  ctx.fillStyle = ballcolor;
  circle(x, y, ballr);

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

  //reverse the ball and edit the brick value
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] !== 0) {
    dy = -dy;
    bricks[row][col] -= 1;
    if (bricks[row][col] === 0) {
      brokenBricks++;
    }
  }

  // check bonus active
  checkBonus();

  // if i broke bonusBricks bricks, i get a bonusTime
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

  // rebound from the left or right side of the canvas
  if (x + dx + ballr > WIDTH || x + dx - ballr < 0) dx = -dx;

  // rebound from the top of the canvas
  if (y + dy - ballr < 0) dy = -dy;

  // if the ball goes below the paddle, lose a life
  if (y + dy + ballr > HEIGHT - paddleh - PADDLE_PADDING) {
    if (x > paddlex && x < paddlex + paddlew) {
      //move the ball differently based on where it hit the paddle
      dx = 8 * ((x - (paddlex + paddlew / 2)) / paddlew);
      dy = -dy;
    } else if (y + dy + ballr > HEIGHT) {
      if (bonusActive) resetBonus();
      lifes--;
      if (lifes <= 0) {
        gameOver();
      } else {
        resetBall();
      }
    }
  }

  // move the ball
  x += dx;
  y += dy;
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
