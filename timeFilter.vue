<template>
  <van-dropdown-item
    :title="timeTitle"
    ref="timeFilterRef"
    @closed="closedItems"
    class="time-filter"
  >
    <van-cell
      :title="f.text"
      v-for="(f, i) in filters"
      :key="i"
      @click="selTime(f)"
    >
      <template #right-icon v-if="f.value === timeTitle && !selDateRange">
        <van-icon name="checked" color="#0094ff" />
      </template>
    </van-cell>
    <!-- 自定义 -->
    <van-cell title="自定义" center class="custom-cell">
      <template #right-icon>
        <div class="right-time-wrapper">
          <van-field
            readonly
            clickable
            name="datetimePicker"
            :value="startValue"
            placeholder="开始日期"
            @click="showPicker = true"
          /><span class="split">至</span
          ><van-field
            readonly
            clickable
            name="datetimePicker"
            :value="endValue"
            placeholder="结束日期"
            @click="showEndPicker = true"
          />
          <van-icon
            v-if="selDateRange"
            name="clear"
            color="#999"
            @click.stop="onClearDate"
          />
        </div>
      </template>
    </van-cell>
    <!-- 开始日期弹框 -->
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        type="date"
        title="开始日期"
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
    <!-- 结束日期弹框 -->
    <van-popup v-model="showEndPicker" position="bottom">
      <van-datetime-picker
        type="date"
        v-model="endDate"
        title="结束日期"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onEndConfirm"
        @cancel="showEndPicker = false"
      />
    </van-popup>
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
      endValue: "",
      showEndPicker: false,
      startValue: "",
      showPicker: false,
      currentDate: new Date(),
      endDate: new Date(),
      minDate: new Date(2010, 0, 1),
      maxDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      date: "",
      show: false,
      timeTitle: "近1年",
    };
  },
  computed: {
    selDateRange() {
      const range = this.startValue + "至" + this.endValue;
      return range === "至" ? "" : range;
    },
  },
  methods: {
    selTime({ value }) {
      if (this.startValue) this.startValue = "";
      if (this.endValue) this.endValue = "";
      this.timeTitle = value;
      this.$refs.timeFilterRef.toggle();
    },
    formatDate(dateStr) {
      const d = new Date(dateStr);
      const year =
        d.getFullYear() !== new Date().getFullYear()
          ? d.getFullYear() + "-"
          : "";
      const datetime = year + (d.getMonth() + 1) + "-" + d.getDate();
      return datetime;
    },
    onConfirm(date) {
      this.startValue = this.formatDate(date);
      this.timeTitle = this.selDateRange;
      this.showPicker = false;
    },
    onEndConfirm(date) {
      this.endValue = this.formatDate(date);
      this.timeTitle = this.selDateRange;
      this.showEndPicker = false;
    },
    onClearDate() {
      this.date = "";
      this.selTime({ text: "近1年", value: "近1年" });
    },
    closedItems() {
      if (this.selDateRange) {
        this.$emit("closed", this.selDateRange);
      } else {
        this.$emit("closed", this.timeTitle);
      }
    },
  },
};
</script>

<style lang="scss">
.custom-cell {
  .van-cell__title {
    flex: unset;
    width: 65px;
  }
}
.right-time-wrapper {
  display: flex;
  align-items: center;
  flex: 1;
  .van-field {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 6px 0px;
  }
  .split {
    margin: 0 4px;
  }
  .van-icon-clear {
    position: absolute;
    right: 6px;
  }
}
</style>