<template>
  <div class="drag-tree" @dragover="overFn">
    <el-tree
      :data="data"
      node-key="id"
      default-expand-all
      draggable
      :expand-on-click-node="false"
      @node-drop="handleDrop"
      :allow-drop="allowDrop"
    >
    </el-tree>
  </div>
</template>

<script>
export default {
  name: "drag-tree",
  data() {
    return {
      data: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              aboveId: 1,
              children: [
                {
                  id: 9,
                  label: "三级 监控点1-1-1",
                  aboveId: 4
                },
                {
                  id: 10,
                  label: "三级 监控点1-1-2",
                  aboveId: 4
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 监控点2-1",
              aboveId: 2
            },
            {
              id: 6,
              label: "二级 监控点2-2",
              aboveId: 2
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
              aboveId: 3
            },
            {
              id: 8,
              label: "二级 3-2",
              aboveId: 3,
              children: [
                {
                  id: 11,
                  label: "三级 监控点3-2-1",
                  aboveId: 8,
                },
                {
                  id: 12,
                  label: "三级 3-2-2",
                  aboveId: 8
                },
                {
                  id: 13,
                  label: "三级 监控点3-2-3",
                  aboveId: 8
                },
              ],
            },
          ],
        },
        {
          id: 14,
          label: "一级 监控点14",
        }
      ],
    };
  },
//   mounted() {
//     this.dragEnter()
//   },
  methods: {
    // handleDragStart(node, ev) {
    //   console.log("drag start", node);
    // },
    // handleDragEnter(draggingNode, dropNode, ev) {
    //   console.log("tree drag enter: ", dropNode.label);
    // },
    // handleDragLeave(draggingNode, dropNode, ev) {
    //   console.log("tree drag leave: ", dropNode.label);
    // },
    // handleDragOver(draggingNode, dropNode, ev) {
    //   console.log("tree drag over: ", dropNode.label);
    // },
    // handleDragEnd(draggingNode, dropNode, dropType, ev) {
    //   console.log("tree drag end: ", dropNode && dropNode.label, dropType);
    // },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      // console.log("tree drop: ", dropNode.label, dropType);
        /* console.log('排序')
      console.log(dropNode)   //dropNode.parent.childNodes =[] 拖拽之后的重新组合的数组 */
      let obj = {
        aboveId:'',
        arr:[]
      }
      obj.aboveId = dropNode.data.aboveId
      for (let item of dropNode.parent.childNodes) {
        obj.arr.push(item.data.id)
      }
      // console.log('===>', obj);
      // console.log(this.data);
    },
    allowDrop(draggingNode, dropNode, type) {
      // console.log(draggingNode, dropNode, type);
      if (draggingNode.data.level === dropNode.data.level) {
        //aboveId是父节点id
        if (draggingNode.data.aboveId === dropNode.data.aboveId) {
          return type === 'prev' || type === 'next'
        }
      } else {
        // 不同级进行处理
        return false
      }
    },
    dragEnter() {
        var outer = document.getElementsByClassName("drag-tree");
      outer = Array.from(outer);
      outer.forEach(function (item) {
        item.ondragover = dragover;
      });
      function dragover(event) {
        // 阻止默认行为，变成可放置的
        event.preventDefault();
      }
    },
    overFn(evt) {
      console.log(evt);
    }
    // allowDrag(draggingNode) {
    //   return draggingNode.data.label.indexOf("三级 3-2-2") === -1;
    // },
  },
};
</script>

<style lang="scss">
.drag-tree {
    .el-tree {
        .el-tree-node__content {
            cursor: move;
            .el-tree-node__label {
                cursor: move !important;
            }
        }
        &.is-dragging {
            .el-tree-node__content {
                cursor: move;
            }
        }
        &.is-drop-not-allow {
            .el-tree-node__content {
                cursor: move;
            }
        }
    }
}
</style>
