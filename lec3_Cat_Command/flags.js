let fs = require("fs");

let f1KaData = fs.readFileSync("./f1.txt");

f1KaData = f1KaData + "";
console.log(f1KaData);

// -s => removes extra space


let data = f1KaData.split("\r\n");
console.log(data);
let dt  = "";

for(let i=0;i<data.length;i++){
    


}









// function removeExtraLargeSpaces(){


// }















