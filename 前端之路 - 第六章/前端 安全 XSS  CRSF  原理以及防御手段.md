## 什么是 XSS

### 一、XSS

#### 什么是 XSS

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124160056823-1263361080.jpg)

> XSS，即 Cross Site Script ， 翻译过来就是 跨站脚本攻击；为了和 css 有所区分，因而在安全领域被称为 XSS。

#### 什么是 XSS 攻击

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124160133503-259532047.jpg)

> XSS 攻击指的是 攻击者在网站上注入恶意的客户端代码，通过恶意脚本对客户端网页进行篡改，从而在别的用户浏览网页的 时候，对用户进行控制或者获取 用户对隐私数据的 这么一种攻击手段。

#### XSS 攻击的方式 是什么

> XSS 攻击可以分为 3 类：反射型（非持久型）、存储型（持久型）、基于 DOM。

> XSS 攻击需要具备两个条件：需要向 web 页面注入恶意代码；这些恶意代码能够被浏览器成功的执行。

> 用户注入的 恶意脚本一般包括 JavaScript 、HTML、Flash。很多种的 XSS 攻击方式，但是共同点是： 将一些 隐私数据像：1、cookie、session 发送给攻击者。 2、将受害者重定向到一个由攻击者控制的网站（俗称钓鱼网站），在受害者的机器上进行一些恶意操作。

####反射型（非持久型）的 XSS 攻击

> XSS 反射型攻击，恶意代码并没有保存在目标网站，而是通过引诱用户点击一个链接到目标网站的恶意链接来实施攻击的。

直接这么解释还是有点难懂的。下面，我们还是来看个 demo

```htmlbars
<a href="http://127.0.0.1:1212/login/<img src=''  onerror='alert(document.cookie)'>" target="_blank" >这是 XSS 的恶意链接</a>
```

假设某用户在黑客点钓鱼网站上 点击了这个 带有 XSS 攻击的恶意链接。就会跳转到 `http://127.0.0.1:1212` 这个网站上。刚好这个路径下的 链接是会有一个 发生一个 get 请求。
那么这个时候 `<img src='' onerror='alert(document.cookie)'>` 这部分的内容就被 当作 请求的 内容发送给了 服务端。如果服务端 为对该 内容进行 XSS 防御，直接返回给 浏览器。

那么这个时候就会出现 XSS 攻击了。`<img src='' onerror='alert(document.cookie)'>` 这句代码被显示在了 浏览器上，因为 img 标签也具有 跨域属性，直接执行了 onerror 中的 JS 代码。 黑客这个时候就可以 在目标网站上 为所欲为了。

比如这里就是 简单的 alert 了 所有的 cookie。但是，如果我是黑客的话，我肯定会把 用户的 cookie、localStorage、等等重要信息 全部上传到我的服务器，然后进行拿到各类想要的信息。从而获益。

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124160158861-458479209.png)

####存储型（持久型）的 XSS 攻击

> 存储型（持久型）的 XSS 攻击 和 反射型 其实也有异曲同工之妙呀。

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124160358971-626747576.jpg)

这么多，我哪里记得住？

别慌，我们慢慢分析一波就都能记住啦～

恶意代码 通过表单提交的方式 被保存到目标网站的服务器中，这种攻击具有较强的稳定性和持久性，比较常见场景是在博客，论坛、OA、CRM 等社交网站上，比如：某 CRM 系统的客户投诉功能上存在 XSS 存储型漏洞，黑客提交了恶意攻击代码，当系统管理员查看投诉信息时恶意代码执行，窃取了客户的资料，然而管理员毫不知情，这就是典型的 XSS 存储型攻击。

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124160158861-458479209.png)

我们还是写个 demo 来方便 理解吧

```htmlbars
    <div><textarea id="textarea" class="text"></textarea></div>
    <button id="btn" class="botton">submit</button>
```

大概就长这个样子了：
![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124211135703-1873187191.png)

> textarea 内则为 带有 xss 的代码，点击提交。直接 xhr 请求到 node 的服务端。

