function Supertype(name) {
    this.colors = ['red', 'blue', 'green']
    this.name = name
}
Supertype.prototype.sayName = function () {
    console.log(this.name)
}
function SubType(name, age) {
    Supertype.call(this, name)
    this.age = age
}

SubType.prototype = new Supertype()

SubType.prototype.sayAge = function () {
    console.log(this.age)
}

var instance1 = new SubType('nick', 18)
instance1.colors.push('black')
console.log(instance1.colors)
instance1.sayName()
instance1.sayAge()

var instance2 = new SubType('marry', 20)
console.log(instance2.colors)
instance2.sayName()
instance2.sayAge()

function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}

var person = {
    name: 'nick',
    friends: ['小红', '小明']
}
var antherPerson = Object.create(person)
antherPerson.name = 'greg'
antherPerson.friends.push('blob')

var yetAntherPerson = object(person)
yetAntherPerson.name = 'linda'
yetAntherPerson.friends.push('Barbie')

console.log(person)
var antherPerson = createAnother(person)
antherPerson.sayHi()

var createAnother = function (origin) {
    var clone = Object.create(origin)
    clone.sayHi = function () {
        console.log('hi')
    }
    return clone
}
var person = {
    name: 'nick',
    friends: ['小红', '小明']
}

function inheritPrototype(subType, supertype) {
    var prototype = Object.create(supertype.prototype)
    prototype.constructor = subType
    subType.prototype = prototype
}
function Supertype(name) {
    this.name = name
    this.colors = ['red', 'green']
}
Supertype.prototype.sayName = function () {
    console.log(this.name)
}

function SubType(name, age) {
    Supertype.call(this, name)
    this.age = age
}

inheritPrototype(SubType, Supertype)
SubType.prototype.sayAge = function () {
    console.log(this.age)
}
