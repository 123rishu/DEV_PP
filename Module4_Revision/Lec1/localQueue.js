function queue(){
    let arr = [];
    console.log(arr);
    return function(op, val){
        if(op == "insert"){
            arr.push(val);
        }
        else if(op == "out"){
            arr.shift();
        }
        else if(op == "show"){
            return arr;
        }
    }
}

//FIFO
let fun = queue();

console.log(fun("insert", 1));
console.log(fun("insert", 1));
console.log(fun("insert", 1));
console.log(fun("insert", 1));
console.log(fun("show"));

