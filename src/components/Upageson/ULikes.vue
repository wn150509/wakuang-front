<template>
  <div class="container">
    <div v-if="popular.length===0" style="text-align: center;line-height: 200px">
      (→_→) 您 还 没 有 赞 过 文 章 呢 ？
    </div>
    <div class="row" v-for="pop in popular" :key="pop.articleId">
      <div class="col-md-10">
        <div class="up">
          <img v-bind:src="pop.authorAvatar" class="avatar">
          <span class="tsup">·&nbsp;{{pop.articleAuthor}}&nbsp;·</span>
          <span class="tsup">{{pop.createTime | formatDate}}</span>
        </div>
        <div class="center">
          <a :href=" '/p/'+pop.articleId">
            <p class="tscenter">{{pop.articleTitle}}</p>
          </a>
        </div>
        <div class="down">
          <span class="tsdown">
            <span @click="deletelike(pop.articleId)" v-if="pop.status===1" style="color: #bd2c00">❤</span>
            {{pop.likeCount}}</span>
          <span class="btn"></span>
          <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pop.commentCount}}</span>
        </div><hr/>
      </div>
      <div class="col-md-2" v-if="pop.articlePic!=null">
        <img v-bind:src="pop.articlePic" class="img"/>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../../static/js/date";
  export default {
    name: "TSubscribe",
    data() {
      return {
        user:JSON.parse(localStorage.getItem("loginUser")),
        activeName: 'first',
        popular: []
      }
    },
    created() {
      var that = this;
      this.$http
        .post(this.$baseUrl+"articles/selflikearticles",{"userId":that.user.userId})
        .then(function (response) {
          that.popular = response.data.data;
          console.log(that.user.userId)
        })
    },
    methods:{
      deletelike(articleId){
        var that=this;
        this.$http
          .post(this.$baseUrl+'articles/deletelike',{"userId":this.user.userId,"articleId":articleId})
          .then(function (response) {
            that.$router.go(0)
          })
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style scoped>
  a {
    color: #324157;
    text-decoration: none;
  }
  .img{
    width: 70px;
    height: 70px;
  }
  .tsup{
    font-size: 12px;
    color: #909399;
  }
  .tscenter{
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-top: 2%;
  }
  .tsdown{
    font-size: 15px;
    color: #909399;
  }
  .row{
    margin-top: 10px;
  }
  .col-md-2{
    text-align: center;
  }
  .avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
</style>
