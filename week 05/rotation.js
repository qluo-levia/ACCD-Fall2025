let numlines = 10;
function setup(){
  createCanvas(400,400);
  colorMode(HSB, TWO_PI, 1,1);
}

function draw(){
  background(TWO_PI* 0.75,0.2,0.9);

  push()
  rotate(QUARTER_PI * 0.2)
  drawGrid(20);
  pop()

  push()
  translate(width*0.5, height*0.5)
  rotate(QUARTER_PI)
  drawGrid(20);
  rect(0,0, 100, 100);
  pop()
}

function drawGrid (numlines){
  for(let y = 0; y < numlines; y++){
    line(0, y * height/numlines, width, y * height/numlines);
  }
  for(let x = 0; x <= numlines; x++){
    line(x * width/numlines,0, x * width/numlines, height);
  }
}
