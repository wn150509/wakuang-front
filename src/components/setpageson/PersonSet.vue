<template>
  <div>
    <div><h3>个人资料</h3></div><hr/>
    <div class="touxian">
      <img v-bind:src="user.userAvatar" class="userAvatar">
      <span style="margin-left: 50px;font-size: 13px">只能上传.jpg格式</span>
      <el-button size="small" @click="imageDialog" type="primary">更换头像</el-button><hr/>
    </div>
    <div class="nichen">
      <span>用户名</span>
      <input type="text"  v-model="username" v-bind:placeholder="user.userName">
    </div><hr/>

    <div>
      <span>职位</span>
      <input type="text"  v-model="userposition" v-bind:placeholder="user.userPosition">
    </div><hr/>
    <div>
      <span>公司</span>
      <input type="text"  v-model="usercompany" v-bind:placeholder="user.userCompany">
    </div><hr/>
    <div>
      <span>个人简介:</span>
      <textarea v-model="userinfo" v-bind:placeholder="user.description"></textarea>
    </div><hr/>
    <div>
      <b-button variant="success" class="baocun" @click="saveUser">保存</b-button>
    </div>

    <el-dialog title="更换头像" :visible.sync="dialogVisible" width="30%">
      <div class="importDialog-content">
        <el-upload
          ref="upload"
          :limit="1"
          :auto-upload="false"
          drag
          :http-request="uploadFile"
          accept='.jpg'
          action="customize">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或
          <em>点击上传</em>
        </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadFile">确定上传</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:JSON.parse(localStorage.getItem('loginUser')),
        username:'',
        userposition:'',
        usercompany:'',
        userinfo:'',
        base64:'',
        dialogVisible:false,
        user1:{}
      };
    },
    created(){
      this.getData()
    },
    methods: {
      getData(){

      },
      //更换头像弹出框
      imageDialog(){
        this.dialogVisible=true
      },
      saveUser(){
        var that = this;
        this.$http
          .post('http://localhost:8080/user/update',{
            "userId":this.user.userId,
            "userName":this.username,
            "userPosition":this.userposition,
            "userCompany":this.usercompany,
            "description":this.userinfo
          })
          .then(res=> {
            that.$message.success("保存成功");
            setTimeout(function(){
              that.$http
                .get('http://localhost:8080/user/'+that.user.userId)
                .then(function (response) {
                  var userTemp = JSON.parse(localStorage.getItem("loginUser"));
                  userTemp=response.data.data
                  localStorage.setItem('loginUser',JSON.stringify(userTemp))
                });
              location.reload();
            },1000)
          });
      },
      //上传头像
      uploadFile() {
        const file = this.$refs.upload.uploadFiles[0];
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!file) { // 若未选择文件
          alert('请选择文件');
          return;
        }
        if (!isLt2M) {
          this.$message.error("请上传2M以下的.jpg文件");
          return false;
        }
        // 发起请求
        // const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
        var data;
        var reader = new FileReader();
        var that=this
        reader.readAsDataURL(file.raw);
        reader.onload = function(e) {
          data = this.result; // 这个就是base64编码了
          console.log(data);
          that.$http
            .post("http://localhost:8080/user/avatar",
              {"name": that.user.email,"base64": data})
            .then(res=>{
              if (res.status===200){
                that.$message.success("上传成功")
                that.dialogVisible=false;
              }else {
                that.$message.error("上传失败")
              }
            });
        }
        /* 此处停留1秒刷新页面 */
        setTimeout(function(){
          that.$http
            .get('http://localhost:8080/user/'+that.user.userId)
            .then(function (response) {
              var userTemp = JSON.parse(localStorage.getItem("loginUser"));
              userTemp=response.data.data
              localStorage.setItem('loginUser',JSON.stringify(userTemp))
            });
          // alert("保存成功");
          location.reload();
        },1000)
      }
    }
  }
</script>

<style scoped>
  span{
    color: #A2A2A2;
  }
  input{
    width: 200px;
    height: 35px;
    margin-left: 20%;
    text-align: center;
    font-size: 15px;
    border: none;
    border-radius: 10px;
    background: #E4E7ED;
  }
  textarea{
    width: 100%;
    margin-top: 10px;
    border-radius: 10px;
    border: none;
    background: #E4E7ED;
  }
  li{
    list-style: none;
    color: #C0C4CC;
    font-size: 14px;
    margin-left: 25%;
    margin-top: -6%;
  }
  .nichen{
    margin-top: 5%;
  }
  .nichen input{
    margin-left: 18%;
  }
  .baocun{
    margin-top: 20px;
    width: 100px;
    border-radius: 15px;
    margin-bottom: 10%;
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
  .userAvatar{
    width: 80px;
    height: 80px;
    border-radius: 5px;
    margin-left: 20%;
  }
</style>
