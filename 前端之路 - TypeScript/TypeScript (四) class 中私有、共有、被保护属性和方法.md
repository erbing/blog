##《前端之路》- TypeScript (四) class 中各类属性、方法，抽象类、多态

[TOC]

> 在这一章中介绍的 class 类，希望同学们可以在上一章节中 复习下构造函数、原型、原型链等基础知识

### 一、TypeScript 中的类

> 1、先来举个例子：

```typescript
class Persons {
  name: any;
  age: number | undefined;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  getName(): void {
    console.log(`${this.name}今年已经${this.age}岁了`);
  }
}

let p11 = new Persons("za", 123);
console.log(p11.getName()); // za今年已经123岁了
```

- 转换成 ES5 的代码后：

```javascript
var Persons = /** @class */ (function() {
  function Persons(name, age) {
    this.name = name;
    this.age = age;
  }
  Persons.prototype.getName = function() {
    console.log(
      this.name + "\u4ECA\u5E74\u5DF2\u7ECF" + this.age + "\u5C81\u4E86"
    );
  };
  return Persons;
})();
var p11 = new Persons("za", 123);
console.log(p11.getName()); //  za今年已经123岁了
```

> 2、这里和我们使用 Es6 中的 class 有一些差别

```javascript
// javascript 中 class 的定义
class An {
  constructor(name) {
    this.name = name;
  }
  getName() {
    console.log(this.name);
  }
}
var a = new An("zz");
a.getName(); // zz
```

> 3、差异在于，我们需要去定义 constructor 构造函数中传入的数据参数的类型

###二、TypeScript 中类的继承

```typescript
class Animal {
  name: string | undefined;
  food: string;
  constructor(name: string, food: string) {
    this.name = name;
    this.food = food;
  }
  eat() {
    console.log(`${this.name}吃${this.food}`);
  }
}

class Cat extends Animal {
  constructor(name: string, food: string) {
    super(name, food);
  }
  jump() {
    console.log(`${this.name}正在跳`);
  }
}

let xiaohhua = new Cat("xiaohua", "猫粮");
console.log(xiaohhua.eat()); // xiaohua吃猫粮
console.log(xiaohhua.jump()); // xiaohua正在跳
```

> 这里和 ES6 中的 class 继承内容基本上没什么出入

###三、TypeScript 中公共，私有与受保护的修饰符

> 这里的修饰符是对类中对 属性和方法的类型的定义

#### 3-1、属性的 public

> 不定义的类心的话，默认就是 public 类型

```typescript
class Animals {
  public name: string | undefined;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name}哇`);
  }
}
```

> 转换成 es5 代码

```javascript
"use strict";
var Animals = /** @class */ (function() {
  function Animals(name) {
    this.name = name;
  }
  Animals.prototype.eat = function() {
    console.log(this.name + "\u54C7");
  };
  return Animals;
})();
// 和没定义之前一样
```

#### 3-2、属性的 private

> 当成员被标记成 private 时，它就不能在声明它的类的外部访问

```typescript
class Animal2 {
  private name: string | undefined;
  constructor(name: string) {
    this.name = name;
  }
  eat() {
    console.log(`${this.name}哇`);
  }
}

