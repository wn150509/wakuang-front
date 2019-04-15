<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1" v-if="user!=null">
      <router-link to="/subscribe/subscribed">已关注标签</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/subscribe/all">全部标签</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "SHeader",
    data() {
      return {
        user: JSON.parse(localStorage.getItem('loginUser')),
        activeIndex: '2',
      };
    }
  }
</script>

<style scoped>
  a {
    color: #324157;
    text-decoration: none;
  }
</style>
