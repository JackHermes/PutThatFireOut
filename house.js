let canvas = document.getElementById("house");
let ctx = canvas.getContext("2d");
let residentX = canvas.width/2;
let residentY = canvas.height-30;

let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Key codes:
// left-37; up-38; right-39; down-40
function keyDownHandler(e) {
  if(e.keyCode === 40) {
    downPressed = true;
  } else if(e.keyCode === 39) {
    rightPressed = true;
  } else if(e.keyCode === 38) {
    upPressed = true;
  } else if(e.keyCode === 37) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.keyCode === 40) {
    downPressed = false;
  } else if(e.keyCode === 39) {
    rightPressed = false;
  } else if(e.keyCode === 38) {
    upPressed = false;
  } else if(e.keyCode === 37) {
    leftPressed = false;
  }
}

function move() {
  if(downPressed && residentY < canvas.height) {
    residentY += 7;
  } else if(rightPressed && residentX < canvas.width) {
    residentX += 7;
  } else if(upPressed && residentY > 0) {
    residentY -= 7;
  } else if(leftPressed && residentX > 0) {
    residentX -= 7;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawResident();
  drawFire();
  drawExtinguisherCone();
  move();
}

setInterval(draw, 30)