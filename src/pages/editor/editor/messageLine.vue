<template>
  <div class="box"
       id="messageLine">
    <el-button @click="addEmpty()"
               type="primary"
               plain>增加空白</el-button>

    {{monitorState.messageLimitHeight}}
    {{messageListState.messages.length}}

    <el-table :data="messageListState.messages"
              ref="messageLine"
              highlight-current-row
              @current-change="handleCurrentChange"
              :height="monitorState.messageLimitHeight"
              style="width: 100%">
      <el-table-column prop="type"
                       label="类型"
                       width="100">
      </el-table-column>
      <el-table-column prop="id"
                       label="ID"
                       width="180">
      </el-table-column>
      <el-table-column prop="time"
                       label="时长">
      </el-table-column>
    </el-table>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { messageListStore } from '@src/store/messageList-store'
import { monitorStore } from '@src/store/monitor-store'
// http://www.sortablejs.com/options.html
import Sortable from 'sortablejs'

export default defineComponent({
  name: 'messageLine',
  components: {},
  setup() {
    const messageListState = messageListStore.getState()
    const monitorState = monitorStore.getState()
    return {
      messageListState,
      monitorState,
    }
  },
  computed: {
    // 计算属性的 getter
    // reversedMessage: function () {
    //   // `this` 指向 vm 实例
    //   return this.$data.monitorState.width
    // }
  },
  mounted() {
    const tbody = document.querySelector(
      '#messageLine .el-table__body-wrapper .el-table__body tbody'
    )
    console.log(tbody)
    const sortable = new Sortable(tbody as HTMLElement, {
      group: 'type', // or { name: "...", pull: [true, false, 'clone', array], put: [true, false, array] }
      sort: true, // boolean 定义是否列表单元是否可以在列表容器内进行拖拽排序
      delay: 0, // number 定义鼠标选中列表单元可以开始拖动的延迟时间；
      touchStartThreshold: 0, // px, how many pixels the point should move before cancelling a delayed drag event
      disabled: false, // boolean 定义是否此sortable对象是否可用，为true时sortable对象不能拖放排序等功能，为false时为可以进行排序，相当于一个开关；
      // store: null, // @see Store
      animation: 150, // ms, number 单位：ms，定义排序动画的时间
      easing: 'cubic-bezier(1, 0, 0, 1)', // Easing for animation. Defaults to null. See https://easings.net/ for examples.
      // handle: '.my-handle', // 格式为简单css选择器的字符串，使列表单元中符合选择器的元素成为拖动的手柄，只有按住拖动手柄才能使列表单元进行拖动
      filter: '.ignore-elements', // 过滤器，不需要进行拖动的元素
      preventOnFilter: true, //  在触发过滤器`filter`的时候调用`event.preventDefault()`
      // draggable: '.item', // 允许拖拽的项目类名
      ghostClass: 'sortable-ghost', // drop placeholder的css类名
      chosenClass: 'sortable-chosen', // 被选中项的css 类名
      dragClass: 'sortable-drag', // 正在被拖拽中的css类名
      dataIdAttr: 'data-id',

      swapThreshold: 1, // Threshold of the swap zone
      invertSwap: false, // Will always use inverted swap zone if set to true
      invertedSwapThreshold: 1, // Threshold of the inverted swap zone (will be set to swapThreshold value by default)
      // direction: 'horizontal', // 拖拽方向 (默认情况下会自动判断方向)

      forceFallback: false, // 忽略 HTML5拖拽行为，强制回调进行

      fallbackClass: 'sortable-fallback', // 当使用forceFallback的时候，被复制的dom的css类名
      fallbackOnBody: false, // 将cloned DOM 元素挂到body元素上。
      fallbackTolerance: 0, // Specify in pixels how far the mouse should move before its considered as a drag.

      scroll: true, // or HTMLElement
      scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
      scrollSpeed: 10, // px
      bubbleScroll: true, // apply autoscroll to all parent elements, allowing for easier movement

      dragoverBubble: false,
      removeCloneOnHide: true, // Remove the clone element when it is not showing, rather than just hiding it
      emptyInsertThreshold: 5, // px, distance mouse must be from empty sortable to insert drag element into it

      // 元素被选中
      onChoose: function (/**Event*/ evt) {
        console.log('onChoose')
      },

      // 拖拽元素改变位置的时候
      onChange: function (/**Event*/ evt) {
        console.log('onChange')
      },
    })
  },
  methods: {
    addEmpty() {
      messageListStore.setEmpty(Math.floor(Math.random() * 500))
    },
    handleCurrentChange(e: any) {
      //点击
      // console.log('handleCurrentChange', e)
    },
  },
})
</script>


<style>
.box {
  width: 100%;
  height: 100%;
}
</style>