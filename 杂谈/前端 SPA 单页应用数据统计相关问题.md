## 前端 SPA 应用 数据统计

## 小杏仁开发过程中踩的一些坑 以及 代码、架构 优化

[TOC]

### 一、百度统计的代码： UV PV 统计方式可能存在问题

> 在 SPA 的前端项目中 数据统计，往往就是一个比较麻烦的事情，React 和 Vue 也是一样。
> 在 发现问题之前，我们得来思考下 百度统计的 `统计原理` 是什么？

#### 1-1: 百度统计代码

```javascript
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?ccb0e8f10ba18ccb5041e8aa48068c1b";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
```

> 通过 JSONP 加载了一个 百度统计的 JS 文件，这个 JS 文件，相对还是比较大的
> 粗略的看了一 hm.js 的 源码文件， 获取本地的 cookie、session、url、ua 等然后还有一些处理数据的方法和 一些数据上传的方法。

`那么在什么情况下，百度统计 会去触发上传的操作？`

我们来实验一下？

- 1、每次页面的刷新 这个是肯定会去 触发的
- 2、路由去下一个新页面会去触发么？（待验证）
- 3、路由返回旧页面会触发么？（待验证）

下面： 我们就将待验证的场景实现出来看看，到底会不会触发。

#### 1-2： 加入 react-router 在项目中

```javascript
const GetBaidu = props => {
  let children = props.children;
  let _hmt = _hmt || [];
  (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?ccb0e8f10ba18ccb5041e8aa48068c1b";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
  })();
  return children;
};

const App = () => {
  return (
    <div>
      <h2>测试百度统计代码</h2>
      <h3>
        <Link to={"/"}>Index</Link>
      </h3>
      <h3>
        <Link to={"/home"}>Home</Link>
      </h3>
      <h3>
        <Link to={"/my"}>my</Link>
      </h3>

      <Switch>
        <GetBaidu>
          <Route exact path="/" component={Index} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/my" component={My} />
        </GetBaidu>
      </Switch>
    </div>
  );
};
```

这样类似一个拦截器一样，在路由跳转之前把 百度统计的代码再次家再一次。

同样，Vue-router 的项目也是类似。

#### 1-3： 加入 Vue-router 在项目中

```javascript
router.afterEach((to, from, next) => {
  setTimeout(() => {
    var _hmt = _hmt || [];
    (function() {
      //每次执行前，先移除上次插入的代码
      document.getElementById("baidu_tj") &&
        document.getElementById("baidu_tj").remove();
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?xxxx";
      hm.id = "baidu_tj";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  }, 0);
});
```

> 总结：React 和 Vue 的方法类似， 在路由跳转前先做拦截操作。加上需要在页面中加入的方法和统计代码即可。

### 二、utils 需要仔细整理下，并在每个 utils 下的文件进行 必要的代码解释

> 什么是 utils？
> 工具类，什么是工具？
> 一切要以脱离业务为主的 工具类才是好的工具。也就是说，我们的工具类不能包含业务属性，如果是这个工具有业务属性的话，就不能放在 utils 中。

#### `1、appBridge.js`

与 app 原生交互的方法

> 现在是散落的写在了 各个会用到与云生交互方法的文件中去了，
> 后面要抽离出来放在 这个文件中！

#### `2、bankCode.js`

银行卡 code 的配置 map

#### `3、bridge.js`

与各类 app 原生交互的方式

#### `4、calculate.js`

计算用的一些方法（是否重复掉了）

#### `5、channel.js`

用来处理 渠道参数的

#### `6、citydata.js`

这个数据一般都是放在服务端的，为什么放在了前端？

#### `7、crypto.js`

加密用的

> 不过上次遇到了一个坑在这里

```javascript
let thirdUserNo = 210804198712153537; // 这个是 php 返回的数据类型为 number

// 因为 Java 需要的数据类型是 字符串.
let JaveNeedData = 210804198712153537 + "";

// "210804198712153540"

// 我们就这么简单的处理了下 隐士类型的转换，就出问题了。
```

> 为什么会出现这种问题呢？ 知识点来了啊

我们知道的 在 JavaScript 中 数字的最大运算是多少？

因为 JavaScript 中的所有数字都存储为根为 10 的 64 位（8 比特），浮点数。

所以 范围就是

`-2的53次方 到 2的53次方`

> -9007199254740992~9007199254740992

下面，我们再来做一个实验：

```javascript
let num1 = 9007199254740992;
console.log(num1 + "");

let num2 = 9007199254740993;
console.log(num2 + "");
```

对，这就是问题所在，如何处理这个问题呢？
toJson
...

#### `8、fetch.js`

看名字就知道 这个文件就是 封装了一个 专门 处理 http 请求发送和 接收用的。

但是...

这个文件现在已经异常的 庞大了...

#### `9、session.js`

这个是处理 session 的增删改

#### `10、storage.js`

那 这个文件呢？

#### `11、validate.js`

验证参数是否正确

#### `12、wxShare.js`

分享链接 url bug 处理。

等等

### 三、一个 Auth 组件 和 auth 方法 需要 区分。 且在 auth 中是否开启 策略模式

Auth 组件 来拦截处理 登录态 确实是一个好的办法，

但是 fetch 里面还有一个 auth 方法。 每次都差点被这个搞死...

### 四、 utils/fetch.js 这个文件中 冗杂的代码 方法的 整理 归类

一个 专门用来处理 http 请求的 工具。 现在已经写到了 1360 行。

里面冗杂了 手管的、app、各类非 fetch 方法 的 function 需要剥离出来的好很多。

包括人脸部分的激活方法也被写在了 fetch 文件中了。。

#### 4-1 php 请求方法、Java 请求方法 单独 引用

那这样的话 php 请求方法、Java 请求方法 单独 引用，但是这样的话，项目等变动就会特别大。

### 五、贷超渠道 flag、chanel、token、xingrenRand 等参数统一处理

有段时间，处理 贷款超市渠道。。差点又被搞死了

1、 渠道多，来的密集
2、 渠道各种 联合登陆方式不一样
3、 渠道参数问题

柯里化、异步加载 优化方式。

等等

### 六、 手管渠道 授信部分 native 化的优化 换肤等

1、手管落地页配置化
2、是否需要将 落地页 单独作为一个 页面，区分开整体的 spa 。从而加快页面加载速度。

### 七、活动页面管理

1、落地页 配置化
2、落地页加载方式

### 八、 封装的组件的 易用性 和 扩展性

1、通用组件 和 业务组件 。在这个项目中，感觉是表现的并不明显
2、通用组件 没有比较规范的 解释说明。导致接手起来比较的麻烦。（一脸懵逼状态）

组件文档介绍、规范化。 去掉 iscroll

### 九、redux 的 使用问题。

1、部分 reducer 没有比较明确的 注释。 接手起来也是 一脸懵逼
2、如何改进？

pages =》 action =〉 reducer ==》 （update page view）

action 划分规则

1、根据 virtual Bean / entity

### 十、 骨架屏的应用以及管理

￼![](https://img2018.cnblogs.com/blog/675289/201811/675289-20181102152141177-1131428234.jpg)

在项目主体文件，或者关键 接口返回数据判断 加载、请求回来之前，显出出来的页面。

体验上还是比较 OK 。 因为 React 相对还是比较灵活。所以对于 骨架屏的管理还是相对比较 OK

骨架屏 即为 组件。
