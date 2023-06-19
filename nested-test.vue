<template>
  <draggable
    v-bind="dragOptions"
    tag="div"
    class="item-container"
    :list="list"
    :move="onMove"
  >
    <div class="item-group" :key="el.id" v-for="el in list">
      <div class="item">{{ el.label }}</div>

      <nested-test v-if="el.children" class="item-sub" :list="el.children" />
    </div>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "nested-test",
  props: {
    list: {
      required: false,
      type: Array,
      default: null,
    },
  },
  components: {
    draggable,
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost",
      };
    },
  },
  data() {
    return {};
  },
  methods: {
    //move回调方法
    onMove(evt, originalEvent) {
      console.log(originalEvent);
      /**
       * draggedContext: 被拖拽的元素
      index: 被拖拽的元素的序号
      element: 被拖拽的元素对应的对象
      futureIndex: 预期位置、目标位置

      relatedContext: 将停靠的对象
      index: 目标停靠对象的序号
      element: 目标的元素对应的对象
      list:  目标数组
      component: 将停靠的vue组件对象
       */
      //不允许停靠
      // console.log(evt.draggedContext.index);

      // console.log(evt.draggedContext.futureIndex);
      // console.log(evt.relatedContext.index);

      // console.log(evt.relatedContext.list);
      // console.log(evt.relatedContext.component);
      // console.log(evt);

      if (evt.draggedContext.element && evt.relatedContext.element) {
        if (
          evt.draggedContext.element.aboveId === undefined &&
          evt.relatedContext.element.aboveId === undefined
        ) {
          return true;
        } else {
          console.log(evt.draggedContext.element);
          console.log(evt.relatedContext.element);
          console.log(
            evt.draggedContext.element.aboveId ===
              evt.relatedContext.element.aboveId
          );
          return (
            evt.draggedContext.element.aboveId ===
            evt.relatedContext.element.aboveId
          );
        }
      }
      // if (e.relatedContext.element.id == 1) return false;
      // //不允许拖拽
      // if (e.draggedContext.element.id == 4) return false;
      return true;
    },
  },
};
</script>

<style lang="scss">
.item-container {
  max-width: 25rem;
  margin: 0;
}
.item {
  padding: 1rem;
  border: solid #ccc 1px;
  background-color: #fefefe;
  cursor: move;
}
.item-sub {
  margin: 0 0 0 1rem;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
</style>
