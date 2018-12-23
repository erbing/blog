## ReactJs 的个版本生命周期汇总

    由于 React 的版本更新频繁，各类的新特性也是让人眼花缭乱的，为了方便自己查询最新的以及过往的 各个 React 版本 api、生命周期函数。 这里就用 caniuse 的方式做一个 方便查询的小功能。

---

    那么要实现这个小功能之前，我们必须要对 React 的各种版本进行仔细的解读。
    最快捷的方式就是 直接 通过官方文档来获取最真实的信息。

[TOC]

## 一、React 的基础

### 1、Components and Props

> 1-1、About `Components`

    1、Components let you split the UI into independent, reusable pieces, and think about each piece in isolation

    组件允许您将UI拆分为独立的、可重用的部分，并独立地考虑每个部分

---

    2、Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

    从概念上讲，组件类似于JavaScript函数。它们接受任意输入(称为“props”)，并返回描述屏幕上应该出现的内容的React元素。

> 1-2、Component's presentation (展现形式)

    The simplest way to define a component is to write a JavaScript function:

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

    You can also use an ES6 class to define a component:

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

> 上面的二种写法，目前来看是`等价的`.

> 任何都 React 版本，关于 Lifecycle 我们都可以找到对应的几个状态，来进行不同的 api 的差异的对比。这样也是方便，我们进行记忆的。

## 二、React V 16.0.0

`官方文档传送门：` [React V 16.0.0 官方文档](https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.com/docs/hello-world.html)

### 1、 The Component Lifecycle ( v16.0.0 )

#### 1-1 Mounting （绑定阶段）

> `constructor()` > `componentWillMount()` > `render()` > `componentDidMount()`

#### 1-2 Updating （数据更新阶段）

> `componentWillReceiveProps()` > `shouldComponentUpdate()` > `componentWillUpdate()` > `render()` > `componentDidUpdate()`

#### 1-3 Unmounting （解除绑定阶段）

> `componentWillUnmount()`

#### 1-4 Error Handling （错误处理阶段）

> `componentDidCatch()`

### 2、 Other APIs

#### 2-1 setState() （数据变更）

#### 2-2 forceUpdate() （强制数据变更）

### 3、 Class Properties （类的属性）

#### 3-1 defaultProps（默认的 props）

#### 3-2 displayName（展示名称）

### 4、Instance Properties （实例属性）

#### 4-1 props（父组件传递进来的数据）

#### 4-2 state（本地组件的数据）

## 三、React V 16.3.2

