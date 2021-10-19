<template>
  <van-dropdown-item
    :title="timeTitle"
    ref="timeFilterRef"
    @closed="closedItems"
  >
    <van-cell
      :title="f.text"
      v-for="(f, i) in filters"
      :key="i"
      @click="selTime(f)"
    >
      <template #right-icon v-if="f.value === timeTitle && !date">
        <van-icon name="checked" color="#0094ff" />
      </template>
    </van-cell>
    <!-- 自定义 -->
    <van-cell title="自定义" :value="date" @click="show = true">
      <template #right-icon>
        <div v-if="!date"><span>开始日期</span>至<span>结束日期</span></div>
        <van-icon v-if="date" name="clear" @click.stop="onClearDate" />
      </template>
    </van-cell>
    <van-calendar
      v-model="show"
      type="range"
      :min-date="minDate"
      @confirm="onConfirm"
    />
  </van-dropdown-item>
</template>

<script>
export default {
  name: "timeFilter",
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      minDate: new Date(2010, 0, 1),
      date: "",
      show: false,
      timeTitle: "近1年",
    };
  },
  methods: {
    selTime({ value }) {
      if (this.date) this.date = "";
      this.timeTitle = value;
      this.$refs.timeFilterRef.toggle();
    },
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`;
    },
    onConfirm(date) {
      const [start, end] = date;
      this.show = false;
      this.date = `${this.formatDate(start)} 至 ${this.formatDate(end)}`;
      this.timeTitle = this.date;
    },
    onClearDate() {
      this.date = "";
      this.selTime({ text: "近1年", value: "近1年" });
    },
    closedItems() {
      this.$emit("closed", this.timeTitle);
    },
  },
};
</script>

<style>
</style>