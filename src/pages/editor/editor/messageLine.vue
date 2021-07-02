<template>
  <div class="box">
        <el-button @click="addEmpty()"
                   type="primary"
                   plain>增加空白</el-button>
    messageLine
    <template v-for="messagesItem in messageListStore.messages"
                :key="messagesItem.id">
        <div class="box">
            {{messagesItem.id}} : {{messagesItem.time}}
        </div>
    </template>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { messageListStore } from '@src/store/messageList-store'

export default defineComponent({
  name: 'messageLine',
  components: {},
  setup() {
    return {
      messageListStore: messageListStore.getState(),
    }
  },
  methods:{
      addEmpty(){
          messageListStore.setEmpty(Math.floor( Math.random()*500 ))
      }
  }
})
</script>


<style>
.box {
  width: 100%;
  height: 100%;
}
</style>