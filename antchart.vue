<template>
  <div class="antchart">
    <div class="chart-wrapper">
      <div id="tooltipWrapper" class="tooltip-wrapper">
        <div v-for="(tip, i) in customLegends" :key="i" class="item">
          <div class="tooltip-name">
            <i class="icon" :style="{ backgroundColor: tip.color }"></i>
            <span class="type">{{ tip.type }}: </span>
          </div>
          <!-- 根据数值添加对应的颜色类名 -->
          <div class="tooltip-value">{{ tip.value }}%</div>
        </div>
      </div>
      <canvas id="container" width="350" height="250"></canvas>
    </div>
  </div>
</template>

<script>
import F2 from "@antv/f2";
// import insertCss from "insert-css";
// import $ from "jquery";
import { data } from "./data.js";
// import { color } from "echarts";

export default {
  data() {
    return {
      customLegends: [],
      tailLegends: [],
      boughtDate: ["2015-12-15", "2016-10-16", "2017-02-17"],
    };
  },
  mounted() {
    this.drawChart();
  },
  methods: {
    drawChart() {
      const chart = new F2.Chart({
        id: "container",
        pixelRatio: window.devicePixelRatio,
      });
      data.forEach((ele) => {
        if (ele.type === "能源" && this.boughtDate.includes(ele.date)) {
          ele.tag = 1;
        } else {
          ele.tag = 0;
        }
      });
      const itemColors = ["#FFC069", "#40A9FF"];
      const tails = data.slice(-2);
      tails.forEach((item, i) => {
        item.color = itemColors[i];
      });
      this.tailLegends = tails;
      this.customLegends = this.tailLegends;
      chart.source(data, {
        value: {
          tickCount: 5,
          formatter: function formatter(val) {
            return val.toFixed(2) + "%";
          },
        },
        date: {
          type: "timeCat",
          range: [0, 1],
          tickCount: 3,
        },
      });

      chart.axis("date", {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = "left";
          } else if (index === total - 1) {
            textCfg.textAlign = "right";
          }
          return textCfg;
        },
      });
      chart.axis("value", {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textBaseline = "bottom";
          } else if (index === total - 1) {
            textCfg.textBaseline = "top";
          }
          return textCfg;
        },
      });
      chart.legend(false);
      chart.tooltip({
        showTooltipMarker: false, // 是否显示 tooltipMarker
        showCrosshairs: true,
        showXTip: true,
        showYTip: true,
        crosshairsType: "xy",
        yTip: function yTip(val) {
          return {
            text: val.toFixed(2) + "%",
            fill: "#333",
            fontSize: 10,
          };
        },

        xTip: {
          fill: "#333",
          fontSize: 10,
        },
        xTipBackground: {
          fill: "#EDF2FE",
        },
        yTipBackground: {
          fill: "#EDF2FE",
        },
        crosshairsStyle: {
          stroke: "#0F8DE8",
        },
        custom: true, // 自定义 tooltip 内容框
        onChange: (obj) => {
          const items = obj.items.slice(0, 2);

          const customLegends = items.map((item) => {
            return {
              ...item.origin,
              color: item.color,
            };
          });
          this.customLegends = customLegends;
          console.log("items", items, this.customLegends);
        },
        onHide: () => {
          this.customLegends = this.tailLegends;
        },
      });
      chart.line().position("date*value").color("type", itemColors);
      // 描点
      chart
        .point()
        .position("date*value")
        .size("tag", function (val) {
          return val ? 4 : 0;
        })
        .style("tag", {
          fill: function fill(val) {
            if (val === 2) {
              return "#518DFE";
            } else if (val === 1) {
              return "#F35833";
            }
          },
          stroke: "#fff",
          lineWidth: 1,
        });
      chart.guide().tag({
        position: ["2016-01-16", 40.5],
        content: "买入",
        offsetY: -5,
        direct: "tl",
        withPoint: false,
      });
      chart.guide().tag({
        position: ["2017-06-17", 60.4],
        content: "卖出",
        offsetY: -5,
        direct: "tl",
        withPoint: false,
        background: {
          padding: [4, 6], // tag 内边距，使用同 css 盒模型的 padding
          radius: 2, // tag 圆角
          fill: "#f00", // tag 背景色
        },
      });
      chart.render();
    },
  },
};
</script>

<style lang="scss">
.tooltip-wrapper {
  height: 30px;
  background-color: #fff;
  line-height: 30px;
  display: flex;
  align-items: center;
  .item {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tooltip-name {
    font-size: 12px;
    .icon {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 4px;
    }
  }
  .tooltip-value {
    font-size: 12px;
  }
}
</style>