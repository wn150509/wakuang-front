<template>
  <div class="row waibu">
    <div class="col-md-1"></div>
    <div class="col-md-7">
      <div class="row">
        <div class="col-md-1"><img :src="Article.userStatus.userAvatar" class="avatar"/></div>
        <div class="col-md-7">
          <div style="font-weight: bold">{{Article.userStatus.userName}}</div>
          <div style="font-size: 15px;color: #909399">{{Article.articleStatus.createTime | formatDate}}</div>
        </div>
        <div class="col-md-2" v-if="Article.userStatus.userId!==user.userId">
          <button class="guanzhu2" v-if="Article.userStatus.status===1" @click="deleteuser(Article.userStatus.userId)">已关注</button>
          <button class="guanzhu1" v-else @click="insertuser(Article.userStatus.userId)">关注</button>
        </div>
        <div class="col-md-2" v-else></div>
        <div class="col-md-2">
          <span @click="deletelike(Article.articleStatus.articleId)" v-if="Article.articleStatus.status===1" style="color: #bd2c00">❤</span>
          <span v-else @click="insertlike(Article.articleStatus.articleId)"><i class="far fa-heart" ></i></span>&nbsp;{{Article.articleStatus.likeCount}}
        </div>
      </div>
      <div class="fenmian" v-if="Article.articleStatus.articlePic!=null">
        <img :src="Article.articleStatus.articlePic" class="pic"/>
      </div>
      <div class="title">
        <h2>{{Article.articleStatus.articleTitle}}</h2>
      </div>
      <div class="content">
        <div v-html="html"></div>
      </div>
      <div class="comment">
        <p style="text-align: center;font-size: 20px;color: #C0C4CC">评<span class="btn"></span>论</p>
        <!--<div class="row">-->
          <!--<div class="col-md-2">-->

          <!--</div>-->
          <!--<div class="col-md-10">-->

          <!--</div>-->
        <!--</div>-->
        <div class="commentBox">
          <p v-if="comment.length===0" style="text-align: center;font-size: 15px">☛ 暂无评论，我来发表第一篇评论吧！☚</p>
          <div v-else>
            <!--<div v-for="(item,index) in comment" v-bind:index="index" >-->
              <!--<b>{{item.name}}<span>{{item.time}}</span></b>-->
              <!--<p @click="changeCommenter(item.name,index)">{{item.content}}</p>-->
              <!--<div v-if="item.reply.length > 0">-->
                <!--<div class="reply" v-for="reply in item.reply">-->
                  <!--<b>{{reply.responder}} 回复 {{reply.reviewers}}<span>{{reply.time}}</span></b>-->
                  <!--<p @click="changeCommenter(reply.responder,index)">{{reply.content}}</p>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          </div>
        </div>
        <div class="row">
          <div class="col-md-1">
            <img :src="user.userAvatar" class="avatar">
          </div>
          <div class="col-md-9">
            <input type="text" id='t1' placeholder="请输入评论内容..." v-model="addcomment"/>
            <input type="button" id='button' @click="addComment" value="提交">
          </div>
          <div class="col-md-2"></div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="selfMessage">
        <v-author-message></v-author-message>
        <v-relative-articles></v-relative-articles>
      </div>
    </div>
  </div>
</template>

<script>
  import vAuthorMessage from '../ArticleRightModel/AuthorMessage.vue';
  import vRelativeArticles from '../ArticleRightModel/RelativeArticles.vue';
  import {formatDate} from "../../../static/js/date";
  export default {
    data(){
      return{
        user:JSON.parse(localStorage.getItem("loginUser")),
        id:this.$route.params.id,
        Article:{},
        html:'',
        comment:[{
          commentFather:{},
          commentChild:[]
        }],
        addcomment:''
      }
    },
    components:{
      vAuthorMessage,
      vRelativeArticles
    },
    created:function () {
      var that=this;
      this.$http
        .post("http://localhost:8080/articles/oneArticle/",{"userId":this.user.userId,"articleId":this.id})
        .then(function (res) {
          that.Article=res.data.data;
          that.html=res.data.data.articleStatus.articleContent
        });
      // this.getData()
    },
    methods:{
      insertuser(userId){
        var that=this;
        this.$http
          .post('http://localhost:8080/user/insertuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deleteuser(userId){
        var that=this;
        this.$http
          .post('http://localhost:8080/user/deleteuser',{"userId":this.user.userId,"concerneduserId":userId})
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
      },
      addComment(){
        var that=this;
        if(this.addcomment=== ''){
          this.$message.error("请输入评论内容!!!")
        }else {
          this.$http
            .post("http://localhost:8080/articles/addcomment",{
              "articleId":this.id,"userId":this.user.userId,"commentContent":this.addcomment
            })
            .then(function (res) {
              // that.$router.go(0);
              that.$message.success("评论成功");
              that.addcomment='';
              that.getData()
            });
        }
      },
      // getData(){
      //   var that=this;
      //   this.$http
      //     .get("http://localhost:8080/articles/comment/"+this.id)
      //     .then(function (res) {
      //       that.comment=res.data.data;
      //     })
      // }
    },
    mounted:function () {

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
  #button {
    width: 80px;
    height: 30px;
    border: medium none;
    border-radius: 2px;
    background: #00A3D9 none repeat scroll 0% 0%;
    font-size: 16px;
    color: #FFF;
    cursor: pointer;
  }
  .fenmian{
    margin-top: 2%;
  }
  .title{
    margin-top: 5%;
  }
  .selfMessage{
    margin: 5px 40px;
  }
  .waibu{
    margin-top: 2%;
    margin-bottom: 10%;
  }
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .pic{
    width: 630px;
    height: 300px;
  }
  .content img{
    width: 100px;
    height: 100px;
  }
  .comment{
    margin-top: 15%;
  }
  .guanzhu1{
    width: 80px;
    height: 35px;
    border-radius: 5%;
    color: #67C23A;
    border: 2px solid #67C23A;
    background-color: transparent;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
  }
  .guanzhu2{
    border: none;
    width: 80px;
    height: 35px;
    border-radius: 5%;
    color: white;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #67C23A;
  }
</style>
