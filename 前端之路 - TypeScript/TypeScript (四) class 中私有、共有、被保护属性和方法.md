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

#### 3-3、属性的 protected

#### 3-4、方法的 public

#### 3-5、方法的 private

#### 3-6、方法的 protected
