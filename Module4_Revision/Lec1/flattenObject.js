let obj = {
    name: 'Rishabh',
    address: {
        city: "Delhi",
        country: "India"
    }
}

//flatten this object
//nested object ke saare key value pairs ko ek hi level par lana

function fun(obj, parent, res={}){
    for(let key in obj){
        let propertyName = parent ? parent+"_"+key : key;
        if(typeof(obj[key]) == "object" && !Array.isArray(obj[key])){
            fun(obj[key], propertyName, res);
        }
        else{
            res[propertyName] = obj[key];
        }
    }
    return res;
}

console.log(fun(obj));






