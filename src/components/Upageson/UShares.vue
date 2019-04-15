<template>
    <div>
      <el-tabs v-model="activeName" tab-position="left" style="height: 100px;margin-top: 20px">
        <el-tab-pane label="热门" name="first">热门</el-tab-pane>
        <el-tab-pane label="最新" name="second">最新</el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        activeName: 'first'
      };
    }
  }
</script>

<style scoped>

</style>
