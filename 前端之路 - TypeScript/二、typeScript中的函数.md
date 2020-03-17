##《前端之路》- TypeScript 函数篇

### 一、定义函数方法
	
> 在 es5 中定时函数的方法有 命名函数和函数表达式（匿名函数）这门两种。那么同样的，在  TypeScript 中，函数的定义是什么样子的呢？

#### 1-1 命名函数

	这里需要注意的一点是： viod 类型，是函数不返回任何类型数据

> `TypeScript` 语法

```typescript
function func1(): string {
	return '213';
}

function func2(): number {
	return 123;
}

function func3(): Array<any> {
	return [123, {}];
}

function func4(): Array<number> {
	return [123, 456];
}

function func5(): Array<string> {
	return ['123', '1233'];
}

function func6(): void {
	console.log(123);
}
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
function func1() {
    return '213';
}
function func2() {
    return 123;
}
function func3() {
    return [123, {}];
}
function func4() {
    return [123, 456];
}
function func5() {
    return ['123', '1233'];
}
function func6() {
    console.log(123);
}
```

#### 1-2 函数表达式

	这里需要简单的普及一个 ES6 的箭头函数，无大括号时，直接表示 return 这个值。

> `TypeScript` 语法

```typescript
const fun11 = (): string => {
	return '123';
};

const fun12 = (): string => '123';

const fun13 = (): any => [123, '123'];

const fun14 = function(): string {
	return '123';
};

const fun15 = function(): any {
	return { name: 123 };
};

```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var fun11 = function () {
    return '123';
};
var fun12 = function () { return '123'; };
var fun13 = function () { return [123, '123']; };
var fun14 = function () {
    return '123';
};
var fun15 = function () {
    return { name: 123 };
};
```
	

### 二、定义函数传参

#### 2-1 定义函数传参

	这里需要简单的描述下，函数的传参的类型和之前文章中介绍到的数据类型定义方式是一致的。

> `TypeScript` 语法

```typescript
const parasFun1 = (x: string, y: number) => {
	console.log(x + y);
};

let res1 = parasFun1('1', 2); // 猜猜返回啥？哈哈哈哈 可以子啊留言中写下你的答案
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var parasFun1 = function (x, y) {
    console.log(x + y);
};
var res1 = parasFun1('1', 2); // 猜猜返回啥？哈哈哈哈 可以子啊留言中写下你的答案
```

### 三、可选传参

#### 3-1 定义函数的可选传参

	这里需要简单的描述下，函数的可选参数，很明显就是可以选择传入这个参数也可以选择不传入这个参数，且可选参数一定是排在必传参数的后面。

> `TypeScript` 语法

```typescript
const parmaFunc1 = (name: string, age?: number) => {
	if (age) {
		return `我的名字是：${name} --- 我的年龄是： ${age}`;
	} else {
		return `我的名字是：${name} --- 我的年龄保密！`;
	}
};

let res11 = parmaFunc1('zhangsan', 123);
let res12 = parmaFunc1('zhangsan');

const parmaFunc2 = (name?: string, age: number) => {
	if (age) {
		return `我的名字是：${name} --- 我的年龄是： ${age}`;
	} else {
		return `我的名字是：${name} --- 我的年龄保密！`;
	}
};
// 这里的 parmaFunc2 会报错么？
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var parmaFunc1 = function (name, age) {
    if (age) {
        return "\u6211\u7684\u540D\u5B57\u662F\uFF1A" + name + " --- \u6211\u7684\u5E74\u9F84\u662F\uFF1A " + age;
    }
    else {
        return "\u6211\u7684\u540D\u5B57\u662F\uFF1A" + name + " --- \u6211\u7684\u5E74\u9F84\u4FDD\u5BC6\uFF01";
    }
};
var res11 = parmaFunc1('zhangsan', 123);
var res12 = parmaFunc1('zhangsan');
```

### 四、默认传参

#### 4-1 定义函数默认传参

	这里的默认传参和 ES6 中默认传参的使用方式是一致的

> `TypeScript` 语法

```typescript
const defaultParamFunc1 = (x: string, age: number = 10): void => {
	console.log(`我的名字是：${name} --- 我的年龄是： ${age}`);
};

let defaultRes1 = defaultParamFunc1('zhangsan');
// 这里会打印出什么呢？
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var defaultParamFunc1 = function (x, age) {
    if (age === void 0) { age = 10; }
    console.log("\u6211\u7684\u540D\u5B57\u662F\uFF1A" + name + " --- \u6211\u7684\u5E74\u9F84\u662F\uFF1A " + age);
};
var defaultRes1 = defaultParamFunc1('zhangsan');

```

### 五、传递剩余参数

#### 5-1 定义函数传递剩余参数（三点运算符）

	这里的传递剩余参数和 ES6 中传递剩余参数的使用方式是一致的,只不过我们可能需要对剩余参数进行一个类型的定义

> `TypeScript` 语法

```typescript
// 写一个demo 就是，我们需要对一个对个求和，且我们不知道具体会有多少个参数

const restParamsFunc1 = (x: any, y: any, z: any): number => {
	return x + y + z;
};
let restRes1 = restParamsFunc1(1, 2, 3); // 正常运行

// let restRes2 = restParamsFunc1(1, 2, 3, 4); // ts 会报错，说第四个参数未声明

