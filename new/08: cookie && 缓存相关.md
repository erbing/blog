### 08： Cookie && localStorage && Session Storage 缓存相关

### 客户端、前端 存储

#### 一、 起 因
		首先解释下为什么想来写这个关于前端存储的问题，因为最近在做小程序相关的内容。但是，在开发过程中，我们难免会遇到 token 存储、 代码缓存、 图片存储等等。 以及可能存在的 一系列的问题。


		现在，我们就专门从  浏览器 存储 入手，来真正的了解 缓存 存在的 场景，以及在日常开发中，我们需要 缓存的地方，以及使用缓存会给我们带来哪些优势 or bug。


#### 二、缓存的 初始状态

		很久很久之前，还在 web 端开发的时候。 那个年代其实前后端分离开发模式 非常的少，而且你也得去 兼容 各个 大厂提供的 浏览器。 那个时候  IE6789 、 火狐、 谷歌 、Safari 等等。 多到 有些市场份额很少的 就直接 舍弃掉。 从那个年代过来的人 应该都 记得 国产神 浏览器 UC （说到这里，眼泪就流了下来 T—T）
	
		好吧，好像 扯远了， 那个年代的 cookie （饼干、小甜点） 在我第一次接触到它的时候，哇~ 我是惊叹的。 原来有这种操作？ 什么操作呢？ 服务端会在 用户登录成功之后 接口返回一个 token ，类似秘钥一样的东西，然后 前端就会拿到这个token 然后 缓存在一个 地方， 这个地方 就是 cookie。  然后再次访问需要有 登陆态的 接口的时候，我们就会 从 cookie 中 读取 token，然后在 发送 http 请求时候，写进 header 中。 后端接受到这个 请求以后，就可以获取到这个  token ，然后经过简单验证即可。 验证通过了，则进行下一步操作。

		好了，下一步。我们就进行详细的 介绍 Cookie

		
#### 三、 Cookie

##### 1.1  		Cookie 是什么？
		
	Cookie 翻译 过来就是 饼干、小甜点 的意思。
	是在 web端 常见的 存储方式之一，而且在 发起 http 请求的时候会自动被带上。 但是这个个人建议 不要大量的去使用，因为 cookie 会被带入进去 http 的请求内容中。请求包 可能会 越来越大，导致请求速度慢从而 影响用户体验。



-------

	说白了。 cookie 就是保存在客户端的一段  **字符串**。
	
	cookie可以手动设置，也可以由服务器产生，当客户端（浏览器）向服务器发送请求，服务器会反馈一些信息给客户端，这些信息的key/value值被浏览器作为文件保存在客户端特定的文件夹中。

------

##### 1.2  cookie 如何使用
	当然我们也会避免不了的会去用到。那么就介绍下 使用的方法吧。

```javascript
// 存cookie
let setCookie = (name, value, times) = > {
	let date = new Date()
	data.setDate(data.getDate() + times)
	document.cookie = name + '=' + value + ';expires=' + date
} 
	
// 取cookie
let getCookie = (name) => {
	let cookies = document.cookie
	let cookieArr = cookies.split(';')
	for(let i = 0; i < cookieArr.length; i++) {
		let arr = cookieArr[i].split('=')
		if (name == arr[0] ) {
			return arr[1]
		}
	}
	return false
}

//  删除 cookie
let removeCookie = (name) => {
	setCookie(name, '', '-1')
	// 通过建立 cookie 的时间设置，将时间设置提前一天，从而强行让 cookie 失效，最后达到 删除cookie 的目的
}

```

------ 

##### 1.3  cookie 的 官方定义

	这里，我们看下官方是如何 给 cookie 定义的。

