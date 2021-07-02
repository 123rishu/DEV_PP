function globalFunction(x) {
    return function outerFunction(y) {
      return function innerFunction(z) {
        return x + y + z;
      };
    };
  }
  
  let instance1 = globalFunction(2);
  var instance2 = instance1(3);
  console.log(instance2());

  //NaN