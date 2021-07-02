 let x = 2;
let y = 3;

function f1(x, y){
    return x*y;
}

function f2(x){
    return function(y){
        return x*y;
    }
}

console.log(f2(x)(y));
console.log(f1(x,y));