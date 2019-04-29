<template>
  <div class="grcj">
    <h4>个人成就</h4><hr/>
    <div class="count">
      <i class="far fa-heart" style="color: #409EFF;margin-left: 3%"></i>&nbsp;&nbsp;
      <span>获得点赞：{{Message.likeCount}}次</span>
    </div><span class="btn"></span>
    <div class="count">
      <i class="fas fa-comment" style="color: #409EFF;margin-left: 3%"></i>&nbsp;&nbsp;
      <span>获得评论数：{{Message.commentCount}}次</span>
    </div><span class="btn"></span>
    <div class="count">
      <i class="fas fa-user-plus" style="color: #409EFF;margin-left: 3%"></i>&nbsp;&nbsp;
      <span>受关注数：{{Message.userConcernedCount}}次</span>
    </div>
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
  .grcj{
    width: 300px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .count{
    text-indent: 20px;
    font-size: 16px;
  }
</style>
