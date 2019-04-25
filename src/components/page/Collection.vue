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
            <h4><router-link to="/subscribe"><span class="bt">去关注</span></router-link></h4>
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
      <div class="selfMessage" style="background-color: #0086b3">
        <div>话题详情</div>
        <div>参与人数{{oneTopicVo.userStatusList.length}}</div>
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
        imageUrl:'',
        form: {
          content: '',
          pinUrl: ''
        },
        oneTopicVo:{}
      }
    },
    components:{

    },
    created(){
      var that=this;
      this.$http
        .post('http://localhost:8080/topics/oneTopic',{"userId":this.user.userId,"topicId":this.id})
        .then(function (res) {
          that.oneTopicVo=res.data.data
        })
    },
    methods: {
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
      insertlike(pinId){
        var that=this;
        this.$http
          .post('http://localhost:8080/pin/insertPinUser',{"userId":this.user.userId,"pinId":pinId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelike(pinId){
        var that=this;
        this.$http
          .post('http://localhost:8080/pin/deletePinUser',{"userId":this.user.userId,"pinId":pinId})
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
</style>
