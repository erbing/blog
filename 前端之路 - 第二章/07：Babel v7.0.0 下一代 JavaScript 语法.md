# 第二章 - 07：Babel v7.0.0 下一代 JavaScript 语法编译器

> 写本章的内容的出发点主要是 为了对于之前关于 JS 版本的一个总结，在之前的开发中，我们始终对于 ECMAScript 的版本的更新不够重视，以至于在后面的 开发过程中，我们始终会被各种新奇的语法打断了我们的思考思路，所以对于基础的追求，是任何时候都不能忘记的。不然会的框架再多，会玩儿的花样再多，到头来都只是 API 。

> 另外 一个目的就是想做一个好玩的东西，就是 实时编译所写的高版本（ES2015+）的 JS 代码。转化成现在大部分浏览器可以兼容的 ES5 、 ES3 等。

> 下面就正式介绍下 Babel （v7.0.0 ）

## 一、什么是 Babel

> Babel 是一个 JavaScript 编译器，Babel 通过语法变换器支持最新版本的 JavaScript。

### 1-1 使用方法：

> Babel 工具链中有很多工具可以让你轻松使用 Babel，无论你是“终端用户”还是构建中集成 Babel。本文是快速使用这些工具的指南，你可以在文档的“用法”部分中阅读有关它们的更多信息。

### 1-1-1 ： CLI 用法

> 这里介绍到的 cli 的用法其实对于大部分同学来说不是常规用法。
> 因为这种用法往往出现在 各种 npm 的包、cli 构建工具集成当中，所以这里，我们只介绍下它的核心用法。

    下载核心包  @babel/core

```powershell
npm install --save-dev @babel/core
```

    你可以直接在 JavaScript 中 require 它并像下面这样使用它

```javascript
const babel = require("@babel/core");

babel.transform("code", optionsObject);
```

> 作为终端用户，你可能希望安装其他工具作为 @babel/core 的接口，并能很好地集成在你的开发过程中。即便如此，你仍可能需要查看其文档页面以了解这些选项，其中大部分选项也可以通过其他工具进行设置。

### 1-1-2 ：Plugins & Presets 用法

> 以插件 和 预处理 的方式，是我们在开发过程中更为常见的方式。
> 通常我们在 Vue 项目开发中使用的是 Plugins 的方式
> 在 React 项目开发中使用的是 Presets 的方式 下面的文章中，我们分别来介绍 如何来使用。

### 1-1-3 ：Polyfill

> @babel/polyfill 模块包括 core-js 和自定义 regenerator runtime 来模拟完整的 ES2015+ 环境。
> 利用 Polyfill 更多的是来解决一个 浏览器的兼容 高版本的 ES 问题。但是往往因为这个包比较的大，所以还是慎重使用。

## 二、 React、Vue 结合 Babel

> 如何在 React、Vue 项目中结合 Webpack 使用 Babel

### 2-1 、React && Babel

> 上文中有介绍到 babel 配合 React 等使用方法。--- Presets。
> 预处理方案。

### 2-1-1: 如何使用

> 我们配置完 webpack 和 React ，并启动 server。
> 这个时候我们看下我们 react 的代码

```javascript
import React from "react";
import ReactDom from "react-dom";

const App = () => {
  return (
    <div>
      <h2>hhhh</h2>
    </div>
  );
};
ReactDom.render(<App />, document.getElementById("apps"));
```

这是一个最简单的 react 的 demo 代码展示：

结果我们发现，我们的终端 上显示 ERROR:

```javascript
ERROR in ./src/index.js 6:4
Module parse failed: Unexpected token (6:4)
You may need an appropriate loader to handle this file type.
| const App = () => {
|   return (
>     <div>
|       <h2>hhhh</h2>
|     </div>
 @ multi (webpack)-dev-server/client?http://localhost:8081 (webpack)/hot/dev-server.js ./src main[2]
```

> TIPS: 这个时候大多数人看到这个 error 的时候其实都是懵逼的，特别对于新手到讲，然后一部分机智的小伙子发现 已经超过了自己的 知识范围了，就去 谷歌、百度去寻求帮助

> 不出意外，搜索引擎统一给出的答案就是 未配置 babel 的预处理，导致 webpack 无法读懂这个代码是什么意思。

