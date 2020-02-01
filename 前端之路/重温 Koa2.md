## 《前端之路》--- 重温 Koa2

[TOC]

### 一、简单介绍

#### 1.1、快速开始 （这里省略了安装的过程）

```javascript
const Koa = require("koa");
const app = new Koa();

app.use(async ctx => {
  ctx.body = "hello koa2";
});

app.listen(3000);
```

#### 1.2、源码简单解析

> 源码文件主要包含了 application.js 、context.js 、request.js 、response.js

- application.js 是 Koa 的入口文件封装了 ctx、request、response， 以及核心的中间件处理流程
- context.js 处理应用上下文，里面直接封装部分 request.js 和 response.js 的方法
- request.js 处理 http 请求
- response.js 处理 http 响应

#### 1.3、中间件的简单开发

> 这里主要介绍如何使用 async/await 在 koa2 中进行中间件的开发

> middleware 在 koa2 中如何使用

```javascript
const Koa = require("koa");
const logger = require("./middleware/logger-async");

const app = new Koa();

app.use(logger());

app.use(ctx => {
  ctx.body = "hello middleware";
});

app.listen(3000);
```

> 如何编写一个简单的 middleware 中间件

```javascript
function log(ctx) {
  console.log(ctx.method, ctx.header.host + ctx.url);
}

module.exports = function() {
  return async function(ctx, next) {
    log(ctx);
    await next();
  };
};

// 对，就是这样，so easy
```

### 二、 路由

> 原生 JS 实现 koa 的 router
>
> 经过思考 🤔， 实现路由的基本原理： 通过请求进来的 url 匹配到对应的页面文件，然后通过 fs 读取对应文件的内容，并返回给 ctx.body, 那下面我们就按照这个思路来实现一下路由。

```javascript
function render(page) {
  return new Promise((resolve, reject) => {
    let viewUrl = `./view/${page}`;
    fs.readFile(viewUrl, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

async function route(url) {
  let view = "404.html";
  switch (url) {
    case "/":
      view = "index.html";
      break;
    case "/index":
      view = "index.html";
      break;
    case "/login":
      view = "login.html";
      break;
    case "/404":
      view = "404.html";
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

> GET 请求数据获取的方法有 2 中，如下

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

> 疑惑 🤔 的 点： 从上线文中获取的 request 对象和直接通过上线文获取的参数 有什么区别？ 为什么要这么设计？

- 从 Koa2 的框架设计层面 app.js 中封装了 ctx、request、response
- 从 Koa2 的框架设计层面 ctx.js 中封装了 request、response 方法
- 从上下文中获取和从 ctx.request 获取的参数是一样的，因为底层方法是一致的
- 直接从上下文中获取的方式简单、快捷
- 从上下文中的 request 对象中获取的话，会更加的明确该属性来源，不容易混淆。

> 注意：ctx.request 是 context 经过封装的请求对象，ctx.req 是 context 提供的 node.js 原生 HTTP 请求对象, 和这里的 ctx.query 和 ctx.request.query 是没有关系的。

#### 3.2、 POST 请求数据获取

> POST 请求的话，需要我们在页面 mock 一个表单，这样的话，可以更好的查看我们请求的数据。

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
if (ctx.method === "GET") {
  ctx.body = html;
} else if (ctx.url === "/" && ctx.method === "POST") {
  ctx.body = html + `<script> alert('提交成功！') </script>`;
} else {
  ctx.body = "<h1>404！！！ o(╯□╰)o</h1>";
}
```

#### 3.3、 koa-bodyparser 中间件

> 实际上是封装了一层 post 的数据处理方法，然后将其赋值给了 ctx.request 的 body 属性

```javascript
const bodyParser = require("koa-bodyparser");

// 使用ctx.body解析中间件
app.use(bodyParser());

// 处理 method 为 POST 的方法
let postData = ctx.request.body;
ctx.body = postData;
```

### 四、 静态资源加载

#### 4.1、静态资源加载源码解析

```javascript
	// 核心代码
│   ├── content.js # 读取请求内容
│   ├── dir.js # 读取目录内容
│   ├── file.js # 读取文件内容
│   ├── mimes.js # 文件类型列表
│   └── walk.js # 遍历目录内容
└── index.js # 启动入口文件
```

> 4.1.1、index.js 入口文件（对于文本类型和图片类型返回请求数据的方式是不一样的）

```javascript
// 核心部分代码 - 非全部
// 输出静态资源内容
if (_mime && _mime.indexOf("image/") >= 0) {
  // 如果是图片，则用node原生res，输出二进制数据
  ctx.res.writeHead(200);
  ctx.res.write(_content, "binary");
  ctx.res.end();
} else {
  // 其他则输出文本
  ctx.body = _content;
}
```

> 4.1.2、content.js 为读取当前请求内容 （判断当前文件请求路径是是否存在且判断是 文件夹还是文件， 如果是文件夹则读取文件内容）

