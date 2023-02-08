const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d", { willReadFrequently: true });

const path = "/assets/";
const images = [
  "canvas_1.png",
  "canvas_2.png",
  "canvas_3.png",
  "canvas_4.png",
  "canvas_5.png",
  "canvas_6.png",
  "canvas_7.png",
  "canvas_8.png",
];
const imgWidth = 175;
const imgHeight = 200;
const startPoint = { x: 20, y: 30 };

const frameWidth = 100;
const frameHeight = 100;
let frame = null;

const WIDTH = 800;
const HEIGHT = 600;

// print the images
images.forEach((image, index) => {
  const img = new Image();
  img.src = path + image;

  let x, y;
  if (index % 4 === 0) {
    x = startPoint.x;
    y = startPoint.y + Math.floor(index / 4) * (imgHeight + 30);
  } else {
    x = startPoint.x + (index % 4) * (imgWidth + 20);
    y = startPoint.y + Math.floor(index / 4) * (imgHeight + 30);
  }

  img.onload = () => {
    ctx.drawImage(img, x, y, imgWidth, imgHeight);
  };
});

// copy a frame around the mouse
const mousePosition = { x: 0, y: 0 };
canvas.addEventListener("mousemove", (e) => {
  mousePosition.x = e.offsetX - frameWidth / 2;
  mousePosition.y = e.offsetY - frameHeight / 2;
});

// copy the frame on click
canvas.addEventListener("click", () => {
  if (frame) {
    printFrame();
    frame = null;
  } else {
    frame = ctx.getImageData(mousePosition.x, mousePosition.y, frameWidth, frameHeight);
  }
});

// print the frame
const printFrame = () => {
  ctx.putImageData(frame, mousePosition.x, mousePosition.y);
};
