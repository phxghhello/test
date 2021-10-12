<template>
  <div class="fund-detail">
    <van-nav-bar title="基金详情" left-arrow @click-left="goBack" />
    <div class="fund-body">
      <div class="baseInfo common-card">
        <div class="info">
          <span class="title">{{ fund.title }}</span>
          <span class="code">{{ fund.code }}</span>
        </div>
        <div class="tags">
          <div class="tag-item" v-for="(item, index) in fund.tags" :key="index">
            <span
              v-if="index === 0"
              class="blue-txt"
              :class="{ 'red-txt': item === '中高风险' }"
              >{{ item }}</span
            >
            <span v-else>{{ item }}</span>
          </div>
        </div>
        <div class="number">
          <div class="box1">
            <div class="num1">{{ fund.num1 }}</div>
            <div class="name1">{{ fund.name1 }}</div>
          </div>
          <div class="box2">
            <div class="num2">{{ fund.num2 }}</div>
            <div class="name2">{{ fund.name2 }}</div>
          </div>
          <div class="box3">
            <div class="num3">{{ fund.num3 }}</div>
            <div class="name3">{{ fund.name3 }}</div>
          </div>
        </div>
      </div>
      <div class="manager common-card">
        <!-- 在item上面循环基金经理信息 -->
        <div class="manager-item">
          <div class="top">
            <div class="label">基金经理</div>
            <div class="right-icon"><van-icon name="arrow" /></div>
          </div>
          <div class="mid">
            <div class="img"><van-icon name="user-circle-o" size="40" /></div>
            <div class="userInfo">
              <div class="main">
                <span class="name">刘彦春</span>
                <span class="position">研究部总监</span>
              </div>
              <div class="sub">
                北大硕士，人气基金经理，sajdfk2020年中期报告，健康的风水宝地富力半岛方柏霓电饭煲
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="term">
              <div class="time">2018-02-10~至今</div>
              <div class="desc">本基金任期</div>
            </div>
            <div class="report">
              <div class="total">+191.32%</div>
              <div class="desc">任期回报</div>
            </div>
          </div>
        </div>
      </div>
      <div class="line common-card">折线图</div>
      <div class="history common-card">
        <van-tabs
          v-model="activeName"
          color="#1989fa"
          title-active-color="#1989fa"
          line-width="60px"
          line-height="2px"
        >
          <van-tab title="历史业绩" name="performance"
            ><simple-table :limit="5" />
            <div class="more-data">更多数据<van-icon name="arrow" /></div
          ><div class="tips">注:asfasdfsadsgsgfdbfsjbfkbsdavsdlvsadbasjbs撒大V是大V那是大V发多少sdvsadvasvasfbdgbdfbdgbsadvadsavsad是大V撒大V撒佛挡杀佛差vasdvfdbdgbsdfdashjksvbsdvdf</div></van-tab>
          <van-tab title="历史净值" name="netValue"
            ><simple-table :limit="5" />
            <div class="more-data">更多数据<van-icon name="arrow" /></div
          ><div class="tips">注:asfasdfsadsgsgfdbfsjbfkbsdavsdlvsadbasjbs撒大V是大V那是大V发多少sdvsadvasvasfbdgbdfbdgbsadvadsavsad是大V撒大V撒佛挡杀佛差vasdvfdbdgbsdfdashjksvbsdvdf</div></van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleTable from "./SimpleTable.vue";
export default {
  name: "fundDetail",
  components: {
    SimpleTable,
  },
  data() {
    return {
      fund: {
        title: "景顺长城内需增长混合",
        code: "260104",
        tags: ["中高风险", "混合型", "可选字段"],
        name1: "近一年涨跌幅",
        num1: "+91.79%",
        name2: "日涨跌幅",
        num2: "-2.12%",
        name3: "最新净值10-12",
        num3: "13.9083",
      },
      activeName: "performance",
    };
  },
  mounted() {},
  methods: {
    goBack() {},
  },
};
</script>

<style lang="scss">
.fund-Detail {
  width: 100%;
  background-color: #fafafa;
}
.fund-body {
  padding: 10px 16px;
}
.common-card {
  background-color: #fff;
  box-shadow: 0 0 10px #ccc;
  border-radius: 6px;
  padding: 16px 16px 0px;
}
.baseInfo {
  height: 140px;
}
.baseInfo .info .title {
  font-size: 16px;
}
.baseInfo .info .code,
.name1,
.name2,
.name3 {
  font-size: 12px;
  color: #999;
  margin-left: 6px;
}
.baseInfo .tags {
  font-size: 12px;
  display: flex;
  margin: 10px 0px 20px;
}
.baseInfo .tags .tag-item {
  margin-right: 6px;
}
.blue-txt {
  padding: 4px;
  border-radius: 2px;
  color: #1989fa;
  background-color: #8fbbe7;
}
.blue-txt.red-txt {
  color: rgb(255, 51, 0);
  background-color: rgb(250, 182, 104);
}
.number {
  display: flex;
  justify-content: space-between;
}
.num1 {
  color: rgb(255, 51, 0);
  font-size: 20px;
}
.num2 {
  color: green;
}
.manager {
  height: 200px;
  margin-top: 10px;
}
.manager .top {
  display: flex;
  justify-content: space-between;
}
.manager .mid {
  display: flex;
  margin: 10px 0px 20px;
}
.manager .mid .img {
  margin-right: 10px;
}
.manager .mid .userInfo .main .name {
  font-size: 18px;
  margin-right: 6px;
}
.manager .mid .userInfo .main .position {
  font-size: 14px;
}
.manager .mid .userInfo .sub {
  font-size: 12px;
}
.manager .bottom {
  display: flex;
}
.manager .bottom > div {
  width: 46%;
  margin-left: 10px;
}
.manager .bottom .term .time {
  font-size: 18px;
}
.manager .bottom {
  .report {
    .total {
      font-size: 18px;
      color: red;
    }
  }
  .desc {
    font-size: 14px;
    color: #999;
  }
}
.fund-detail {
  .line {
    height: 200px;
    margin-top: 10px;
  }
  .history {
    height: 420px;
    margin-top: 10px;
    .van-tabs--line {
      height: 100%;
      .van-tabs__wrap {
        width: 50%;
        .van-tabs__nav--line {
          height: 80%;
          .van-tab {
            justify-content: flex-start;
          }
          .van-tabs__line {
            left: -8px;
          }
        }
      }
    }

    .van-tabs__content {
      height: calc(100% - 50px);
      .van-tab__pane {
        height: 100%;
      }
      .more-data {
        font-size: 14px;
        text-align: center;
        margin: 16px 0px 8px;
        color: #1989fa;
      }
      .tips {
          font-size: 12px;
          color: #999;
      }
    }
  }
}
</style>