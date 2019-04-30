<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left" style="margin-top: 20px">
      <el-tab-pane label="关注了" name="first">
        <div class="container">
          <div v-if="userList===null" style="text-align: center">
            <h4>/(ㄒoㄒ)/~~该作者还未关注任何人</h4>
          </div>
          <div class="row" v-else v-for="pop in userList" :key="pop.userId">
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
      </el-tab-pane>
      <el-tab-pane label="关注者" name="second">
        <div class="container">
          <div v-if="concernedUser===null" style="text-align: center">
            <h4>/(ㄒoㄒ)/~~还没有任何人关注该作者</h4>
          </div>
          <div class="row" v-else v-for="pop in concernedUser" :key="pop.userId">
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
      </el-tab-pane>
      <el-tab-pane label="关注标签" name="third">
        <div class="container">
          <div v-if="labelList===null" style="text-align: center">
            <h4>/(ㄒoㄒ)/~~该作者还未关注任何标签</h4>
          </div>
          <div class="row" v-else v-for="labels in labelList" :key="labels.labelsId">
            <div class="col-md-1">
              <img v-bind:src="labels.labelsUrl" class="labelurl">
            </div>
            <div class="col-md-8">
              <p class="labelname">{{labels.labelsName}}</p>
            </div>
            <div class="col-md-3">
              <button class="guanzhu2" v-if="labels.status===1" @click="deletelabel(labels.labelsId)">已关注</button>
              <button class="guanzhu1" v-else @click="insertlabel(labels.labelsId)">关注</button>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id:this.$route.params.id,
        user:JSON.parse(localStorage.getItem('loginUser')),
        activeName: 'third',
        labelList:[],
        userList:[],
        concernedUser:[]
      };
    },
    created(){
      var that=this;
      this.$http
        .post(this.$baseUrl+'labels/otherlabelstatus',{"userId":this.user.userId,"concerneduserId":this.id})
        .then(function (response) {
          that.labelList=response.data.data;
        });
      this.$http
        .post(this.$baseUrl+'user/otheruserConcern',{"userId":this.user.userId,"concerneduserId":this.id})
        .then(function (response) {
          that.userList=response.data.data;
        });
      this.$http
        .post(this.$baseUrl+'user/otheruserConcerner',{"userId":this.user.userId,"concerneduserId":this.id})
        .then(function (response) {
          that.concernedUser=response.data.data;
        });
    },
    methods: {
      insertuser(userId){
        var that=this;
        this.$http
          .post(this.$baseUrl+'user/deleteuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deleteuser(userId){
        var that=this;
        this.$http
          .post(this.$baseUrl+'user/deleteuser',{"userId":this.user.userId,"concerneduserId":userId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      insertlabel(labelId){
        var that=this
        this.$http
          .post(this.$baseUrl+'labels/insertlabel',{"userId":this.user.userId,"labelId":labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelabel(labelId) {
        var that = this
        this.$http
          .post(this.$baseUrl+'labels/deletelabel', {"userId": this.user.userId, "labelId": labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      }
    }
  }
</script>

<style scoped>
  .row{
    padding-bottom: 15px;
  }
  .labelurl{
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .guanzhu2{
    margin-top: 2%;
    border-radius: 10em;
    border: none;
    width: 60px;
    height: 30px;
    color: white;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #67C23A;
  }
  .labelname{
    margin-left: 2%;
    font-size: 18px;
    font-weight: lighter;
  }
  .guanzhu1{
    width: 60px;
    height: 30px;
    border-radius: 10em;
    color: #67C23A;
    border: 2px solid #67C23A;
    margin-top: 2%;
    background-color: transparent;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
  }
</style>
