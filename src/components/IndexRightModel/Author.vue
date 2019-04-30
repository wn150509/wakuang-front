<template>
  <div class="zuozhe">
    <div class="H">
      <span>你可能感兴趣的人</span>
      <span @click="replace" class="hyp">
        <i class="fas fa-sync-alt"></i>&nbsp;&nbsp;换一批
      </span>
    </div><hr/>
    <div class="row" v-for="index in arr" :key="hotUsers[index].userId">
      <div class="col-md-2" v-if="hotUsers[index].userId===user.userId">
        <a :href="'/user/'+user.userId+'/posts'">
          <img :src="hotUsers[index].userAvatar" class="userAvatar">
        </a>
      </div>
      <div class="col-md-2" v-else>
        <a :href=" '/ou/'+hotUsers[index].userId">
          <img :src="hotUsers[index].userAvatar" class="userAvatar">
        </a>
      </div>
      <div class="col-md-8">
        <div class="userName">{{hotUsers[index].userName}}</div>
        <div class="jj">{{hotUsers[index].userPosition}}</div>
      </div>
      <div class="col-md-2"></div>
      <span class="btn"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        hotUsers: [],
        arr:[0,1],
        user:JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    created:function () {
      var that = this;
      this.$http
        .get(this.GLOBAL.rootUrl+'user/hot')
        .then(function (response) {
          that.hotUsers = response.data.data;
        })
    },
    methods:{
      replace(){
        var a = [];
        var j= 0;
        while(j<2){
          var b = Math.floor((Math.random()*this.hotUsers.length));
          if(a.indexOf(b)===-1){
            a.push(b);
            j++;
          }
        }
        this.arr = a;
      }
    }
  }
</script>

<style scoped>
  .H{
    display: inline-block;
    margin-left: 10px;
  }
  .hyp{
    margin-left: 60px;
    color: darkgray;
  }
  .jj{
    color: darkgray;
    font-size: 13px;
    margin-left: 20px;
  }
  .zuozhe{
    width: 280px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .userAvatar{
    width: 50px;
    height:50px;
    border-radius: 50%;
  }
  .userName{
    margin-left: 20px;
    font-size: 15px;
    line-height: 200%;
  }
  .row{
    margin-left: 2px;
  }
</style>
