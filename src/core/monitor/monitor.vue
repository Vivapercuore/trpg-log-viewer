<template>
  <div class="box">
    <canvas id="canvas"
            ref="canvas" />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
// import videoCreater from '../videoCreater'
import { test } from '../videoCreater'
import { ani } from '@src/testFiles/ani'

import testPic from '@src/assets/canvasTest.jpg'
export default defineComponent({
  name: 'monitor',
  components: {},
  mounted() {
    let canvas: any = this.$refs.canvas
    canvas.width = 800
    canvas.height = 800
    let img = new Image()
    img.src = testPic
    img.onload = function () {
      let canvasCtx = canvas.getContext('2d')
      canvasCtx.drawImage(this, 0, 0)
      ani(canvas)
      setTimeout(() => {
        const t = test()
        console.log({ t })
      }, 1000)
    }
  },
})
</script>


<style scoped>
.box {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}
#canvas {
  border: 1px solid red;
}
</style>