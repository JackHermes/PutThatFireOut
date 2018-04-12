let canvas = document.getElementById("house");
let ctx = canvas.getContext("2d");
let residentX = canvas.width/2;
let residentY = canvas.height-30;

let fireOut = false;

let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;

// TODO: Fix the unexpected color behavior
function drawResident() {
  ctx.beginPath();
  ctx.arc(residentX, residentY, 10, 0, Math.PI*2);
  ctx.fillStyle = "Green";
  ctx.fill();
  ctx.closePath();
}

function drawFire() {
  if(!fireOut) {
    ctx.fillStyle = "#7C0A02";
    ctx.fillRect(canvas.width/2, canvas.height/2, 10, 10);
    // ctx.strokeRect(50,50,50,50);
    // ctx.fill();
  }
}

function drawExtinguisherCone() {
  ctx.beginPath();
  ctx.moveTo(residentX, residentY-5);
  ctx.lineTo(residentX-25, residentY-30);
  ctx.lineTo(residentX-15, residentY-35);
  ctx.lineTo(residentX, residentY-40);
  ctx.lineTo(residentX+15, residentY-35);
  ctx.lineTo(residentX+25, residentY-30);
  // ctx.arcTo(residentX-50, residentY-60, residentX+50, residentY-20, 20);
  // ctx.stroke();
  ctx.fillStyle = "Grey";
  ctx.fill();
  // ctx.fillStyle = "blue";
  // ctx.fillRect(residentX-50, residentY-60, 10, 10);
  // ctx.fillRect(residentX+50, residentY-20, 10, 10);
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

function extinguish() {
  // residentX, residentY-40
  // residentX-25, residentY-30 && residentX+25, residentY-30
  if(residentX-15 < canvas.width/2 && canvas.width/2 < residentX+15 && residentY-35 < canvas.height/2 && canvas.height/2 < residentY) {
    fireOut = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawResident();
  drawFire();
  drawExtinguisherCone();
  extinguish();
  move();
}

setInterval(draw, 30)

