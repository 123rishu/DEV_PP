//Testing 
console.log("Hello World");
//blah
//blah


//Map function working
let names = ['A', 'B', 'C', 'D', 'E'];

let updatedNames = names.map(function(curr){
    return curr + " Sharma";
})

console.log(updatedNames);

let arr = [5, 4, 1, 2, 10, 20, 6];


for(let i=0;i<arr.length;i++){
    for(let j=i+1;j<arr.length;j++){
        if(arr[i]> arr[j]){
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
}

console.log(arr);
