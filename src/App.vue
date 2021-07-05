
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
/* Chrome Safari */
/* html::-webkit-scrollbar {
  display: none; 
}
body ::-webkit-scrollbar {
  display: none;
} */
*::-webkit-scrollbar {
  width: 5px;
  height: 5px;
  background-color: rgba(201, 201, 201, 0.1);
}
*::-webkit-scrollbar-button {
  background-color: rgba(201, 201, 201, 0.1);
  width: 2px;
  /* 2 */
}
*::-webkit-scrollbar-track {
  background-color: rgba(201, 201, 201, 0.1);
  width: 2px;
  /* 3 */
}
*::-webkit-scrollbar-track-piece {
  background-color: rgba(201, 201, 201, 0.1);
  width: 52px;
  /* 4 */
}
*::-webkit-scrollbar-thumb {
  background-color: rgba(151, 151, 151, 0.5);
  border-radius: 2px;
  /* 5 */
}
*::-webkit-scrollbar-corner {
  background-color: rgba(201, 201, 201, 0.1);
  /* 6 */
}
*::-webkit-resizer {
  background-color: rgba(201, 201, 201, 0.1);
  /* 7 */
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
  max-width: 100vw;
  min-height: 100vh;
}

.navHeader {
  box-shadow: #afafaf85 0px 3px 14px 0px;
}
</style>
