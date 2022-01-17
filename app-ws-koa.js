const url = require('url');

const ws = require('ws');

const Cookies = require('cookies');

const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const WebSocketServer = ws.Server;

const app = new Koa();

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

let server = app.listen(3000);

function createWebSocketServer(server, onConnection, onMessage, onClose, onError) {
    let wss = new WebSocketServer({
        server: server
    });

    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };

    onConnection = onConnection || function () {
        console.log('[WebSocket] connected.');
    };
    onMessage = onMessage || function (msg) {
        console.log('[WebSocket] message received: ' + msg);
    };
    onClose = onClose || function (code, message) {
        console.log(`[WebSocket] closed: ${code} - ${message}`);
    };
    onError = onError || function (err) {
        console.log('[WebSocket] error: ' + err);
    };

    wss.on('connection', function (ws) {
        let location = url.parse(ws.upgradeReq.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError);
        if (location.pathname !== '/ws/chat') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }
        // 
        
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer 已经连接...');
    return wss;
}

function onConnect() {
    this.wss.broadcast('broadcast  connect...');
    this.send('send connect...');
}

function onMessage(message) {
    console.log(message);
    this.wss.broadcast('broadcast  messaget...', message);
}

function onClose() {
    this.wss.broadcast('user is left');
}

app.wss = createWebSocketServer(server, onConnect, onMessage, onClose);

console.log('app started at port 3000...');