const character = "#";
const count = 8;
const rows = [];
let inverted = true;
 
function padRow(rowNumber, rowCount){
    return " ".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + " ".repeat(rowCount - rowNumber);
}

const call = padRow();
console.log(call);

for(let i = 1; i <= count; i++){
    if(inverted){
        rows.unshift(padRow(i, count));
    } else{
        rows.push(padRow(i, count));
    }
    
}


for (let i = count; i > 0; i--){
    rows.push(padRow(i, count));
}

let result = "";

for(const row of rows){
    result = result  + row + "\n";
}

console.log(result)