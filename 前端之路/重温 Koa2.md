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

> GET 请求数据获取的方法有2中，如下

```javascript
app.use(async ctx => {
    let url = ctx.request.url;
    let html = await route(url);

    // 从上下文对 request 对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_queryString = request.querystring;

    // 从 上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_queryString = ctx.querystring;

    ctx.body = {
        ctx,
        request,
        url,
        req_query,
        req_queryString,
        ctx_query,
        ctx_queryString,
        html
    };
});
```

> 返回结果 

```json
url: "/index?page=1"
req_query: {page: "1"}
req_queryString: "page=1"
ctx_query: {page: "1"}
ctx_queryString: "page=1"
```

> 疑惑🤔的 点： 从上线文中获取的request对象和直接通过上线文获取的参数 有什么区别？ 为什么要这么设计？

- 从 Koa2 的框架设计层面 app.js 中封装了  ctx、request、response
- 从 Koa2 的框架设计层面 ctx.js 中封装了 request、response 方法
- 从上下文中获取和从 ctx.request 获取的参数是一样的，因为底层方法是一致的
- 直接从上下文中获取的方式简单、快捷
- 从上下文中的 request 对象中获取的话，会更加的明确该属性来源，不容易混淆。

> 注意：ctx.request是context经过封装的请求对象，ctx.req是context提供的node.js原生HTTP请求对象, 和这里的 ctx.query 和 ctx.request.query 是没有关系的。

#### 3.2、 POST 请求数据获取

> POST 请求的话，需要我们在页面mock一个表单，这样的话，可以更好的查看我们请求的数据。

```html
        <h1>koa2 request post demo</h1>
        <form method="POST" action="/">
            <p>userName</p>
            <input name="userName" /><br />
            <p>nickName</p>
            <input name="nickName" /><br />
            <p>email</p>
            <input name="email" /><br />
            <button type="submit">submit</button>
        </form>
```

```javascript
    if (ctx.method === 'GET') {
        ctx.body = html;
    } else if (ctx.url === '/' && ctx.method === 'POST') {
        ctx.body = html + `<script> alert('提交成功！') </script>`;
    } else {
        ctx.body = '<h1>404！！！ o(╯□╰)o</h1>';
    }
```


#### 3.3、 koa-bodyparser中间件

> 实际上是封装了一层 post 的数据处理方法，然后将其赋值给了 ctx.request 的 body 属性

```javascript
const bodyParser = require('koa-bodyparser')

// 使用ctx.body解析中间件
app.use(bodyParser())

// 处理 method 为 POST 的方法
let postData = ctx.request.body
ctx.body = postData

```


### 四、 静态资源加载

