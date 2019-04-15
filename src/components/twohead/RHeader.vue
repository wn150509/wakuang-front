<template>
  <div>
    <el-menu class="el-menu-vertical-demo">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">前端</span>
        </template>
        <el-menu-item-group title="JavaScript">
          <router-link to="/repos/frontend/framework"><el-menu-item index="1-1">开发框架</el-menu-item></router-link>
        </el-menu-item-group>
        <el-submenu index="1-2">
          <span slot="title">CSS</span>
          <router-link to="/repos/frontend/cframwork"><el-menu-item index="1-2-1">开发框架</el-menu-item></router-link>
          <router-link to="/repos/frontend/clibrary"><el-menu-item index="1-2-2">实用库</el-menu-item></router-link>
          <router-link to="/repos/frontend/cflash"><el-menu-item index="1-2-3">动画</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="1-3">
          <span slot="title">Vue</span>
          <router-link to="/repos/frontend/vuicomponent"><el-menu-item index="1-3-1">UI组件</el-menu-item></router-link>
          <router-link to="/repos/frontend/vframework"><el-menu-item index="1-3-2">开发框架</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="1-4">
          <span slot="title">Angular</span>
          <router-link to="/repos/frontend/auicomponent"><el-menu-item index="1-4-1">UI组件</el-menu-item></router-link>
          <router-link to="/repos/frontend/alibrary"><el-menu-item index="1-4-2">实用库</el-menu-item></router-link>
          <router-link to="/repos/frontend/aapplications"><el-menu-item index="1-4-3">应用案例</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="1-5">
          <span slot="title">React</span>
          <router-link to="/repos/frontend/ruicomponent"><el-menu-item index="1-5-1">UI组件</el-menu-item></router-link>
          <router-link to="/repos/frontend/rframework"><el-menu-item index="1-5-2">开发框架</el-menu-item></router-link>
          <router-link to="/repos/frontend/rapplications"><el-menu-item index="1-5-3">应用案例</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="1-6">
          <span slot="title">其他</span>
          <router-link to="/repos/frontend/ogrunt"><el-menu-item index="1-6-1">Grunt</el-menu-item></router-link>
          <router-link to="/repos/frontend/ocalendar"><el-menu-item index="1-6-5">日历</el-menu-item></router-link>
          <router-link to="/repos/frontend/ovisualization"><el-menu-item index="1-6-7">数据可视化</el-menu-item></router-link>
        </el-submenu>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Android</span>
        </template>
        <router-link to="/repos/android/alist"><el-menu-item index="2-1">菜单</el-menu-item></router-link>
        <router-link to="/repos/android/alistview"><el-menu-item index="2-2">Listview</el-menu-item></router-link>
        <router-link to="/repos/android/agesture"><el-menu-item index="2-3">手势交互</el-menu-item></router-link>
        <router-link to="/repos/android/anav"><el-menu-item index="2-4">导航</el-menu-item></router-link>
        <router-link to="/repos/android/aarvr"><el-menu-item index="2-5">AR&VR</el-menu-item></router-link>
        <router-link to="/repos/android/aviewanimation"><el-menu-item index="2-6">视图动画</el-menu-item></router-link>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">iOS</span>
        </template>
        <router-link to="/repos/ios/ilist"><el-menu-item index="3-1">菜单</el-menu-item></router-link>
        <router-link to="/repos/ios/igesture"><el-menu-item index="3-2">手势交互</el-menu-item></router-link>
        <router-link to="/repos/ios/inav"><el-menu-item index="3-3">导航</el-menu-item></router-link>
        <router-link to="/repos/ios/iarvr"><el-menu-item index="3-4">AR&VR</el-menu-item></router-link>
        <router-link to="/repos/ios/iviewanimation"><el-menu-item index="3-5">视图动画</el-menu-item></router-link>
      </el-submenu>

      <el-submenu index="4">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">Python</span>
        </template>
        <el-submenu index="4-1">
          <span slot="title">Web开发</span>
          <router-link to="/repos/python/wflask"><el-menu-item index="4-1-1">Flask</el-menu-item></router-link>
          <router-link to="/repos/python/wdjango"><el-menu-item index="4-1-2">Django</el-menu-item></router-link>
          <router-link to="/repos/python/wtornado"><el-menu-item index="4-1-3">Tornado</el-menu-item></router-link>
        </el-submenu>
        <router-link to="/repos/python/scientificcalculation"><el-menu-item index="4-2">科学计算</el-menu-item></router-link>
        <router-link to="/repos/python/machinelearning"><el-menu-item index="4-3">机器学习</el-menu-item></router-link>
      </el-submenu>
    </el-menu>
  </div>

</template>

<script>
  export default {
    data() {
      return {

      };
    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    background-color: #F8F8F8;
  }
  a{
    text-decoration: none;
  }
</style>
