// TODO: add cursor directional control
//     : allow multiple buttons/directions to be used
//     : add fire resistance/resilience
//     : add character healthbar
//     : condense variables into an object or something
//     : add points system
//     : create spreading fire
//     : smoke?

let canvas = document.getElementById("house");
let ctx = canvas.getContext("2d");
let residentX = canvas.width/2;
let residentY = canvas.height - 30;

let fireOut = [ false, false, false, false, false, false, false, false, false, false ];
let extinguisherCharge = 100;

let upPressed = false;
let downPressed = false;
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

// Create random spot fire placements
// We want a min of 1 and a max of the smaller of width or height
const spotsX = [];
const spotsY = [];

for (let i = 0; i < 10; i++) {
  spotsX[i] = Math.ceil(Math.random() * (600 - 1) + 1);
  spotsY[i] = Math.ceil(Math.random() * (600 - 1) + 1);
}

function drawResident() {
  ctx.beginPath();
  ctx.arc(residentX, residentY, 10, 0, Math.PI*2);
  ctx.fillStyle = "Green";
  ctx.fill();
  ctx.closePath();
}

function drawExtinguisherCone() {
  if(spacePressed) {
    if(extinguisherCharge > -18) {
    extinguisherCharge = extinguisherCharge - 1;
    console.log(extinguisherCharge);
    }

    ctx.beginPath();
    ctx.moveTo(residentX, residentY - 5);
    ctx.lineTo(residentX - 25, residentY - 30);
    ctx.lineTo(residentX - 15, residentY - 35);
    ctx.lineTo(residentX, residentY - 40);
    ctx.lineTo(residentX + 15, residentY - 35);
    ctx.lineTo(residentX + 25, residentY - 30);
    ctx.fillStyle = "Grey";
    ctx.fill();
  }
}

function drawExtinguisherCharge() {
  if(extinguisherCharge > -18) {
    ctx.beginPath();
    ctx.fillStyle = "Grey";
    ctx.fillRect(canvas.width - (0.15 * canvas.width), canvas.height - (0.98 * canvas.height), (0.12 * canvas.width), (0.04 * canvas.width));
    ctx.beginPath();
    ctx.clearRect(canvas.width - (0.149 * canvas.width), canvas.height - (0.98 * canvas.height), ((0.10 * canvas.width) - (0.10 * canvas.width * extinguisherCharge / 100)), (0.04 * canvas.width));
  } else {
      ctx.beginPath();
      ctx.fillStyle = "Red";
      ctx.fillRect(canvas.width - (0.15 * canvas.width), canvas.height - (0.98 * canvas.height), (0.12 * canvas.width), (0.04 * canvas.width));
      ctx.beginPath();
      ctx.clearRect(canvas.width - (0.149 * canvas.width), canvas.height - (0.98 * canvas.height), ((0.10 * canvas.width) - (0.10 * canvas.width * extinguisherCharge / 100)), (0.04 * canvas.width));
  }
}

function drawFire(randomIntX, randomIntY, index) {
  if(!fireOut[index]) {
    ctx.fillStyle = "#7C0A02";
    // Left Triangle
    ctx.beginPath();
    ctx.moveTo(randomIntX, randomIntY);
    ctx.lineTo(randomIntX - 12, randomIntY);
    ctx.lineTo(randomIntX - 9, randomIntY - 9);
    // Right Triangle
    ctx.moveTo(randomIntX, randomIntY);
    ctx.lineTo(randomIntX + 12, randomIntY);
    ctx.lineTo(randomIntX + 9, randomIntY - 9);
    ctx.fill();
    // Middle Triangle
    ctx.moveTo(randomIntX - 6, randomIntY);
    ctx.lineTo(randomIntX + 12 - 9, randomIntY);
    ctx.lineTo(randomIntX + 9 - 9, randomIntY - 15);
    ctx.fill();
  }
}

function drawFires(i) {
    drawFire(spotsX[i], spotsY[i], i);
}

function extinguish(i) {
  if( // extinguisher is activated and extinguisherCharge > -18 and...
    spacePressed && extinguisherCharge > -18 &&
    // ...fire[i]'s X and Y values are (well) within cone's X && Y values
    residentX - 20 < spotsX[i] && spotsX[i] < residentX + 20 && residentY - 30 < spotsY[i] && spotsY[i] < residentY - 7
  ) {
    fireOut[i] = true;
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// Key codes:
// left-37; up-38; right-39; down-40
function keyDownHandler(e) {
  if(e.key === "ArrowDown") {
    downPressed = true;
  } else if(e.key === "ArrowRight") {
    rightPressed = true;
  } else if(e.key === "ArrowUp") {
    upPressed = true;
  } else if(e.key === "ArrowLeft") {
    leftPressed = true;
  } else if(e.key === " ") {
    spacePressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key === "ArrowDown") {
    downPressed = false;
  } else if(e.key === "ArrowRight") {
    rightPressed = false;
  } else if(e.key === "ArrowUp") {
    upPressed = false;
  } else if(e.key === "ArrowLeft") {
    leftPressed = false;
  } else if(e.key === " ") {
    spacePressed = false;
  }
}

function move() {
  if(downPressed && residentY < canvas.height - 15) {
    residentY += 7;
  } else if(rightPressed && residentX < canvas.width - 15) {
    residentX += 7;
  } else if(upPressed && residentY > 15) {
    residentY -= 7;
  } else if(leftPressed && residentX > 15) {
    residentX -= 7;
  }
}


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawResident();
  if(extinguisherCharge > -18) {
    drawExtinguisherCone();
  }
  drawExtinguisherCharge();
  for(let i=0; i < 10; i++) {
    drawFires(i);
    extinguish(i);
  }
  move();
}

setInterval(draw, 30)
