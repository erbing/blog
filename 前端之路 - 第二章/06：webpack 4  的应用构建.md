# 第二章 - 06：webpack 4  的应用构建

[TOC]

## 一、版本
> 当前 webpack 版本 ： v4.18.0
```javascript
webpack -v
// 4.18.0
```
同之前的版本不一样的地方是需要 全局安装 webpack-cli

```javascript
webpack-cli -v
// 3.1.0
```

> 思考这个 webpack-cli 是真的有用么？ 其实对于我来讲感觉很鸡肋，虽然它是出现是为了让我webpack 零配置化，但就目前 webpack-cli 的体验来讲，还是比较鸡肋，在实际的开发过程中，我还是比较喜欢 diy ，这样自由的折腾方式， 零配置，就意味着你要为 高度定制化作出牺牲。

---

> 这让我想起了之前面试很多前端开发的时候，其实就是一个很简单的问题，如何搭建一个最简单的 webpack 的开发架构，JS 压缩一下， LESS 预编译一下， CSS 压缩一下。这类，很多习惯了用 vue-cli 的同学就懵逼了，因为他们认为 架构就是用别人的东西，但实际的开发中，出于业务需求的需要，我们的架构需要更加多的灵活性和高度可定制化性。 所以这才是写这篇文章的 出发点。

## 二、webpack 的主体概念

> 开局一张图：

![](https://images2018.cnblogs.com/blog/675289/201809/675289-20180912164347947-278299644.png)

本质上，`webpack` 是一个现代 JavaScript 应用程序的静态模块`打包器`(static module bundler)。在 webpack 处理应用程序时，它会在内部创建一个依赖图(dependency graph)，用于映射到项目需要的每个模块，然后将所有这些依赖生成到一个或多个bundle。

> 在开始前我们需要先理解它的`核心概念`：

- 入口(entry)
- 输出(output)
- loader
- 插件(plugins)

### 2-1、入口

> 入口起点(entry point)

这里是一切开始的起点。面对实际的业务来讲的话，可以分为单页面( SPA ) 和多页面。那么今天就针对这2种情况来分别 介绍下 利用 webpack 进行项目架构的需要注意的地方。

### 2-1-1、单页面入口

####  2-1-1-1、实现的写法：
> webpack.config.js

```javascript
module.exports = {
	entry: './app.js'
}
```

####  2-1-1-2、同样也可以通过对象语法来解决不同场景的问题：

> webpack.config.js

```javascript
module.exports = {
	entry: {
		app: './app.js',
		vendors: './src/JQ.js'
	}
}
```

###  2-1-2、多页面应用的入口

>  webpack.config.js
```javascript
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};
```

但是这里只是人工的去配置了多页面，其实很明显这种做法很不聪明。
所以你需要一个聪明的做法，这里就大致讲一下思路。 通过
（ ' ./src/**/*.js' ） 匹配到 多页面到文件入口路径，然后 通过 glob.sync(globPath)
获取到全部路径，拿到每个页面的 入口文件路径。 最后传值给 webpack 的 entry 对象。 



### 2-2、输出

####  2-2-1、单页面 输出

> webpack.config.js
```javascript
module.exports = {
  output: {
    filename: 'bundle.js',
    path: '/home/proj/public/assets'
  }
};
```

####  2-2-2、多页面 输出

> webpack.config.js
```javascript
module.exports = {
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  }
};
```
 
### 2-3、loader

这里的 loader 就像一个又一个的加工厂一样，把你输送给 加工产的原材料加工生成你想要的成品或者半成品。最后出厂～

有用过 gulp 类似的构建工具等同学 就很 容易理解，这里的一个个的 loader 就想当一一个个的 task， 这个任务完成就会交给下一个人，直到整个流水线工作跑完～

在更高层面，在 webpack 的配置中 loader 有两个特征（demo）：

>webpack.config.js

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      { test: /\.txt$/, use: 'raw-loader' }
    ]
  }
}
```

其中有三个需要注意的地方：

1、loader 的特征之一： `test` 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。

2、loader 的特征之二： `use` 属性，表示进行转换时，应该使用哪个 loader。

3、在 webpack 配置中定义 loader 时，要定义在 `module.rules` 中，而不是 `rules`
 

### 2-4、plugins



## 三、如何使用



## 四、避免问题