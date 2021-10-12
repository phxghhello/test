<template>
  <div class="simple-table">
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="limit ? '' : '没有更多了'"
      @load="onLoad"
    >
      <van-cell class="header">
        <div class="col" v-for="(head, idx) in headerData" :key="idx">
          {{ head }}
        </div></van-cell
      >
      <van-cell v-for="(item, i) in list" :key="i"
        ><div class="col" v-for="(col, index) in item" :key="index">
          <span :style="{ color: col.color ? col.color : '#666' }">{{
            col.num || col
          }}</span>
        </div></van-cell
      >
    </van-list>
  </div>
</template>

<script>
export default {
  name: "simple-table",
  props: {
    limit: Number,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      headerData: ["时间区间", "涨跌幅", "涨跌比较基准"],
      contentData: [
        ["近6月", { num: "-1.55%", color: "green" }, "-5.69%"],
        ["近1年", { num: "-11.55%", color: "green" }, "-0.69%"],
        ["近3年", { num: "+18.55%", color: "red" }, "+5.69%"],
        ["近5年", "--", "-5.69%"],
        ["成立以来", { num: "+1.55%", color: "red" }, "-5.69%"],
        ["近1周", { num: "+1.55%", color: "red" }, "-5.69%"],
        ["近1月", { num: "+1.55%", color: "red" }, "-5.69%"],
        ["近3月", { num: "+1.55%", color: "red" }, "-5.69%"],
      ],
    };
  },
  methods: {
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      for (let i = 0; i < this.limit; i++) {
        this.list.push(this.contentData[i]);
      }

      // 加载状态结束
      this.loading = false;

      // 数据全部加载完成
      if (this.list.length >= this.limit) {
        this.finished = true;
      }
    },
  },
};
</script>

<style lang="scss">
.simple-table {
  .van-cell {
    padding: 0px;
    height: 42px;
    &.header {
      .col {
        color: #999;
      }
    }
  }
  .van-cell__value {
    display: flex;
    .col {
      flex: 1;
      line-height: 42px;
      &:not(:first-child) {
        text-align: center;
      }
    }
  }
}
</style>