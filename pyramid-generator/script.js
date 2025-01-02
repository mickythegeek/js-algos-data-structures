const character = "#";
const count = 8;
const rows = [];

function padRow(rowNumber, rowCount){
    return ".".repeat(rowCount - rowNumber) + character.repeat(2 * rowNumber - 1) + ".".repeat(rowCount - rowNumber);
}

const call = padRow();
console.log(call);

for(let i = 0; i < count; i++){
    rows.push(padRow(i+1, count));
}

let result = "";

for(const row of rows){
    result = result  + row + "\n";
}

console.log(result)