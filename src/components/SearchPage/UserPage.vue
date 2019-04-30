<template>
  <div>
    <div v-if="userList.length===0">
      <h3>用户列表为空</h3>
    </div>
    <div class="row" v-for="pop in userList" :key="pop.userId" v-else>
      <div class="col-md-2" v-if="pop.userId===user.userId">
        <a :href="'/user/'+user.userId+'/activities'">
          <img :src="pop.userAvatar" class="labelurl">
        </a>
      </div>
      <div class="col-md-2" v-else>
        <a :href=" '/ou/'+pop.userId">
          <img :src="pop.userAvatar" class="labelurl">
        </a>
      </div>
      <div class="col-md-8">
        <span class="userName">{{pop.userName}}</span>&nbsp;&nbsp;
        <span class="info">{{pop.description}}&nbsp;<span v-if="pop.userCompany!==null">＠</span>&nbsp;{{pop.userCompany}}</span>
      </div>
      <div class="col-md-2" v-if="pop.userId!==user.userId">
        <button class="guanzhu2" v-if="pop.status===1" @click="deleteuser(pop.userId)">已关注</button>
        <button class="guanzhu1" v-else @click="insertuser(pop.userId)">关注</button>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../commons/bus'
  export default {
    name: "UserPage",
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser')),
        key:'',
        userList:[]
      }
    },
    created(){
      bus.$on('key',keyValue => {
        this.key = keyValue;
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'user/queryuser',{"userId":this.user.userId,"key":this.key})
          .then(function (res) {
            that.userList=res.data.data
          })
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
    }
  }
</script>

<style scoped>
  h3{
    text-align: center;
  }
  .col-md-2{
    text-align: center;
  }
  a{
    color: slategray;
    text-decoration: none;
  }
  .labelurl{
    width: 70px;
    height: 70px;
    margin-top: 5px;
    border-radius: 50%;
  }
  .userName{
    font-size: 18px;
    font-weight: bold;
    line-height: 60px;
  }
  .info{
    font-size: 14px;
    color: #969896;
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
