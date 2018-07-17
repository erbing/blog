###  12：head（头标签总结 html 中...）	

#### 常见头标签

### DOCTYPE

**文档模式**

1. 对文档进行有效性验证

    告诉用户代理或浏览器这个文档是按照什么DTD写的，但是这个动作是被动的，每次页面加载时，浏览器并不会下载DTD，并检查合法性，只有手动校验时才启用。

2. 决定浏览器的呈现模式

    通知浏览器读取文档时用哪种`解析算法`，如果没有写，浏览器会按照自身的规则对代码进行解析，可能会严重影响html排版布局

**浏览器的三种解析HTML文档的方式**

* 非怪异（标准）模式

* 怪异模式

* 部分怪异（近乎标准）模式

**HTML5的文档模式写法**

```html
<!DOCTYPE html>
```

优点：写法简洁，向前向后兼容

使用 vscode 来进行编写的时候 可以使用快捷输入。 html:5  --->>> Enter

### 字符集

```html
<meta charset="utf-8">
```

### 语言

简体中文

```html
<html lang="zh-cmn-Hans"></html>
```

繁体中文

```html
<html lang="zh-cmn-Hant"></html>
```

### 版本内核选择

**优先使用IE最新版本和Chrome**

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
```

**360使用Google Chrome Frame，即极核速**

```html
<meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1"/>
<meta name="renderer" content="webkit">
```

### SEO优化

**title是SEO最重要的部分，尽量突出关键字**

```html
<title>title</title>
```

**关键词**

```html
<meta name="keywords" content="your keywords">
```

**页面描述内容**

```html
<meta name="discription" content="your description">
```

**网页作者**

```html
<meta name="author" content="author,email,address">
```

**robots协议**

1. 定义网页搜索引擎的索引方式

2. 取值：no,noindex,nofollow,all,index,follow

```html
<meta name="robots" content="index,follow">
```

### viewport

1. 让布局在移动浏览器上显示得更好，是移动端开发的重要的头标签。

2. content参数：

 | 类型 | 作用 | 取值 |
 | :--- | : ---| :---: |
| height | viewport高度 | 数值/device-height |
| initial-scale | 初始缩放比例 | 数值：1 |
| maximum-scale | 最大缩放比例 | 数值 |
| minimum-scale | 最小缩放比例 | 数值 |
| user-scalable | 是否允许用户缩放 | yes/no |

	

**常见设置**

```html
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">
```

**设置 minimal-ui，IOS 7新增属性，可以在页面加载时最小化上下状态栏**

```html
<meta name="viewport" content="width=device-width,user-scalable=no,minimal-ui">
```

**适配 iphone6 和 iphone6 plus**

1. 大部分4.7~5寸的安卓设备的viewport宽为360px，iphone6 上却是375px

2. 大部分5.5寸的安卓设备的viewport宽为400px，iphone6 plus却是414px

```html
<meta name="viewport" content="width=375">
<meta name="viewport" content="width=414">
```

### 百度禁止转码

```html
<meta http-equiv="Cache-Control" content="no-siteapp">
```

### IOS设备

**添加到主屏后的标题（IOS6 新增）**

```html
<meta name="apple-mobile-web-app-title" content="标题">
```

**是否启用WebApp全屏模式**

```html
<meta name="apple-mobile-web-app-capable" content="yes">
```

**设置状态栏的背景颜色，需启用WebApp的全屏模式**

content参数

    default：默认
    black：黑色
    black-translucent：黑色半透明

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

**禁止数字自动识别为电话号码**

```html
<meta name="format-detection" content="telephone=no"/>
```