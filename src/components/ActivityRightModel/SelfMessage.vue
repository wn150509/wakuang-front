<template>
  <div class="msg">
    <div class="row">
      <div class="col-md-4">
        <img :src="user.userAvatar" class="avatar"/>
      </div>
      <div class="col-md-8">
        <p class="name">{{user.userName}}</p>
        <p class="description">{{user.description}}</p>
      </div>
    </div><hr/>
    <div class="row">
      <div class="col-md-4 down">
        <p class="u">沸点</p>
        <p class="d">{{pinList.length}}</p>
      </div>
      <div class="col-md-4 down">
        <p class="u">关注</p>
        <p class="d">{{userConcernList.length}}</p>
      </div>
      <div class="col-md-4 down">
        <p class="u">关注者</p>
        <p class="d">{{concernUserList.length}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelfMessage",
    data(){
      return{
        user:JSON.parse(localStorage.getItem("loginUser")),
        concernUserList:[],
        userConcernList:[],
        pinList:[]
      }
    },
    created(){
      var that=this;
      this.$http
        .post('http://localhost:8080/user/userConcern',this.user)
        .then(function (res) {
          that.concernUserList=res.data.data;
        })
      this.$http
        .post('http://localhost:8080/user/concern',this.user)
        .then(function (res) {
          for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].status===1){
              that.userConcernList.unshift(res.data.data[i])
            }
          }
        })
      this.$http
        .post("http://localhost:8080/pin/getUserPins",{"userId":this.user.userId})
        .then(function (res) {
          that.pinList=res.data.data;
        })
    }
  }
</script>

<style scoped>
  .msg{
    background-color: #F8F8F8;
    width: 280px;
  }
  .avatar{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .name{
    font-size: 18px;
    font-weight: bold;
  }
  .description{
    font-size: 15px;
    font-weight: lighter;
    color: #969896;
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
