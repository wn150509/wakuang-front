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
    </div>
  </div>
</template>

<script>
  export default {
    name: "SelfMessage",
    data(){
      return{
        user:JSON.parse(localStorage.getItem("loginUser"))
      }
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
</style>