var a = new Animal2("private");
a.name = "123"; // 报错，name 属性只能在 Animal2 内部使用
new Animal2("private").name = "432"; // 报错： 属性“name”为私有属性，只能在类“Animal2”中访问。
```

#### 3-3、属性的 protected

> 当成员被标记成 protected 时，它就不能在声明它的类的外部访问，但是该类的子类可以访问

```typescript
class Person2 {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class exPerson extends Person2 {
  public age: number;
  constructor(age: number, name: string) {
    super(name);
    this.age = age;
    this.name = name;
  }
  public getInfo() {
    console.log(`${this.name}哈哈哈哈${this.age}`);
  }
}

let ps = new exPerson(123, "za"); // 派生类可以继承 protected 属性，但是

ps.name = "zz"; // 报错 外部无法直接访问
console.log(ps); // { name: 'za', age: 123 }
```

> 构造函数也能够被 设置成 protected 属性

```typescript
class Person22 {
  protected name: string;
  protected constructor(name: string) {
    this.name = name;
  }
}

class exPerson2 extends Person2 {
  public age: number;
  constructor(age: number, name: string) {
    super(name);
    this.age = age;
    this.name = name;
  }
  public getInfo() {
    console.log(`${this.name}哈哈哈哈${this.age}`);
  }
}

let exp = new exPerson2(21, "exp-name");
let per22 = new Person22("zs"); // 报错 类“Person22”的构造函数是受保护的，仅可在类声明中访问
```

#### 3-4、readonly 修饰符

> 使用 readonly 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化

```typescript
class octPers {
  readonly name: string;
  readonly age: number = 8;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

let ns = new octPers("zz", 123);
console.log("---1", ns);
ns.age = 456; // 报错 Cannot assign to 'age' because it is a read-only property.
console.log("---2", ns); // 这里会执行什么内容呢？
```

###四、TypeScript 中 静态方法

> 这里所谓的静态方法，其实就是将方法直接定义在了 构造函数对象上，只有构造函数本身才能去使用它，任何其他都无法使用（包括它的 派生类）

```typescript
class staticPerson {
  public name: string;
  public age: number = 8;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  static getName1() {
    console.log("---static-getName---", this);
  }
  protected getName(): void {
    console.log("---protected-getName---", this);
  }
}

let ress = new staticPerson("zzs", 123);
console.log("---instancing getName", staticPerson.getName1()); // 属性“getName”受保护，只能在类“staticPerson”及其子类中访问。
```

###五、TypeScript 中 继承与多态

> 这里面其实更多的是 JS 的继承与多态，我们以 ES5 和 ES6 分别对继承和多态进行对比

#### 5-1 ES5 中是如何实现 继承的？

> 这里我们想想继承，到底是继承什么？如何继承？为什么要继承？

##### 5-1-1 通过类式继承

> 类的方式，其核心在于将 子类的 prototype 指向了 父类的实例，这样的话，子类的实例的 `__proto__` 指向子类的 `prototype`, 然而 子类的 `prototype` 被赋予了 父类的实例。我们制作一个简单的图，来说明一下这里如何实现的继承。

![](https://img2020.cnblogs.com/blog/675289/202003/675289-20200326231020779-112372204.jpg)

```javascript
var SuperClass = function(name) {
  var id = 1;
  this.name = name;
  this.work = function() {
    console.log(this.name + "in SuperClass");
  };
};
SuperClass.prototype.getSuperName = function() {
  return this.name;
};

var SubClass = function() {
  this.getSubName = function() {
    console.log("this is subname");
  };
};

SubClass.prototype = new SuperClass("superClass");
var sub = new SubClass();

// 这样有缺点么？ 当然有，下面我们来通过例子来说明一下
```

> 这种继承的方式的缺点、

```javascript
var SuperClass = function(name) {
  var id = 1;
  this.name = name;
  this.todo = [1, 2, 3, 4];
  this.work = function() {
    console.log(this.name + "in SuperClass");
  };
};
SuperClass.prototype.getSuperName = function() {
  return this.name;
};

var SubClass = function() {
  this.getSubName = function() {
    console.log("this is subname");
  };
};

SubClass.prototype = new SuperClass("superClass");
var sub = new SubClass();
sub.todo.push("subClass name");
var sub2 = new SubClass();
console.log(sub2.todo); // [ 1, 2, 3, 4, 'subClass name']
// 这里是缺陷一，父类属性会被实例子类修改、污染

console.log(sub.name); //superClass
console.log(sub2.name); //superClass

// 子类的实例只能有一个name，这很显然也是不够灵活的，这里就是缺陷二
```

> 这里因为子类实例对象 1，对于父类共有属性进行了修改，导致子类实例对象 2 的对应属性受到了污染。那有没有什么办法可以避免这种污染呢？当然是有的，后面我们会介绍到的。

##### 5-1-2 通过构造函数继承

```javascript
// 声明父类
function Animal(color) {
  this.name = "animal";
  this.type = ["pig", "cat"];
  this.color = color;
}

// 添加原型方法
Animal.prototype.eat = function(food) {
  console.log(food);
};

// 声明子类
function Dog() {
  Animal.apply(this, arguments);
  // 这一步的操作就是改变 Animal 方法的上下文，然后让 Dog 也具备了 父类构造函数内的属性和方法
}

var dog1 = new Dog("blue"); // dog1.color -> blue
var dog2 = new Dog("red"); // dog2.color -> red

dog1.type.push("haha");
console.log(dog2.type); // [ 'pig', 'cat' ]
```

> 我没看到 dog1 修改了继承自父类的属性 type ，但是 dog2 的 type 属性并为被影响到。原因就是我们实例化的时候，创建的实例对象的指针指向的位置是不同的，所以对应的 `__proto__` 指向的是 不同的子类构造函数的 `prototype`。可能会比较绕口，但是本质就是 new 操作生成了 2 个不同的对象，各自有各自的原型属性，互不干扰。

`但是上面也有一个缺陷就是，子类没办法继承到父类原型上的方法和属性`

> 那聪明的前端开发者们，就想到了 集合前 2 者的优势，进行了 组合式继承。

##### 5-1-3 组合式继承

```javascript
// 声明父类
function Animal(color) {
	this.name = 'animal';
	this.type = ['pig', 'cat'];
	this.color = color;
}

// 添加原型方法
Animal.prototype.eat = function(food) {
	console.log(food);
};

// 声明子类
function Dog() {
	Animal.apply(this, arguments);
	// 这一步的操作就是改变 Animal 方法的上下文，然后让 Dog 也具备了
	// 父类构造函数内的属性和方法
}
Dog.prototype = new Animal('Animal Color');

var dog1 = new Dog();
console.log((dog1.color = 'dog1.name'));
var dog2 = new Dog();

console.log(dog2.color); // undefined

这里为什么 dog2.color 是 undefined 而不是 'dog1.name' 呢？
因为，我们子类的构造函数，已经继承了 父类的构造函数内部的属性和方法，然后，在实例我们 子类的时候，子类的实例对象就会有先从本身的对象中去寻找 color 属性。
当找到对应属性的时候，无论是否有值，都会优先返回 实例化对象本身的属性，而不再需要从原型链中查找对应属性。
```

#### 5-2 ES6 中是如何实现 继承的？

> 这里我们想想继承，到底是继承什么？如何继承？为什么要继承？

##### 5-2-1 ES6 的继承方式

```javascript
class Animal {
	constructor(name) {
		this.name = name;
	}
	eat(food) {
		console.log(`${this.name}吃${food}`);
	}
}

class Dog extends Animal {
	constructor(name) {
		super(name);
		this.name = name;
	}
	run() {
		console.log('小狗泡泡跑');
	}
}

let dog1 = new Dog('小狗');
let dog2 = new Dog('小花');
console.log(dog1.name); // 小狗
console.log(dog2.name); // 小花

dog1.__proto__ === Dog.prototype	// true
Dog.__proto__ === Animal			// true

这里 Dog 的 __proto__ 指向的是 Animal 这个类

因为 Animal 这个类中的 constructor 就是原来的构造函数， 其中剩下的方法、属性都是 prototype 上的公共方法与属性。是可以被子类继承
```

### 六、总结

> 这里全篇文章又总结了下 JS 中继承的原理以及一些我们平时可能忽略的问题，这里就相当于在 学习 ts 之前，带着大家再一起复习一下。好了，本篇文章就先到这里了。
