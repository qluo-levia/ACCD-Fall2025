let angle = 0.0
let sizes = []
let colors = []

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, TWO_PI,1,1)
  sizes[0]=200
  sizes[1]=150
  sizes[2]=165
  sizes [3]=100
  sizes[4]=80
  sizes[5]=50

  for (let i =5; i>=0; i--){
    colors[i] = color(TWO_PI/6*i,0.5,0.8)
  }
  rectMode(RADIUS)
  noStroke()
}

function draw() {
  background(0.2)

  push()
  translate(width/2,height/2)

  for(let i = 0; i<sizes.length; i++){
    fill(colors[i])
    rotate(angle)
    rect(0,0,sizes [3], sizes[i])
    angle = angle + 0.003

  }
  pop()
  


}
