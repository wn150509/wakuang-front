<template>
  <div>
    <h5>永久删除账号</h5><hr/>
    <ul>
      <li>你不小心创建出了多余的帐号?</li>
      <li>你对挖矿上的某些内容、功能或社区规则不满意？</li>
      <li class="danger">删除帐号是不可逆的操作，删除后将无法恢复。</li>
    </ul>
    <el-button type="danger" plain="" @click="open">删除账号</el-button>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    methods:{
      open() {
        var that=this;
        this.$confirm('此操作将永久删除您的信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http
            .post('http://localhost:8080/user/deleteAccount',{"userId":this.user.userId})
            .then(function (res) {
              that.$router.push("/");
              localStorage.removeItem('loginUser');
              that.$router.go(0);
            })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style scoped>
  a {
    color: #324157;
    text-decoration: none;
  }
  h5{
    color: #C0C4CC;
  }
  ul li{
    margin-top: 3%;
  }
  .danger{
    color: #F56C6C;
  }
</style>
