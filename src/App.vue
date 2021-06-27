
<template>
  <el-container class="page"
                direction="vertical">
    <el-header class="navHeader">
      <navbar />
    </el-header>
    <el-main>
      <router-view> </router-view>
    </el-main>
    <el-footer>
      footer
    </el-footer>
  </el-container>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import navbar from '@src/components/navbar.vue'

export default defineComponent({
  name: 'Home',
  components: {
    navbar,
  },
})
</script>

<style>
/*全局样式*/
html,
body {
  margin: 0;
  background-color: #fafafa;
}

* {
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

a {
  text-decoration: none;
}
</style>


<style scoped>
.page {
  min-width: 100vw;
  min-height: 100vh;
}

.navHeader {
  box-shadow: #afafaf85 0px 3px 14px 0px;
}
</style>
