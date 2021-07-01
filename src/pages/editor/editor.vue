<template>
  <el-row :gutter="10">
    <el-col :md="24">
      <div>
        <template v-for="classname in classes"
                  :key="classname.classname">
          <span :class="classname.classname"> {{ classname.show }}</span>
        </template>
        测试按钮区 {{ countState.count }}
      </div>
      <div>
        <el-button @click="testinc()" type="primary" plain>点击就+2</el-button>
        <el-button @click="FFmpegTest()" type="primary" plain>测试FFmpeg</el-button>
        <el-button @click="getImageData()" type="primary" plain>getImageData</el-button>
        <el-button @click="farmeTest()" type="primary" plain>性能测试</el-button>
        <el-button @click="FFmpegFarmeTest()" type="primary" plain>FFmpeg合成测试</el-button>
      </div>
    </el-col>

    <el-col :md="24"
            :lg="18">
      <div class="monitor">
        <monitor />
      </div>
    </el-col>

    <el-col :sm="24"
            :md="8"
            :lg="6">
      <div class="editor">
        <timeAxis />
        时间轴
      </div>
    </el-col>

    <el-col :sm="24"
            :md="16"
            :lg="24">
      <div class="timeAxis">编辑器</div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import monitor from '@src/pages/editor/monitor/monitor.vue'
import timeAxis from '@src/pages/editor/editor/timeAxis.vue'

import { clickStore } from '@src/store/click-store'

import {test,testEncodePNGs2WebM} from '@src/core/videoCreater'
import {offLineControl} from '@src/core/offLineCanvas'


export default defineComponent({
  name: 'editor',
  components: {
    monitor,
    timeAxis,
  },
  setup() {

    return {
      countState: clickStore.getState(),
    }
  },
  data() {
    return {
      classes: [
        {
          classname: 'hidden-sm-and-up',
          show: 'xs', //768-
        },
        {
          classname: 'hidden-xs-only hidden-md-and-up',
          show: 'sm', //768-992
        },
        {
          classname: 'hidden-sm-and-down hidden-lg-and-up',
          show: 'md', //992-1200
        },
        {
          classname: 'hidden-md-and-down hidden-xl-only',
          show: 'lg', //1200-1920
        },
        {
          classname: 'hidden-lg-and-down',
          show: 'xl', //1920+
        },
      ],
    }
  },
  created() {
    // console.log('editor created')
  },
  methods: {
    testinc() {
      clickStore.incrementCount()
      clickStore.incrementCount()
    },
    async FFmpegTest(){
      console.log("FFmpegTest")
      try {
      let res = await test()
      console.log(res)
      } catch (error) {
      console.error(error)
      }
    },
    getImageData() {
      let frames = offLineControl.start()
      console.log({ frames })
    },
    farmeTest() {
      let frames = offLineControl.start()
      console.time("farmeTest");
      frames.push(...offLineControl.getFrame(1))
      console.timeEnd("farmeTest");
      console.log({frames})
    },
    FFmpegFarmeTest(){
      testEncodePNGs2WebM()
    }
  },
})
</script>

<style scoped></style>
