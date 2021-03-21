function decToBin(n) {
    // write code here
    
    let num = 0;
    let pow = 1;
    //console.log(n);
    
    while(n>1){
        let rem = n%2;
        console.log(rem);
        num = num + (rem * pow);
        //console.log(num);
        pow = pow*10;
        //console.log(pow);
        n = n/2;
        //console.log(n);
    }
    //console.log(num);
}

decToBin(24);
//console.log(0.5/2);

let r = 45%2;
//console.log(r);



// let obj = {"concept":""};


// console.log(
//   JSON.parse(
//     JSON.stringify(obj).slice(0, 12) + "JSON" + JSON.stringify(obj).slice(12)
//   ).concept
// );