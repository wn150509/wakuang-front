<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link :to="'/user/'+user.userId+'/posts'">专栏</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link :to="'/user/'+user.userId+'/pins'">沸点</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <el-col :span="12">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          赞<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="'/user/'+user.userId+'/likes'">文章</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="'/user/'+user.userId+'/praise'">沸点</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link :to=" '/user/'+user.userId+'/tags'">关注</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: "UHeader",
    data() {
      return {
        activeIndex: '1',
        user:JSON.parse(localStorage.getItem('loginUser'))
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
