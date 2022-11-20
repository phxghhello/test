<template>
  <div class="longWrap">
    <div class="longPressSave2Img" id="wish">
      <div class="box box1" id="box1">
        <div style="padding-top: 40px; text-align: center; line-height: 1.5">
          <div>longPressSave2Img</div>
          <img width="50px" src="../assets/lb.jpeg" alt="" srcset="" />
          <div class="poet">
            <div>
                <span>明</span>
                <span>月</span>
                <span>几</span>
                <span>时</span>
                <span>有</span>
                <span>?</span>
                <span>把</span>
                <span>酒</span>
                <span>问</span>
                <span>青</span>
                <span>天</span>
                <span>。</span>
              <!-- 月几时有？ -->
            </div>
            <!-- <div>
              但愿人长久，千里共婵娟。
            </div> -->
          </div>
        </div>
      </div>
      <!-- <div class="box box2" id="box2">
      <div>box 2</div>
      <div>box 2</div>
      <div>box 2</div>
      <div>box 2</div>
    </div> -->
    </div>
    <div class="tip">长按可保存</div>
  </div>
</template>

<script>
import LongPressSave2Img from "./longPressSave2Img";
export default {
  data() {
    return {};
  },
  mounted() {
    const el = document.querySelector("#wish");
    const long1 = new LongPressSave2Img(el, () => {
      console.log("longPress then");
      const r = window.confirm("要保存为图片吗？");
      if (r === true) {
        long1.htmlToCanvas({ mime: "image/jpeg" }, ({ flag, data }) => {
          if (flag) {
            console.log("base64编码数据：", data);
            const a = document.createElement("a");
            a.href = data;
            a.download = "base64编码数据";
            a.click();
          }
        });
      }
    });
  },
};
</script>

<style lang="scss">
.longPressSave2Img {
  width: 100%;
  height: 100vh;
  background-image: url("../assets/kmd.jpeg");
  color: #fff;
  .box {
    .poet {
      /*wirting-mode实现竖直排版*/
      writing-mode: vertical-rl;
    }
  }
}
.longWrap {
  position: relative;
  .tip {
    position: absolute;
    width: 100%;
    bottom: 40px;
    text-align: center;
    color: #999;
  }
}
</style>