function product(name, price) {
    this.name = name
    this.price = price
}
function food(arr) {
    product.apply(this, arr)
    this.category = 'food'
}
let testFood = new food(['chinese', 5])
console.log(testFood)

function Product(name, price) {
    this.name = name
    this.price = price
    let a = 'hhah'
}

function Food(name, price) {
    Product.bind(this, name, price)() //this指向实例对象food
    this.category = 'food'
}
this.ab = 'ab'

let food = new Food('cheese', 5)
console.log(food)

//模拟实现apply的方法
Function.prototype.myapply = function (thisArg, args) {
    thisArg = Object(thisArg) || window
    let fn = Symbol()
    thisArg[fn] = this
    let result = thisArg[fn](...args)

    delete thisArg[fn]
    return result
}

function test(x1, x2) {
    console.log(x1, x2) //2, 3
    console.log(this.a) //1
}

//模拟实现call的方法
Function.prototype.mycall = function (thisArg, ...args) {
    thisArg = Object(thisArg) || window
    let fn = Symbol()
    thisArg[fn] = this
    let result = thisArg[fn](...args)

    delete thisArg[fn]
    return result
}

function test(x1, x2) {
    console.log(x1, x2) //2, 3
    console.log(this.a) //1
}
test.mycall(obj, 2, 3)

//模拟实现bind的方法
Function.prototype.mybind = function (thisArg, ...args) {
    return (...newArgs) => {
        return this.call(thisArg, ...args, ...newArgs)
    }
}

// test

function test(x1, x2) {
    console.log(x1, x2) //2, 3
    console.log(this.a) //1
}
