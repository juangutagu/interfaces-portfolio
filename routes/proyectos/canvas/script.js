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