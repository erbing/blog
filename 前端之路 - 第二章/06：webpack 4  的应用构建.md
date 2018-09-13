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
 
 
####  2-3-1、如何编写一个 loader

前期这里也只是大概的了解一下，在后面的文章中，我们会手把手的教你 手写一个 loader

这篇文章还只是教你如何使用 webpack。 敬请期待后面的文章吧 😁


### 2-4、plugins

插件是 webpack 的`支柱`功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！

插件目的在于解决 loader `无法实现`的其他事。

> webpack.config.js

```javascript

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}

```


####  2-4-1、如何编写一个plugins

一样的，前期这里也只是大概的了解一下，在后面的文章中，我们会手把手的教你 手写一个 plugins

这篇文章还只是教你如何使用 webpack。 敬请期待后面的文章吧 😁


## 三、如何使用

在上面的文章中，我们已经大致介绍了 webpack 的概念，下面就是需要我们来配置一个 可以实际使用的项目。

[webpack基础配置项目地址](https://github.com/erbing/BaseWebpackV4)


### 3-1  关于 resolve 解析的相关的疑问

#### 3-1-1 resolve.alias

> 创建 import 或 require 的别名，来确保模块引入变得更简单。例如，一些位于 src/ 文件夹下的常用模块：

```javascript
module.exports = {
  //...
  resolve: {
    alias: {
	  'vue$': 'vue/dist/vue.common.js',
      'src': path.resolve(__dirname, './src/src/'),
      'assets': path.resolve(__dirname, './src/assets/'),
      'components': path.resolve(__dirname, '../src/components')
    }
  }
};
```

有了上面的配置后，在项目文件中如果需要引用 components 文件夹下面的某个组件的时候 就可以 直接 如下的引用方式：

```javascript
import Alert from 'component/alert'
```

这样就可以 忽略因为项目文件过深而引起的 引用组件路径出错的问题，从而加快效率。


#### 3-1-2 resolve.extensions

> 自动解析确定的扩展。默认值为：

```javascript
module.exports = {
  //...
  resolve: {
    extensions: ['.wasm', '.mjs', '.js', '.json']
  }
};
```

这样的话，就会帮你把未加上 后缀名的文件自动加上配置后缀，从而加快开发效率。

当然也是按照你所给出的文件路径去匹配的后缀，而不是随意加上后缀名。

> 关于 resolve 解析 的内容还有很多，大家可以参考 webpack 官方文档去寻找自己需要的内容，让自己开发项目的速度变得更加快捷方便。

### 4-1  优化(optimization)

> 在 4.0 以后的 webpack 版本，他们专门把 optimization 提取出来作为一个大的模块来进行了优化，因为这个功能实在是太能有效的提升项目的加载速度了。为什么会这么说呢？下面我们就来了解了解～

我们先来看一个简单的配置：

```javascript
module.exports = {
  //...
  optimization: {
    minimize: false
  }
};
```
#### 4-1-1 optimization.minimize

> 这个属性是一个 布尔类型，是告诉 webpack 我们是否在当前环境下去压缩混淆我们的 JS 代码。

当然 需要配合这个属性来使用的还有一个 `插件` 主要注意:   `UglifyjsWebpackPlugin`

#### 4-1-2 optimization.splitChunks

> 这个属性是在 webpack 4.0 + 才提供的。用来 分离切割 体积较大的 JS 文件。

然后 webpack 会自动将 通用的 chunk 进行分割，从而最大限度的做到 `复用`  ，从而减少 main chunk 的体积。

### 5-1  插件(plugins)

> `plugins` 选项用于以各种方式自定义 webpack 构建过程。webpack 附带了各种内置插件，可以通过 `webpack.[plugin-name]` 访问这些插件。


webpack 插件列表。例如，当多个 bundle 共享一些相同的依赖，CommonsChunkPlugin 有助于提取这些依赖到共享的 bundle 中，来避免重复打包。这里还是举例说明：

```javascript
module.exports = {
  //...
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor-[hash].min.js',
    })
  ]
};
```

> 这里 CommonsChunkPlugin 就会告诉 webpack 让它把 多个 bundle 共享一些相同的依赖，抽离出来，形成一个单独的 bundle 从而避免重复打包而带来的性能损耗。


### 6-1  开发中 server (devServer)

这里的重要部分就是 webpack-dev-server 这个插件了。

> webpack-dev-server 创建当前本地开发的node环境，从而才能有上面种种 webpack 对于文件的操作权限，才能为所欲为，这个是基本。我们还是来一个最简单的 demo。

```javascript
module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,   
    port: 9000
  }
};
```

这里面也有非常多的 属性配置，基本满足了我们开发中遇到的大多数的问题。


## 四、总结

> 基本上完成了上面文章中介绍到的内容，我们就已经可以完成基本的 webpack 配置的功能了， 注意： 这里说到的是 基本的 webpack 的配置工作，那么在我们的实际的项目开发中，我们会遇到的问题和需要我们通过webpack 来解决的问题非常之多。

---

> 因为我们需要结合一系列的框架来完成我们的前端开发的工作，React、Vue、Angular、JQ，Backbone 等等等。 这系列的框架 风格各异，但是又万变不离其宗，核心需要注意的地方就那么多，下一篇文章就会 讲到一个 现代 前端开发 需要注意的一个重要 插件。 `Babel`  。

---

> 关于 webpack 入门的文章就介绍到这里了，欢迎一起来论道～
  

