<template>
  <div class="pdf-page">
    <div>pdf展示</div>
    <div id="demo"></div>
  </div>
</template>

<script>
import Pdfh5 from "pdfh5";
import "pdfh5/css/pdfh5.css";
import axios from "axios";
export default {
  name: "pdfPage",
  data() {
    return {
      pdfh5: null,
    };
  },
  mounted() {
    axios
      .get("https://www.gjtool.cn/pdfh5/git.pdf", {
        responseType: "arraybuffer",
      })
      .then((res) => {
        this.pdfh5 = new Pdfh5("#demo", {
          data: res.data,
        });
      });

    // //跨域代理 proxyTable
    // axios
    //   .get('/api/pdfh5/git.pdf', {
    //     responseType: 'arraybuffer'
    //   })
    //   .then(res => {
    //     this.pdfh5 = new Pdfh5('#demo', {
    //       data: res.data
    //     });
    //   });

    // //实例化
    //  this.pdfh5 = new Pdfh5("#demo", {
    //     pdfurl: "../../static/git.pdf"
    //  });
    //  //监听完成事件
    //  this.pdfh5.on("complete", function (status, msg, time) {
    //     console.log("状态：" + status + "，信息：" + msg + "，耗时：" + time + "毫秒，总页数：" + this.totalNum)
    //  })
  },
};
// https://blog.csdn.net/weixin_41791345/article/details/118720398?spm=1001.2101.3001.6650.11&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-11.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-11.no_search_link

//https://www.gjtool.cn/archives/pdfh5

//https://github.com/gjTool/pdfh5/tree/master/example/test
</script>

<style>
/* @import "pdfh5/css/pdfh5.css"; */
</style>
<style lang="scss">
.pdf-page {
  width: 100%;
  height: 100%;
}
</style>