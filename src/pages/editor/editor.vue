  <template>
  <template v-for="classname in classes"
            :key="classname.classname">
    <div :class="classname.classname"> {{classname.show}}</div>
  </template>

  <el-row :gutter="10">
    <el-col :md="24"
            :lg="18">
      <div class="monitor">
        <monitor />
        显示区
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
      <div class="timeAxis"> 编辑器
      </div>
    </el-col>
  </el-row>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import monitor from '@src/core/monitor/monitor.vue'
import timeAxis from '@src/core/editor/timeAxis.vue'

export default defineComponent({
  name: 'editor',
  components: {
    monitor,
    timeAxis,
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
    console.log('editor created')
  },
})
</script>

<style scoped>
</style>
