<template>
  <div>
    <div v-if="labels.length===0">
      <h3>标签列表为空</h3>
    </div>
    <div class="row" v-for="label in labels" :key="label.labelsId" v-else>
      <div class="col-md-2">
        <a :href="'/tag/'+label.labelsId">
          <img v-bind:src="label.labelsUrl" class="labelurl">
        </a>
      </div>
      <div class="col-md-8">
        <p class="labelname" :value="label.labelsName">{{label.labelsName}}</p>
        <div class="info">
          <span :value="label.fansCount">{{label.fansCount}}人关注&nbsp;·&nbsp;</span>
          <span>{{label.articleCount}}文章</span>
        </div>
      </div>
      <div class="col-md-2">
        <button class="guanzhu2" v-if="label.status===1" @click="deletelabel(label.labelsId)">已关注</button>
        <button class="guanzhu1" v-else @click="insertlabel(label.labelsId)">关注</button>
      </div>
    </div>
  </div>
</template>

<script>
  import bus from '../commons/bus'
  export default {
    name: "LabelPage",
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser')),
        key:'',
        labels:[]
      }
    },
    created(){
      bus.$on('key',keyValue => {
        this.key=keyValue;
        var that=this;
        this.$http
          .post(this.$baseUrl+'labels/querylabels',{"userId":this.user.userId,"key":this.key})
          .then(function (res) {
            that.labels=res.data.data
          })
      })
    },
    methods:{
      insertlabel(labelId){
        var that=this
        this.$http
          .post(this.$baseUrl+'labels/insertlabel',{"userId":this.user.userId,"labelId":labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelabel(labelId){
        var that=this
        this.$http
          .post(this.$baseUrl+'labels/deletelabel',{"userId":this.user.userId,"labelId":labelId})
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
    width: 50px;
    height: 50px;
    margin-top: 10%;
  }
  .labelname{
    font-size: 20px;
    font-weight: bold;
  }
  .info span{
    font-size: 15px;
    color: black;
  }
  .info{
    /*margin-top: -4%;*/
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
