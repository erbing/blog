#### 04：JavaScript 的闭包

##### 一、定义：

` 常规定义： `

	闭包的定义： 有权利访问外部函数作用域的函数。

` 通俗定义： `

	1、函数内部包含了函数。然后内部函数可以访问外部函数的作用域。
	2、内部函数可以访问 父级函数的作用域。
	...等等等


##### 二、思考：

	1、我们在日常的开发过程中会应用到 闭包么？
	2、如果有遇到的话，会是在什么情况下遇到的？
	3、举一些 具体的例子。


##### 三、作用：

` 在JavaScript中有作用域和执行环境的问题，在函数内部的变量在函数外部是无法访问的，在函数内部却可以得到全局变量。由于种种原因，我们有时候需要得到函数内部的变量，可是用常规方法是得不到的，这时我们就可以创建一个闭包，用来在外部访问这个变量。 `

###### 3.1 什么是作用域

###### 3.1 什么是执行环境



` 下面我们举了一个栗子 🌰 `

`eg1:`

```javascript
function Person(name) {
	this.name = name
	this.getName = function() {
		return this.name
	}
}

var one = new Person('zhang')
one.getName() // zhang
one.name	  // zhang

var two = new Person('wang')
two.getName() // wang
one.name	  // wang

```



`eg2:`

```javascript
function Person(name) {
	var _name = name
	this.getName = function() {
		return _name
	}
} 

var one = new Person('zhang')
one.getName() // zhang

var two = new Person('wang')
two.getName() // wang

```