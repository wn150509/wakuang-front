<template>
    <div class="sign">
      <div class="container crumbs">
        <el-breadcrumb separator="｜">
          <el-breadcrumb-item class="title "><i class="el-icon-date"></i>富文本编辑器</el-breadcrumb-item>
          <el-breadcrumb-item class="title ">
            <router-link :to=" '/user/'+user.userId+'/posts'">
              <img :src="user.userAvatar" class="avatar1">
            </router-link>
          </el-breadcrumb-item>
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

          <el-breadcrumb-item class="title ">
            <el-popover
              width="300"
              title="发布文章"
              trigger="click">
              <el-form>
                <el-form-item label="分类:">
                  <el-radio-group v-model="form.resource">
                    <el-radio :label="2">前端</el-radio>
                    <el-radio :label="3">iOS</el-radio>
                    <el-radio :label="1">Android</el-radio>
                    <el-radio :label="6">产品</el-radio>
                    <el-radio :label="5">设计</el-radio>
                    <el-radio :label="7">工具资源</el-radio>
                    <el-radio :label="4">后端</el-radio>
                    <el-radio :label="8">阅读</el-radio>
                    <el-radio :label="9">人工智能</el-radio>
                    <el-radio :label="10">运维</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="标签:">
                  <el-select v-model="form.region" placeholder="请选择一个标签">
                    <el-option
                      v-for="item in Options"
                      :key="item.labelsId"
                      :label="item.labelsName"
                      :value="item.labelsName">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submit" plain>确认并发布</el-button>
                </el-form-item>
              </el-form>
              <el-button type="primary" slot="reference">发布</el-button>
            </el-popover>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="container">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          class="title-input"
          placeholder="输入标题..."
          v-model="form.name">
        </el-input>
        <quill-editor class="content" ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
      </div>
    </div>
</template>

<script type="module">
  import 'quill/dist/quill.core.css';
  import 'quill/dist/quill.snow.css';
  import 'quill/dist/quill.bubble.css';
  import { quillEditor } from 'vue-quill-editor';
  export default {
    data: function(){
      return {
        user:JSON.parse(localStorage.getItem("loginUser")),
        Options:[],
        imageUrl:'',
        form: {
          name:'',
          title: '',
          region: '',
          resource: 8
        },
        content: '',
        html:'',
        labelsId:'',
        editorOption: {
          placeholder: '请编辑您要发布的内容...',
          modules: {
            toolbar: [
              ['bold'],
              ['image'],
              [{ 'header': 1 }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'font': [] }],
              [{ 'align': [] }]
            ]
          }
        }
      }
    },
    components: {
      quillEditor
    },
    created:function(){
      var that=this;
      this.$http
        .get("http://localhost:8080/labels/all")
        .then(function (res){
          that.Options=res.data.data
        })
    },
    methods: {
      //获取标签id
      getLabelId(){
        // var that=this;
        // this.$http
        //   .post("http://localhost:8080/labels/onelabel",{"labelsName":this.form.region})
        //   .then(function (res) {
        //     that.labelsId=res.data.data.labelsId;
        //     console.log("这是函数内打印结果："+that.labelsId)
        //   })
        if(this.form.region=="七牛云"){this.labelsId=1}
        if(this.form.region=='Swagger'){this.labelsId=2}
        if(this.form.region=='前端'){this.labelsId=3}
        if(this.form.region=='后端'){this.labelsId=4}
        if(this.form.region=='GitHub'){this.labelsId=5}
        console.log("这是函数内打印结果："+this.labelsId)
      },
      uploadFile() {
        const file = this.$refs.upload.uploadFiles[0];
        var data;
        this.getLabelId();
        if (!file) { // 若未选择文件
          data=null;
          console.log("这是运行函数后打印结果："+this.labelsId)
          const headerConfig = { headers: { 'Content-Type': 'application/json' } };
          this.$http
            .post("http://localhost:8080/articles/add",
              {"articleTitle": this.form.name,
                "articleContent": this.content,
                "articleAuthor":this.user.userName,
                "articlePic":data,
                "authorAvatar":this.user.userAvatar,
                "usersId":this.user.userId,
                "labelId":this.labelsId,
                "typeId":this.form.resource},headerConfig)
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
          var that=this
          reader.readAsDataURL(file.raw);
          reader.onload = function(e) {
            data = this.result; // 这个就是base64编码了
            console.log(data);
            console.log(that.user.userAvatar)
            that.$http
              .post("http://localhost:8080/articles/add",
                {"articleTitle": that.form.name,
                  "articleContent": that.content,
                  "articleAuthor":that.user.userName,
                  "articlePic":data,
                  "authorAvatar":that.user.userAvatar,
                  "usersId":that.user.userId,
                  "labelId":that.labelsId,
                  "typeId":that.form.resource},headerConfig)
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
      onEditorChange({ editor, html, text }) {
        this.content = html;
      },
      //标题错误提示
      Title() {
        this.$notify.error({
          title: '错误',
          message: '请输入文章标题！！！'
        });
      },
      //标签错误提示
      Lable(){
        this.$notify.error({
          title: '错误',
          message: '请选择一个文章标签！！！'
        });
      },
      submit(){
        if(this.form.name===''){
          this.Title();
        }else {
          if(this.form.region===''){
            this.Lable();
          }else {
            this.uploadFile();
            this.html=this.content;
            this.$message.success('发布成功！');
          }
        }
      },
      //图片展示
      changeUpload (file, fileList){
          this.imageUrl=URL.createObjectURL(file.raw);
      }
    }
  }
</script>
<style scoped>
  .title-input{
    font-size: 25px;
    font-weight: bold;
  }
  .title{
    font-size: 20px;
    margin-top: 2%;
    margin-left: 2%;
  }
  .content{
    height: 80%;
  }
  .sign {
    height: 100%;
    min-height: 700px;
    text-align: center;
    font-size: 14px;
    background-color: #f1f1f1;
    color: gray;
  }
  .avatar1{
    width: 40px;
    height: 40px;
    border-radius: 50%;
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
