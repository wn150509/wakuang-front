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
          <button class="guanzhu2" v-if="labelVo.labelStatus.status==1" @click="deletelabel(labels.labelsId)">已关注</button>
          <button class="guanzhu1" v-else @click="insertlabel(labels.labelsId)">关注</button>
        </div>
        <div class="col-md-1"></div>
      </div>
      <div class="row" v-for="article in labelVo.articlesList" :key="article.articleId">
        <div class="col-md-10">
          <div class="up">
            <img v-bind:src="article.authorAvatar" class="avatar">
            <span class="tsup">·&nbsp;{{article.articleAuthor}}&nbsp;·</span>
            <span class="tsup">{{article.createTime | formatDate}}</span>
          </div>
          <div class="center">
            <p class="tscenter">{{article.articleTitle}}</p>
          </div>
          <div class="down">
            <span class="tsdown"><i class="far fa-heart"></i>&nbsp;{{article.likeCount}}</span>
            <span class="btn"></span>
            <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{article.commentCount}}</span>
          </div><hr/>
        </div>
        <div class="col-md-2" v-if="article.articlePic!=null">
          <img v-bind:src="article.articlePic" class="img"/>
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
          "labelId":this.$route.params.id ,"userId":this.user.userId
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
  .row{
    margin-top: 2%;
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
  .container .row{
    background-color: #F8F8F8;
  }
</style>
