<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
    <el-menu-item index="1">
      <router-link :to="'/ou/'+id+'/posts'">专栏</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link :to="'/ou/'+id+'/pins'">沸点</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <el-col :span="12">
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          赞<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link :to="'/ou/'+id+'/likes'">文章</router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link :to="'/ou/'+id+'/praise'">沸点</router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link :to=" '/ou/'+id+'/tags'">关注</router-link>
    </el-menu-item>
  </el-menu>
</template>

<script>
    export default {
        name: "OUHeader",
      data() {
        return {
          activeIndex: '1',
          id:this.$route.params.id
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
