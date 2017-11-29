### 基于 nodejs 的 webSockt （socket.io） 理解

	本文的业务基础是在基于 nodejs 的 socket.io 的直播间聊天室（IM）应用来的。
	
	项目中具体的 框架如下 express + mongodb + socket.io

	在介绍 socket.io  之前，我们有必要对 webSocket 进行根本的原理的理解。

	
#### 一、webSocket 的前生今世

	1、什么是 webSocket？
	2、如何去用？
	3、经常使用的场景？
	4、需要注意的地方
	好了，下面我们就按照上面 提到的四点来进行分析。

##### 1、 什么是 websocket

官方文档解读：  [webSocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSockets_API) 
	
	这个是 MDN 的官方文档。详细的内容需要读者自己仔细去阅读了，笔者这里只介绍 容易出错的问题。
	
	1、WebSockets 是一个可以创建和服务器间进行双向会话的高级技术。通过这个API你可以向服务器发送消息并接受基于事件驱动的响应，这样就不用向服务器轮询获取数据了。
	
	当然这个只是说用来解决 不用向服务器轮询获取数据问题。 这么来说的话其实还是不太够 ‘官方’。

	非官方理解： B/S 结构的软件项目中，客户端通过 http、https 等方式获得服务器消息，但是默认的 http 协议只支持 请求响应模式，这种模式简化了 web 服务器，减少服务器负担，加快网站的响应速度。 但是不能满足 我们实时消息推送，聊天室等功能，这个时候 websocket 这个本 作为 unix 进程通信机制 就被嫁接到了 应用程序间网络通信，从而就有了如今的 socket

##### 2、Websocket: 通信模型

![](https://images2018.cnblogs.com/blog/675289/201711/675289-20171128114429503-1348300976.png)

	
	WebSocket是HTML5开始提供的一种浏览器与服务器间进行全双工通讯的网络技术。依靠这种技术可以实现客户端和服务器端的长连接，双向实时通信。

	特点： 事件驱动、异步 使用 ws 或者 wss 协议的 socket、 实现真正意义上的 推送功能

	这里的  ws 和 wss 区别跟 http 和 https 的区别一样（安全性）

	缺点就是 兼容性（今年已经 2017年了，应该可以不用考虑这个问题了）


##### 3、 websocket 客户端
	
	官方文档中回提供系列的 api 具体如下：

	分类如下：

	a） 连接类：
	
		1、send() 向远程服务器发送数据
		2、close() 关闭该websocket链接

	b) 监听函数类：
	
		1、onopen 当网络连接建立时触发该事件
		2、onerror 当网络发生错误时触发该事件
		3、onclose 当 websocket 被关闭时触发该事件
		4、onmessage 当 websocket 接收到服务器发来的消息的时触发的事件，也是通信中最重要的一个监听事件。 其中 我们可以定义各类 onmessage 事件的 type 从而 扩展我们的 onmessage 事件。

	c) websocket还定义了一个readyState属性:
	
		1、CONNECTING(0) websocket正尝试与服务器建立连接
		2、OPEN(1) websocket与服务器已经建立连接
		3、CLOSING(2) websocket正在关闭与服务器的连接
		4、CLOSED(3) websocket已经关闭了与服务器的连接

##### 4、 websocket 服务端

	服务端就像是一个分发中心， 但是首先都得通过 connect 创建连接 从而形成 ws 的长连接。

	只要 长连接 连接成功，那么接下来的事情就很好操作了， 比如在服务端 emit 触发一个事件，那么在 服务端就需要监听 on 方法来监听同一个事件，最后如果需要让 当前房间（注: 这里有个 单房间 和 多房间的概念，我们在后面的介绍中会仔细的提到的）内的所有连接用户都被通知到这则消息，那么 在监听到服务端触发的消息的同时，再来触发一个广播给 客户端， 这个时候只要是在当前 ws 连接线上的所有用户都会被 emit 触发到这个事件，从而实现了 广播。

	上面的这一长段话，可能暂时不太好理解，但是如果 亲手来写上这么一个 demo 就会理解很多了。


#### 二、 基于 nodeJs 的 webSocket 框架 socket.io

	socket.io 是这篇文章的主角，因为它对 webSocket 做了一个非常完善的封装， 并且提出了 多房间  多命名空间的 概念，让多聊天室同时存在不再是一个问题，所以，下面就会详细的来介绍下 socket.io 这个框架

[http://socket.io](http://socket.io/)  这个是官网

	我们在官网中 可以看到非常简洁的 socket.io 的应用方法。

	并且还展示了一个全世界通用的 IM （虽然这里常常可以看到 f**k xxx）

好了，下面就针对 这个 socket.io 再进行一个详细的介绍

	1、 Server api

	2、 Client api

	3、 Rooms and NameSpace


这要就针对这三个来进行介绍

##### 1、 Server api
	
	服务端初始化 io 对象

```javascript
const io = require('socket.io')();
// or
const Server = require('socket.io');
const io = new Server();
```

	这个时候就需要看 你的后台 服务的语言， php java nodejs 等等

	我是用的 nodejs 所以直接 使用 express or koa2 均可

	然后创建 http-server 服务

```javascript
const socket = require('socket.io');

var app = express()

var server = http.createServer(app)

io = socket(server)

io.on('connection', function(socket) {
	// to do somethings
})

```

	上面的这个步骤就可以轻松的 通过 nodejs + express 创建了一个 socket 服务端的 服务了
	

##### 2、 Client api

	上面的步骤中已经在 服务端进行了 一些列 的操作 ，这个时候就需要 在服务端 创建 连接


	首先是 需要在 前端引用 这个 socket 文件
	
```javascript

<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io('http://localhost');
</script>
const io = require('socket.io-client');
// or with import syntax
import io from 'socket.io-client';

```

	然后 创建 连接

```javascript

const socket = io();

```

	然后 触发监听  'connection'

```javascript

io.on('connection', (socket) => {
  let token = socket.handshake.query.token;
  // ...
})

```

	加入这个时候你在 服务端 打印 debug 如果顺利 就可以轻松 完成了第一个 socket 的链接啦~

##### 3、 Rooms and NameSpace
	
	最后这里 介绍到的  rooms 和 namespace 的概念

	在多房间 聊天室 中 占据了很大的作用

	其中 介绍下 rooms  的 概念 ， 关于 namespace 相关可以到 socket.io 官网中进行查看



```javascript

// 广播给当前房间除了自己以外的所有人 

socket.broadcast.to(roomId).emit('msg', {	
	// take somethings
})

// 广播给当前房间中自己

socket.emit('msg', {
	// take somethings
})


// 广播给当前房间的所有人 

socket.to(roomId).emit('msg', {	
	// take somethings
})

```

	然后再结合上面的 监听 、 触发 方法，完成一系列的需求任务。


恩，今天先到这里，有什么问题，可以留言互相学习。
