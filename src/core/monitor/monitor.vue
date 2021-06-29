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
    canvas.width = 1920
    canvas.height = 1080
    ani(canvas)
  },
})
</script>


<style scoped>
.box {
  width: 100%;
  height: 100%;
  /* background-color: rgba(0, 0, 0, 0.2); */
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scale(0.3);
}
#canvas {
  border: 1px solid red;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>