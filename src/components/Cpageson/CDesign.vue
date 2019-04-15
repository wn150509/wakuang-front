<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6"
           v-for="collection in collectionList"
           :key="collection.collectionsId">
        <el-card :body-style="{ padding: '0px' }">
          <router-link :to="'/collection/'+collection.collectionsId">
            <img v-bind:src="collection.collectionsUrl" class="image">
          </router-link>
          <div style="padding: 14px;">
            <span>{{collection.collectionsName}}</span>
            <div class="bottom clearfix">
              <time class="time">{{collection.userName}}&nbsp;·&nbsp;{{collection.articleCount}}&nbsp;·&nbsp;{{collection.fansCount}}</time>
              <el-button type="text" class="button">关注</el-button>
            </div>
          </div>
        </el-card>


      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        collectionList:[]
      }
    },
    created(){
      var that=this
      this.$http
        .get('http://localhost:8080/collections/type3')
        .then(function (response) {
          that.collectionList=response.data.data
        })
    },
    methods:{

    }
  }
</script>

<style scoped>
  .col-md-6{
    padding-bottom: 15px;
  }
  a{
    color: #303133;
    text-decoration: none;
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
</style>
