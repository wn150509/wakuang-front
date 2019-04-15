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
        <div class="grcj">
          <h4>个人成就</h4><hr/>
          <div>
            <i class="far fa-heart" style="color: #409EFF;margin-left: 3%"></i>&nbsp;&nbsp;
            <span>获得点赞：{{user.likeCount}}次</span><br/>
          </div>
          <div>
            <i class="far fa-eye" style="color: #409EFF;margin-left: 3%"></i>&nbsp;&nbsp;
            <span>文章被阅读：{{user.lookCount}}次</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import vUHeader from '../twohead/UHeader.vue'
  export default {
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    components:{
      vUHeader
    }
  }
</script>

<style scoped>
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
  .grcj{
    width: 280px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
</style>
