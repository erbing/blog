### 06: JS 中 this 的使用技巧总结

`this`  是 `JavaScript` 中的关键字。

* 一、基本认识

	在 JS 中我们把 this 关键字当作成一个 快捷方式，用来引用当前调用者。

	解释上面这句话，其实就是一句话：

	this关键字指向的是当前上下文（context）的主体（subject），或者当前正在被执行的代码块的主体。

	通俗一点解释就是： 谁手里拿着这个名字叫 this 的武器，this 就指向拿着这个武器的人。 就好比 说起 屠龙刀 你就能想起 金毛狮王，说起 倚天剑 就能想起 周芷若 一样。 这些武器就是 this，但是 this 代表着谁呢？ 代表着拿着这些武器的人。

	但是有一种特殊的情况就是： 如果拿着这个武器的人是一个无名英雄的话，那么这个 this 就会指向 undefined。

` eg1: `

```javascript
"use strict"
(function() {
	console.log(this)    // undefined
})()
```

	对比下 非严格模式下

```javascript
(function() {
	console.log(this)    // window
})()
```

* 1.1、基本认识 之 严格模式

	严格模式的限制：（大约15条规则）
* 1.1.1、不允许使用未声明变量
```javascript
"use strict"
x=123
// Uncaught ReferenceError: x is not defined
```
	...

* 1.1.15 禁止this关键字指向全局对象

```javascript
function f() {
	console.log(this)    // window
}

function x() {
	"use strict"
	console.log(this)    // undefined
}
```


* 二、this 关键字的核心


如果一个方法内部使用了this关键字，`当且仅当对象调用方法时this关键字才会被赋值`，而且，当方法被调用时，this的赋值又严格依赖于实际调用这个方法的对象，也就是说，`this通常会被赋予调用对象的值`。
	
	这句话 这么读起来 其实还是比较 拗口的，我们还是拿 `屠龙刀` 举例子吧。
	
	当 金毛狮王 拿起来屠龙刀的时候，这刀才能被赋予神力。如果这把刀被 金毛狮王借给了 张无忌来用的话，也只有当 张无忌 拿起来这把刀的时候，屠龙刀才能被赋予神力。屠龙刀被放在剑鞘里面的时候，是不具备神力的。

* 三、全局范围内的 this

	在全局域中，代码在浏览器执行，所有变量和方法都属于window对象，因此在全局域中使用this关键字的时候，它会被指向全局变量window对象。

```javascript
var firstName = 'Peter',
    lastName = 'Ally';

function showFullName(){
    console.log(this.firstName + ' ' + this.lastName);
}

var person = {
    firstName : 'foo',
    lastName : 'bar',
    showFullName : function(){
        console.log(this.firstName + ' ' + this.lastName);
    }
}

showFullName(); //Peter Ally

window.showFullName(); //Peter Ally

person.showFullName(); //foo bar
```

* 四、上下文（context） 和  this 之间的关系

		这里的上下文  在很多情况下  其实是为了能够使其被改变而存在的一个所谓的 上下文。
	
		既然提到了 this 和 上下文 那就无法避免 call apply 和 bind 

	下面我们 就来说一说 this 和 bind call apply 之间的关系。

* 五、this 同 bind 、call、apply 的比较

	5.1 this 和 call 
			
```javascript
	
var person = {
	fN: 'zhang',
	lN: 'san',
	getName: function() {
		console.log(this.fN  +  ‘  ’  +  this.lN) 
    }
}

var anotherPerson = {
	fN: 'li',
	lN: 'si'
}

person.getName()										//  zhang san
person.getName.call(anotherPerson)			// li si
```				

	5.2 this 和 apply 

