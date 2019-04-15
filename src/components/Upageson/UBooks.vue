<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left" style="height: 100px;margin-top: 20px">
      <el-tab-pane label="购买的" name="first">购买的</el-tab-pane>
      <el-tab-pane label="撰写的" name="second">撰写的</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    name: "UBooks",
    data() {
      return {
        activeName: 'first'
      };
    }
  }
</script>

<style scoped>

</style>
