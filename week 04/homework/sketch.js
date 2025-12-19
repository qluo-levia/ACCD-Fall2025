let posX, posY, velX, velY
let diameter = 150

let imgPingu, imgTowel, imgBackground, currentImg
let countDown = 0

let noiseOffsetX = 0
let noiseOffsetY = 1000

function preload(){
  imgTowel = loadImage("AngryTowelPingu.jpg")
  imgPingu = loadImage("AngryPingu.jpg")
  imgBackground = loadImage("Background.jpg")
}

function setup() {
  createCanvas(800, 600)
  imageMode(CENTER)

  posX = width / 2
  posY = height / 2

  velX = random(-3, 3)
  velY = random(-3, 3)

  currentImg = imgPingu
}

function draw() {
  image(imgBackground, width/2, height/2, width, height)

  // ---------- 非线性速度变化 ----------
  let accelX = map(noise(noiseOffsetX), 0, 1, -0.3, 0.3)
  let accelY = map(noise(noiseOffsetY), 0, 1, -0.3, 0.3)

  velX += accelX
  velY += accelY

  noiseOffsetX += 0.01
  noiseOffsetY += 0.01
  // -----------------------------------

  posX += velX
  posY += velY

  image(currentImg, posX, posY, diameter, diameter)

  // ---------- bounce ----------
  if (posX + diameter/2 >= width || posX - diameter/2 <= 0) {
    velX *= -1
    currentImg = imgTowel
    countDown = 16
  }

  if (posY + diameter/2 >= height || posY - diameter/2 <= 0) {
    velY *= -1
    currentImg = imgTowel
    countDown = 16
  }
  // ---------------------------

  if (countDown > 0) {
    countDown--
  } else {
    currentImg = imgPingu
  }
}
