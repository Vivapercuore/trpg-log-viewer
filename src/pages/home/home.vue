<template>

  <el-carousel class="swiper"
               :interval="5000"
               height="500px"
               arrow="never">
    <el-carousel-item>
      <div class="cube cube1">
        <div class="content">快乐跑团</div>
        <div class="content">然后把跑团记录存下来</div>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="cube cube2">
        <div class="content">自动处理&手动微调</div>
        <div class="content">不错过每一次精彩发言</div>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="cube cube3">
        <div class="content">调整音色&选择立绘和背景</div>
        <div class="content">生成跑团视频</div>
      </div>
    </el-carousel-item>
  </el-carousel>

  <!-- <div>videos</div> -->

  <!-- <div>projects</div> -->

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import navbar from '@src/components/navbar.vue'

export default defineComponent({
  name: 'Home',
  components: {
    navbar,
  },
  created() {
    console.log('home created')
  },
})
</script>

<style scoped>
.swiper {
  width: 100%;
}
.cube {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  color: #fff;
}
.content {
  font-size: 26px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.7);
  margin: 10px;
}
.cube1 {
  background-image: url('@src/assets/cube.jpg');
}
.cube2 {
  background-image: url('@src/assets/cube2.jpg');
}
.cube3 {
  background-image: url('@src/assets/cube3.jpg');
}
</style>
