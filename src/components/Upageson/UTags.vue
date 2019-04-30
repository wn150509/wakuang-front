<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left" style="margin-top: 20px">
      <el-tab-pane label="关注了" name="first" v-if="userList.length===0" style="text-align: center">
        （⊙ｏ⊙）您 还 没 有 要  关 注 的 作 者（⊙ｏ⊙）
      </el-tab-pane>
      <el-tab-pane label="关注了" name="first" v-else>
        <div class="row" v-for="pop in userList" :key="pop.userId">
          <div class="col-md-2">
            <a :href=" '/ou/'+pop.userId">
              <img :src="pop.userAvatar" class="labelurl">
            </a>
          </div>
          <div class="col-md-8">
            <span class="userName">{{pop.userName}}</span>&nbsp;&nbsp;
            <span class="info">{{pop.description}}&nbsp;<span v-if="pop.userCompany!==null">＠</span>&nbsp;{{pop.userCompany}}</span>
          </div>
          <div class="col-md-2" v-if="pop.userId!==user.userId">
            <button class="guanzhu2" @click="deleteuser(pop.userId)">已关注</button>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="关注者" name="second" style="text-align: center" v-if="concernedUser.length===0">
        ＞﹏＜ 好 尴 尬 还 没 有 人 关 注 您 ＞﹏＜
      </el-tab-pane>
      <el-tab-pane label="关注者" name="second" v-else>
        <div class="row" v-for="pop in concernedUser" :key="pop.userId">
          <div class="col-md-2">
            <a :href=" '/ou/'+pop.userId">
              <img :src="pop.userAvatar" class="labelurl">
            </a>
          </div>
          <div class="col-md-8">
            <span class="userName">{{pop.userName}}</span>&nbsp;&nbsp;
            <span class="info">{{pop.description}}&nbsp;<span v-if="pop.userCompany!==null">＠</span>&nbsp;{{pop.userCompany}}</span>
          </div>
        </div>
      </el-tab-pane>

      <el-tab-pane label="关注标签" name="third" v-if="labelList.length===0" style="text-align: center">
        （⊙ｏ⊙）您 还 没 有 要 关 注 的 标 签（⊙ｏ⊙）
      </el-tab-pane>
      <el-tab-pane label="关注标签" name="third" v-else>
        <div class="container">
          <div class="row" v-for="labels in labelList" :key="labels.labelsId">
            <div class="col-md-1">
              <img v-bind:src="labels.labelsUrl" class="labelurl">
            </div>
            <div class="col-md-8">
              <p class="labelname">{{labels.labelsName}}</p>
            </div>
            <div class="col-md-3">
              <button class="guanzhu2" @click="deletelabel(labels.labelsId)">已关注</button>
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
        .post(this.$baseUrl+'labels/concern',this.user)
        .then(function (response) {
          console.log(response.data.data.length);
          for(var i=0;i<response.data.data.length;i++){
            if(response.data.data[i].status===1){
              that.labelList.unshift(response.data.data[i]);
            }
          }
        });
      this.$http
        .post(this.$baseUrl+'user/concern',this.user)
        .then(function (res) {
          for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].status===1){
              that.userList.unshift(res.data.data[i])
            }
          }
        });
      this.$http
        .post(this.$baseUrl+'user/userConcern',this.user)
        .then(function (res) {
          that.concernedUser=res.data.data
        })
    },
    methods: {
      deletelabel(labelId) {
        var that = this
        this.$http
          .post(this.$baseUrl+'labels/deletelabel', {"userId": this.user.userId, "labelId": labelId})
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


  .col-md-2{
    text-align: center;
  }
  a{
    color: slategray;
    text-decoration: none;
  }
  .userName{
    font-size: 18px;
    font-weight: bold;
    line-height: 35px;
  }
  .info{
    font-size: 14px;
    color: #969896;
  }
</style>
