<template>
  <div class="my-socket">websocket: socket</div>
</template>

<script>
export default {
  data() {
    return {
      socket: null,
      timeoutObj: undefined,
      serverTimeoutObj: undefined,
      lockReconnect: false, // 为true时，是心跳重连
    };
  },
  mounted() {
      this.init()
  },
  destroyed() {
    this.lockReconnect = false;
    // 1、组件销毁时，关闭与服务器的连接
    console.log(this.socket);
    if (this.socket) {
      this.socket.close(); // 离开路由之后断开websocket连接 总之，客户端直接调用close方法并不会关闭连接，而是发送请求到服务器请求对方。服务器接收请求后可以断开连接。这会触发客户端的close事件。
    }
    this.socket = null
    // 2、通过关闭计时器和倒计时关闭心跳监测
    clearInterval(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
  },
  methods: {
    init() {
      this.connectSocket(); // 建立websocket连接
      this.socket.onopen = () => {
        console.log("连接成功");
        this.longstart(); // 成功建立连接后，创建心跳检测
        // 连接成功执行的逻辑
      };
      // websocket连接接收消息后监听事件
      this.socket.onmessage = async (msg) => {
        console.log("心跳重置");
        this.longstart();
        try {
          var data = JSON.parse(msg.data);
          console.log(data);
        } catch (err) {
          return;
        }
        // websocket连接接收消息处理逻辑
      };
    },
    connectSocket() {
    //   const protocol = location.protocol === "https:" ? "wss" : "ws";
    //   const url =
    //     protocol +
    //     "://" +
    //     location.host +
    //     `proxy代理字段` +
    //     "/websocket/" +
    //     `后台所需参数`;
    const url = 'ws://192.168.0.102:3000'
      this.socket = this.createWebSocket(url);
      // 监听连接失败
      this.socket.onerror = this.websocketonerror;
      // 监听连接关闭
      this.socket.onclose = this.websocketclose;
    },
    // 创建websocket对象
    createWebSocket(url) {
      console.log(url);
      try {
        if (window.WebSocket) return new WebSocket(url);
        // if (window.MozWebSocket) return new MozWebSocket(url);
        return window.alert("浏览器不支持WebSocket");
      } catch (e) {
        console.log(e);
      }
      return false;
    },
    websocketonerror() {
      // 监听连接失败
      console.log("websocket连接断开error");
      this.connectSocket();
    },
    websocketclose(e) {
      // 监听连接
      console.log("断开连接", e);
      if (this.lockReconnect) {
        this.connectSocket(); // websocket关闭链接重连
      }
    },
    longstart() {
      //1、通过关闭定时器和倒计时进行重置心跳
      clearInterval(this.timeoutObj);
      clearTimeout(this.serverTimeoutObj);
      // 2、每隔30s向后端发送一条商议好的数据
      this.timeoutObj = setInterval(() => {
        console.log("重置监测心跳");
        let data = {
          // 与后端商量好心跳要传递的值
          content: "pong",
          contentType: "hert",
        };
        this.socket.send(JSON.stringify(data));
        // 3、发送数据 2s后没有接收到返回的数据进行关闭websocket重连
        this.serverTimeoutObj = setTimeout(() => {
          this.lockReconnect = true; // 心跳重连设置为true
          console.log("后台挂掉，没有心跳了....");
          console.log("打印websocket的地址:" + this.socket);
          this.socket.close();
        }, 2000);
      }, 30000);
    },
  },
};
</script>

<style>
</style>