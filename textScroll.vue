<template>
  <div
    class="my-outbox"
    @mouseover="stopScroll"
    @mouseout="startScroll"
    :class="{
      fadebg: showbg,
    }"
  >
    <div class="my-inbox" ref="box">
      <div
        class="my-list"
        v-for="(item, index) in newsList"
        :key="index"
        ref="listRef"
        :class="[
          getLevel(item.level),
          item.status === 'unread' ? 'unread' : 'read',
        ]"
      >
        <span class="my-uname">{{ item.content }}</span
        >&nbsp;&nbsp;&nbsp;&nbsp;
        <span class="my-uname">[{{ item.time }}]</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "my-marquee-left",
  data() {
    return {
      nowTime: null,
      disArr: [],
      startDis: 0,
      list: [
        {
          id: "news1",
          content: "消息公告:2020年10月14限公司成立，我行用信金额111111元",
          level: "1",
          status: "read",
          time: "2021-12-21 10:24:34",
        },
        {
          id: "news2",
          content: "信息公告：2020年9月30大幅度发大发的，我行用信金额222222元",
          level: "2",
          status: "unread",
          time: "2021-12-21 10:24:33",
        },
        {
          id: "news3",
          content: "信息公告：2020年9月30大幅度发大发的，我行用信金额333333元",
          level: "3",
          status: "unread",
          time: "2021-12-21 10:24:32",
        },
        {
          id: "news4",
          content: "信息公告：2020年9月30大幅度发大发的，我行用信金额444444元",
          level: "3",
          status: "read",
          time: "2021-12-21 10:24:31",
        },
        {
          id: "news5",
          content: "信息公告：2020年9月30大幅度发大发的，我行用信金额555555元",
          level: "3",
          status: "read",
          state: "off",
          time: "2021-12-21 10:24:31",
        },
      ],
      newsList: [],
      showbg: false,
    };
  },
  mounted() {
    this.newsList = this.list.filter((item) => item.state !== "off");
    this.initStartScroll();
    this.shrinkbg()
  },
  beforeDestroy() {
    clearInterval(this.nowTime);
    this.nowTime = null;
    this.startDis = 0;
  },
  methods: {
    shrinkbg() {
      let count = 0;
      const fadeTimer = setInterval(() => {
        this.showbg = !this.showbg;
        count++;
        if (count > 8) {
          clearInterval(fadeTimer);
        }
      }, 500);
    },
    initStartScroll() {
      this.$nextTick(() => {
        if (!this.newsList.length) return;
        var item = this.$refs.listRef;
        var len = this.newsList.length;
        var arr = [];
        // 因为设置的margin值一样，所以取第一个就行。
        var margin = this.getMargin(item[0]);
        for (var i = 0; i < len; i++) {
          arr.push(item[i].clientWidth + margin); // 把宽度和 margin 加起来就是每一个元素需要移动的距离
        }
        this.disArr = arr;
        this.startDis = 0;
        this.scrollLeft();
      });
    },
    //鼠标悬停，停止滚动
    stopScroll() {
      clearInterval(this.nowTime);
      this.nowTime = null;
    },
    //鼠标移开 ，接着滚动
    startScroll() {
      this.scrollLeft();
    },
    // 移动的方法
    scrollLeft() {
      var that = this;
      var outbox = this.$refs.box;
      var total = that.disArr.reduce((a, b) => a + b);
      if (outbox.clientWidth > total) return;
      // 初始位置
      var startDis = 0;
      if (this.startDis < 0) {
        startDis = this.startDis;
      }
      this.nowTime = setInterval(function () {
        startDis -= 0.5;
        that.startDis = startDis;
        if (Math.abs(startDis) > Math.abs(that.disArr[0])) {
          // 每次移动完一个元素的距离，就把这个元素的宽度的第一项放到最后一项
          that.disArr.push(that.disArr.shift());
          // 每次移动完一个元素的距离，就把列表数据的第一项放到最后一项
          that.newsList.push(that.newsList.shift());
          startDis = 0;
          that.startDis = startDis;
        } else {
          // console.log('不来...')
        }
        outbox.style = `transform: translateX(${startDis}px)`;
      }, 1000 / 60);
    },
    // 获取margin属性
    getMargin(obj) {
      var marg = window.getComputedStyle(obj, null)["margin-right"];
      marg = marg.replace("px", "");
      return Number(marg); // 强制转化成数字
    },
    getLevel(level) {
      const maps = {
        1: "error",
        2: "warning",
        3: "info",
      };
      return maps[level] || "info";
    },
  },
};

// https://blog.csdn.net/weixin_38680881/article/details/118183751 Vue实现横向无缝滚动 引入vue-seamless-scroll
</script>

<style>
.my-outbox {
  background-color: #d7bc8d;
  overflow: hidden;
  height: 35px;
}
.my-inbox {
  white-space: nowrap;
}
.my-list {
  margin-right: 28px;
  display: inline-block;
  font-size: 14px;
  /* text-indent: 30px; */
  line-height: 40px;
  color: #333;
}
.my-list.unread {
  font-weight: 600;
}
.my-list.error {
  color: rgb(235, 46, 46);
}
.my-list.warning {
  color: #ff8900;
}
.my-list.info {
  color: #333;
}
.my-outbox.fadebg {
  background: #ff0;
}
</style>