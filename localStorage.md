### 前端数据存储方案集合（cookie localStorage等）以及详解 （二）

	在之前的文章中已经介绍到了 前端存储方案中的 cookie 。 但是 cookie 的存储上限是 4KB。 如果超过了 4KB ，在获取cookie 的时候会返回空值。

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
