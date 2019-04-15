<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4">
        <v-r-header></v-r-header>
      </div>
      <div class="col-md-8">
        <div class="block">
          <el-carousel :interval="4000" type="card" height="200px">
            <el-carousel-item v-for="item in 6" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import vRHeader from '../twohead/RHeader.vue'
  export default {
    name: "Repos",
    components:{
      vRHeader
    }
  }
</script>

<style scoped>
  .row{
    margin-top: 20px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    text-align: center;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .block{
    background-color: #F8F8F8;
  }
</style>
