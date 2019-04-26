<template>
  <div class="container row">
    <div class="col-md-8">
      <div>
        <el-form ref="form" :model="form" class="dt">
          <el-form-item>
            <el-input type="textarea" id="t1" v-model="form.content" placeholder="发布动态..."></el-input>
          </el-form-item>
          <el-form-item>
            <el-breadcrumb separator="｜">
              <el-breadcrumb-item class="title">
                <el-popover
                  title="添加封面"
                  trigger="click">
                  <el-form>
                    <el-form-item>
                      <el-upload
                        class="avatar-uploader"
                        action="customize"
                        ref="upload"
                        :auto-upload="false"
                        :show-file-list="false"
                        :on-change="changeUpload"
                        :http-request="uploadFile"
                        accept=".jpg">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-form>
                  <el-button type="success" icon="el-icon-picture" circle slot="reference"></el-button>
                </el-popover>
              </el-breadcrumb-item>
              <el-breadcrumb-item style="margin-top: 15px">
                <el-button type="primary" size="medium" plain round>{{oneTopicVo.topicStatus.topicName}}</el-button>
              </el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" @click="onSubmit" id="btn">发布</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="热门" name="first">
          <div v-if="oneTopicVo.pinVoListByLike.length===0" style="text-align: center">
            <h3>＞﹏＜列 表 为 空＞﹏＜</h3>
          </div>
          <div v-for="pinvo in oneTopicVo.pinVoListByLike" :key="pinvo.pinStatus.pinId" class="pinvo">
            <div class="row">
              <div class="col-md-10">
                <img v-bind:src="pinvo.userStatus.userAvatar" class="userAvatar">
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
          <span class="tsdown">
              <span @click="deletelike(pinvo.pinStatus.pinId)" v-if="pinvo.pinStatus.status===1" style="color: #bd2c00">❤</span>
              <span v-else @click="insertlike(pinvo.pinStatus.pinId)"><i class="far fa-heart" ></i>
              </span>&nbsp;{{pinvo.pinStatus.likeCount}}</span>
              <span class="btn"></span>
              <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pinvo.pinStatus.commentCount}}</span>
            </div><hr/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="最新" name="second">
          <div v-if="oneTopicVo.pinVoListByTime.length===0" style="text-align: center">
            <h3>＞﹏＜列 表 为 空＞﹏＜</h3>
          </div>
          <div v-for="pinvo in oneTopicVo.pinVoListByTime" :key="pinvo.pinStatus.pinId" class="pinvo">
            <div class="row">
              <div class="col-md-10">
                <img v-bind:src="pinvo.userStatus.userAvatar" class="userAvatar">
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
          <span class="tsdown">
              <span @click="deletelike(pinvo.pinStatus.pinId)" v-if="pinvo.pinStatus.status===1" style="color: #bd2c00">❤</span>
              <span v-else @click="insertlike(pinvo.pinStatus.pinId)"><i class="far fa-heart" ></i>
              </span>&nbsp;{{pinvo.pinStatus.likeCount}}</span>
              <span class="btn"></span>
              <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pinvo.pinStatus.commentCount}}</span>
            </div><hr/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <div class="col-md-4">
      <div class="selfMessage">
        <div class="up">
          <img v-bind:src="oneTopicVo.topicStatus.topicUrl">
          <p>{{oneTopicVo.topicStatus.topicName}}</p>
          <button class="tguanzhu2" v-if="oneTopicVo.topicStatus.status===1" @click="deleteuser(oneTopicVo.topicStatus.topicId)">已关注</button>
          <button class="tguanzhu1" v-else @click="insertuser(oneTopicVo.topicStatus.topicId)">关注</button>
        </div>
        <div class="center">
          <h5>话题介绍：</h5>
          <p>{{oneTopicVo.topicStatus.topicDescription}}</p>
        </div><hr/>
        <div class="row">
          <div class="col-md-5">
            <h5>{{oneTopicVo.pinVoListByLike.length}}</h5>
            <p>沸点</p>
          </div>
          <div class="col-md-2">｜</div>
          <div class="col-md-5">
            <h5>{{oneTopicVo.userStatusList.length}}</h5>
            <p>关注</p>
          </div>
        </div>
      </div>
      <div class="selfMessage">
        <div class="tou">
          <p>共有{{oneTopicVo.userStatusList.length}}人参加</p>
        </div><hr/>
        <div class="body">
          <div class="row">
            <div class="col-md-3" v-for="i in users">
              <div v-if="i.userId===user.userId">
                <a :href="'/user/'+user.userId+'/posts'">
                  <el-tooltip class="item" effect="dark" :content="i.userPosition" placement="top-start">
                    <img :src="i.userAvatar" class="userPic"/>
                  </el-tooltip>
                </a>
                <el-tooltip class="item" effect="dark" :content="i.userName" placement="top-start">
                  <p>{{i.userName}}</p>
                </el-tooltip>
              </div>
              <div v-else>
              <a :href=" '/ou/'+i.userId">
              <el-tooltip class="item" effect="dark" :content="i.userPosition" placement="top-start">
              <img :src="i.userAvatar" class="userPic"/>
              </el-tooltip>
              </a>
                <el-tooltip class="item" effect="dark" :content="i.userName" placement="top-start">
                  <p>{{i.userName}}</p>
                </el-tooltip>
              </div>
            </div>
          </div>
          <div class="down">
            <b-button @click="dialogTableVisible = true" variant="outline-secondary" class="qb">查看全部&nbsp;&nbsp;></b-button>

            <el-dialog title="全部参与者" width="70%" :visible.sync="dialogTableVisible">
              <el-table :data="users">
                <el-table-column property="userId" align="center" label="用户Id" width="80"></el-table-column>
                <el-table-column align="center" label="用户头像">
                  <template slot-scope="scope">
                    <div v-if="scope.row.userId===user.userId">
                      <a :href="'/user/'+user.userId+'/posts'">
                        <img :src="scope.row.userAvatar" class="pic"/>
                      </a>
                    </div>
                    <div v-else>
                      <a :href="'/ou/'+scope.row.userId">
                        <img :src="scope.row.userAvatar" class="pic"/>
                      </a>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column property="userName" align="center" label="姓名"></el-table-column>
                <el-table-column property="description" align="center" label="简介"></el-table-column>
                <el-table-column property="userCompany" align="center" label="公司"></el-table-column>
                <el-table-column property="userPosition" align="center" label="职位"></el-table-column>
              </el-table>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../../static/js/date";
  export default {
    data() {
      return {
        id:this.$route.params.id,
        user:JSON.parse(localStorage.getItem('loginUser')),
        activeName:'first',
        dialogTableVisible:false,
        imageUrl:'',
        form: {
          content: '',
          pinUrl: ''
        },
        oneTopicVo:{},
        users:[]
      }
    },
    created(){
      var that=this;
      this.$http
        .post('http://localhost:8080/topics/oneTopic',{"userId":this.user.userId,"topicId":this.id})
        .then(function (res) {
          that.oneTopicVo=res.data.data;
          if(res.data.data.userStatusList.length<12){
            for(var i=0;i<res.data.data.userStatusList.length;i++){
              that.users.unshift(res.data.data.userStatusList[i])
            }
          }else {
            for(var i=0;i<12;i++){
              that.users.unshift(res.data.data.userStatusList[i])
            }
          }
        })
    },
    methods: {
      //提交
      onSubmit() {
        if(this.form.content===''){
          this.Title();
        }else {
          this.uploadFile();
          this.Success();
        }
      },
      //成功提示
      Success(){
        this.$notify.success({
          title: '成功',
          message: '发布动态成功！！！'
        });
      },
      //内容错误
      Title(){
        this.$notify.error({
          title: '错误',
          message: '请输入内容！！！'
        });
      },
      //向后台提交文件及参数
      uploadFile() {
        const file = this.$refs.upload.uploadFiles[0];
        var data;
        if (!file) { // 若未选择文件
          data=null;
          const headerConfig = { headers: { 'Content-Type': 'application/json' } };
          this.$http
            .post("http://localhost:8080/pin/releasePin",
              {"pinContent": this.form.content,
                "pinUrl":data,
                "usersId":this.user.userId,
                "topicId":this.id
              },headerConfig)
            .then(res=>{
              if (res.status===200){
                this.$message.success("上传成功");
              }else {
                this.$message.error("上传失败")
              }
            });
        }else {
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isLt2M) {
            this.$message.error("请上传2M以下的.jpg文件");
            return false;
          }
          this.imageUrl = URL.createObjectURL(file.raw);
          // 发起请求
          const headerConfig = { headers: { 'Content-Type': 'application/json' } };
          var reader = new FileReader();
          var that=this;
          reader.readAsDataURL(file.raw);
          reader.onload = function(e) {
            data = this.result; // 这个就是base64编码了
            console.log(data);
            that.$http
              .post("http://localhost:8080/pin/releasePin",
                {"pinContent": that.form.content,
                  "pinUrl":data,
                  "usersId":that.user.userId,
                  "topicId":that.id},headerConfig)
              .then(res=>{
                if (res.status===200){
                  that.$message.success("上传成功");
                }else {
                  that.$message.error("上传失败")
                }
              });
          }
        }
        /* 此处停留1秒刷新页面 */
        setTimeout(function(){
          location.reload();
        },1000)
      },
      //图片展示
      changeUpload (file, fileList){
        this.imageUrl=URL.createObjectURL(file.raw);
      },
      //关注作者
      insertuser(userId){
        var that=this;
        this.$http
          .post('http://localhost:8080/user/insertuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      //取关作者
      deleteuser(userId){
        var that=this;
        this.$http
          .post('http://localhost:8080/user/deleteuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      //沸点点赞
      insertlike(pinId){
        var that=this;
        this.$http
          .post('http://localhost:8080/pin/insertPinUser',{"userId":this.user.userId,"pinId":pinId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      //取消沸点点赞
      deletelike(pinId){
        var that=this;
        this.$http
          .post('http://localhost:8080/pin/deletePinUser',{"userId":this.user.userId,"pinId":pinId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      //关注话题
      insertTopic(topicId){
        var that=this
        this.$http
          .post("http://localhost:8080/topics/inserttopic",{"userId":this.user.userId,"topicId":topicId})
          .then(function (res) {
            that.$router.go(0)
          })
      },
      //取关话题
      deleteTopic(topicId){
        var that=this
        this.$http
          .post("http://localhost:8080/topics/deletetopic",{"userId":this.user.userId,"topicId":topicId})
          .then(function (res) {
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
  .tou p{
    font-size: 16px;
    font-weight: bold;
    text-indent: 30px;
    margin-top: 15px;
  }

  .row .col-md-5{
    text-align: center;
  }
  .row .col-md-5 p{
    margin-top: -5px;
    font-size: 13px;
    color: #969896;
  }
  .row .col-md-5 h5{
    font-size: 20px;
    font-weight: bold;
  }
  .row .col-md-2{
    text-align: center;
  }
  .center h5{
    font-size: 16px;
    font-weight: bold;
    margin-top: 2%;
    text-indent: 20px;
  }
  .center p{
    font-size: 15px;
    text-indent: 20px;
  }
  .up{
    text-align: center;
  }
  .up img{
    width: 60px;
    height: 60px;
    margin-top: 10%;
  }
  .up p{
    font-size: 18px;
    font-weight: bold;
  }
  .tguanzhu1{
    width: 90px;
    height: 28px;
    border-radius: 5px;
    color: #67C23A;
    border: 2px solid #67C23A;
    background-color: transparent;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
  }
  .tguanzhu2{
    border: none;
    width: 90px;
    height: 28px;
    border-radius: 5px;
    color: white;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #67C23A;
  }
  .title{
    font-size: 20px;
    margin-top: 2%;
    margin-left: 2%;
  }
  .row{
    margin-top: 20px;
  }
  .dt{
    background-color: #F8F8F8;
    padding: 10px;
    border-radius: 5px;
  }
  #btn{
    float: right;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .selfMessage{
    margin: 5px 15px;
    background-color: #F8F8F8;
  }
  .pinvo{
    margin-top: 4%;
  }
  .userAvatar{
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
  .col-md-3{
    text-align: center;
  }
  .col-md-3 p{
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .userPic{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .qb{
    margin-top: 15px;
    width: 200px;
    height: 35px;
  }
  .down{
    text-align: center;
  }
  .pic{
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }
</style>
