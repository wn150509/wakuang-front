<template>
  <div>
    <div class="top">
      <h3>{{labelVo.labelStatus.labelsName}}</h3>
      <div>
        <span>{{labelVo.labelStatus.fansCount}}人关注</span>&nbsp;·&nbsp;
        <span>{{labelVo.labelStatus.articleCount}}文章</span>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-1">
          <img v-bind:src="labelVo.labelStatus.labelsUrl" class="labelurl">
        </div>
        <div class="col-md-10">
          <button class="guanzhu2" v-if="labelVo.labelStatus.status===1" @click="deletelabel(labels.labelsId)">已关注</button>
          <button class="guanzhu1" v-else @click="insertlabel(labels.labelsId)">关注</button>
        </div>
        <div class="col-md-1"></div>
      </div>
      <div v-if="labelVo.articleStatusList.length===0" style="text-align: center">
        <h3>＞﹏＜该 标 签 下 没 有 文 章＞﹏＜</h3>
      </div>
      <div class="row" v-else v-for="pop in labelVo.articleStatusList" :key="pop.articleId">
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
              <span v-else @click="insertlike(pop.articleId)"><i class="far fa-heart" ></i>
              </span>&nbsp;{{pop.likeCount}}</span>
            <span class="btn"></span>
            <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pop.commentCount}}</span>
          </div><hr/>
        </div>
        <div class="col-md-2" v-if="pop.articlePic!=null">
          <img v-bind:src="pop.articlePic" class="img"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../../static/js/date";
  export default {
    data(){
      return{
        labelVo:{},
        id:this.$route.params.id,
        user:JSON.parse(localStorage.getItem('loginUser')),
      }
    },
    created(){
      var that=this
      this.$http
        .post('http://localhost:8080/labels/findonelabel',{
          "labelId":this.id ,"userId":this.user.userId
        })
        .then(function (response) {
          that.labelVo=response.data.data
        })
    },
    methods:{
      insertlabel(labelId){
        var that=this
        this.$http
          .post('http://localhost:8080/labels/insertlabel',{"userId":this.user.userId,"labelId":labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelabel(labelId){
        var that=this
        this.$http
          .post('http://localhost:8080/labels/deletelabel',{"userId":this.user.userId,"labelId":labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      insertlike(articleId){
        var that=this;
        this.$http
          .post('http://localhost:8080/articles/insertlike',{"userId":this.user.userId,"articleId":articleId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelike(articleId){
        var that=this;
        this.$http
          .post('http://localhost:8080/articles/deletelike',{"userId":this.user.userId,"articleId":articleId})
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
  .row{
    margin-top: 10px;
  }
  .col-md-2{
    text-align: center;
  }
  .top{
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 3px;
    background-color: #F8F8F8;
  }
  .top h3{
    font-weight: bold;
    line-height:60px;
    color: #606266;
    font-size: 26px;
  }
  .top div{
    color: #909399;
    font-size: 15px;
  }
  .labelurl{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin-left: 50%;
  }
  .guanzhu1{
    width: 80px;
    height: 30px;
    border-radius: 10em;
    color: #67C23A;
    border: 2px solid #67C23A;
    background-color: transparent;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
  }
  .guanzhu2{
    border-radius: 10em;
    border: none;
    width: 80px;
    height: 30px;
    color: white;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #67C23A;
  }
  .img{
    width: 70px;
    height: 70px;
    margin-top: 20%;
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
  .container .row{
    background-color: #F8F8F8;
  }
</style>
