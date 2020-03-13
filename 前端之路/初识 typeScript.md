## 初识 typeScript

### 二、基础数据类型 （Basic Types）

#### 2.1 基础数据类型

- Boolean （布尔类型）
- Number （数字类型）
- String （字符串类型）
- Array （数组类型）
- Tuple （元组类型）
- Enum （可枚举类型）
- Any （任意类型）
- Void （Void 类型）
- Null & Undefined
- Never （Never 类型）
- Object （object 类型-非原始类型）

##### 2.1.1 Boolean （布尔类型）

> `TypeScript` 语法

```typescript
let isBool: Boolean = false;
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var isBool = false;
```

##### 2.1.2 Number （数字类型）

> `TypeScript` 语法

```typescript
let nums: number = 123;
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var nums = 123;
```

##### 2.1.3 String （字符串类型）

> `TypeScript` 语法

```typescript
let str: string = "123";
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var str = "123";
```

##### 2.1.4 Array （数组类型）

> `TypeScript` 语法

```typescript
// 纯数组类型数组表示方式
let arr0: number[] = [123, 123];
// 使用数组泛型
let arr1: Array<number> = [123, 345];
let arr2: Array<string> = ["123", "345"];
let arr3: Array<any> = [123, "345", { title: "123" }];
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
// 纯数组类型数组表示方式
var arr0 = [123, 123];
// 使用数组泛型
var arr1 = [123, 345];
var arr2 = ["123", "345"];
var arr3 = [123, "345", { title: "123" }];
```

##### 2.1.5 Tuple （元组类型）

    稍微解释下什么叫元组类型,元组类型本质上也属于 数组类型的一种，是数组类型的子集，然后不同的一点在于，元组类型的数据长度是已知的。就是说我们为这里每一位数组中的数据定义类型。那这种类型就叫 ##元组类型##

> `TypeScript` 语法

```typescript
let tupleArr: [number, string];
tupleArr = [123, "123"];
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var tupleArr;
tupleArr = [123, "123"];
```

##### 2.1.6 Enum （可枚举类型）

    稍微解释下什么叫元组类型,元组类型本质上也属于 数组类型的一种，是数组类型的子集，然后不同的一点在于，元组类型的数据长度是已知的。就是说我们为这里每一位数组中的数据定义类型。那这种类型就叫 ##元组类型##

> `TypeScript` 语法

```typescript
let tupleArr: [number, string];
tupleArr = [123, "123"];
```

> 被编译成 `ES5` 的 `JavaScript`

```javascript
"use strict";
var tupleArr;
tupleArr = [123, "123"];
```
