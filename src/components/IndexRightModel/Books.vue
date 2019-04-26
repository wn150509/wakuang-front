<template>
  <div class="books">
    <div class="tou">
      <span>热门标签</span>
    </div><hr/>
    <div class="body">
      <div class="row" v-for="index in arr">
        <div class="col-md-4">
          <a :href="'/tag/'+Labels[index].labelsId">
            <img :src="Labels[index].labelsUrl" class="labelUrl"/>
          </a>
        </div>
        <div class="col-md-8">
          <p class="labelName">{{Labels[index].labelsName}}</p>
        </div>
      </div>
      <div class="down">
        <router-link to="/subscribe">
          <b-button variant="outline-secondary" class="qb">查看全部&nbsp;&nbsp;></b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Labels: [],
        arr:[0,1,2,3]
      }
    },
    created() {
      var that = this
      this.$http
        .get('http://localhost:8080/labels/all')
        .then(function (response) {
          that.Labels = response.data.data;
        })
    },
    methods:{
      replace(){
        var a = [];
        var j= 0;
        while(j<4){
          var b = Math.floor((Math.random()*this.Labels.length));
          if(a.indexOf(b)===-1){
            a.push(b);
            j++;
          }
        }
        this.arr = a;
      }
    }
  }
</script>

<style scoped>
  .books{
    margin-top: 25px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    width: 280px;
  }
  .labelUrl{
    width: 55px;
    height: 55px;
    border-radius: 50%;
  }
  .col-md-8 p{
    font-size: 18px;
    font-weight: bold;
    margin-top: 5%;
  }
  .row{
    padding: 8px;
  }
  .qb{
    width: 200px;
    height: 35px;
    margin-bottom: 10px;
  }
  .down{
    text-align: center;
  }
</style>
