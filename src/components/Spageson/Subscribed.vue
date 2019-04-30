<template>
  <div class="container">
    <div class="row subscribed">
      <div class="col-md-3" v-for="labels in labelList" :key="labels.labelsId" v-if="labels.status==1">
        <router-link :to="'/tag/'+labels.labelsId">
          <img v-bind:src="labels.labelsUrl" class="labelurl">
          <p class="labelname">{{labels.labelsName}}</p>
        </router-link>
        <div class="info">
          <span>{{labels.fansCount}}人关注&nbsp;·</span>
          <span>{{labels.articleCount}}文章</span>
        </div>
        <button class="guanzhu2" @click="deletelabel(labels.labelsId)">已关注</button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        labelList:[],
        user:JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    created(){
      var that=this
      this.$http
        .post(this.GLOBAL.rootUrl+'labels/concern',this.user)
        .then(function (response) {
          that.labelList=response.data.data
        })
    },
    methods:{
      deletelabel(labelId){
        var that=this
        this.$http
          .post(this.GLOBAL.rootUrl+'labels/deletelabel',{"userId":this.user.userId,"labelId":labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      }
    },
  }
</script>

<style scoped>
  a{
    color: slategray;
    text-decoration: none;
  }
  .col-md-3{
    text-align: center;
    padding: 10px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .labelurl{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .labelname{
    font-size: 20px;
    margin-top: 3%;
  }
  .info span{
    font-size: 13px;
    color: #909399;
  }
  .info{
    margin-top: -4%;
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
  .subscribed{
    margin-top: 2%;
  }
</style>
