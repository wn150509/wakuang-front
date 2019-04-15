<template>
    <div>
      <v-b-header></v-b-header>
      <div class="row">
        <div class="col-md-8">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
        <div class="col-md-4">
          <div class="jieshao">
            <p class="biaoti">挖矿小册是什么？</p><hr/>
            <p class="content">一个小篇幅、高浓度、成体系、有收益的技术学习平台</p>
          </div>
          <v-author></v-author>
        </div>
      </div>
    </div>
</template>

<script>
  import vBHeader from '../twohead/BHeader.vue'
  import vAuthor from '../IndexRightModel/Author.vue'
  export default {
    name: "Books",
    components:{
      vBHeader,
      vAuthor
    }
  }
</script>

<style scoped>
  .jieshao{
    width: 80%;
    background-color: #F8F8F8;
    margin-top: 20px;
    box-shadow: 0 0 4px rgba(0,0,0,.1);
  }
  .biaoti{
    font-size: 18px;
    padding: 10px;
  }
  .content{
    color: #909399;
    padding: 8px;
    font-size: 15px;
  }
</style>
