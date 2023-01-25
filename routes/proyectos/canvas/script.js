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

// draw a house
const canvas3 = document.getElementById("myCanvas3");
const ctx3 = canvas3.getContext("2d");

// roof
ctx3.beginPath();
ctx3.moveTo(50, 50);
ctx3.lineTo(100, 10);
ctx3.lineTo(150, 50);
ctx3.lineTo(50, 50);
ctx3.closePath();
ctx3.stroke();
ctx3.fillStyle = "brown";
ctx3.fill();

// chimney
ctx3.beginPath();
ctx3.moveTo(130, 10);
ctx3.lineTo(130, 33);
ctx3.lineTo(140, 41);
ctx3.lineTo(140, 10);
ctx3.lineTo(130, 10);
ctx3.closePath();
ctx3.stroke();
ctx3.fillStyle = "brown";
ctx3.fill();

// walls
ctx3.beginPath();
ctx3.moveTo(50, 50);
ctx3.lineTo(50, 110);
ctx3.lineTo(150, 110);
ctx3.lineTo(150, 50);
ctx3.lineTo(50, 50);
ctx3.closePath();
ctx3.stroke();
ctx3.fillStyle = "white";
ctx3.fill();

// door
ctx3.beginPath();
ctx3.moveTo(75, 110);
ctx3.lineTo(75, 80);
ctx3.lineTo(100, 80);
ctx3.lineTo(100, 110);
ctx3.lineTo(75, 110);
ctx3.stroke();
ctx3.fillStyle = "brown";
ctx3.fill();

// door open
ctx3.beginPath();
ctx3.arc(95, 95, 2, 0, 2 * Math.PI);
ctx3.stroke();
ctx3.fillStyle = "black";
ctx3.fill();

// window
ctx3.beginPath();
ctx3.moveTo(120, 80);
ctx3.lineTo(120, 60);
ctx3.lineTo(140, 60);
ctx3.lineTo(140, 80);
ctx3.lineTo(120, 80);
ctx3.stroke();
ctx3.fillStyle = "lightblue";
ctx3.fill();

// window lines
ctx3.beginPath();
ctx3.moveTo(120, 70);
ctx3.lineTo(140, 70);
ctx3.moveTo(130, 60);
ctx3.lineTo(130, 80);
ctx3.stroke();


// circunferencias concéntricas rellenas
const canvas4 = document.getElementById("myCanvas4");
const ctx4 = canvas4.getContext("2d");

ctx4.beginPath();
ctx4.arc(80, 100, 50, 0, 2 * Math.PI);
ctx4.fillStyle = "red";
ctx4.fill();

ctx4.beginPath();
ctx4.arc(80, 100, 40, 0, 2 * Math.PI);
ctx4.fillStyle = "yellow";
ctx4.fill();

ctx4.beginPath();
ctx4.arc(80, 100, 20, 0, 2 * Math.PI);
ctx4.fillStyle = "red";
ctx4.fill();

let radianes = 0;
// radianes = Math.PI / 180*90;

for (let i = 0; i < 3; i++) {
  ctx4.beginPath();
  ctx4.arc(220, 100, 50 - i * 15, radianes, 2 * Math.PI);
  ctx4.fillStyle = i % 2 === 0 ? "red" : "yellow";
  ctx4.fill();
}

// pintar una nube
const canvas5 = document.getElementById("myCanvas5");
const ctx5 = canvas5.getContext("2d");

ctx5.fillStyle = "white";
ctx5.beginPath();
ctx5.arc(50, 50, 30, 0, 2 * Math.PI);
ctx5.fill();

ctx5.beginPath();
ctx5.arc(90, 50, 30, 0, 2 * Math.PI);
ctx5.fill();

ctx5.beginPath();
ctx5.arc(130, 50, 30, 0, 2 * Math.PI);
ctx5.fill();

ctx5.beginPath();
ctx5.arc(70, 80, 30, 0, 2 * Math.PI);
ctx5.fill();

ctx5.beginPath();
ctx5.arc(110, 80, 30, 0, 2 * Math.PI);
ctx5.fill();

// pintar el logo de los juegos olímpicos
const canvas6 = document.getElementById("myCanvas6");
const ctx6 = canvas6.getContext("2d");

ctx6.lineWidth = 5;

ctx6.beginPath();
ctx6.arc(60, 60, 30, 0, 2 * Math.PI);
ctx6.strokeStyle = "blue";
ctx6.stroke();

ctx6.beginPath();
ctx6.arc(130, 60, 30, 0, 2 * Math.PI);
ctx6.strokeStyle = "black";
ctx6.stroke();

ctx6.beginPath();
ctx6.arc(200, 60, 30, 0, 2 * Math.PI);
ctx6.strokeStyle = "red";
ctx6.stroke();

ctx6.beginPath();
ctx6.arc(95, 90, 30, 0, 2 * Math.PI);
ctx6.strokeStyle = "yellow";
ctx6.stroke();

ctx6.beginPath();
ctx6.arc(165, 90, 30, 0, 2 * Math.PI);
ctx6.strokeStyle = "green";
ctx6.stroke();

// -- Línea azul
ctx6.beginPath();
ctx6.arc(60, 60, 30, 6, 0.5);
ctx6.strokeStyle = "blue";
ctx6.stroke();

// -- Líneas negras
ctx6.beginPath();
ctx6.arc(130, 60, 30, 6, 0.5);
ctx6.strokeStyle = "black";
ctx6.stroke();

ctx6.beginPath();
ctx6.arc(130, 60, 30, 6, 2);
ctx6.strokeStyle = "black";
ctx6.stroke();

// -- Línea roja
ctx6.beginPath();
ctx6.arc(200, 60, 30, 6, 2);
ctx6.strokeStyle = "red";
ctx6.stroke();

// -- Líneas amarillas
ctx6.beginPath();
ctx6.arc(95, 90, 30, 4.7, -1);
ctx6.strokeStyle = "yellow";
ctx6.stroke();

ctx6.beginPath();
ctx6.arc(95, 90, 30, 3, 3.5);
ctx6.strokeStyle = "yellow";
ctx6.stroke();

// -- Líneas verdes
ctx6.beginPath();
ctx6.arc(165, 90, 30, 2.5, -2.5);
ctx6.strokeStyle = "green";
ctx6.stroke();








