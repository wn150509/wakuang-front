<template>
    <div class="row cardtop">
      <div class="col-md-8" >
        <div class="row namecard">
          <div class="col-md-2">
            <img class="avatar" v-bind:src="user.userAvatar">
          </div>
          <div class="col-md-8">
            <h3>{{user.userName}}</h3>
            <li><i class="fas fa-briefcase"></i>&nbsp;&nbsp;<span>{{user.userPosition}}</span></li>
            <li><i class="fas fa-address-card"></i>&nbsp;&nbsp;<span>{{user.description}}</span></li>
          </div>
          <div class="col-md-2">
            <router-link to="/settings/person">
              <b-button size="sm" variant="outline-primary" class="bjzl">
                编辑个人资料
              </b-button>
            </router-link>
          </div>
        </div>
        <div class="aboutperson">
          <v-u-header></v-u-header>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
      <div class="col-md-4">
        <v-self-up class="up"></v-self-up>
        <v-self-center class="center"></v-self-center>
        <v-self-down></v-self-down>
      </div>
    </div>
</template>

<script>
  import vSelfUp from '../UserRightModel/SelfUp.vue'
  import vUHeader from '../twohead/UHeader.vue'
  import vSelfCenter from '../UserRightModel/SelfCenter.vue'
  import vSelfDown from '../UserRightModel/SelfDown.vue'
  export default {
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    components:{
      vUHeader,
      vSelfUp,
      vSelfCenter,
      vSelfDown
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
  .bjzl{
    margin-top: 50px;
  }
</style>
