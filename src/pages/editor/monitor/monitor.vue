<template>
  <canvas id="canvas" class="box" ref="canvas" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
// import videoCreater from '../videoCreater'
import { drawer } from '@src/core/draw'


import { monitorStore } from '@src/store/monitor-store'

export default defineComponent({
  name: 'monitor',
  components: {},

  setup() {
    return {
      monitorStoreState: monitorStore.getState(),
    }
  },
  mounted() {
    //临时的canvas处理
    let canvas: any = this.$refs.canvas
    canvas.width = this.monitorStoreState.resolutionRatio.width
    canvas.height = this.monitorStoreState.resolutionRatio.height
    drawer.start( canvas , monitorStore.getState() )
    // let clientWidth = document.body.clientWidth - 30
    // let scale = clientWidth / settings.width
    // canvas.style.transform = `scale(${scale})`
    // console.log(scale)
    // ani(canvas)
    //临时的canvas处理
  },
  unmounted(){
    drawer.stop()
  },
})
</script>

<style scoped>
.box {
  width: 100%;
  /* height: 100%; */
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
#canvas {
  border: 1px solid red;
}
</style>
