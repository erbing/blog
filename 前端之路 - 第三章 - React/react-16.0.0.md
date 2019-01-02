## ReactJs 的各个版本生命周期、API 变化 汇总（一、V16.0.0）

    由于 React 的版本更新频繁，各类的新特性也是让人眼花缭乱的，为了方便自己查询最新的以及过往的 各个 React 版本 api、生命周期函数。 这里就用 caniuse 的方式做一个 方便查询的小功能。

---

    那么要实现这个小功能之前，我们必须要对 React 的各种版本进行仔细的解读。
    最快捷的方式就是 直接 通过官方文档来获取最真实的信息。

[TOC]

## 一、React 各个版本之间的纵向对比

| React 版本 \ 各个阶段 API |                                                                                                                                 Mounting（绑定） |                                                                                                                   Updating（数据更新）                                                                                                                   | Unmounting （解除绑定） | Error Handling （错误处理）                              |
| :------------------------ | -----------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------------- | -------------------------------------------------------- |
| V 16.0.0                  |                                                                      constructor()<br> componentWillMount()<br> render() <br>componentDidMount() |                                                                 componentWillReceiveProps()<br> shouldComponentUpdate() <br>componentWillUpdate()<br> render()<br> componentDidUpdate()                                                                  | componentWillUnmount()  | componentDidCatch()                                      |
| V 16.3.2                  | constructor()<br> static&nbspgetDerivedStateFromProps()<br>componentWillMount() / UNSAFE_componentWillMount()<br>render()<br>componentDidMount() | componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()<br>static getDerivedStateFromProps()<br>shouldComponentUpdate()<br>componentWillUpdate() /UNSAFE_componentWillUpdate()<br>render()<br>getSnapshotBeforeUpdate()<br>componentDidUpdate() | componentWillUnmount()  | componentDidCatch()                                      |
| V 16.5.2                  |                                                            constructor()<br>static getDerivedStateFromProps()<br>render()<br>componentDidMount() |                                                              static getDerivedStateFromProps()<br>shouldComponentUpdate()<br>render()<br>getSnapshotBeforeUpdate()<br>componentDidUpdate()                                                               | componentWillUnmount()  | componentDidCatch()                                      |
| V 16.7.0(最新)            |                                                            constructor()<br>static getDerivedStateFromProps()<br>render()<br>componentDidMount() |                                                              static getDerivedStateFromProps()<br>shouldComponentUpdate()<br>render()<br>getSnapshotBeforeUpdate()<br>componentDidUpdate()                                                               | componentWillUnmount()  | static getDerivedStateFromError()<br>componentDidCatch() |

## 二、React 的基础

### 1、Components and Props

> 1-1、About `Components`

    1、Components let you split the UI into independent, reusable pieces, and think about each piece in isolation

    组件允许您将UI拆分为独立的、可重用的部分，并独立地考虑每个部分

---

    2、Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

    从概念上讲，组件类似于JavaScript函数。它们接受任意输入(称为“props”)，并返回描述屏幕上应该出现的内容的React元素。

> 1-2、Component's presentation (展现形式)

The simplest way to define a component is to write a JavaScript function:
（最简单的方式）

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

You can also use an ES6 class to define a component:
（你也可以使用 ES2015 中 类 的方式）

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

> 上面的二种写法，目前来看是`等价的`.

> 任何都 React 版本，关于 Lifecycle 我们都可以找到对应的几个状态，来进行不同的 api 的差异的对比。这样也是方便，我们进行记忆的。

## 三、React V 16.0.0

`官方文档传送门：` [React V 16.0.0 官方文档](https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.com/docs/hello-world.html)

### 1、 The Component Lifecycle ( v16.0.0 )

#### 1-1 Mounting （绑定阶段）

> `constructor()`

1. React.Component 的 constructor 会在组件被 mounted 之前被调用
2. 当作为 React.Component 的子类的时候，必须要有 super(props) 被调用，否则会有 bug
3. constructor 是正确的初始化 state 的地方。并且在 constructor 中不能调用 setState() 方法
4. 如果没有初始化的方法或者 state 的话，就不需要 constructor
5. state 也可以 基于 props 的值，但是 state 不会随着 props 带改变而改变。

`例如:`

```javascript
constructor(props) {
  super(props);
  this.state = {
    color: props.initialColor
  };
}
```

6. 如果你想监听 props 的变化，再这个版本中你可以使用 componentWillReceiveProps(nextProps) 方法。

> `componentWillMount()`

1. componentWillMount()在挂载发生之前立即被调用
2. 在 render() 之前 被调用
3. 所以在 这个方法中使用 setState() 不会 触发 render 方法
4. 避免在此方法中引入任何副作用
5. 这是在服务器呈现时调用的惟一生命周期钩子

> `render()`

1.  render() 方法是必要的
2.  render 方法当被调用时，会检查当前的 props 和 state 并返回 一种具体的类型