> node 服务端 接收到 传入的参数 不做任何 xss 防御 直接保存起来的 js demo
> 一般是存储 sql 但是这里方便起见 我们就直接存 memory-cache ，代码如下：

```javascript
router.post("/upload", (ctx, next) => {
  let curData = JSON.stringify(ctx.request.body);
  cache.put("xss", curData);
  ctx.body = `<div>${curData}</div>`;
});
```

> 我们请求 一个新的路径来将 memory-cache 的值获取到。 node 端 代码：

```javascript
router.get("/getName", (ctx, next) => {
  let curData = cache.get("xss");
  ctx.body = `<div>${JSON.parse(curData)}</div>`;
});
```

接下来就是访问 `http://127.0.0.1:1212/getName`

得到 如下 画面：

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124212418143-756275342.png)

当然，黑客不会 alert 你的 cookie 信息。 直接 post 到 一个第三方的 服务器上，然后直接模拟浏览器访问，那就简直了。

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124160158861-458479209.png)

####基于 DOM 的 XSS 攻击

基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。

```javascript
const divXss = document.getElementById("xss");
const xssbtn = document.getElementById("xssbtn");

const val = `'' onclick=alert(/xss/)`;

xssbtn.addEventListener("click", function() {
  divXss.innerHTML = `<a href=${val}>testLink</a>`;
});
```

> 当然上面的这个 `val` 往往是黑客 通过 input 或者 textarea 的 form 表单提交引起的

当用户下意识的去点击 这个新增的 dom 的时候，就会出现 如下 场景：

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124213838855-1208066083.png)

黑客又可以为所欲为了。

### 二、XSS 的 防御

#### HttpOnly 防止劫取 Cookie

HttpOnly 最早由微软提出，至今已经成为一个标准。浏览器将禁止页面的 Javascript 通过 document.cookie 获取带有 HttpOnly 属性的 Cookie。

上文有说到，攻击者可以通过注入恶意脚本获取用户的 Cookie 信息。通常 Cookie 中都包含了用户的登录凭证信息，攻击者在获取到 Cookie 之后，则可以发起 Cookie 劫持攻击。所以，严格来说，HttpOnly 并非阻止 XSS 攻击，而是能阻止 XSS 攻击后的 Cookie 劫持攻击。

#### 输入检查

不要相信用户的任何输入。 对于用户的任何输入要进行检查、过滤和转义。建立可信任的字符和 HTML 标签白名单，对于不在白名单之列的字符或者标签进行过滤或编码。

在 XSS 防御中，输入检查一般是检查用户输入的数据中是否包含 <，> 等特殊字符，如果存在，则对特殊字符进行过滤或编码，这种方式也称为 XSS Filter。

而在一些前端框架中，都会有一份 decodingMap， 用于对用户输入所包含的特殊字符或标签进行编码或过滤，如 <，>，script，防止 XSS 攻击：

// vuejs 中的 decodingMap
// 在 vuejs 中，如果输入带 script 标签的内容，会直接过滤掉
const decodingMap = {
'&lt;': '<',
'&gt;': '>',
'&quot;': '"',
'&amp;': '&',
'&#10;': '\n'
}

#### 输出检查

用户的输入会存在问题，服务端的输出也会存在问题。一般来说，除富文本的输出外，在变量输出到 HTML 页面时，可以使用编码或转义的方式来防御 XSS 攻击。

例如利用 sanitize-html 对输出内容进行有规则的过滤之后再输出到页面中。

> 本 demo 中的 koa 框架其实在输出的时候处理了标签：

![](https://img2018.cnblogs.com/blog/675289/201901/675289-20190124214644812-148094295.png)

这个时候 就会 减少 99% 的 xss 攻击了。是不是发现选择一款好的框架能节省好多的麻烦。

好了，这篇关于 XSS 的文章就介绍到 这里了，别着急 源码会放出来的。

全文的 demo 的源码地址： [github 源码地址](https://github.com/erbing/koa-demo)

### 总结

> 一旦在 DOM 解析过程成出现不在预期内的改变，就有可能发生 XSS。
> 失控 就会出现 BUG。
