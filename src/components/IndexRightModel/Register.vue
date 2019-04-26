<template>
  <div class="zhuce">
    <div class="selfMessage">
      <div class="tou">
        <p>挖矿-wakuang</p>
        <h6>一个帮助开发者成长的社区</h6>
      </div><hr/>
      <div class="body">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名:">
            <el-input v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input v-model.number="form.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码:">
            <el-input type="password" v-model="form.password"></el-input>
          </el-form-item>
        </el-form>
        <div class="down">
          <el-button type="primary" @click="onClick(form.phone,form.password)" class="qb">注册&nbsp;&nbsp;></el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        form:{
          userName:'',
          phone:'',
          password:''
        }
      }
    },
    methods: {
      onClick(phone,password) {
        var that = this;
        if(!this.isPhoneAvailable(phone)){
          this.$message.error("请输入正确的手机号码")
        } else {
          if(!this.isPasswordAvailable(password)){
            this.$message.error("请输入六位纯数字密码")
          }else {
            this.$http
              .post('http://localhost:8080/user/sign_up',
                {"userName": this.form.userName,
                  "email":this.form.phone,
                  "password": this.form.password})
              .then(function (response) {
                that.$router.push("/sign_in")
              })
          }
        }
      },
      isPhoneAvailable(pone) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(pone)) {
          return false;
        } else {
          return true;
        }
      },
      isPasswordAvailable(password){
        var reg = new RegExp(/^\d{6}$/);     //工作密码必须是6位数字
        if(!reg.test(password)) {
          return false;
        }else {
          return true;
        }
      }
    }
  }
</script>

<style scoped>
  .zhuce{
    width: 280px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .tou p{
    font-size: 16px;
    font-weight: bold;
    text-indent: 10px;
    margin-top: 15px;
  }
  .tou h6{
    font-size: 14px;
    text-indent: 10px;
    margin-top: -3%;
  }
  .selfMessage{
    margin: 5px 15px;
    background-color: #F8F8F8;
  }
  .col-md-3 p{
    font-size: 14px;
    font-weight: bold;
  }
  .qb{
    width: 200px;
    height: 35px;
    margin-bottom: 5%;
  }
  .down{
    text-align: center;
  }
</style>
