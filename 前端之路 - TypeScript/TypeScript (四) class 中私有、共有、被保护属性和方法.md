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

> 这里我们想继承