`以下类型：`
`React elements`、`String and numbers` 、 `Portals` 、`null`

    当 render  null、 false、ReactDOM.findDOMNode(this) 的时候会返回 null

3.  render 函数中不应该修改 state 的值，它不会马上和浏览器交互。
4.  如果想改变 state 的值，并马上能在浏览器上看到，那就在 componentDidMount() 中调用。

> `componentDidMount()`

1.  componentDidMount() 方法在 component is mounted 之后马上被调用
2.  在这一步可以初始化需要的 Dom 节点
3.  而且这里也是很好的进行 ajax 请求的地方。
4.  这里也是进行 订阅 的地方。并记得在 componentWillUnmount() 方法中 退订。
5.  在这里调用 setState() 会触发一个 额外的 rendering。如果同时触发 2 次也只会执行一次。
6.  不要频繁使用 setState() 因为会带来 性能问题。

#### 1-2 Updating （数据更新阶段）

> `componentWillReceiveProps()`

```javascript
componentWillReceiveProps(nextProps);
```

1.  componentWillReceiveProps() 方法 在已经被 mounted 的组件在接受一个新的 props 的时候被调用。
2.  在这个方法中，你可以对比 this.props 和 nextProps 然后 使用 this.setState() 改变 props 的值
3.  当父组件 re-render 当前组件的时候，用于 props 并未发生改变，但是 也会执行 componentWillReceiveProps 这个方法。 所以这里就需要你进行 当前值 和 nextProps 对比 来进行下一步的操作。
4.  此方法不会在 初始化 对时候就执行的。
5.  唯一会执行这个方法对就是 props 更新发生变化的时候。这也是正确的使用当前 api 的场景。

> `shouldComponentUpdate()`

```javascript
shouldComponentUpdate(nextProps, nextState);
```

1. 让 React 知道组件的输出是否不受当前状态或道具更改的影响
2. 是在每个状态更改时重新呈现 时候的默认行为。
3. 当有新的 props 和 state 被接受的 之前 就会 调用此方法
4. 在 初始化 render 和 forceUpdate 方法被调用的时候，这个方法不会被调用。
5. 返回 fasle 的时候不会 防止 他们的组件组 进行 重新渲染。

> `componentWillUpdate()`

```javascript
componentWillUpdate(nextProps, nextState);
```

1.  此方法 比 shouldComponentUpdate 多了一个 immediately
2.  此方方法是为了 执行一些准备，在 updata 之前。
3.  在此方法中不能 执行 setState() ，也不能做任何事情，除了 dispatch a Redux action 等。
4.  如果你需要 更新 state 或者 props 的结果，你可以 使用 componentWillReceiveProps()

> `componentDidUpdate()`

```javascript
componentDidUpdate(prevProps, prevState);
```

1. 在 updating 发生之后立即执行 componentDidUpdate
2. 在此方法 是一个机会来 处理 Dom 当 组件 update 之后。
3. 这也是一个好的地方来处理网络请求，当 props 发生改变的时候。
4. 如果 props 没发生改变，则不需要发送 ajax 请求。

#### 1-3 Unmounting （解除绑定阶段）

> `componentWillUnmount()`

1. 当组件被卸载和销毁的时候此方法马上被调用。
2. 同时 也可以 清理 一些方法。例如 无效的 timers 、取消 ajax 请求、一些订阅

#### 1-4 Error Handling （错误处理阶段）

> `componentDidCatch()`

```javascript
componentDidCatch(error, info);
```

1. 错误边界是响应组件，这些组件捕捉子组件树中的任何位置的 JavaScript 错误，记录这些错误，并显示一个回退 UI，而不是崩溃的组件树。错误边界在呈现、生命周期方法和下面整个树的构造函数中捕获错误。

2. 如果类组件定义了这个生命周期方法，它就会成为一个错误边界。在其中调用 setState()允许您在下面的树中捕获未处理的 JavaScript 错误并显示回退 UI。只使用错误边界从意外异常中恢复;不要试图用它们来控制流程。

### 2、 Other APIs

#### 2-1 setState() （数据变更）

#### 2-2 forceUpdate() （强制数据变更）

### 3、 Class Properties （类的属性）

#### 3-1 defaultProps（默认的 props）

#### 3-2 displayName（展示名称）

### 4、Instance Properties （实例属性）

#### 4-1 props（父组件传递进来的数据）

#### 4-2 state（本地组件的数据）

### 3、 回顾

> 可能就会有同学问了，为啥 第二部分的内容不讲了？
> 答： 这真的没什么好讲的。
> 以上则是 React V16.0.0 的全部内容，欢迎大家一起讨论～后面还有 关于剩下版本的 apis 变化的介绍，
> 主要是以 为什么 react 开发组要 干掉这些 api 以及 新的 api 能解决什么问题为出发点。介绍 ReactJS 这些年的进化
> 帮助大家一起来走进这个框架。
