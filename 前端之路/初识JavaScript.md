### 01 初识 JavaScript

`   作为在码农圈混迹了 四五年的老码畜来说，学习一门新的语言，就仿佛是老司机开新车一样 轻车熟路。`

`   为什么会这么快呢？`

`   因为各种套路啊～`

`   任何一种计算机语言的最开始都是和 数据类型 这个东西分不开，那么今天，我们就从 JavaScript 的数据类型开始`


#### 一、JavaScript 的数据类型

	   因为对于很多的 jser 的初学者而言，或者说说对于很多代码初学者而言，数据类型是让人疑惑的地方。那么一定要解除这个疑虑。

	JavaScript 一共有 八种数据类型。其中包含了 基本数据类型 和 引用数据类型

	其中基础数据类型有: string 、 number 、 Boolean 、 null、 undefined

	其中 引用类型有： array 、 function 、 object

	一共就这么8种数据类型，每一种类型都会有各自的属性或者方法，从而构建了这个丰富多彩的 JavaScript 世界。
	
	那我们常常需要判断 这个参数的数据类型从而进行下一步的操作。 那么这个时候 typeOf 就是一个不错的选择，但是也有一些问题，咱们下面接着聊。


```javascript
const strA = 'xxx==='
const numberB = 123
const boolC = false

const nullD = null
const undedfinE = undefined

const arrayF = [1,2,3]
const funcG = function() {
	let a = '123'
	console.log(a)
}
const objH = {
	a: 1,
	getName: function() {
		console.log(this.a)
	}
}

const result = function(x) {
	return typeof x
}
console.log(result(strA)) // string
console.log(result(numberB)) // number
console.log(result(boolC)) // boolean
console.log(result(nullD)) // object
console.log(result(undedfinE)) // undefined
console.log(result(arrayF)) // object
console.log(result(funcG)) // function
console.log(result(objH)) // object

```

#### 二、 区分容易混淆的 数据类型
` TIPS：`  看完上面的八种 数据类型的 读取。是不是发现有三种数据还是让人有点迷糊，分别就是 null、array、Object 。 这三个数据类型的 typeof 都是 object。 那如何再次区分呢？

```javascript
typeof null  		// object
typeof [123,133]	// object
typeof {a:1}  		// object

// 这个时候就无法判断了， 如何操作了？

const testArray = [11,22,33,44]
const testNull = null
const testObj = {a:1}

const testObjectFun = function(x) {
	return Object.prototype.toString.call(x)
}

console.log( testObjectFun(testArray))	// [object Array]
console.log( testObjectFun(testNull))	// [object Null]
console.log( testObjectFun(testObj))	// [object Object]
```

` TIPS: ` 目前来看，Object.prototype.toString.call(xxx)  是一个很好判断当前对象为 什么的方法。


 #### 三、 判断 当前对象为 数组的方法

```javascript

const arr = [1,2,3]

// es6
Array.isArray(arr)
arr instanceof Array
arr.constructor === Array
// es5
Object.prototype.toString.call(arr) === '[object Array]'
	
```

	在 ES5、6 中提供了一系列的 判断当前对象为 数组的方法. 可以作为一个炫技的存在了。


#### 四、章节总结


`	在 JS 这门语言中，常见的数据类型在上文中已经作出了 展示，而且也展示了一些判断当前数据类型的方法，由于 JS 是一门弱类型语言，所谓弱类型语言其实是指 数据的类型可以根据上下文的变化 发生改变。 在下一个章节 我们会介绍下 数据类型的改变方法。`

	