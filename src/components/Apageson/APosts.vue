<template>
  <div>
    <!--<p>热门</p>-->
    <div  v-if="PinVo.length===0" style="text-align: center;line-height: 200px ">
      (⊙﹏⊙)列 表 为 空(⊙﹏⊙)
    </div>
    <div class="container" v-else>
      <div v-for="pinvo in PinVo" :key="pinvo.pinStatus.pinId" class="pinvo">
        <div class="row">
          <div class="col-md-10">
            <img v-bind:src="pinvo.userStatus.userAvatar" class="avatar">
            <span class="tsup">·&nbsp;{{pinvo.userStatus.userName}}&nbsp;·</span>
            <span class="tsup">{{pinvo.pinStatus.createTime | formatDate}}</span>
          </div>
          <div class="col-md-2" v-if="pinvo.userStatus.userId!==user.userId">
            <button class="guanzhu2" v-if="pinvo.userStatus.status===1" @click="deleteuser(pinvo.userStatus.userId)">已关注</button>
            <button class="guanzhu1" v-else @click="insertuser(pinvo.userStatus.userId)">关注</button>
          </div>
        </div>
        <div>
          <p class="pinContent">{{pinvo.pinStatus.pinContent}}</p>
        </div>
        <div v-if="pinvo.pinStatus.pinUrl!==null" class="Dpurl">
          <img v-bind:src="pinvo.pinStatus.pinUrl" class="pinUrl">
        </div>
        <span class="btn"></span>
        <div>
          <a :href="'/topic/'+pinvo.topics.topicId">
            <el-button type="primary" size="mini" plain round>{{pinvo.topics.topicName}}</el-button>
          </a>
        </div>
        <div>
          <el-collapse accordion>
            <el-collapse-item>
              <template slot="title">
                <span class="tsdown">
              <span @click="deletelike(pinvo.pinStatus.pinId)" v-if="pinvo.pinStatus.status===1" style="color: #bd2c00">❤</span>
              <span v-else @click="insertlike(pinvo.pinStatus.pinId)"><i class="far fa-heart" ></i>
              </span>&nbsp;{{pinvo.pinStatus.likeCount}}</span>
                <span class="btn"></span>
                <span class="tsdown" @click="getPinComments(pinvo.pinStatus.pinId)"><i class="fas fa-comment"></i>&nbsp;{{pinvo.pinStatus.commentCount}}</span>
              </template>
              <div class="commentBox">
                <textarea class="form-control"
                    rows="1" placeholder="说点什么吧..."
                    maxlength="50" v-model="input_comment">
                </textarea>
                <div class="fabiao">
                  <span><span class="pull-right">还能输入</span><b style="color:red">{{surplus}}</b>/{{total}}</span>
                  <input type="button" class="btn btn-primary" :disabled="display" value="发表" @click="btnsend(pinvo.pinStatus.pinId)">
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
                        <a href="#" v-if="item.status===0" @click.prevent="btnsupport(pinvo.pinStatus.pinId,item.commentId)">👍🏻&nbsp;({{item.likeCount}})</a>
                        <a href="#" v-else @click.prevent="btndislike(pinvo.pinStatus.pinId,item.commentId)">👍&nbsp;({{item.likeCount}})</a>
                      </span>
                          </p>
                          <div class="row">
                            <div class='col-md-10 div_comment_content'>
                              {{item.commentContent}}
                            </div>
                            <div style="float: right" class="col-md-2" v-if="item.userStatus.userId===user.userId">
                              <el-button type="danger" icon="el-icon-delete" circle @click="btndelete(pinvo.pinStatus.pinId,item.commentId)"></el-button>
                            </div>
                          </div>
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
            </el-collapse-item>
          </el-collapse>
        </div><hr/>
      </div>
    </div>

  </div>
</template>

<script>
  import {formatDate} from "../../../static/js/date";
  export default {
    name: "APosts",
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser')),
        PinVo:[],
        disabled:true,
        input_comment:'',
        total: 50,// 评论可输入总字数
        comments:[]
      }
    },
    created(){
      var that=this;
      this.$http
        .post(this.GLOBAL.rootUrl+"pin/getPinsByLike",{"userId":this.user.userId})
        .then(function (res) {
          that.PinVo=res.data.data;
        });
    },
    methods:{
      insertuser(userId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'user/insertuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deleteuser(userId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'user/deleteuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      insertlike(pinId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'pin/insertPinUser',{"userId":this.user.userId,"pinId":pinId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelike(pinId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'pin/deletePinUser',{"userId":this.user.userId,"pinId":pinId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      getPinComments(pinId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+"pin/getPinComments",{"pinId":pinId,"userId":this.user.userId})
          .then(function (res) {
            that.comments=res.data.data;
          })
      },
      // 发表评论方法
      btnsend: function (pinId) {
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+"pin/addPinComment",{
            "pinId":pinId,"userId":this.user.userId,"commentContent":this.input_comment
          })
          .then(function (res) {
            that.$message.success("评论成功");
            that.input_comment='';
            that.getData(pinId)
          });
      },
      btndelete: function (pinId,id) {
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+"pin/deletePinComment",{
            "commentId":id
          })
          .then(function (res) {
            that.$message.success("删除成功");
            that.getData(pinId)
          });
      },
      // 评论点赞
      btnsupport: function (pinId,id) {
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'pin/insertPinCommentLike',{"commentId":id,"userId":this.user.userId})
          .then(function (res) {
            that.getData(pinId);
          })
      },
      //取消点赞
      btndislike: function (pinId,id) {
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'pin/deletePinCommentLike',{"commentId":id,"userId":this.user.userId})
          .then(function (res) {
            that.getData(pinId);
          })
      }
    },
    computed:{
      display:function () {
        if(this.input_comment===''){
          return this.disabled=true;
        } else {
          return this.disabled=false;
        }
      },
      surplus: function () {
        return this.total - this.input_comment.length;
      },
      getData(pinId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+"pin/getPinComments",{"pinId":pinId,"userId":this.user.userId})
          .then(function (res) {
            that.comments=res.data.data;
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


  .pinvo{
    margin-top: 4%;
  }
  .avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .tsup{
    font-size: 12px;
    color: #909399;
  }
  .guanzhu1{
    width: 60px;
    height: 28px;
    border-radius: 5%;
    margin-top: 18%;
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
    width: 60px;
    height: 28px;
    border-radius: 5%;
    margin-top: 18%;
    color: white;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #67C23A;
  }
  .pinContent{
    font-size: 18px;
    color: black;
    text-indent: 30px;
  }
  .pinUrl{
    width: 150px;
    height: 200px;
    border-radius: 5%;
  }
  .Dpurl img{
    cursor: pointer;
    transition: all 1s; /* 所有的属性变化在1s的时间段内完成 */
  }
  .Dpurl img:hover{
    transform: scale(2); /* 鼠标放到图片上的时候图片按比例放大2倍   */
  }
  .tsdown{
    font-size: 15px;
    color: #909399;
  }
</style>
