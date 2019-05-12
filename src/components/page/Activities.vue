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
          TopicList:[]
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
          .post(this.GLOBAL.rootUrl+'topics/all',{"userId":this.user.userId})
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
          var tat=this;
          this.$http
            .post(this.GLOBAL.rootUrl+"topics/topicname",{"topicName":this.form.topicname})
            .then(function (res) {
              if (!file) { // 若未选择文件
                console.log("未选文件"+res.data.data);
                data=null;
                var that=tat;
                const headerConfig = { headers: { 'Content-Type': 'application/json' } };
                that.$http
                  .post(that.GLOBAL.rootUrl+"pin/releasePin",
                    {"pinContent": that.form.content,
                      "pinUrl":data,
                      "usersId":that.user.userId,
                      "topicId":res.data.data
                    },headerConfig)
                  .then(res=>{
                    if (res.status===200){
                      that.$message.success("上传成功");
                    }else {
                      that.$message.error("上传失败")
                    }
                  });
              }else {
                console.log("选择了文件"+res.data.data);
                var m=tat;
                m.imageUrl = URL.createObjectURL(file.raw);
                // 发起请求
                const headerConfig = { headers: { 'Content-Type': 'application/json' } };
                var reader = new FileReader();
                reader.readAsDataURL(file.raw);
                reader.onload = function(e) {
                  data = this.result; // 这个就是base64编码了
                  console.log(data);
                  m.$http
                    .post(m.GLOBAL.rootUrl+"pin/releasePin",
                      {"pinContent": m.form.content,
                        "pinUrl":data,
                        "usersId":m.user.userId,
                        "topicId":res.data.data},headerConfig)
                    .then(res=>{
                      if (res.status===200){
                        m.$message.success("上传成功");
                      }else {
                        m.$message.error("上传失败")
                      }
                    });
                }
              }
            })
          /* 此处停留1秒刷新页面 */
          setTimeout(function(){
            location.reload();
          },1000)
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
