let canvas = document.getElementById("house");
let ctx = canvas.getContext("2d");
let residentX = canvas.width/2;
let residentY = canvas.height-30;

function drawResident() {
  ctx.beginPath();
  ctx.arc(residentX, residentY, 10, 0, Math.PI*2);
  ctx.fillStyle = "#7C0A02";
  ctx.fill();
  ctx.closePath();
}

function drawFire() {
  ctx.fillRect(canvas.width/2, canvas.height/2, 10, 10);
  ctx.fillStyle = "Green";
  // ctx.strokeRect(50,50,50,50);
  ctx.fill();
}

function drawExtinguisherCone() {
  ctx.beginPath();
  ctx.moveTo(residentX, residentY-5);
  ctx.lineTo(residentX-25, residentY-30);
  ctx.lineTo(residentX+25, residentY-30);
  // ctx.moveTo(75, 50);
  // ctx.lineTo(100, 75);
  // ctx.lineTo(100, 25);
  ctx.fillStyle = "Grey";
  ctx.fill();
}

drawResident();
drawFire();
drawExtinguisherCone();