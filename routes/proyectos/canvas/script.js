const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "red";
ctx.fillRect(20, 10, 50, 50);

ctx.beginPath();
ctx.fillStyle = "green";
ctx.fillRect(50, 40, 50, 50);
ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.strokeRect(50, 40, 50, 50);

ctx.beginPath();
ctx.fillStyle = "blue";
ctx.fillRect(80, 70, 50, 50);

ctx.beginPath();
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.strokeRect(110, 100, 50, 50);

// Write your name
const canvas2 = document.getElementById("myCanvas2");
const ctx2 = canvas2.getContext("2d");

ctx2.beginPath();
ctx2.fillStyle = "#1d4e89";

// J
ctx2.moveTo(60, 40);
ctx2.lineTo(60, 80);
ctx2.lineTo(40, 80);
ctx2.lineTo(40, 70);
ctx2.moveTo(50, 40);

// U
ctx2.moveTo(70, 40);
ctx2.lineTo(70, 80);
ctx2.lineTo(90, 80);
ctx2.lineTo(90, 40);

// A
ctx2.moveTo(100, 80);
ctx2.lineTo(100, 40);
ctx2.lineTo(120, 40);
ctx2.lineTo(120, 80);
ctx2.moveTo(100, 60);
ctx2.lineTo(120, 60);

// N
ctx2.moveTo(130, 80);
ctx2.lineTo(130, 40);
ctx2.lineTo(150, 80);
ctx2.lineTo(150, 40);

ctx2.stroke();
