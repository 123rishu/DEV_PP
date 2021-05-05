let arr = [1, 2, 3, 4];


function fun(arr){
    console.log(arr);
    for (x in arr) {
        arr[x] = 0
    }
    console.log(arr);
    console.log(arr);
}

fun(arr);






