<template>
  <div class="text-box">
    <div :class="['txt', { 'over-hidden': !unfold }]" ref="textBox">
      <span ref="spanBox">{{content}}</span>
    </div>
    <div class="btn" v-if="ifOver" @click="unfold = !unfold">{{unfold ? '收起' : '展开'}}</div>
  </div>
</template>
<script>
export default {
  name: "text-box",
  data() {
    return {
      ifOver: false, // 文本是否超出三行，默认否
      unfold: false // 文本是否是展开状态 默认为收起
    };
  },
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  mounted() {
    // 判断是否显示展开收起按钮
    this.ifOver = this.$refs.spanBox.offsetHeight > this.$refs.textBox.offsetHeight
  }
};
</script>
<style scoped>
.txt {
  font-size: 16px;
  color: #333;
  margin-bottom: 5px;
}
.over-hidden {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.btn {
  color: red;
}
</style>
