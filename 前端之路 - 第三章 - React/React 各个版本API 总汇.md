## ReactJs 的个版本生命周期汇总

    由于 React 的版本更新频繁，各类的新特性也是让人眼花缭乱的，为了方便自己查询最新的以及过往的 各个 React 版本 api、生命周期函数。 这里就用 caniuse 的方式做一个 方便查询的小功能。

---

    那么要实现这个小功能之前，我们必须要对 React 的各种版本进行仔细的解读。
    最快捷的方式就是 直接 通过官方文档来获取最真实的信息。

### 一、React V 16.0.0

`官方文档传送门：` [React V 16.0.0 官方文档](https://5a046bf5a6188f4b8fa4938a--reactjs.netlify.com/docs/hello-world.html)

#### 1、Components and Props

> 1-1、About `Components`

    1、Components let you split the UI into independent, reusable pieces, and think about each piece in isolation

    组件允许您将UI拆分为独立的、可重用的部分，并独立地考虑每个部分

---

    2、Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

    从概念上讲，组件类似于JavaScript函数。它们接受任意输入(称为“props”)，并返回描述屏幕上应该出现的内容的React元素。

> 1-2、Component's presentation (展现形式)

#### 2、 State and Lifecycle
