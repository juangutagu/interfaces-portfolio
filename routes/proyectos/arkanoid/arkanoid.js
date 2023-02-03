let ball1 = true;
let x = 200;
let y = 400;
let dx = Number(randomdx());
let dy = -4;

let ball2 = false;
let x2 = 200;
let y2 = 400;
let dx2 = Number(randomdx());
let dy2 = -4;

let newBall = false;
let ballbonusx;
let ballbonusy;
const bonusBall = {
  type: "ball",
  icon: "🏐",
  action: () => {
    ball1 === false ? (ball1 = true) : (ball2 = true);
  },
};

const bonusProps = [
  {
    type: "slow",
    barColor: "green",
    icon: "🎁",
    action: () => {
      dy /= 2;
      dy2 /= 2;
    },
    endAction: () => {
      dy *= 2;
      dy2 *= 2;
    },
  },
  {
    type: "fast",
    barColor: "red",
    icon: "🎁",
    action: () => {
      dy *= 2;
      dy2 *= 2;
    },
    endAction: () => {
      dy /= 2;
      dy2 /= 2;
    },
  },
  {
    type: "bigPaddle",
    barColor: "lightblue",
    icon: "↔️",
    action: () => (paddlew *= 2),
    endAction: () => (paddlew /= 2),
  },
  {
    type: "smallPaddle",
    barColor: "red",
    icon: "↔️",
    action: () => (paddlew /= 2),
    endAction: () => (paddlew *= 2),
  },
  {
    type: "bigBall",
    barColor: "green",
    icon: "↔️",
    action: () => (ballr *= 2),
    endAction: () => (ballr /= 2),
  },
];

let bonusType = Math.floor(Math.random() * bonusProps.length);

let bonusx;
let bonusy;
let bonusdy = 1;
let bonusBricks;
let bonusActive = false;
let bonusTimeInitial = 0;
let bonusTime = 0;

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
let brokenBricks = 0;

// ---------------------------------------------------------------------- INIT
function randomdx() {
  simbolo = Math.random() > 0.5 ? "" : "-";
  return simbolo.concat(Math.random() * 5);
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

// ---------------------------------------------------------------------- PADDLE EVENTS
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

// ---------------------------------------------------------------------- BRICKS
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

// ---------------------------------------------------------------------- LIFES
function drawLifes(lifes) {
  let heart = "♥";
  let hearts = heart.repeat(lifes);
  ctx.fillStyle = "red";
  ctx.textAlign = "left";
  ctx.textBaseline = "bottom";
  ctx.font = "bold 20px sans-serif";
  ctx.fillText(hearts, 10, HEIGHT - 10);
}

// ---------------------------------------------------------------------- BALLS
function resetBall(ball = 1) {
  if (ball === 1) {
    x = 200;
    y = 400;
    dx = Number(randomdx());
    dy = -4;
  } else if (ball === 2) {
    x2 = 200;
    y2 = 400;
    dx2 = Number(randomdx());
    dy2 = -4;
  }
}

function handleBall(row, col) {
  //reverse the ball and edit the brick value
  if (y < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] !== 0) {
    dy = -dy;
    bricks[row][col] -= 1;
    if (bricks[row][col] === 0) {
      brokenBricks++;
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
      if (ball2) {
        ball1 = false;
      } else {
        if (bonusActive) resetBonus();
        lifes--;
        if (lifes <= 0) {
          gameOver();
        } else {
          resetBall(1);
        }
      }
    }
  }

  // move the ball
  x += dx;
  y += dy;
}

function handleBall2(row, col) {
  //reverse the ball and edit the brick value
  if (y2 < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] !== 0) {
    dy2 = -dy2;
    bricks[row][col] -= 1;
    if (bricks[row][col] === 0) {
      brokenBricks++;
    }
  }

  // rebound from the left or right side of the canvas
  if (x2 + dx2 + ballr > WIDTH || x2 + dx2 - ballr < 0) dx2 = -dx2;

  // rebound from the top of the canvas
  if (y2 + dy2 - ballr < 0) dy2 = -dy2;

  // if the ball goes below the paddle, lose a life
  if (y2 + dy2 + ballr > HEIGHT - paddleh - PADDLE_PADDING) {
    if (x2 > paddlex && x2 < paddlex + paddlew) {
      //move the ball differently based on where it hit the paddle
      dx2 = 8 * ((x2 - (paddlex + paddlew / 2)) / paddlew);
      dy2 = -dy2;
    } else if (y2 + dy2 + ballr > HEIGHT) {
      if (ball1) {
        ball2 = false;
      } else {
        if (bonusActive) resetBonus();
        lifes--;
        if (lifes <= 0) {
          gameOver();
        } else {
          resetBall(2);
        }
      }
    }
  }

  // move the ball
  x2 += dx2;
  y2 += dy2;
}

// ---------------------------------------------------------------------- BONUS
// random bonus
function randomBonus() {
  bonusType = Math.floor(Math.random() * bonusProps.length);
}

function randomBall() {
  if (!ball1 || !ball2) {
    const random = Math.random();
    if (random < 0.001) {
      console.log("NEW BALL BONUS");
      newBall = true;
      ballbonusx = Math.floor(Math.random() * (WIDTH - 20) + 10);
      ballbonusy = Math.floor(Math.random() * (HEIGHT - 200) + 100);
    }
  }
}

// draw a bonus that slides down
function drawBonus(ball = false) {
  ctx.fillStyle = "red";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 20px sans-serif";
  if (!ball) {
    ctx.fillText(bonusProps[bonusType].icon, bonusx, bonusy);
  } else {
    ctx.fillText(bonusBall.icon, ballbonusx, ballbonusy);
  }
}

// draw a rectangle to show the duration of the bonus
function drawBonusDuration() {
  if (bonusActive) {
    // draw an outer rectangle
    ctx.fillStyle = "white";
    ctx.fillRect(290, HEIGHT - 30, 100, 16);

    const barFill = (bonusTime / bonusTimeInitial) * 100;
    ctx.fillStyle = bonusProps[bonusType].barColor;
    ctx.fillRect(290, HEIGHT - 30, barFill, 16);
  }
}

// reset bonus
function resetBonus() {
  console.log("RESET BONUS");
  if (bonusActive) bonusProps[bonusType].endAction();
  bonusActive = false;

  randomBonus();

  bonusTime = 0;
  bonusBricks = brokenBricks + Math.floor(Math.random() * 5 + 3);
  // bonusBricks = brokenBricks + 1; // para probar bonus
  bonusx = Math.floor(Math.random() * (WIDTH - 20) + 10);
  bonusy = Math.floor(Math.random() * (HEIGHT - 200) + 100);
}

// activate bonus
function activateBonus() {
  console.log("ACTIVATE BONUS");
  bonusProps[bonusType].action();

  bonusActive = true;
  // bonusTime aleatorio entre 500 y 1000
  bonusTime = Math.floor(Math.random() * 500 + 500);
  bonusTimeInitial = bonusTime;
}

function checkBonus() {
  if (bonusActive) {
    bonusTime -= 1;
    drawBonusDuration();
    if (bonusTime <= 0) {
      resetBonus();
    }
  }
}
