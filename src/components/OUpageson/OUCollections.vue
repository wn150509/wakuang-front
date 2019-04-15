<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left" style="height: 100px;margin-top: 20px">
      <el-tab-pane label="创建的" name="first">创建的</el-tab-pane>
      <el-tab-pane label="关注的" name="second">关注的</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "UCollections",
      data() {
        return {
          activeName: 'first'
        };
      }
    }
</script>

<style scoped>

</style>
