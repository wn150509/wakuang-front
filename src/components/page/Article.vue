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
      </div><hr/>
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
        <div class="commentBox">
          <textarea class="form-control"
                    rows="4" placeholder="说点什么吧..."
                    maxlength="200" v-model="input_comment">
          </textarea>
          <div class="fabiao">
            <span><span class="pull-right">还能输入</span><b style="color:red">{{surplus}}</b>/{{total}}</span>
            <input type="button" class="btn btn-primary" :disabled="display" value="发表" @click="btnsend">
          </div>
          <div class="commentContent">
            <div v-for="item in comments" :key="item.commentId">
              <table class="tb_comment table table-condensed">
                <tbody>
                <tr>
                  <td class="tb_user" v-if="item.userStatus.userId===user.userId">
                    <a :href="'/user/'+user.userId+'/posts'">
                      <img class="img-circle" v-bind:src="item.userStatus.userAvatar">
                    </a>
                  </td>
                  <td class="tb_user" v-else>
                    <a :href=" '/ou/'+item.userStatus.userId">
                      <img class="img-circle" v-bind:src="item.userStatus.userAvatar">
                    </a>
                  </td>
                  <td>
                    <p>{{item.userStatus.userName}} &nbsp;&nbsp;<i class="far fa-clock"></i>&nbsp;{{item.commentTime | formatDate}}
                      <span class="btn"></span><span class="btn"></span><span class="btn"></span><span class="btn"></span><span class="btn"></span>
                      <span class="pull-right">
                        <a href="#" v-if="item.status===0" @click.prevent="btnsupport(item.commentId)">👍🏻&nbsp;({{item.likeCount}})</a>
                        <a href="#" v-else @click.prevent="btndislike(item.commentId)">👍&nbsp;({{item.likeCount}})</a>
                      </span>
                    </p>
                    <div class='div_comment_content'>
                      {{item.commentContent}}
                    </div>
                    <div style="float: right" v-if="item.userStatus.userId===user.userId">
                      <el-button type="danger" icon="el-icon-delete" circle @click="btndelete(item.commentId)"></el-button></div>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
            <table class="tb_comment table table-condensed" v-if="comments.length===0">
              <tbody>
              <tr>
                <td class="text-muted" style="width:100%">
                  <p style="text-align: center;font-size: 20px">☛ 暂无评论，抢个沙发吧☚</p>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
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

        disabled:true,
        comments:[],
        input_comment: '',// 输入的评论
        total: 200,// 评论可输入总字数
      }
    },
    components:{
      vAuthorMessage,
      vRelativeArticles
    },
    created:function () {
      var that=this;
      this.$http
        .post("http://localhost:8080/articles/oneArticle",{"userId":this.user.userId,"articleId":this.id})
        .then(function (res) {
          that.Article=res.data.data;
          that.html=res.data.data.articleStatus.articleContent
        });
      this.$http
        .post("http://localhost:8080/articles/comments",{"articleId":this.id,"userId":this.user.userId})
        .then(function (res) {
          that.comments=res.data.data;
        })
    },
    methods:{
      insertuser(userId){
        var that=this;
        this.$http
          .post('http://localhost:8080/user/insertuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.getArticle();
          })
      },
      deleteuser(userId){
        var that=this;
        this.$http
          .post('http://localhost:8080/user/deleteuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.getArticle();
          })
      },
      insertlike(articleId){
        var that=this;
        this.$http
          .post('http://localhost:8080/articles/insertlike',{"userId":this.user.userId,"articleId":articleId})
          .then(function (response) {
            that.getArticle();
          })
      },
      deletelike(articleId){
        var that=this;
        this.$http
          .post('http://localhost:8080/articles/deletelike',{"userId":this.user.userId,"articleId":articleId})
          .then(function (response) {
            that.getArticle();
          })
      },
      // 发表评论方法
      btnsend: function () {
        var that=this;
        this.$http
          .post("http://localhost:8080/articles/addcomment",{
            "articleId":this.id,"userId":this.user.userId,"commentContent":this.input_comment
          })
          .then(function (res) {
            that.$message.success("评论成功");
            that.input_comment='';
            that.getData()
          });
      },
      btndelete: function (id) {
        var that=this;
        this.$http
          .post("http://localhost:8080/articles/delcomment",{
            "commentId":id
          })
          .then(function (res) {
            that.$message.success("删除成功");
            that.getData()
          });
      },
      // 评论点赞
      btnsupport: function (id) {
        var that=this;
        this.$http
          .post('http://localhost:8080/articles/insertLikeComment',{"commentId":id,"userId":this.user.userId})
          .then(function (res) {
            that.getData();
          })
      },
      //取消点赞
      btndislike: function (id) {
        var that=this;
        this.$http
          .post('http://localhost:8080/articles/deleteLikeComment',{"commentId":id,"userId":this.user.userId})
          .then(function (res) {
            that.getData();
          })
      }
    },
    // 计算属性
    computed: { // 计算剩余可输入字数
      surplus: function () {
        return this.total - this.input_comment.length;
      },
      display:function () {
        if(this.input_comment===''){
          return this.disabled=true;
        } else {
          return this.disabled=false;
        }
      },
      getData(){
        var that=this;
        this.$http
          .post("http://localhost:8080/articles/comments",{"articleId":this.id,"userId":this.user.userId})
          .then(function (res) {
            that.comments=res.data.data;
          })
      },
      getArticle(){
        var that=this;
        this.$http
          .post("http://localhost:8080/articles/oneArticle",{"userId":this.user.userId,"articleId":this.id})
          .then(function (res) {
            that.Article=res.data.data;
            that.html=res.data.data.articleStatus.articleContent
          });
      }
    },
    // 自定义过滤器
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style scoped>
  .commentContent{
    margin-top: 10%;
  }
  .pull-right{
    color: #969896;
    font-size: 15px;
  }
  .fabiao{
    float: right;
  }
  .tb_comment{
    width: 100%;
    /* border: 1px solid; */
  }
  .tb_comment img{
    width:64px;
    height:64px;
    border-radius: 50%;
  }
  .tb_user{
    width: 80px;
  }
  /* 用户评论内容展示 */
  .div_comment_content{
    padding: 6px 12px;
    border: 1px solid #d2d6de;
    background-color: #f0f8ff;
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
