<template>
  <div class="container">
    <div class="sousuo">
      <b-form-input class="mr-sm-2" type="text" placeholder="搜索标签" v-model="searchVal"/>
    </div>
    <div class="row" >
        <div class="col-md-3" v-for="labels in NewItems" :key="labels.labelsId">
          <a :href="'/wakuang/#/tag/'+labels.labelsId">
            <img v-bind:src="labels.labelsUrl" class="labelurl">
            <p class="labelname" :value="labels.labelsName">{{labels.labelsName}}</p>
          </a>
          <div class="info">
            <span :value="labels.fansCount">{{labels.fansCount}}人关注&nbsp;·&nbsp;</span>
            <span>{{labels.articleCount}}文章</span>
          </div>
          <button class="guanzhu2" v-if="labels.status===1" @click="deletelabel(labels.labelsId)">已关注</button>
          <button class="guanzhu1" v-else @click="insertlabel(labels.labelsId)">关注</button>
        </div>
      </div>
    </div>
</template>

<script>
  export default {
    data(){
      return{
        slide: 0,
        sliding: null,
        labelList:[],
        searchVal:'',
        user:JSON.parse(localStorage.getItem('loginUser'))
      }
    },
    created(){
      var that=this
      this.$http
        .post(this.GLOBAL.rootUrl+'labels/concern',this.user)
        .then(function (response){
          that.labelList=response.data.data
        })
    },
    methods:{
      insertlabel(labelId){
        var that=this
        this.$http
          .post(this.GLOBAL.rootUrl+'labels/insertlabel',{"userId":this.user.userId,"labelId":labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelabel(labelId){
        var that=this
        this.$http
          .post(this.GLOBAL.rootUrl+'labels/deletelabel',{"userId":this.user.userId,"labelId":labelId})
          .then(function (response) {
            that.$router.go(0)
          })
      }
    },
    computed: {
      NewItems() {
        var _this = this;
        var NewItems = [];
        this.labelList.map(function (label) {
          if (label.labelsName.search(_this.searchVal)!== -1){
            NewItems.push(label);
          }
        });
        return NewItems;
      }
    }
  }
</script>

<style scoped>
  .sousuo{
    height: 70px;
  }
  .mr-sm-2{
    margin-top: 1%;
    width: 200px;
  }
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
</style>