> 这个时候，我们来试着配置下我们的 babel 的 presets. 但是如何配置呢？
> 上文中，我们只是简单的介绍了下，但是实际配置的文件应该是什么样子呢？

#### 2-1-1-1 babel 配置的第一种配置方式：

> 根目录创建 `babel.config.js` 文件。

```javascript
module.exports = function() {
  const presets = [];
  const plugins = [];
  return {
    presets,
    plugins
  };
};
```

babel.config.js 的官方文档在这里 [babel](https://babel.docschina.org/docs/en/config-files#project-wide-configuration)

#### 2-1-1-2 babel 配置的第二种配置方式：

> 根目录创建 `.babelrc` 文件 ( JSON 格式)。

```json
{
  "presets": [],
  "plugins": [],
  "env": {}
}
```

#### 2-1-1-3 两种配置方式的方式都是大同小异 主要是配置的内容

> 下一个小节我们就详细介绍下 babel 的`plugins`和`presets`解析

### 2-1-2: babel 的`plugins`和`presets`解析

#### 2-1-2-1：明确 ES201x 和 ESx 的关系

> ES2015 =》 ES6
> ES2016 =》 ES7
> ES2017 =》 ES8

在 2015 年之前 ES3 是主流。

#### 2-1-2-2：plugin

> : babel 的`插件`，在 6.x 版本之后 babel`必需要`配合插件来进行工作

```json
{
  "plugins": ["transform-es2015-arrow-functions"]
}
```

顾名思义， 这个插件就是为了编译 es6 的箭头函数

#### 2-1-2-3：preset

> : babel`插件集合的预设`，包含某一部分的插件 plugin

```json
{
  "presets": ["es2015"]
}
```

> 这里着重解释下 `presets` 中 `es2015` 是什么意思？

> es2015 => babel-preset-es2015 (可以将 es6 的 JS 代码编译为 es5)
> es2016 => babel-preset-es2016 (可以将 es7 的 JS 代码编译为 es6)
> es2017 => babel-preset-es2017 (可以将 es8 的 JS 代码编译为 es7)
> stage-x => babel-preset-stage-x (可以将处于某一阶段的 js 语法编译为正式版本的 js 代码)

> 这里再介绍下 stage-x， 提案共分为五个阶段：

- stage-0: 稻草人-只是一个大胆的想法
- stage-1: 提案-初步尝试
- stage-2: 初稿-完成初步规范
- stage-3: 候选-完成规范和浏览器初步实现
- stage-4: 完成-将被添加到下一年发布

#### 2-1-2-4：preset env

> 当前 babel 推荐使用 `babel-preset-env` 替代 babel-preset-es2015 和 babel-preset-es2016 以及 babel-preset-es2017 ,`env的支持范围更广`，包含 es2015 es2016 es2017 的`所有语法编译`，并且它可以根据项目运行平台的支持情况`自行选择编译版本`。

使用方法：

```json
{
  "presets": ["env", "stage-2"]
}
```

#### 2-1-2-5： 插件中每个访问者都有排序问题

> 这意味着如果两次转译都访问相同的”程序”节点，则转译将按照 plugin 或 preset 的规则进行排序然后执行。

- Plugin 会运行在 Preset 之前。
- Plugin 会从第一个开始顺序执行。ordering is first to last.
- Preset 的顺序则刚好相反(从最后一个逆序执行)。

#### 2-1-2-6: 总结：

> 上面项目的跑起来的时候依然还是还有 bug，下面就需要我们来完善这一个问题，用上面学习到的内容

```json
{
  "presets": ["env", "stage-1", "react"],
  "plugins": [
    ["transform-runtime", { "polyfill": false }],
    "transform-decorators-legacy"
  ]
}
```

每一部分的 插件也好，预处理文件也好。都会影响着整个项目，很多时候均为 各个不同版本插件之间的兼容性问题，搞的非常头痛，所以，看准插件，仔细阅读其文档是不可或缺的。

### 2-2 、Vue && Babel

## 三、Babel 和 Prettiter 与 代码规范

> 如何在 VS Code 这个 IDE 中结合 Babel 和 Prettiter 进行代码规范执行

### 3-1 、Prettiter

### 3-2 、eslint

### 3-3 、结合使用

## 四、实时编译 JS 代码 tools

## 五、Babel 使用 总结