`官方文档传送门：` [React V 16.3.2 官方文档](https://5b05c94e0733d530fd1fafe0--reactjs.netlify.com/docs/hello-world.html)

### 1、 The Component Lifecycle ( v16.0.0 )

#### 1-1 Mounting （绑定阶段）

> `constructor()` > `static getDerivedStateFromProps()` > `componentWillMount() / UNSAFE_componentWillMount()` > `render()` > `componentDidMount()`

#### 1-2 Updating （数据更新阶段）

> `componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()` > `static getDerivedStateFromProps()` > `shouldComponentUpdate()` > `componentWillUpdate() / UNSAFE_componentWillMount()` > `render()` > `getSnapshotBeforeUpdate()` > `componentDidUpdate()`

#### 1-3 Unmounting （解除绑定阶段）

> `componentWillUnmount()`

#### 1-4 Error Handling （错误处理阶段）

> `componentDidCatch()`

### 2、 Other APIs

#### 2-1 setState() （数据变更）

#### 2-2 forceUpdate() （强制数据变更）

### 3、 Class Properties （类的属性）

#### 3-1 defaultProps（默认的 props）

#### 3-2 displayName（展示名称）

### 4、Instance Properties （实例属性）

#### 4-1 props（父组件传递进来的数据）

#### 4-2 state（本地组件的数据）

## 四、React V 16.5.2

`官方文档传送门：` [React V 16.5.2 官方文档](https://5bcf5863c6aed64970d6de5b--reactjs.netlify.com/docs/getting-started.html)

### 1、 The Component Lifecycle ( v16.0.0 )

#### 1-1 Mounting （绑定阶段）

> `constructor()` > `static getDerivedStateFromProps()` > `render()` > `componentDidMount()`

#### 1-2 Updating （数据更新阶段）

> `static getDerivedStateFromProps()` > `shouldComponentUpdate()` > `render()` > `getSnapshotBeforeUpdate()` > `componentDidUpdate()`

#### 1-3 Unmounting （解除绑定阶段）

> `componentWillUnmount()`

#### 1-4 Error Handling （错误处理阶段）

> `componentDidCatch()`

### 2、 Other APIs

#### 2-1 setState() （数据变更）

#### 2-2 forceUpdate() （强制数据变更）

### 3、 Class Properties （类的属性）

#### 3-1 defaultProps（默认的 props）

#### 3-2 displayName（展示名称）

### 4、Instance Properties （实例属性）

#### 4-1 props（父组件传递进来的数据）

#### 4-2 state（本地组件的数据）

## 五、React V 16.7.0

`官方文档传送门：` [React V 16.7.0 官方文档](https://reactjs.org/docs/getting-started.html)

### 1、 The Component Lifecycle ( v16.0.0 )

#### 1-1 Mounting （绑定阶段）

> `constructor()` > `static getDerivedStateFromProps()` > `render()` > `componentDidMount()`

#### 1-2 Updating （数据更新阶段）

> `static getDerivedStateFromProps()` > `shouldComponentUpdate()` > `render()` > `getSnapshotBeforeUpdate()` > `componentDidUpdate()`

#### 1-3 Unmounting （解除绑定阶段）

> `componentWillUnmount()`

#### 1-4 Error Handling （错误处理阶段）

> `componentDidCatch()` > `static getDerivedStateFromError()`

### 2、 Other APIs

#### 2-1 setState() （数据变更）

#### 2-2 forceUpdate() （强制数据变更）

### 3、 Class Properties （类的属性）

#### 3-1 defaultProps（默认的 props）

#### 3-2 displayName（展示名称）

### 4、Instance Properties （实例属性）

#### 4-1 props（父组件传递进来的数据）

#### 4-2 state（本地组件的数据）

## 六、React 各个版本之间的纵向对比

| React 版本 \ 各个阶段 API |                                                                                                                                 Mounting（绑定） |                                                                                                                   Updating（数据更新）                                                                                                                   | Unmounting （解除绑定） | Error Handling （错误处理）                              |
| :------------------------ | -----------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ----------------------- | -------------------------------------------------------- |
| V 16.0.0                  |                                                                      constructor()<br> componentWillMount()<br> render() <br>componentDidMount() |                                                                 componentWillReceiveProps()<br> shouldComponentUpdate() <br>componentWillUpdate()<br> render()<br> componentDidUpdate()                                                                  | componentWillUnmount()  | componentDidCatch()                                      |
| V 16.3.2                  | constructor()<br> static&nbspgetDerivedStateFromProps()<br>componentWillMount() / UNSAFE_componentWillMount()<br>render()<br>componentDidMount() | componentWillReceiveProps() / UNSAFE_componentWillReceiveProps()<br>static getDerivedStateFromProps()<br>shouldComponentUpdate()<br>componentWillUpdate() /UNSAFE_componentWillUpdate()<br>render()<br>getSnapshotBeforeUpdate()<br>componentDidUpdate() | componentWillUnmount()  | componentDidCatch()                                      |
| V 16.5.2                  |                                                            constructor()<br>static getDerivedStateFromProps()<br>render()<br>componentDidMount() |                                                              static getDerivedStateFromProps()<br>shouldComponentUpdate()<br>render()<br>getSnapshotBeforeUpdate()<br>componentDidUpdate()                                                               | componentWillUnmount()  | componentDidCatch()                                      |
| V 16.7.0(最新)            |                                                            constructor()<br>static getDerivedStateFromProps()<br>render()<br>componentDidMount() |                                                              static getDerivedStateFromProps()<br>shouldComponentUpdate()<br>render()<br>getSnapshotBeforeUpdate()<br>componentDidUpdate()                                                               | componentWillUnmount()  | static getDerivedStateFromError()<br>componentDidCatch() |
