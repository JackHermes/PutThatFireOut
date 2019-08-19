// TODO: add cursor directional control
//     : allow multiple buttons/directions to be used (diagonal too)
//     : add fire resistance/resilience
//     : add character healthbar
//     : condense variables into an object or something
//     : add points system
//     : create spreading fire
//     : smoke?
//     : add walking animation
//     : match extinguisher cone with sprite direction/arrow direction

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
// Retain previous direction used
let lastPressed;

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

// Temporary test of sprite animation

let img = new Image();
img.src = 'https://vxresource.files.wordpress.com/2010/02/char113.png';

function drawSprite() {
  let width = 30;
  let height = 32;
  // ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  // source offset to start from; source w + h to use; destination offset to start from; destination w + h to use
  if(downPressed || lastPressed === "down") {
    // Down
    ctx.drawImage(img, width, 0, width, height, 0, 0, width, height);
  } else if (upPressed || lastPressed === "up") {
    // Up
    ctx.drawImage(img, width, height * 3, width, height, 0, 0, width, height);
  } else if (rightPressed || lastPressed === "right") {
    // Right
    ctx.drawImage(img, width, height * 2, width, height, 0, 0, width, height);
  } else if (leftPressed || lastPressed === "left") {
    // Left
    ctx.drawImage(img, width, height, width, height, 0, 0, width, height);
  } else {
    // neutral position
    ctx.drawImage(img, width, height * 3, width, height, 0, 0, width, height);
  }
}


// end sprite testing zone

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
    lastPressed = "down";
  } else if(e.key === "ArrowRight") {
    rightPressed = true;
    lastPressed = "right";
  } else if(e.key === "ArrowUp") {
    upPressed = true;
    lastPressed = "up";
  } else if(e.key === "ArrowLeft") {
    leftPressed = true;
    lastPressed = "left";
  } else if(e.key === " ") {
    spacePressed = true;
  }
  e.preventDefault();
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
  e.preventDefault();
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
  drawSprite();
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
