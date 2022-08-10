let data = {
    name: 'xiaohua',
    age: 18
}
//模拟组建实例
let _this = {}

for (let item in data) {
    Object.defineProperty(_this, item, {
        //用来获取扩展属性的，当获取该属性的值的时候调用该方法
        get() {
            return data[item]
        },
        //监视扩展属性的，只要修改就调用
        set(newVal) {
            //千万不要在set中直接修改当前的扩展属性，否则会出现死循环
            data[item] = newVal
        }
    })
}
