<template>
  <div class="my-trade">
    我的交易
    <div class="data">
      <div class="header">
        <van-cell>
          <van-row>
            <van-col span="8" v-for="(item, index) in headerData" :key="index">
              <template v-if="item.filter"
                ><van-dropdown-menu>
                  <timeFilter
                    v-if="item.key === 'time'"
                    :filters="item.filter"
                    @closed="getSelectTime"
                  />
                  <van-dropdown-item
                    v-else
                    v-model="item.col"
                    :title="getItemTitle(item)"
                    :options="item.filter"
                  /> </van-dropdown-menu
              ></template>
              <template v-else>{{ item.col }}</template>
            </van-col>
          </van-row>
        </van-cell>
      </div>
      <div class="content">
        <van-list>
          <template v-if="list.length">
            <van-cell center v-for="(item, i) in list" :key="i">
              <template #title>
                <div class="type">{{ item.type }}</div>
                <div class="fundNamde">{{ item.fundName }}</div>
                <div class="date">{{ item.date }}</div>
              </template>
              <template #default>
                <div class="price">{{ item.price }}</div>
                <div class="status">{{ item.status }}</div>
              </template>
            </van-cell>
          </template>
          <div v-else>暂无交易记录</div>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import timeFilter from "./timeFilter.vue";
export default {
  name: "mytrade",
  components: {
    timeFilter,
  },
  data() {
    return {
      headerData: [
        {
          col: "全部",
          key: "type",
          filter: [
            { text: "全部", value: "全部" },
            { text: "充值", value: "充值" },
            { text: "普通取现", value: "普通取现" },
            { text: "快速取现", value: "快速取现" },
            { text: "认购", value: "认购" },
            { text: "申购", value: "申购" },
            { text: "赎回", value: "赎回" },
            { text: "转换", value: "转换" },
            { text: "定投扣款", value: "定投扣款" },
            { text: "新增定投计划", value: "新增定投计划" },
            { text: "终止定投计划", value: "终止定投计划" },
            { text: "分红", value: "分红" },
            { text: "修改分红方式", value: "修改分红方式" },
            { text: "撤单", value: "撤单" },
          ],
        },
        {
          col: "交易状态",
          key: "status",
          filter: [
            { text: "全部", value: "全部" },
            { text: "在途", value: "在途" },
            { text: "确认中", value: "确认中" },
            { text: "确认成功", value: "确认成功" },
            { text: "确认失败", value: "确认失败" },
            { text: "已撤单", value: "已撤单" },
          ],
        },
        {
          col: "近1年",
          key: "time",
          filter: [
            { text: "近1周", value: "近1周" },
            { text: "近1个月", value: "近1个月" },
            { text: "近3个月", value: "近3个月" },
            { text: "近6个月", value: "近6个月" },
            { text: "近1年", value: "近1年" },
          ],
        },
      ],
      list: [{
          type: '认购',
          fundName: '景顺内需成长混合',
          date: '2021-03-15 14:00:07',
          price: '2,000.00元',
          status: '确认成功'
      },{
          type: '申购',
          fundName: '景顺内需成长混合',
          date: '2021-03-15 14:00:07',
          price: '2,000.00元',
          status: '确认成功'
      },{
          type: '赎回',
          fundName: '景顺内需成长混合',
          date: '2021-03-15 14:00:07',
          price: '2,000.00元',
          status: '确认成功'
      },{
          type: '转换',
          fundName: '景顺内需成长混合',
          date: '2021-03-15 14:00:07',
          price: '2,000.00元',
          status: '确认成功'
      },{
          type: '修改分红方式',
          fundName: '景顺内需成长混合',
          date: '2021-03-15 14:00:07',
          price: '红利再投资',
          status: '确认成功'
      },]
    };
  },
  methods: {
    getSelectTime(time) {
      console.log("关闭了弹出,根据时间/选中时间段展示数据", time);
    },
    getItemTitle({ col, key }) {
      if (key === "type") return col === "全部" ? "交易类型" : col;
      if (key === "status") return col === "全部" ? "交易状态" : col;
    },
  },
};
</script>

<style  lang="scss">
.my-trade {
}
</style>