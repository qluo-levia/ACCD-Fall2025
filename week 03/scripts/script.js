let cBox = document.getElementById("colorBox")
let colorBtn = document.getElementById("ChangColor")
let imgBox = document.getElementById("dobbyIMG")
let ImageBtn = document.getElementById("dobbyBtn")

let assignRandomColor = function()
{
    let rComp= 157 * Math.random()
    let gComp= 157 * Math.random()
    let bComp= 157 * Math.random()
    let aComp= 157 * Math.random()

cBox.style.backgroundColor = "rgba("+ rComp + ","+ gComp +", " + bComp +", " + aComp +")"
}

const toggledobbyImage = () => 
{
    console.log(imgBox.src)
    if(imgBox.src.includes("dobby"))
        {
            console.log("Changing to dobby02")
            imgBox.src= "image/dobby02.jpg"
        }
}

ImageBtn.addEventListener("click", toggledobbyImage)
colorBtn.addEventListener("click", assignRandomColor)