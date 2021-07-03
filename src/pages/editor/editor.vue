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
        <el-button @click="testinc()"
                   type="primary"
                   plain>点击就+2</el-button>
        <el-button @click="FFmpegTest()"
                   type="primary"
                   plain>FFmpeg帧生成测试</el-button>
        <el-button @click="audioTest()"
                   type="primary"
                   plain>FFmpeg音频合成测试</el-button>
        <el-button @click="farmeTest()"
                   type="primary"
                   plain>帧性能测试</el-button>
        <el-button @click="downLoad()"
                   type="primary"
                   plain>点击下载</el-button>
      </div>
    </el-col>
  </el-row>

  <el-row :gutter="10"
          style="overflow:hidden">
    <el-col :md="24"
            :xl="18">
      <div class="monitor">
        <monitor />
      </div>
    </el-col>

    <el-col :md="24"
            :xl="6">
      <div class="editor">
        消息列表
        <messageLine />
      </div>
    </el-col>

  </el-row>

  <el-row :gutter="10">
    <el-col :md="24">
      <div class="editor">
        时间轴
        <timeAxis />
      </div>
    </el-col>

    <el-col :sm="24"
            :md="16"
            :lg="24">
      <div class="timeAxis">编辑器</div>
    </el-col>

    <el-col :md="24">
      <div>{{ updatetime }}</div>
      <video class="video"
             :src="videosrc"
             controls />
    </el-col>

  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import monitor from '@src/pages/editor/monitor/monitor.vue'
import timeAxis from '@src/pages/editor/editor/timeAxis.vue'
import messageLine from '@src/pages/editor/editor/messageLine.vue'

import { clickStore } from '@src/store/click-store'

import { download } from '@src/utils/downLoadBlob'

import { videotest,audiotest } from '@src/core/videoCreater'
import { offLineControl } from '@src/core/offLineCanvas'

export default defineComponent({
  name: 'editor',
  components: {
    monitor,
    timeAxis,
    messageLine,
  },
  setup() {
    return {
      countState: clickStore.getState(),
    }
  },
  data() {
    return {
      videoData:new Blob(),
      updatetime: '',
      videosrc: '',
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
    async FFmpegTest() {
      console.time('FFmpegTest')
      try {
        let res = await videotest()
        this.$data.updatetime = new Date().toString()
        this.$data.videosrc = URL.createObjectURL(res)
        this.$data.videoData = res
        console.log(res)
      } catch (error) {
        console.error(error)
      }
      console.timeEnd('FFmpegTest')
    },
    async audioTest() {
      try {
        let res = await audiotest()
        console.log(res)
      } catch (error) {
        console.error(error)
      }
    },
    farmeTest() {
      let frames = offLineControl.start()
      console.time('farmeTest')
      frames.push(...offLineControl.getFrame(1))
      console.timeEnd('farmeTest')
      console.log({ frames })
    },
    downLoad() {
      if (this.$data.videoData) {
        download(this.$data.videoData)
      }
    },
  },
})
</script>

<style scoped>
.video {
  width: 100%;
}
</style>
