## 《前端之路》--- 初识 Egg.js

[TOC]
> 在 nodejs 发展日益健壮和稳定的情况下，我们在日常的开发中使用 node 已经是一件非常常规的事情了，那么对于我们必要的掌握一个服务端框架还是非常有必要的。下面我们就开始吧。



### 一、基础功能

#### 1.1、目录结构

> 在了解目录结构之前，我们需要对 mvc 的编程模式，进行一个理解。
- M =》 `Model（模型）` 是处理应用程序数据逻辑的部分，主要是和数据库打交道。
- V =》 `View（视图）` 是作为视图展示使用，如果没有这部分的需求的化， view 这一个层面的内容是可以被省略的。
- C =》 `Controller（控制器）` 是应用程序中处理与用户交互的部分，通常是为了 视图需要的数据做准备，并向 Model 发送数据（get、post） 等
- S =》 `Service（服务）` 在实际应用中，Controller 一般不会自己产出数据，也不会包含复杂的逻辑，复杂的过程应抽象为业务逻辑层 Service

> 但是在一些 mvc 框架的论坛中，也有一部分的声音是说希望，业务层面的架构是一个 `Thin Controller Fat Model and no need Service`  那么在这样的一个出发点上来将的话，我们可以在后面实际的业务中去不断尝试。

