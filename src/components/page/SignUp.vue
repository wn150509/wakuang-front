<template>
  <div class="sign">
    <div class="logo">
      <a href="/">
        <img src="/static/img/logo.png" class="logo1">
      </a>
    </div>
    <div class="main">
      <h4 class="title">
        <div class="normal-title">
          <a class="active" href="sign_in">登录</a>
          <b>·</b>
          <a id="js-sign-up-btn" class="register" href="sign_up">
            <span class="red">注册</span>
          </a>
        </div>
      </h4>
      <div class="js-sign-in-container">
        <form id="new_session" action="/sessions" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
          <input type="hidden" name="authenticity_token"
                 value="5RK+HVp8if7enNxRWV5Pb1FyPQxP/hGZafuWVG7FTC/r25fM/OaBTUOfvjq4KRQ1MmSxgPf437fPiFvCTV7Odw==">

          <!-- 正常登录登录名输入框 -->
          <div class="demo-input-suffix">
            <el-input
              placeholder="请输入用户名"
              prefix-icon="el-icon-yonghu"
              v-model="name">
            </el-input>
          </div>

          <div class="demo-input-suffix">
            <el-input
              placeholder="请输入手机号"
              prefix-icon="el-icon-shoujihao"
              v-model="phone">
            </el-input>
          </div>

          <div class="demo-input-suffix">
            <el-input
              placeholder="手机验证码"
              prefix-icon="el-icon-yanzhengma"
              suffix-icon=""
              v-model="checkCode">
            </el-input>
            <div class="aButton" @click="check(phone)" v-if="code===''">发送验证码</div>
            <div class="aButton" v-else>已发送</div>
          </div>

          <div class="demo-input-suffix">
            <el-input
              type="password"
              placeholder="设置密码"
              prefix-icon="el-icon-mima"
              v-model="password">
            </el-input>
          </div>
          <button class="sign-in-button" id="sign-in-form-submit-btn" type="button" @click="onClick(password)">
            <span id="sign-in-loading"></span>
            注册
          </button>
          <span class="btn"></span>
          <div>
            <a href="/sign_in">已有账号登陆</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        name:'',
        phone:'',
        password:'',
        checkCode:'',
        code:''
      }
    },
    methods: {
      check(phone){
        var that=this;
        if(!this.isPhoneAvailable(phone)){
          this.$message.error("请输入正确的手机号码")
        } else {
          this.$http
            .post(this.$baseUrl+'user/checkCode',{"email":this.phone})
            .then(function (res) {
              that.code=res.data.data;
            })
        }
      },
      onClick(password) {
        var that = this;
        if(this.code!==this.checkCode){
          this.$message.error("验证码错误！！")
        } else {
          if(!this.isPasswordAvailable(password)){
            this.$message.error("请输入六位纯数字密码")
          }else {
            this.$http
              .post(this.$baseUrl+'user/sign_up',
                {"userName": this.name,
                  "email":this.phone,
                  "password": this.password})
              .then(function (response) {
                if (response.data.code===1){
                  that.$message.error("该账号已被注册！！");
                  that.$router.go(0)
                }else {
                  that.$router.push("/sign_in")
                }
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
  a{
    text-decoration: none;
  }
  .sign {
    height: 100%;
    min-height: 750px;
    text-align: center;
    font-size: 14px;
    background-color: #f1f1f1;
    color: gray;

  }
  .logo {
    position: absolute;
    top: 70px;
    margin-left: 60px;
  }
  .logo1{
    width: 120px;
    height: 100px;
  }
  .sign .reset-title a, .sign .title a {
    padding: 10px;
    color: #969696;
  }
  .main {
    width: 400px;
    margin: 100px auto 0;
    padding: 50px 50px 30px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    vertical-align: middle;
    display: inline-block;
  }
  .title {
    font-family: -apple-system,SF UI Display,Arial,PingFang SC,Hiragino Sans GB,Microsoft YaHei,WenQuanYi Micro Hei,sans-serif;
    margin: 0 auto 50px;
    padding: 10px;
    font-weight: 400;
    color: #969696;
  }
  .register {
    font-weight: 700;
    color: #409EFF;
    border-bottom: 2px solid #409EFF;
    font-size: 20px;
  }

  .red{
    color: #409EFF;
  }

  .active{
    font-size: 20px;
  }
  form {
    margin-bottom: 30px;
  }

  .sign-in-button {
    background: #409EFF;
    margin-top: 20px;
    width: 100%;
    padding: 9px 18px;
    font-size: 18px;
    border: none;
    border-radius: 25px;
    color: #fff;
    cursor: pointer;
    outline: none;
    display: block;
    clear: both;
  }
  .sign .more-sign h6 {
    position: relative;
    margin: 0 0 10px;
    font-size: 12px;
    color: #b5b5b5;
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
  }

  h6::before {
    content: "";
    border-top: 1px solid #b5b5b5;
    display: block;
    position: absolute;
    width: 60px;
    top: 5px;
    left: 30px;
    box-sizing: border-box;
  }

  h6::after{
    content: "";
    border-top: 1px solid #b5b5b5;
    display: block;
    position: absolute;
    width: 60px;
    top: 5px;
    right: 30px;
    box-sizing: border-box;
  }
  .sign .more-sign ul {
    margin-bottom: 10px;
    list-style: none;
    padding-left: 0;
    margin-top: 0;
    display: block;
  }
  .sign .more-sign ul li {
    margin: 0 5px;
    display: inline-block;
    line-height: 20px;
    text-align: -webkit-match-parent;
  }
  .sign .more-sign ul a {
    width: 50px;
    height: 50px;
    line-height: 50px;
    display: block;
    cursor: pointer;
  }
  .demo-input-suffix{
    position: relative;
    border-radius: 4px 4px 0 0;
    width: 100%;
    height: 50px;
    margin-bottom: 0;
    border: 1px solid #c8c8c8;
    background-color: hsla(0,0%,71%,.1);
    vertical-align: middle;
    font-size: inherit;
    line-height: inherit;
    padding: 4px 0 0 0;
  }
  .aButton{
    position: absolute;
    top: 7px;
    right: 7px;
    width: 100px;
    height: 36px;
    font-size: 13px;
    color: #fff;
    background-color: #409EFF;
    border-radius: 20px;
    line-height: 36px;

  }
</style>
