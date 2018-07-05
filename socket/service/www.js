const koa =  require('koa2')
const http = require('http');
const https = require('https');

const socket = require('socket.io')
const fs = require('fs')

const app = new koa()
app.use(async ctx => {
    ctx.body = 'hello, worldx'
})

const server  = http.createServer(app.callback()).listen(3000)
// app.listen(3000)

const io = socket(server)


io.on('connection', function(socket) {
    // 坚挺登陆
    io.emit('hello', {hello: 'world'})
    
})
