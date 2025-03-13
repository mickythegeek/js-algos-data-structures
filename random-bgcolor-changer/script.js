const darkColorsArr = [
    "#2c3e50",
    "#34495e",
    "#2c2c2c",
    "#616A6b",
    "4a235a",
    "#2f4f4f",
    "0e4b5a",
    "36454f",
    "2c3e50",
    "800020",
];

// Get random index
function getRandomIndex(){
    console.log(Math.floor(darkColorsArr.length * Math.random()));
    const randomIndex = Math.floor(darkColorsArr.length * Math.random());
    return randomIndex;
}

getRandomIndex();

const body = document.querySelector("body");
const bgHexCodeSpanElement = document.querySelector("#bg-hex-code");
console.log(bgHexCodeSpanElement); 



function changeBackgroundColor(){
    const color = darkColorsArr[getRandomIndex];
    bgHexCodeSpanElement.innerText = color;
    body.style.backgroundColor = color
}

changeBackgroundColor();