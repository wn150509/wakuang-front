<template>
  <div class="topics" v-if="arr.length!==0">
    <div class="title" >
      <span>关注的话题</span>
      <router-link to="/topics"><span class="all">全部<li class="el-icon-arrow-right"></li></span></router-link>
    </div><hr/>
    <div class="body">
      <div class="row" v-for="topic in arr" :key="topic.topicId">
        <div class="col-md-2">
          <a :href=" '/topic/'+ topic.topicId ">
            <img v-bind:src="topic.topicUrl">
          </a>
        </div>
        <div class="col-md-8">
          <span class="title">{{topic.topicName}}</span><br/>
          <span class="follow">{{topic.fansCount}}关注·</span>
          <span class="follow">{{topic.pinsCount}}沸点</span>
        </div>
        <div class="col-md-2"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Topic",
    data(){
      return{
        user:JSON.parse(localStorage.getItem("loginUser")),
        arr:[]
      }
    },
    created:function () {
      var that=this;
      this.$http
        .post(this.$baseUrl+"topics/concerned",{"userId":this.user.userId})
        .then(function(res) {
          that.arr=res.data.data
        })
    }
  }
</script>

<style scoped>
  .all{
    margin-left: 55%;
    font-size: 13px;
  }
  a{
    text-decoration: none;
  }
  .topics{
    background-color: #F8F8F8;
    width: 280px;
  }
  .body img{
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: inline-block;
  }
  .title{
    font-size: 16px;
    color: black;
  }
  .follow{
    font-size: 12px;
    color: #909399;
    margin-top: -15%;
  }
  .col-md-8{
    margin-left: 5%;
  }
  .row{
    margin-top: 3%;
  }
</style>