```javascript
// 核心代码
//判断访问地址是文件夹还是文件
let stat = fs.statSync(reqPath);

if (stat.isDirectory()) {
  //如果为目录，则渲读取目录内容
  content = dir(ctx.url, reqPath);
} else {
  // 如果请求为文件，则读取文件内容
  content = await file(reqPath);
}
```

> 4.1.3、dir.js 为读取目录内容

```javascript
// 核心部分代码
// 遍历读取当前目录下的文件、子目录
let contentList = walk(reqPath);
```

> 4.1.4、 file.js 读取文件内容

```javascript
// 核心代码，读取对应文件的内容（此处读取出来的文件内行）
function file ( filePath ) {
	let content = fs.readFileSync(filePath[, options])
	return content
}

// 这里需要注释一下 fs.readFileSync(filePath[, options]) 中的 options 分别有 encoding 和 flag 二种选项，其中如果指定了 encoding 选项，则此函数返回字符串，否则返回 buffer。 就是说默认为 buffer
```

> 4.1.5、 mimes.js 文件类型列表

```javascript
let mimes = {
  css: "text/css",
  less: "text/css",
  gif: "image/gif",
  html: "text/html",
  ico: "image/x-icon",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  js: "text/javascript",
  json: "application/json",
  pdf: "application/pdf",
  png: "image/png",
  svg: "image/svg+xml",
  swf: "application/x-shockwave-flash",
  tiff: "image/tiff",
  txt: "text/plain",
  wav: "audio/x-wav",
  wma: "audio/x-ms-wma",
  wmv: "video/x-ms-wmv",
  xml: "text/xml"
};
// 其中除了我们常见的 text/xxx 的文本类型、还有 image/xxx 图片类型和等等等
```

> 4.1.6、 walk.js 文件类型列表

```javascript
// 核心代码 通过遍历，得到当前文件夹内的文件夹名称、和最后的文件名称
let result = dirList.concat(fileList);
// 疑惑的点： 为什么需要把文件名称也加上呢？ 大家也可以作为一个思考
```

### 五、 Koa2 使用 cookie/session

#### 5.1、koa2 使用 cookie

> 简单粗暴的直接上代码吧, 里面有一些需要注意的问题点，都在注释点中了。关键点就在与 koa 本身提供了 cookie 的 set 和 get 方法，可以非常简单的获取到对应想要的，但是里面我们常见的一些设置的参数，简单看一眼，其实就非常不简单了，maxAge、expires、httpOnly、overwrite 等等，这些都是我们在使用 cookie 的时候需要注意的，安全问题，http 请求问题。每一点都值得仔细来讲讲。

```javascript
app.use(async ctx => {
  if (ctx.url === "/index") {
    ctx.cookies.set("cid", "hello world", {
      domain: "127.0.0.1",
      // 写cookie所在的域名, 需要注意的是如果访问的域名和这里的 domain 不一致的化，是无法成功写入的
      path: "/index", // 写cookie所在的路径
      maxAge: 10 * 60 * 1000, // cookie有效时长
      expires: new Date("2017-02-15"), // cookie失效时间
      httpOnly: false, // 是否只用于http请求中获取
      overwrite: false // 是否允许重写
    });
    ctx.body = "cookies is ok";
  } else {
    ctx.body = "hello koa2";
  }
});
```

#### 5.2、koa2 使用 session

> 这里需要注意下，koa 本身没有提供 session 的方法，这里的例子是通过中间件来实现一些你需要的能力。这里的两种实现 session 能力的方案。这两个方案的区别就在于 存储信息的大小。

##### 5.2.1、 通过 koa-session 直接将信息存储在 内存中

> 使用 koa-session 中间件的核心在于需要对于给出的 对应 config 配置的理解。

```javascript
const Koa = require("koa"); // 导入Koa
const Koa_Session = require("koa-session"); // 导入koa-session
// 配置
const session_signed_key = ["some secret hurr"]; // 这个是配合signed属性的签名key
const session_config = {
  key: "koa:sess" /**  cookie的key。 (默认是 koa:sess) */,
  maxAge: 4000 /**  session 过期时间，以毫秒ms为单位计算 。*/,
  autoCommit: true /** 自动提交到响应头。(默认是 true) */,
  overwrite: true /** 是否允许重写 。(默认是 true) */,
  httpOnly: true /** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */,
  signed: true /** 是否签名。(默认是 true) */,
  rolling: true /** 是否每次响应时刷新Session的有效期。(默认是 false) */,
  renew: false /** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};

// 然后通过 ctx.session.logged 来判断当前用户是否登陆成功、是否在有效期内等等
```

##### 5.2.2、 通过 koa-mysql-session 和 koa-session-minimal 将信息存储在 mysql 中

