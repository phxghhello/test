<template>
  <div class="trade-detail">
    <van-field
      readonly
      :value="detail[item]"
      rows="1"
      autosize
      :label="item"
      type="textarea"
      v-for="(item,index) in Object.keys(detail)"
      :key="index"
    />
  </div>
</template>

<script>
export default {
  name: "tradeDetail",
  data() {
    return {
      detail: {
        基金名称: "景顺内需成长混合",
        交易类型: "申购",
        申购金额: "10,000.00元",
        销售机构: "天天基金",
        交易状态: "确认成功",
        申请时间: "2021-03-12 14:10:23",
        确认金额: "9,990.00元",
        确认份额: "9,990.00份",
        确认净值: "1,0000元",
        手续费: "10.00元",
        确认时间: "2021-03-12",
      },
    };
  },
};
</script>

<style>
</style>