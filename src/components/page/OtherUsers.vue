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
          <b-button size="sm" variant="outline-primary" class="bjzl">
            关注
          </b-button>
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
      <div class="grcj">
        <h4>个人成就</h4><hr/>
        <div>
          <i class="far fa-heart" style="color: #409EFF;margin-left: 3%"></i>&nbsp;&nbsp;
          <span>获得点赞：{{otherUser.likeCount}}次</span><br/>
        </div>
        <div>
          <i class="far fa-eye" style="color: #409EFF;margin-left: 3%"></i>&nbsp;&nbsp;
          <span>文章被阅读：{{otherUser.lookCount}}次</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import vOUHeader from '../twohead/OUHeader.vue'
  export default {
    data(){
      return{
        id:this.$route.params.id,
        otherUser:{}
      }
    },
    created(){
      var that=this
      this.$http
        .get('http://localhost:8080/user/'+this.id)
        .then(function (response) {
          that.otherUser=response.data.data
        })
    },
    components:{
      vOUHeader
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
