### 常见数组的使用方法简单描述

> 在 http://kangax.github.io/compat-table/es5/ 这里查看各个es 的版本中提供的api

#### 一、indexOf

>作用
>
` 查询数组中是否拥有该项元素，有则返回查询项索引，无则返回 -1 `


>案例
```javascript	
let arr = ['apple', 'test', 'name']
let indexBack = arr.indexOf('apple')
let errIndexBack = arr.indexOf('applesss')
console.log(indexBack)		// 0
console.log(errIndexBack )		// -1
```

#### 二、filter

>作用
>
` 返回数组中满足过滤条件的元素并生成新数组 `

>案例
```javascript	
let arr = ['apple', 'test', 'name']
let newArr = arr.filter(function(item) {
	return item === 'apple'
})

console.log(newArr)	// ["apple"]
```


#### 三、forEach

>作用
>
` 为数组中每个元素执行对应的方法 `

>案例
```javascript	
let arr = ['apple', 'test', 'name']
let newArr = []
arr.forEach(function(item, index) {
	newArr.push(item + '1')
})

console.log(newArr)	// ["apple1", "test1", "name1"]
```

#### 四、map

>作用
>
` map()对数组的每个元素进行一定操作（映射）后，会返回一个新的数组 `

>案例
```javascript
let arr = ['apple', 'test', 'name']
let newArr = arr.map(function(item, index) {
	return {
		id: index,
		name: item
	}
})

console.log(newArr)	//  [{…}, {…}, {…}]

```

#### 五、reduce

>作用
>
` reduce()可以实现一个累加器的功能，将数组的每个值（从左到右）将其降低到一个值 `

`reduce(callback, initialValue)会传入两个变量。回调函数(callback)和初始值(initialValue)。假设函数它有个传入参数，prev和next,index和array。prev和next你是必须要了解的。一般来讲prev是从数组中第一个元素开始的，next是第二个元素。但是当你传入初始值(initialValue)后，第一个prev将是initivalValue，next将是数组中的第一个元素。`

>案例
```javascript
let arr = ['apple', 'test', 'name', 'any']
let longStr = ''
let newArr = arr.reduce(function(prev,next) {
    longStr = longStr + prev
}, '100')

console.log(longStr)	// appletestnameany

```

>作为稳固基础用的，基础好的，可以略过了
  
