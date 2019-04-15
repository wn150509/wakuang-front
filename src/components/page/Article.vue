<template>
  <div class="row waibu">
    <div class="col-md-1"></div>
    <div class="col-md-7">
      <div class="row">
        <div class="col-md-1"><img :src="Article.sysUser.userAvatar" class="avatar"/></div>
        <div class="col-md-8">
          <div style="font-weight: bold">{{Article.sysUser.userName}}</div>
          <div style="font-size: 15px;color: #909399">{{Article.articles.createTime | formatDate}}</div>
        </div>
        <div class="col-md-3"></div>
      </div>
      <div class="fenmian" v-if="Article.articles.articlePic!=null">
        <img :src="Article.articles.articlePic" class="pic"/>
      </div>
      <div class="title">
        <h2>{{Article.articles.articleTitle}}</h2>
      </div>
      <div class="content">
        <div v-html="html">

        </div>
      </div>
      <div class="comment">
        <p style="text-align: center;font-size: 18px;color: #C0C4CC">评  论</p>
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
    <div class="col-md-4" style="background-color: #795da3">
      <div class="selfMessage" style="background-color: #55a532">2</div>
    </div>
  </div>
</template>

<script>
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
    created:function () {
      var that=this;
      this.$http
        .get("http://localhost:8080/articles/article/"+this.id)
        .then(function (res) {
          that.Article=res.data.data;
          that.html=res.data.data.articles.articleContent
        });
      this.getData()
    },
    methods:{
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
      getData(){
        var that=this;
        this.$http
          .get("http://localhost:8080/articles/comment/"+this.id)
          .then(function (res) {
            that.comment=res.data.data;
          })
      }
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
</style>
