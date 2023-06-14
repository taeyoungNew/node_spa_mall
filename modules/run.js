// exports.변수 = 익명함수로 내보내게 되면 함수 그자체를 내보내기 때문에 
// 사용시 ex) add.add()이렇게 번거롭게 사용해야한다. 
// 다시 간편하게 사용하기 위해선 객체 구조분해를 통해 아래처럼 선언하면 함수를 한번 더 거칠 필요가 없어진다.

// const { add } = require("./math");
const add = require("./math");



let result = 0

result = add(10, 30)

console.log(result)