```javascript

var person = {
    firstName : 'foo',
    lastName : 'bar',
    showFullName : function(){
        console.log(this.firstName + ' ' + this.lastName);
    }
};

var anotherPerson = {
    firstName : 'Peter',
    lastName : 'Ally'
};

person.showFullName.apply(anotherPerson)		// Peter Ally


person.showFullName.call(anotherPerson, 1,2,3)
// Peter Ally
// 1 2 3

person.showFullName.apply(anotherPerson, [1,2,3])
// Peter Ally
// 1 2 3


```


	5.3 this 和 bind
		在EcmaScript5中扩展了叫bind的方法（IE6,7,8不支持）
		bind与call很相似
```javascript

var person = {
    firstName : 'foo',
    lastName : 'bar',
    showFullName : function(x,y){
        console.log(this.firstName + ' ' + this.lastName);
	    console.log(x,y)
    }
};

var anotherPerson = {
    firstName : 'Peter',
    lastName : 'Ally'
};

person.showFullName.bind(anotherPerson)(123,456)

// Peter Ally
// 123 456

```


* 六、this使用技巧

#### 1. 作为回调函数传入其他方法

```javascript
var user = {
    name : 'zhang',
    clickHandler : function(){
        console.log(this.name);
    }
}

button.onclick = user.clickHandler; //undefined，无法读取对象的name属性
```

**分析**：当把user.clickHandler当作回调函数传入button元素的click事件，user.clickHandler中的this将不再执行user。因为真正调用user.clickHandler的对象是button对象。

当上下文改变时，当我们在其它对象而非原对象上执行某个方法的时候，显然this关键字不再指向定义了this关键字的原对象。

**解决方法**：使用bind，apply，call来强制保证作用域，即this指向的对象。

1. bind

    ```javascript
    button.onclick = user.clickHandler.bind(user);
    ```

2. apply/call

    ```javascript
    button.onclick = function(){
        user.clickHandler.call(user);
    }
    ```

#### 2. 闭包中的this

内部方法不能直接使用this关键字来访问外部方法的this变量，因为this变量只能被特定的方法本身使用。

```javascript
var user = {
    tournament: "The Masters",
    data: [{
        name: "T. Woods",
        age: 37
    },
    {
        name: "P. Mickelson",
        age: 43
    }],
    clickHandler: function() {
        this.data.forEach(function(person) {
            console.log("What is This referring to? " + this);
            console.log(person.name + " is playing at " + this.tournament);
        })
    }
}

user.clickHandler(); // What is "this" referring to? [object Window]
```

为了保证闭包中的this的指向的正确，

```javascript
var user = {
    tournament: "The Masters",
    data: [{
        name: "T. Woods",
        age: 37
        },
        {
            name: "P. Mickelson",
            age: 43
    }],
    clickHandler: function() {
        //保存this对象
        var that = this;
        this.data.forEach(function(person) {
            console.log("What is This referring to? " + that);
            console.log(person.name + " is playing at " + that.tournament);
        })
    }
}

user.clickHandler(); // What is "this" referring to? [user]
```

#### 3. 方法被赋值给某个变量

```javascript
var name = 'global';

var user = {
    name : 'user',
    showName : function(){
        console.log(this.name);
    }
}

//把方法赋值给变量
var showName1 = user.showName;

showName1(); //global

//使用bind绑定作用域
var showName2 = user.showName.bind(user);

showName2();//user
```

#### 4. 借用方法带来的问题

```javascript
/*
    下面代码中有两个对象。其中一个定义了avg方法，另一个不包含avg的定义。
    我们用另一个对象来借用前一对象的avg方法。
*/
var gameController = {
    scores: [20, 34, 55, 46, 77],
    avgScore: null,
    players: [{
        name: "Tommy",
        playerID: 987,
        age: 23
    },
    {
        name: "Pau",
        playerID: 87,
        age: 33
    }]
}

var appController = {
    scores: [900, 845, 809, 950],
    avgScore: null,
    avg: function() {
        var sumOfScores = this.scores.reduce(function(prev, cur, index, array) {
            return prev + cur;
        });
        this.avgScore = sumOfScores / this.scores.length;
    }
}

//原文中的第二参数是多余的，写上会造成理解的误差
appController.avg.apply(gameController);

console.log(gameController.avgScore);
```