<template>
  <div>我的socket
       <ul>
      <p>消息：{{ newt }}</p>
    </ul>
    <input type="text" placeholder="在此输入消息" v-model="msg" />
    <button @click="sendMessage()">发送</button>
  </div>
</template>

<script>
import SocketIO from "socket.io-client";
export default {
  data() {
    return {
      socket: null,
      msg: "",
      newt: "",
    };
  },
  mounted() {
    this.newSocket();
  },

//   beforeDestroy() {
//     this.socket && this.socket.ondisconnect();
//   },
  methods: {
    newSocket() {
      //   this.socket = SocketIO('http://localhost:3000/', {
      //     transports: ["websocket", "xhr-polling", "jsonp-polling"],
      //   });
      this.socket = SocketIO(
        "http://127.0.0.1:3000", //'ws://127.0.0.1:3000'
        {
          path: "", // socket.io 库默认服务端path为/socket.io
          transports: ["websocket", "xhr-polling", "jsonp-polling"], //此配置在我的代码中表现为必须项，官方示例未列出，请指教
        }
      );
      this.socket.on("connect", () => {
        console.log("连接成功");
      });
      this.socket.on("initmessage", (res) => {
        console.log("initmessage连接成功", res);
      });
    },
    sendMessage() {
      this.socket.emit("message", this.msg);
      console.log('调用!!');
      this.socket.on("chat message", (data) => {
        console.log(data);
        this.newt = data;
      });
    }
  },
};
</script>

<style>
</style>