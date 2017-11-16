var x = [1,2,3,4,5]
var y = [4,5,6]
console.log(x);
console.log(y);

var z = x.filter(function(num){
  return !(y.some(number => number === num))
})
console.log(z);