const restParamsFunc2 = (...res: number[]): number => {
	let sum = 0;
	for (let index = 0; index < res.length; index++) {
		sum += res[index];
	}
	return sum;
};
let restRes3 = restParamsFunc2(1, 2, 3, 4); // 这个时候又会得出什么结果呢？

```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
// 写一个demo 就是，我们需要对一个对个求和，且我们不知道具体会有多少个参数
var restParamsFunc1 = function (x, y, z) {
    return x + y + z;
};
var restRes1 = restParamsFunc1(1, 2, 3); // 正常运行
// let restRes2 = restParamsFunc1(1, 2, 3, 4); // ts 会报错，说第四个参数未声明
var restParamsFunc2 = function () {
    var res = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        res[_i] = arguments[_i];
    }
    var sum = 0;
    for (var index = 0; index < res.length; index++) {
        sum += res[index];
    }
    return sum;
};
var restRes3 = restParamsFunc2(1, 2, 3, 4); // 这个时候又会得出什么结果呢？
```

### 六、函数重载

#### 6-1 JavaScript 中的函数重载

> 函数名称相同，但是函数的传入参数不同。执行不同的功能，这个时候就会出现函数重载。

> `TypeScript` 语法

```typescript
const reloadFunc1 = (name: string) => {
	console.log(name);
};
const reloadFunc1 = (age: string) => {
	console.log(age);
};
const reloadFunc1 = (name: string, age: number) => {
	if (age) {
		console.log(name, age);
	} else {
		console.log(name);
	}
};

// 这个时候我们会发现 ts 已经给我们报了语法的错误，但是转译成 es5 的代码的时候依然可以运行，只不过后面定义的方式会覆盖前面定义的同名函数的方法

```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var reloadFunc1 = function (name) {
    console.log(name);
};
var reloadFunc1 = function (age) {
    console.log(age);
};
var reloadFunc1 = function (name, age) {
    if (age) {
        console.log(name, age);
    }
    else {
        console.log(name);
    }
};
// 这个时候我们会发现 ts 已经给我们报了语法的错误，但是转译成 es5 的代码的时候依然可以运行，只不过后面定义的方式会覆盖前面定义的同名函数的方法
```

> 这里我们需要区分一下 Java 中的函数重载和 ts 中的函数重载的区别

- 在 Java 中 定义的同名重载函数，会根据传入数据类型的差异，直接执行对应的函数，但是 ts 不会。
- 在 ts 中，即使定义了重载函数，编译成 ES5 以后，还是只剩下一个对应函数的判断。这里我们只做一个简单的了解，在前端写 JS 的时候还是需要注意命名空间和命名重叠的问题。

> 我们还是以代码的例子来做区分，例子一如下：

> `TypeScript` 语法

```typescript
const reloadFunc2 = (name: string):string;
const reloadFunc2 = (age: number):number;
const reloadFunc2 = (age:any):any => {
    if(typeof age === 'number') {
        console.log(name, age)
    }  else {
        console.log(name)
    }
}

// 这个时候，ts 依然会报错，是为什么？ 这里就要提到 const 、let 的作用域的问题，因为这里也是 ES6 的基础知识，不展开来说了。
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
var reloadFunc2 = function (name) { return ; };
var reloadFunc2 = function (age) { return ; };
var reloadFunc2 = function (age) {
    if (typeof age === 'number') {
        console.log(name, age);
    }
    else {
        console.log(name);
    }
};
```

> 我们还是以代码的例子来做区分，例子二如下：

> `TypeScript` 语法

```typescript
function reloadFunc3(name: string):string; 
function reloadFunc3(age: number):number;
function reloadFunc3(str:any):any {
    if(typeof str === 'number') {
        console.log(name, str)
    }  else {
        console.log(name)
    }
}; 
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
function reloadFunc3(str) {
    if (typeof str === 'number') {
        console.log(name, str);
    }
    else {
        console.log(name);
    }
}

// 这里编译出来，居然只有一个函数，惊叹了，为什么惊叹了呢？因为这里和 Java 中的函数重载差别有点大。
```

### 七、箭头函数

#### 7-1 定义箭头函数

> 箭头函数的话，其实和 ES6 中的写法是一致的，然后需要我们注意的是，箭头函数中的上下文，指向的是起父级函数的上下文。

> `TypeScript` 语法

```typescript
const arrowFunc = (): number => {
	return 123;
};

setTimeout(() => {
	console.log('过了一秒');
}, 1000);

```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var arrowFunc = function () {
    return 123;
};
setTimeout(function () {
    console.log('过了一秒');
}, 1000);
```

### 八、总结

> 这一篇文章也只能算是基础入门级别的 ts 中函数的定义方式和方法，这个需要大家在日常的项目中多书写，才能避免一些问题，然后我们就会发现，我们在使用 ts 去书写一些函数和对应参数的时候，我们已经可以避免一些多余参数和错误的参数类型的传入导致的一些奇奇怪怪的bug。好了，这一章就先写到这里。

---

> GitHub 地址：（欢迎 star 、欢迎推荐    : ) 
>  [《前端之路》 - TypeScript（二）函数篇](https://github.com/erbing/blog/blob/master/%E5%89%8D%E7%AB%AF%E4%B9%8B%E8%B7%AF%20-%20TypeScript/%E4%BA%8C%E3%80%81typeScript%E4%B8%AD%E7%9A%84%E5%87%BD%E6%95%B0.md)
