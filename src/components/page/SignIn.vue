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
          <a class="active" href="/sign_in">
            <span class="red">登录</span>
          </a>
          <b>·</b>
          <a id="js-sign-up-btn" class="register" href="/sign_up">注册</a>
        </div>
      </h4>
      <div class="js-sign-in-container">
        <form id="new_session" action="/sessions" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
          <input type="hidden" name="authenticity_token" value="5RK+HVp8if7enNxRWV5Pb1FyPQxP/hGZafuWVG7FTC/r25fM/OaBTUOfvjq4KRQ1MmSxgPf437fPiFvCTV7Odw==">

          <!-- 正常登录登录名输入框 -->
          <div class="demo-input-suffix">
            <el-input
              placeholder="手机账号"
              prefix-icon="el-icon-yonghu"
              required
              v-model="phone">
            </el-input>
          </div>
          <span class="btn"></span>
          <div class="demo-input-suffix">
            <el-input
              type="password"
              placeholder="密码"
              prefix-icon="el-icon-mima"
              required
              v-model="password">
            </el-input>
          </div>

          <div class="remember-btn">
            <span>没有账号？</span><a href="/sign_up">注册</a>
          </div>

          <div class="forget-btn">
            <a @click="dialogVisible=true">忘记密码？</a>
          </div>

          <button class="sign-in-button" id="sign-in-form-submit-btn" type="button" @click="onClick">
            <span id="sign-in-loading"></span>登录
          </button>
        </form>
      </div>
      <el-dialog title="忘记密码" :visible.sync="dialogVisible" width="30%" :close-on-click-modal="false" center>
        <!-- 正常登录登录名输入框 -->
        <div class="demo-input-suffix">
          <el-input
            placeholder="手机账号"
            prefix-icon="el-icon-yonghu"
            required
            v-model="checkphone">
          </el-input>
        </div>
        <span class="btn"></span>
        <div class="demo-input-suffix">
          <el-input
            placeholder="手机验证码"
            prefix-icon="el-icon-yanzhengma"
            suffix-icon=""
            v-model="checkpassword">
          </el-input>
          <div class="aButton">发送验证码</div>
        </div>
        <span class="btn"></span>
        <div class="demo-input-suffix">
          <el-input
            type="password"
            placeholder="新密码"
            prefix-icon="el-icon-mima"
            required
            v-model="newpassword">
          </el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible=false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "SignIn",
    data() {
      return {
        phone: '',
        password: '',
        dialogVisible:false,
        checkphone:'',
        newpassword:'',
        checkpassword:'',
      }
    },
    methods: {
      onClick() {
        var that = this;
        this.$http
          .post('http://localhost:8080/user/sign_in',
            {"email": this.phone,"password": this.password})
          .then(function (response) {
            if (response.data.data===null){
              alert("账号或密码不正确！！");
              that.$route.go(0)
            }else {
              localStorage.setItem("loginUser", JSON.stringify(response.data.data));
              that.$router.push("/")
            }
          })
      },

    }
  }
</script>

<style scoped>
  a{
    text-decoration: none;
    color: #0086b3;
  }
  .sign {
    height: 100%;
    min-height: 750px;
    text-align: center;
    font-size: 14px;
    background-color: #f1f1f1;
    color: gray;
  }
  .red{
    color: #409EFF;
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
  .active {
    font-weight: 700;
    color: #409EFF;
    border-bottom: 2px solid #409EFF;
    font-size: 20px;
  }
  .register{
    font-size: 20px;
  }
  form {
    margin-bottom: 30px;
  }
  .remember-btn {
    float: left;
    margin: 30px 0 ;
  }
  .forget-btn {
    float: right;
    position: relative;
    margin: 30px 0;
    font-size: 14px;
  }

  .sign-in-button {
    background: #3194d0;
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
  .aButton{
    position: absolute;
    text-align: center;
    top: 142px;
    right: 30px;
    width: 100px;
    height: 36px;
    font-size: 16px;
    color: #fff;
    background-color: #409EFF;
    border-radius: 20px;
    line-height: 36px;

  }
</style>