![](http://images2017.cnblogs.com/blog/675289/201708/675289-20170802112915849-1902541418.png)


 1）  name： cookie 的名称
 2）  value： cookie 的 值
 3）  maxAge： cookie  的 最大有效期
 4）  secure： 是否使用安全协议传输
 5）  path： cookie 使用的 路径。 不同路径无法获取到。
 6）  domain： cookie 的域， 和 path 类似。主要防止跨域攻击。
 7）  comment： 该cookie 的用处说明
 8）  version：cookie 的版本

------ 

##### 1.4  cookie  使用时注意事项

1） cookie 是有大小限制的，每个cookie 所存放的数据不能超过 4k， 如果超过则该属性将返回空字符串。

	如果我们需要在客户端存储更大的数据，怎么办？ 后面我们还会介绍到 userDate 和 localStorage（最大是5M） 等等。

2） 通常我们需要将 存放的 value 值 进行 escape 编码。 然后在使用的时候 再用 unescape()   函数，反编码  就好了。

3）重要的信息不要放 cookie


    在之前的内容中已经介绍到了 前端存储方案中的 cookie 。 但是 cookie 的存储上限是 4KB。 如果超过了 4KB ，在获取cookie 的时候会返回空值。

	那如果存储内容超过 4kb，我们该如何处理呢？

	这里我们将分别 介绍 几种前端存储方式： localStorage， sessionStorage，websql 和indexeddb。

#### 一、localStorage

##### 1.1 localStorage 是什么？
		
	是 被 W3C 标准化之后的网页存储的一种方式， 原本是属于 HTML5 的存储方案，后来被 独立出来，适用于 IE 8+，FF 2+，Safari 4+，chrome 4+， Opera 10.50+。 （意思 就是 PC 上 和 H5 都可以愉快的使用啦~）

	

##### 1.2 localStorage 如何使用
	
	localStorage.getItem(key)          获取指定key本地存储的值
	localStorage.setItem(key,value)  将value存储到key字段
	localStorage.removeItem(key)    删除指定key本地存储的值


##### 1.3 注意事项

	首先，我们进入浏览器看下 localStorage 长什么样子。

![](http://images2017.cnblogs.com/blog/675289/201708/675289-20170804102635990-363496587.png)

	对，就是这么就简单， k / v  组成， 和cookie 的区别还是 挺大的。 没有 path time 等等限制。

	1）存储时间： localStorage的存储周期比sessionStorage 长 (这里的 sessionStorage 我们会在下文中介绍到) ，如果用户不清理的话，是可以永久存储的。

	2）访问限制： 另外 也有访问的限制， localStorage 与 sessionStorage虽然相似，但是访问限制却不尽相同，localStorage的访问域默认设定为设置localStorage的当前域，其他域名不可以取。这点与sessionStorage相同，但是与sessionStorage不同的是，localStorage设定后，新开tab是可以访问到的。
	
	3）大小限制及检测  标准建议对于每个domain，localStorage大小为5M，达到限制时浏览器可以去问用户是否允许增加存储空间。

	4）可以用来干嘛？  因为 localStorage 可以长期存储，只要用户不刻意去清除。 那么我们往往可以提前存入一些 用户需要访问，而且还是需要 服务器加载的文件等等。 这样一方面可以加快页面加载速度。另外一方面也可以 减少服务器压力。
	

#### 二、sessionStorage

	这里说的 sessionStorage 和 localStorage 的区别就在于， 用户关掉了 浏览器的当前页。 sessionStorage 存储的数据就销毁掉了。


##### 1.1 用法
	
	sessionStorage.getItem(key)          获取指定key本地存储的值
	sessionStorage.setItem(key,value)  将value存储到key字段
	sessionStorage.removeItem(key)    删除指定key本地存储的值


##### 1.2 访问限制
	
	当前 tab 存储的 sessionStorage， 只能在 当前 tab页才能访问到， 如果 打开同样域名的 tab 去访问 之前 tab页 存储的 sessionStorage 是无法读取到的。

	所以 sessionStorage 是一个 tab 级别的 存储。

##### 1.3 可以做什么？

	当然，这么弱的 存储功能可以做什么 呢？ 要相信存在即是 合理的。
	
	最常见的一个功能就是，如果 我们在 视频网站看视频不小心刷新了 某个我们正在播放视频的页面。 这个时候 视频的进度条会提示你 上次播放时间， 是否继续上次的播放， 其实 这个时间就可以保存到 sessionStorage 。 可能这只是比较牵强的一个例子。 大概就是这么使用
	

#### 三、websql与indexeddb
	
	前面讲到了 sessionStorage  和 localStorage 。 这里介绍的 websql与indexeddb 和之前的二者 是有一定 区别的。


##### 1.1 websql
	
	1） 是什么？
	
![](http://images2017.cnblogs.com/blog/675289/201708/675289-20170804105227803-2098145534.png)

		websql更像是关系型数据库，并且使用sql语句进行操作。

	2） 注意事项
	
		虽然现在 websql 已经不再继续维护了， 但是因为 它的起步早，所以兼容性是 异常的OK 的。
		如果遇到了 兼容性相关的问题，websql 是一个不错的选择。


##### 1.2 indexedDB

	1）是什么？

![](http://images2017.cnblogs.com/blog/675289/201708/675289-20170804111437240-1185273250.png)

	2） 访问权限：

	indexedDB 和 websql 在访问权限上 和 localStorage 是一致的。 均是只能子啊创建数据库下的域名才能访问，而且不能指定访问域名。

	3) 存储时间： 同样是永久，除非用户清除数据

	4) 可以做什么？

	当我们是在做一个离线应用，或者webapp的时候，可以考虑使用本地数据库中存取数据。如果不存大量的数据的话，其实localStorage就够用了。亦或者，你想把一张用户的皮肤图片之类的大量数据存入客户端缓存起来，localStorage已经不够用了的话，也可以尝试一下websql与indexeddb。