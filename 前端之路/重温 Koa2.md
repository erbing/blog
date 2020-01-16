## 重温 Koa2

[TOC]

### 一、简单介绍

####  1.1、快速开始 （这里省略了安装的过程）

```javascript
const Koa = require('koa')
const app = new Koa()

app.use( async ( ctx ) => {
  ctx.body = 'hello koa2'
})

app.listen(3000)
```

#### 1.2、源码简单解析

> 源码文件主要包含了 application.js 、context.js 、request.js 、response.js

- application.js 是 Koa 的入口文件封装了 ctx、request、response， 以及核心的中间件处理流程
- context.js 处理应用上下文，里面直接封装部分request.js和response.js的方法
- request.js 处理http请求
- response.js 处理http响应


#### 1.3、中间件的简单开发

> 这里主要介绍如何使用 async/await 在 koa2 中进行中间件的开发

> middleware 在 koa2 中如何使用
```javascript
const Koa = require('koa')
const logger = require('./middleware/logger-async')

const app = new Koa()

app.use(logger())

app.use(ctx => {
	ctx.body = 'hello middleware'
})

app.listen(3000)
```
> 如何编写一个简单的 middleware 中间件

```javascript
function log(ctx) {
	console.log( ctx.method, ctx.header.host + ctx.url )
}

module.exports = function() {
	return async function(ctx, next) {
		log(ctx)
		await next()
	}
}

// 对，就是这样，so easy
```

### 二、 路由

> 原生 JS 实现 koa 的 router
> 
> 经过思考🤔， 实现路由的基本原理： 通过请求进来的 url 匹配到对应的页面文件，然后通过 fs 读取对应文件的内容，并返回给 ctx.body, 那下面我们就按照这个思路来实现一下路由。

```javascript

function render(page) {
    return new Promise((resolve, reject) => {
        let viewUrl = `./view/${page}`;
        fs.readFile(viewUrl, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

async function route(url) {
    let view = '404.html';
    switch (url) {
        case '/':
            view = 'index.html';
            break;
        case '/index':
            view = 'index.html';
            break;
        case '/login':
            view = 'login.html';
            break;
        case '/404':
            view = '404.html';
            break;
        default:
            break;
    }
    let html = render(view);
    return html;
}

app.use(async ctx => {
    let url = ctx.request.url;
    let html = await route(url);
    ctx.body = html;
});

// 当然还有 koa-router 中间件 
```

### 三、请求数据

#### 3.1、 GET 请求数据获取

#### 3.2、 POST 请求数据获取

#### 3.3、 koa-bodyparser中间件


