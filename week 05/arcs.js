let numRings = 10
let radius
let strWeight = 20
function setup(){
    createCanvas(800,800)
    colorMode(HSB, TWO_PI,1,1)

    radius = width *0.1
    strokeCap(circle)
}


function draw(){
    
    background(0)
    noFill()
    strokeWeight(strWeight*0.5)
    for (let i = 0 ; i < numRings; i++){
        stroke(color(i*TWO_PI/numRings,0.9,0.9))
        push()
        translate(width * 0.5, height*0.5)
        rotate( sin(millis()*0.001*(i*0.25+5)))
        arc(0, 0, radius*2+strWeight*i*2,radius*2+strWeight*i*2, HALF_PI+QUARTER_PI, TWO_PI+QUARTER_PI)
        pop()
    }
}