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
                <el-breadcrumb-item>
                      <el-select v-model="form.topicname" placeholder="请选择一个话题">
                        <el-option
                          v-for="item in TopicList"
                          :key="item.topicId"
                          :label="item.topicName"
                          :value="item.topicName">
                        </el-option>
                      </el-select>
                </el-breadcrumb-item>
              </el-breadcrumb>
              <el-button type="primary" @click="onSubmit" id="btn">发布</el-button>
            </el-form-item>
          </el-form>
        </div>
        <v-a-header></v-a-header>
        <router-view></router-view>
      </div>

      <div class="col-md-4">
        <v-self-message></v-self-message>
        <v-author class="author"></v-author>
        <v-topic class="topic"></v-topic>
      </div>
    </div>
</template>

<script>
  import vAHeader from '../twohead/AHeader.vue'
  import vAuthor from '../IndexRightModel/Author.vue'
  import vSelfMessage from '../ActivityRightModel/SelfMessage.vue'
  import vTopic from '../ActivityRightModel/Topic.vue'
    export default {
      data() {
        return {
          user:JSON.parse(localStorage.getItem('loginUser')),
          imageUrl:'',
          form: {
            content: '',
            pinUrl: '',
            topicname: ''
          },
          TopicList:[],
          topics:''
        }
      },
      components:{
        vAHeader,
        vAuthor,
        vSelfMessage,
        vTopic
      },
      created(){
        var that=this;
        this.$http
          .post('http://localhost:8080/topics/all',{"userId":this.user.userId})
          .then(function (res) {
            that.TopicList=res.data.data
          })
      },
      methods: {
        onSubmit() {
          if(this.form.content===''){
            this.Title();
          }else {
            if(this.form.topicId===''){
              this.Topic();
            }else {
              this.uploadFile();
              this.Success();
            }
          }
        },
        getTopicId(){
          if(this.form.topicname=="一图胜千言"){this.topics=1}
          if(this.form.topicname=='今天学到了'){this.topics=2}
          if(this.form.topicname=='开发工具推荐'){this.topics=3}
          if(this.form.topicname=='应用安利'){this.topics=4}
          if(this.form.topicname=='下班打卡'){this.topics=5}
          if(this.form.topicname=='代码写诗'){this.topics=6}
        },
        //成功提示
        Success(){
          this.$notify.success({
            title: '成功',
            message: '发布动态成功！！！'
          });
        },
        //标签错误提示
        Topic(){
          this.$notify.error({
            title: '错误',
            message: '请选择一个话题！！！'
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
          this.getTopicId();
          if (!file) { // 若未选择文件
            data=null;
            const headerConfig = { headers: { 'Content-Type': 'application/json' } };
            this.$http
              .post("http://localhost:8080/pin/releasePin",
                {"pinContent": this.form.content,
                  "pinUrl":data,
                  "usersId":this.user.userId,
                  "topicId":this.topics
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
                    "topicId":that.topics},headerConfig)
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
          // setTimeout(function(){
          //   location.reload();
          // },1000)
        },
        //图片展示
        changeUpload (file, fileList){
          this.imageUrl=URL.createObjectURL(file.raw);
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
  .author{
    margin-top: 8%;
  }
  .topic{
    margin-top: 8%;
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
</style>
