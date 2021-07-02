<template>
  <div class="box">
    <el-button @click="addEmpty()"
               type="primary"
               plain>增加空白</el-button>

    {{monitorState.messageLimitHeight}}

    <el-table :data="messageListState.messages"
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
  methods: {
    addEmpty() {
      messageListStore.setEmpty(Math.floor(Math.random() * 500))
    },
    handleCurrentChange(e: any) {
      console.log('handleCurrentChange', e)
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