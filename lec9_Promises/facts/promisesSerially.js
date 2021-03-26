//multiple files
//promised function
//read files serially

const fs = require("fs");

let f1KaPendingPromise = fs.promises.readFile("./f1.txt");

f1KaPendingPromise.then(function(data){
    console.log("F1 KA DATA == "+ data);
    let f2KaPendingPromise = fs.promises.readFile("./f2.txt");

    f2KaPendingPromise.then(function(data){
        console.log("F2 KA DATA = "+data);
        let f3KaPendingPromise = fs.promises.readFile("./f3.txt");

        f3KaPendingPromise.then(function(data){
            console.log("F3 KA DATA = "+data);
        })
    })
})