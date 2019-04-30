<template>
  <div class="zuozhe">
      <div class="row">
        <div class="col-md-4 down">
          <p class="u">关注了</p>
          <p class="d">{{Message.userConcernCount}}</p>
        </div>
        <div class="col-md-4 down">
          <p class="u">关注标签</p>
          <p class="d">{{Message.concernLabel}}</p>
        </div>
        <div class="col-md-4 down">
          <p class="u">关注话题</p>
          <p class="d">{{Message.concernTopic}}</p>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: "SelfCenter",
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser')),
        Message:{}
      }
    },
    created(){
      var that=this;
      this.$http
        .post(this.GLOBAL.rootUrl+'user/userRightMessageCount',{"userId":this.user.userId})
        .then(function (res) {
          that.Message=res.data.data;
        })
    }
  }
</script>

<style scoped>
  .zuozhe{
    width: 300px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .down{
    text-align: center;
  }
  .u{
    font-size: 15px;
    color: #666666;
  }
  .d{
    font-size: 20px;
    font-weight: bold;
  }
</style>
