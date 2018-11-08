## 前端 SPA 单页应用数据统计解决方案 (ReactJS / VueJS)

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

> 这里只是简单粗暴的进行一个最简单的 demo 展示
> 亲测这类数据统计问题，放在很多项目中都是需要解决的。

> 总结：React 和 Vue 的方法类似， 在路由跳转前先做拦截操作。加上需要在页面中加入的方法和统计代码即可。

---

> 关于 单页应用数据统计 的文章就介绍到这里了，欢迎一起来论道～

> GitHub 地址：（欢迎 star 、欢迎推荐 : )
>
> [前端 SPA 单页应用数据统计解决方案 (ReactJS / VueJS)](https://github.com/erbing/blog/blob/master/%E6%9D%82%E8%B0%88/%E5%89%8D%E7%AB%AF%20SPA%20%E5%8D%95%E9%A1%B5%E5%BA%94%E7%94%A8%E6%95%B0%E6%8D%AE%E7%BB%9F%E8%AE%A1%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98.md)
