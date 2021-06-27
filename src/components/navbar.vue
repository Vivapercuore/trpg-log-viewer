<template>
  <div class="navbar">
    <router-link to="/"
                 class="homeLink">
      <div class="logo"></div>
      <div class="siteTitle">{{siteTitle}}</div>
      <div class="subTitle hidden-xs-only">{{subTitle}}</div>
    </router-link>
    <div class="routeGroup">

      <template v-for="routeItem in displayRouteGroup"
                :key="routeItem.route">
        <el-tooltip placement="bottom"
                    effect="dark"
                    class="item"
                    :content="routeItem.Tooltip">
          <el-button type="text"
                     class="route">
            {{routeItem.name}}
          </el-button>
        </el-tooltip>
      </template>

      <template v-for="routeItem in routeGroup"
                :key="routeItem.route">
        <router-link :to="routeItem.route">
          <el-button type="text"
                     class="route">
            {{routeItem.name}}
          </el-button>
        </router-link>
      </template>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Head',
  inheritAttrs: false,
  components: {},
  data() {
    return {
      siteTitle: 'v-log',
      subTitle: '跑团记录回放器',
      routeGroup: [
        {
          route: '/editor',
          name: '编辑器',
        },
      ],
      displayRouteGroup: [
        {
          route: '/help',
          name: '帮助文档',
          Tooltip: '等待完善中',
        },
      ],
    }
  },
})
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
}
.homeLink {
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  &:visited {
    color: #252525;
  }
}
.routeGroup {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo {
  width: 45px;
  height: 45px;
  background-image: url('@src/assets/logo.png');
  background-size: contain;
  margin-right: 15px;
}
.siteTitle {
  font-size: 24px;
  margin-right: 10px;
  color: #252525;
}
.subTitle {
  font-size: 16px;
  color: #252525;
}
.route {
  color: #252525;
  margin: 0 15px;
  font-size: 16px;
  border: none;
}
</style>
