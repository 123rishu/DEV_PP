// function fun(x, y){
    // arguments is an array like object
//     console.log(arguments);
//     let sum = 0;
//     for(let x in arguments){
//         sum += arguments[x];
//     }
//     return sum;
// }

// console.log(fun(1, 2, 3));

//f(a, 1,2,3) => add 1, 2, 3 ===> 6
//f(m, 1, 2, 3) => multiply 1, 2, 3 ===> 6

function fun(flag){
    let sum = 0;
    let mul = 1;
    console.log(arguments.length);
    if(arguments[0] == "a"){
        for(let x=1;x<arguments.length;x++){
            sum += arguments[x];
        }
        return sum;
    }
    else if(arguments[0] == 'm'){
        for(let x=1;x<arguments.length;x++){
            mul *= arguments[x];
        }
        return mul;
    }
}

console.log(fun("m", 2, 3));
































