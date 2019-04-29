<template>
  <div class="grcj">
    <hr/>
    <router-link :to="'/user/'+user.userId+'/pins'">
    <div class="row">
      <div class="col-md-10 zuo">沸点</div>
      <div class="col-md-2 you">{{Message.pinCount}}</div>
    </div><hr/></router-link>
    <router-link :to="'/user/'+user.userId+'/posts'">
    <div class="row">
      <div class="col-md-10 zuo">专栏</div>
      <div class="col-md-2 you">{{Message.articleCount}}</div>
    </div></router-link>
    <hr/>
  </div>
</template>

<script>
  export default {
    name: "SelfMessage",
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser')),
        Message:{}
      }
    },
    created(){
      var that=this;
      this.$http
        .post('http://localhost:8080/user/userRightMessageCount',{"userId":this.user.userId})
        .then(function (res) {
          that.Message=res.data.data;
        })
    }
  }
</script>

<style scoped>
  a {
    color: #324157;
    text-decoration: none;
  }
  .grcj{
    width: 300px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }

  .zuo{
    text-indent: 10px;
  }
</style>
