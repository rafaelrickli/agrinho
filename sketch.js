let tractor;
let crops = [];
let score = 0;
const maxCrops = 8;
const canvasWidth = 600;
const canvasHeight = 400;
const tractorWidth = 80;
const tractorHeight = 50;
const tractorSpeed = 5;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  tractor = {
    x: width / 2,
    y: height / 2,
    width: tractorWidth,
    height: tractorHeight,
  };
  crops = [];
  for (let i = 0; i < maxCrops; i++) {
    crops.push(generateCrop());
  }
  score = 0;
  textAlign(LEFT, TOP);
  textSize(24);
  rectMode(CENTER);
}

function draw() {
  background('#7ec850');
  drawField();

  handleTractorMovement();

  drawTractor();

  drawCrops();

  checkCropCollection();

  drawScore();
}

function drawField() {
  
  stroke('#558b2f');
  strokeWeight(3);
  for (let y = 20; y < height; y += 20) {
    for (let x = 20; x < width; x += 30) {
      line(x, y, x + 20, y);
    }
  }
}

function drawTractor() {
  push();
  translate(tractor.x, tractor.y);

  
  fill('#d32f2f');
  stroke('#b71c1c');
  strokeWeight(3);
  rect(0, 0, tractor.width, tractor.height, 10);

  
  fill("black");
  rect(15, -10, tractor.width * 0.4, tractor.height * 0.6, 6);

  
  fill("black");
  noStroke();
  ellipse(-25, 20, 30, 30);
  ellipse(25, 20, 30, 30);
  fill("white");
  ellipse(-25, 20, 15, 15);
  ellipse(25, 20, 15, 15);

  pop();
}

function drawCrops() {
  for (let c of crops) {
    push();
    translate(c.x, c.y);
    fill('#ffeb3b');
    stroke('#fbc02d');
    strokeWeight(2);
    ellipse(0, 0, c.size, c.size * 0.7);
    fill('#33691e');
    rect(-c.size / 8, c.size / 6, c.size / 4, c.size / 2, 5);
    pop();
  }
}

function handleTractorMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    tractor.x -= tractorSpeed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    tractor.x += tractorSpeed;
  }
  if (keyIsDown(UP_ARROW)) {
    tractor.y -= tractorSpeed;
  }
  if (keyIsDown(DOWN_ARROW)) {
    tractor.y += tractorSpeed;
  }

  tractor.x = constrain(tractor.x, tractor.width / 2, width - tractor.width / 2);
  tractor.y = constrain(tractor.y, tractor.height / 2, height - tractor.height / 2);
}

function checkCropCollection() {
  for (let i = crops.length - 1; i >= 0; i--) {
    let c = crops[i];
    let d = dist(tractor.x, tractor.y, c.x, c.y);
    if (d < (tractor.width + c.size) * 0.4) {
      crops.splice(i, 1);
      score++;
      crops.push(generateCrop());
    }
  }
}

function generateCrop() {
  return {
    x: random(40, width - 40),
    y: random(40, height - 40),
    size: random(25, 40),
  };
}

function drawScore() {
  noStroke();
  fill('#ffffffcc');
  text(`frutas coletadas: ${score}`, 130, 12);
  let palavra = "use as setas para mover o carrinho"
  fill("green")
  textSize(30)
  textAlign(CENTER, CENTER);
  text(palavra, 300, 30);
}