```javascript
// session 中间件
app.use(
  session({
    key: "SESSION_ID",
    store: store,
    cookie: cookie
  })
);

// 数据库配置
let store = new MysqlSession({
  user: "root",
  password: "123456",
  database: "hellothinkjs",
  host: "127.0.0.1"
});

// 存放sessionId的cookie配置
let cookie = {
  maxAge: "", // cookie有效时长
  expires: "", // cookie失效时间
  path: "", // 写cookie所在的路径
  domain: "", // 写cookie所在的域名
  httpOnly: true, // 是否只用于http请求中获取
  overwrite: "", // 是否允许重写
  secure: "",
  sameSite: "",
  signed: ""
};
```

### 六、 koa2 加载模板引擎

#### 6.1、 koa2 加载模板引擎 （ejs）

> 这里直接展示使用的 demo

```javascript
app.use(
  views(path.join(__dirname, "./ejs"), {
    extension: "ejs"
  })
);

app.use(async ctx => {
  let title = "hello 404";
  await ctx.render("404", {
    title
  });
});
```

> 另外，我们附上 [ejs 官方文档](https://github.com/mde/ejs)

### 七、 koa2 中简单使用 mysql 数据库

> 这里写了一个简单的 demo 大致的介绍了下，koa 中 mysql 的使用方式

```javascript
// 连接数据库
const connection = mysql.createConnection({
  host: "127.0.0.1", // 数据库地址
  user: "root", // 数据库用户
  password: "123456", // 数据库密码
  database: "hellothinkjs" // 选中数据库
});

let title = "hello 404";
let users = [];

connection.connect();
connection.query("SELECT * FROM think_user", async (error, results, fields) => {
  if (error) throw error;
  // connected !
  console.log(results);
  users = results;
  app.use(async ctx => {
    await ctx.render("404", {
      title,
      users
    });
  });
});
connection.end();
```

> 这里需要注意一点的是： 因为网上之前找的文档中，很多关于 mysql modules 的使用方式比较古老了，不太适合新版本的 mysql 的链接和使用。 [mysql 最新使用文档](https://github.com/mysqljs/mysql#introduction)

### 八、 koa2 中使用单元检测

> 这里的单元测试主要是正对 node 提供的 API 服务来进行测试，测试框架选择： mocha（测试框架）、chai（断言库，用来判断是否满足预期结果）、supertest（用来模拟 API 请求）当然这三个库，每一个看上去都会有更多的特性，这里只是简单的介绍了一些基础自动化测试的 demo

```javascript
// api.js    api server
const server = async (ctx, next) => {
  let result = {
    success: true,
    data: null
  };

  if (ctx.method === "GET") {
    if (ctx.url === "/getString.json") {
      result.data = "this is string data";
    } else if (ctx.url === "/getNumber.json") {
      result.data = 123456;
    } else {
      result.success = false;
    }
    ctx.body = result;
    next && next();
  } else if (ctx.method === "POST") {
    if (ctx.url === "/postData.json") {
      result.data = "ok";
    } else {
      result.success = false;
    }
    ctx.body = result;
    next && next();
  } else {
    ctx.body = "hello world";
    next && next();
  }
};
```

```javascript
// index.test.js test server
describe("开始测试智商税了", () => {
  // 测试用例
  it("测试你的智商是不是二百五", done => {
    request
      .post("/postData.json")
      .expect(200)
      .end((err, res) => {
        // 断言判断结果是否为object类型
        expect(res.body).to.be.an("object");
        expect(res.body.success).to.be.an("boolean");
        expect(res.body.data).to.be.an("string");
        done();
      });
  });
});

// 这里发现，我们在测试我们的借口返回数据的类型、数值、错误码等类型的时候会有非常大的帮助的。以后如果需要用起来的话，推荐使用之。
```

### 九、 node 服务端开发过程中的 开发 debug 方式

#### 9.1、vscode 进行 debug

> vscode 自带 debug 能力，这里需要花费一定时间去理解的地方是 debug 启动程序的时候，需要配置一个 launch.json 文件，这里给一个对应的 demo。

```json
{
  // 使用 IntelliSense 了解相关属性。
  // 悬停以查看现有属性的描述。
  // 欲了解更多信息，请访问: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "启动程序",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/api.js"
    }
  ]
}
```

> 修改对应的 program 的 value 的文件为执行的入口文件即可。（这里推荐使用）

#### 9.2、chrome 浏览器进行 debug

> 通过 _node --inspect index.js_ 启动服务，则可以在 chrome 浏览器控制台看到对应的 node 的小图标，点击然后就有一个对应的小弹框进行 debug 啦。试了下，也推荐吧，哈哈，看个人喜好了。

### 十、总结

> 看完整个 koa2 的 api，以及使用了一些特性之后，我们不难发现，koa2 相对于 express 真的要简洁很多，其核心也在于洋葱图和中间件的机制，那么能够编写中间件和从茫茫大海中找到高可用的中间件非常重要，这二点是大家未来需要注意的地方。过完年了，自己身为湖北人，因为这次肺炎没能回到老家过年，那就让自己多学习一些知识吧～ 同时也希望这次的疫情可以快速的被消灭掉～奥利给！！！
