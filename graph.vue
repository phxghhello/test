<template>
  <div class="graph">
    <div id="mountNode"></div>
  </div>
</template>

<script>
import G6 from "@antv/g6";
import insertCss from "insert-css";

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css

// https://github.com/antvis/G6/blob/a8a654e22f5ba45aa3c74812cf57980f3e464d6e/src/plugins/toolBar/index.ts#L234
insertCss(`
  .g6-component-toolbar li {
    list-style-type: none !important;
  }
`);

const data = {
  // 点集
  nodes: [
    {
      id: "node1", // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
    {
      id: "node2", // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200, // Number，可选，节点位置的 y 值
    },
  ],
  // 边集
  edges: [
    {
      source: "node1", // String，必须，起始点 id
      target: "node2", // String，必须，目标点 id
    },
  ],
};
export default {
  mounted() {
    this.initGraph();
  },
  methods: {
    initGraph() {
    //   const toolbar = this.initToolbar();

      const toolbar = new G6.ToolBar({
        position: { x: 10, y: 10 },
      });
      const graph = new G6.Graph({
        container: "mountNode", // String | HTMLElement，必须，在 Step 1 中创建的容器 id 或容器本身
        width: 800, // Number，必须，图的宽度
        height: 500, // Number，必须，图的高度
        plugins: [toolbar],
      });
      graph.data(data); // 读取 Step 2 中的数据源到图上
      graph.render(); // 渲染图
    },
    initToolbar() {
      const tc = document.createElement("div");
      tc.id = "toolbarContainer";
      document.body.appendChild(tc);

      const toolbar = new G6.ToolBar({
        container: tc,
        getContent: () => {
          return `
      <ul>
        <li code='add'>增加节点</li>
        <li code='undo'>撤销</li>
        <li code='redo'>回退</li>
        <li code='switch'>切换</li>
        <li code='fitView'>适应</li>
      </ul>
    `;
        },
        handleClick: (code, graph) => {
          if (code === "add") {
            graph.addItem("node", {
              id: "node3",
              label: "node3",
              x: 300,
              y: 150,
            });
          } else if (code === "undo") {
            toolbar.undo();
          } else if (code === "redo") {
            toolbar.redo();
          } else if (code === "switch") {
            let controler = graph.get("layoutController");
            const { rankdir } = controler.layoutMethod;
            if (rankdir === "H") {
              controler.updateLayoutCfg({ rankdir: "LR" });
            } else {
              controler.updateLayoutCfg({ rankdir: "H" });
            }
            graph.fitView();
          } else if (code == "fitview") {
            graph.fitView();
          }
        },
      });

      return toolbar;
    },
  },
};
</script>

<style>
</style>