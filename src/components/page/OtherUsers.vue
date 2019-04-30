<template>
  <div class="row cardtop">
    <div class="col-md-8" >
      <div class="row namecard">
        <div class="col-md-2">
          <img class="avatar" v-bind:src="otherUser.userAvatar">
        </div>
        <div class="col-md-8">
          <h3>{{otherUser.userName}}</h3>
          <li><i class="fas fa-briefcase"></i>&nbsp;&nbsp;<span>{{otherUser.userPosition}}</span></li>
          <li><i class="fas fa-address-card"></i>&nbsp;&nbsp;<span>{{otherUser.description}}</span></li>
        </div>
        <div class="col-md-2">
          <button class="guanzhu2" v-if="otherUser.status===1" @click="deleteuser(otherUser.userId)">已关注</button>
          <button class="guanzhu1" v-else @click="insertuser(otherUser.userId)">关注</button>
        </div>
      </div>
      <div class="aboutperson">
        <v-o-u-header></v-o-u-header>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="col-md-4">
      <v-o-uup class="up"></v-o-uup>
      <v-o-ucenter class="center"></v-o-ucenter>
      <v-o-udown></v-o-udown>
    </div>
  </div>
</template>
<script>
  import vOUup from '../OURightModel/OUup.vue'
  import vOUcenter from '../OURightModel/OUcenter.vue'
  import vOUdown from '../OURightModel/OUdown.vue'
  import vOUHeader from '../twohead/OUHeader.vue'
  export default {
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser')),
        id:this.$route.params.id,
        otherUser:{}
      }
    },
    created(){
      var that=this;
      this.$http
        .post(this.GLOBAL.rootUrl+'user/getUser',{"userId":this.user.userId,"concerneduserId":this.id})
        .then(function (response) {
          that.otherUser=response.data.data
        })
    },
    methods:{
      insertuser(userId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'user/insertuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deleteuser(userId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'user/deleteuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      }
    },
    components:{
      vOUHeader,
      vOUup,
      vOUcenter,
      vOUdown
    }
  }
</script>

<style scoped>
  .up{
    padding-bottom: 20px;
  }
  .center{
    padding: 10px;
    margin-top: 5%;
  }
  .cardtop{
    margin-top: 20px;
  }
  .namecard{
    height: 150px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .aboutperson{
    margin-top: 12px;
  }
  .avatar{
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-top: 30px;
  }
  li{
    list-style: none;
    color: #606266;
  }
  h3{
    margin-top: 30px;
    font-weight: bold;
  }
  .guanzhu1{
    width: 80px;
    height: 35px;
    border-radius: 5%;
    margin-top: 18%;
    color: #67C23A;
    border: 2px solid #67C23A;
    background-color: transparent;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
  }
  .guanzhu2{
    border: none;
    width: 80px;
    height: 35px;
    border-radius: 5%;
    margin-top: 18%;
    color: white;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #67C23A;
  }
</style>
