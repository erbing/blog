###  vueJs 源码解析 （四） initRender.Js

	在之前的文章中提到了 vuejs 源码中的 架构部分，以及 谈论到了 vue 源码三要素 vm、compiler、watcher 这三要素，那么今天我们就从这三要素逐步了解清楚。这部分主要是来解读 render.js。

> 一、initRender 初始化 render 函数

` 核心代码一: `

```javascript
  vm._c = (a, b, c, d) => createElement(vm, a, b, c, d, false);
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = (a, b, c, d) => createElement(vm, a, b, c, d, true);
```

` 解析: `
	 
	 这里我们先做个一个大胆的猜测：createElement() 方法的最后一个参数 是来判断是 开发者是否在调用vue的时候 使用了 render 函数，从而给了不同的 参数，去render。

	后面，我们再来一一验证，前面的这些猜测.

` 找到 createElement() 方法 `

```bash
import { createElement } from '../vdom/create-element';
```

` 核心代码: `

```javascript
export function createElement(context, tag, data, children, normalizationType, alwaysNormalize) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType);
}
```

	其中 createElement(context, tag, data, children, normalizationType, alwaysNormalize)  

	context    // 上下文
	tag        // 标签
	data       // 数据对象   (hook, on , pendingInsert)
	children   // 子节点 （位置）



` 核心代码二: `	

```javascript

  /* istanbul ignore else */
  if (process.env.NODE_ENV !== 'production') {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$attrs is readonly.`, vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, () => {
      !isUpdatingChildComponent && warn(`$listeners is readonly.`, vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }

```

	其中 常见的 一个 vue 的方法是 defineReactive()

	在 observe 文件夹下 找到 index.js 的 defineReactive() 

` 核心代码: `

```javascript

export function defineReactive(obj, key, val, customSetter, shallow) {
  const dep = new Dep();

  const property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return;
  }

  // cater for pre-defined getter/setters
  const getter = property && property.get;
  const setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  let childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter() {
      const value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value;
    },
    set: function reactiveSetter(newVal) {
      const value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || newVal !== newVal && value !== value) {
        return;
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

```

	这个核心的代码，就是 Vue 的 实现数据监听以及 单向数据流的 主要方式。

> 二、initInjections 初始化

` 核心代码 : `

```javascript

export function initInjections(vm) {
  const result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(key => {
      /* istanbul ignore else */
      if (process.env.NODE_ENV !== 'production') {
        defineReactive(vm, key, result[key], () => {
          warn(`Avoid mutating an injected value directly since the changes will be ` + `overwritten whenever the provided component re-renders. ` + `injection being mutated: "${key}"`, vm);
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    toggleObserving(true);
  }
}

```



> 三、initState 初始化

` 核心代码 : `

```javascript

export function initState(vm) {
  vm._watchers = [];
  const opts = vm.$options;
  if (opts.props) initProps(vm, opts.props);
  if (opts.methods) initMethods(vm, opts.methods);
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) initComputed(vm, opts.computed);
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}
```

	判断传入的 options 对象中是否有 props methods data computed watch 等属性

	如果有的话， 会分别去 进行实例化操作。

`initProps(vm, opts.props)`

```javascript

defineReactive(props, key, value)

```

`initMethods(vm, opts.methods)`

```javascript

  for (const key in methods) {
    ...
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }

```

`initData(vm)`

```javascript

function initData(vm) {
  ...
  // observe data
  observe(data, true /* asRootData */);
}

```

`initComputed(vm, opts.computed)`

```javascript

  const watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  const isSSR = isServerRendering();

  ...

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(vm, getter || noop, noop, computedWatcherOptions);
    }

```


` initWatch(vm, opts.watch) `

```javascript

createWatcher(vm, key, handler)

function createWatcher(vm, expOrFn, handler, options) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options);
}
```


	看到了 这里是不是 突然有种 豁然开朗的感觉， 各种属性方法的实例化，让我们比较清楚的知道了在

	props methods data computed watch 等属性或者方法中 的内部变化。


` 好了，今天先写到这里，回家继续~ `