``` html
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
│   ├── router.js		 	// 路由设置
│   ├── controller		 	// 控制器
│        └── home.js
│   ├── service (可选)	 	// 服务
│        └── user.js
│   ├── middleware (可选)		// 中间件
│        └── response_time.js
│   ├── schedule (可选)		// 用于定时任务
│        └── my_task.js
│   ├── public (可选)			// 静态资源文件
│        └── reset.css
│   ├── view (可选)			// 模板视图
│        └── home.tpl
│   └── extend (可选)			// 集成功能小插件
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config					// 必要的核心配置
│   ├── plugin.js			// 插件配置
│   ├── config.default.js	// 默认基础配置
│   ├── config.prod.js		// 生产环境
│   ├── config.test.js (可选)	// 测试配置
│   ├── config.local.js (可选)	// 本地配置
│   └── config.unittest.js (可选)	// 待定 
└── test						// 测试需要
    ├── middleware
        └── response_time.test.js
    └── controller
        └── home.test.js
```
> 目录结构
- app/router.js 用于配置 URL 路由规则
- app/controller/** 用于解析用户的输入，处理后返回相应的结果
- app/service/** 用于编写业务逻辑层
- app/middleware/** 用于编写中间件
- app/public/** 用于放置静态资源
- app/extend/** 用于框架的扩展
-  config/config.{env}.js 用于编写配置文件
-  config/plugin.js 用于配置需要加载的插件
-  test/** 用于单元测试
-  app.js 和 agent.js 用于自定义启动时的初始化工作

#### 1.2、内置对象

> 我们在看 egg 的内置对象的时候，我们先看下 koa 的内置对象，application、context、request、response。
> -
> -
> 再对比下 egg 的内置对象： 包括从 Koa 继承而来的 4 个对象`（Application, Context, Request, Response) ` 以及框架扩展的一些对象`（Controller, Service, Helper, Config, Logger）`

##### 1.2.1、Application

> Application 是一个全局对象，上面挂载了这个框架常用到的 全局方法和对象。

##### 1.2.2、Context

> Context 是一个请求级别的对象，最常见的 Context 实例获取方式是在 Middleware, Controller 以及 Service 中，例如：

```javascript
// controller
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg, ss';
  }
}
```

##### 1.2.3、Request

> Request 是一个请求级别的对象，继承自 Koa.Request。封装了 Node.js 原生的 HTTP Request 对象，提供了一系列辅助方法获取 HTTP 请求常用参数。

```javascript
// app/controller/user.js
class UserController extends Controller {
  async fetch() {
    const { app, ctx } = this;
    const id = ctx.request.query.id;
    ctx.response.body = app.cache.get(id);
  }
}

// 但是如果 需要注意的是，获取 POST 的 body 应该使用 ctx.request.body，而不是 ctx.body. 所以我们在获取 请求对应参数的时候均采用 ctx.request.query 或者 ctx.request.body 的方式.

```


##### 1.2.4、Response

> Response 是一个请求级别的对象，继承自 Koa.Response。封装了 Node.js 原生的 HTTP Response 对象，提供了一系列辅助方法设置 HTTP 响应。


##### 1.2.5、Controller

> 框架提供了一个 Controller 基类，这个基类包括了一些常用的属性： ctx、app、config、service、logger 等

```javascript
const Controller = require('egg').Controller;

class TestController extends Controller {
    async index() {
        const { ctx, app, config, service, logger } = this;
        ctx.body = 'test';
    }
}

module.exports = TestController;
```

##### 1.2.6、Service

> 框架提供了一个 Service 基类， Service 基类的属性和 Controller 基类属性一致，访问方式也类似

```javascript
const Service = require('egg').Service;

class TestService extends Service {
    index() {
        const { ctx } = this;
        return ctx.request.query;
    }
}

module.exports = TestService;
```


##### 1.2.7、Helper

> Helper 用来提供一些实用的 utility 函数 ( 工具函数 )  ，可以在 Context 的实例上获取到当前请求的 Helper(ctx.helper) 实例。 其中我们还可以自定义 helper 方法，如下：

```javascript
// Demo
// app/extend/helper.js
module.exports = {
    upperCase(str) {
        return str.toUpperCase();
    }
};
```


##### 1.2.8、Config

>我们可以通过 app.config 从 Application 实例上获取到 config 对象，也可以在 Controller, Service, Helper 的实例上通过 this.config 获取到 config 对象。 被创建出来的原则就是希望，配置和代码分离的原则。


##### 1.2.9、Logger

> 日志系统包含了 四大层面的 日志对象， 分别是 **App Logger、App CoreLogger、Context Logger、Context CoreLogger、Controller Logger & Service Logger** 
- 
> 这些从 app、context 、logger、service 等各个层面都提供对应的 debug 方法，这些方法中包括

- logger.debug()
- logger.info()
- logger.warn()
- logger.error()

> 后需在开发中使用到，再具体介绍每一部分的功能。

#### 1.3、运行环境

> 通过 config/env 文件指定对应的环境，但是一般推荐使用 构建工具来生成这个文件，那么我们看下这个文件里面的内容是什么样子的

```javascript
//  config/env
prod
// 对，就是这么简单。
```

- [eggjs 环境变量控制文件内容](https://github.com/eggjs/egg/issues/346)

> 在 Koa 中我们通过 app.env 来进行环境判断，app.env 默认的值是 process.env.NODE_ENV。但是在 Egg（和基于 Egg 的框架）中，配置统一都放置在 app.config 上，所以我们需要通过 app.config.env 来区分环境，app.env 不再使用。


#### 1.4、配置

> 框架提供了强大且可扩展的配置功能，可以自动合并应用、插件、框架的配置，按顺序覆盖，且可以根据环境维护不同的配置。合并后的配置可直接从 app.config 获取。

配置文件：
- config.default.js    ---默认配置文件，一般也作为开发环境使用
- config.prod.js   --- 生产环境配置文件，会覆盖默认配置文件的同名配置
- config.unittest.js   --- 单元测试， 测试环境
- config.local.js   --- 本地开发环境，额外于 默认配置。


#### 1.5、中间件

> 这里简单介绍下，如何编写 中间件 和如何使用 中间件。

##### 1.5.1、如何编写中间件

> 从文件夹规则来说，我们编写的自己的中间件一般都会放在 app／middleware／ xxx.js  具体的 Demo 如下：

```javascript
// egg 的中间件
// 基于 洋葱圈模型
// 和 koa 的中间件的构成差不多，只不过 egg 在外面包裹了一层
module.exports = options => {
    return async function toLowerCase(ctx, next) {
        await next();
        const result = ctx.request.query;
        ctx.body = result;
    };
};
```

```javascript
// koa 的中间件
function log(ctx) {
    console.log(ctx.method, ctx.header.host);
}

module.exports = function() {
    return async function(ctx, next) {
        next();
        await log(ctx);
    };
};
```

##### 1.5.2、如何使用中间件

> 在开始问如何使用中间件的时候，我们要清除一个问题就是我们往往在什么时候需要用到中间件、怎么用的问题，下面就简单介绍下。

- 在应用中使用中间件

```javascript
// config.default.js
module.exports = {
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: [ 'gzip' ],

  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 1024, // 小于 1k 的响应体不压缩
  },
};

```

- 在框架和插件中使用中间件

```javascript
// app.js
module.exports = app => {
  // 在中间件最前面统计请求时间
  app.config.coreMiddleware.unshift('report');
};

// app/middleware/report.js
module.exports = () => {
  return async function (ctx, next) {
    const startTime = Date.now();
    await next();
    // 上报请求时间
    reportTime(Date.now() - startTime);
  }
};

//  核心方法是 app.config.coreMiddleware.unshift('report') 
```

- router 中使用中间件

```javascript
module.exports = app => {
  const gzip = app.middleware.gzip({ threshold: 1024 });
  app.router.get('/needgzip', gzip, app.controller.handler);
};
```

- 框架本身自带中间件

```javascript
// 修改一些初始化的配置
// config/config.default.js
module.exports = {
  bodyParser: {
    jsonLimit: '10mb',
  },
};
```

##### 1.5.3、中间件的通用配置

- enable 是否开启使用中间件
- match 设置只有符合某些规则的请求才会经过这个中间件
- ignore 设置符合某些规则的请求不经过这个中间件

```javascript
module.exports = {
  bodyParser: {
    enable: fasle   // 不开启使用 bodyParser 中间件
  }, 
  gzip: {
    match: '/static'   // 只压缩 /static 目录下的文件 
  },
  apiAgent: {
	ignore: /^\/api/   // 只用 /api 的请求路径才不会使用  apiAgent 中间件   
  }
};

```


#### 1.6、路由

> 


#### 1.7、控制器

#### 1.8、服务

#### 1.9、插件、定时任务、框架扩展、启动自定义



### 二、核心功能



### 三、依赖第三方的教程


### 四、进阶


### 五、总结