let posX, posY, velX, velY
let diameter = 150

let imgPingu,imgTowel,currentImg
let countDown = 0

function preload(){
  imgTowel = loadImage("AngryTowelPingu.jpg")
  imgPingu = loadImage("AngryPingu.jpg")
   imgBackground = loadImage("Background.jpg")
}

function setup() {
  createCanvas(800, 600)
  background(imgBackground, diameter)
  imageMode(CENTER)
  
  
  posX = width/2
  posY = height/2
  
  velX = random(-5,5)
  velY = random(-3.5,3.5)
  

  currentImg = imgPingu
}

function draw() {
  image(imgBackground, width/2, height/2, width, height)

  
  image(currentImg, posX, posY, diameter, diameter)
  
  posX = posX+velX
  posY = posY+velY
  
  if(posX + diameter*0.5 >= width || posX - diameter*0.5 <= 0){
    velX = velX*-1;
    currentImg = imgTowel
    countDown = 16
  }
  
  
  if(posY + diameter*0.5 >=height || posY - diameter*0.5 <=0){
    velY = velY * -1
    currentImg = imgTowel
    countDown = 16
  }
    
    if(countDown > 0){
      countDown--
    }
    else{
      currentImg = imgPingu
    }


  posX = posX+velX
  posY = posY+velY

  }
