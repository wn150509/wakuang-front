<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link :to="'/topic/'+id+'/tLike'">热门</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link :to="'/topic/'+id+'/tTime'">关注</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        id:this.$route.params.id,
        activeIndex: '1'
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
