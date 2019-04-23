<template>
  <div class="huati">
    <div v-if="topicedList.length!==0">
      <h4>我关注的话题</h4>
      <div class="row">
        <div class="col-md-4 dange" v-for="topiced in topicedList" :key="topiced.topicId">
          <div class="row">
            <div class="col-md-4">
              <img v-bind:src="topiced.topicUrl" class="topicUrl">
            </div>
            <div class="col-md-8">
              <a :href="'#'">
                <div class="topicName">{{topiced.topicName}}</div>
              </a>
              <div class="count"><span>{{topiced.fansCount}}</span>关注·<span>{{topiced.pinsCount}}</span>沸点</div>
              <div>
                <span class="yiguan" @click="deleteTopic(topiced.topicId)">已关注</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <h4>全部话题</h4>
    <div class="row">
      <div class="col-md-4 dange" v-for="topic in topicList" :key="topic.topicId">
        <div class="row">
          <div class="col-md-4">
              <img v-bind:src="topic.topicUrl" class="topicUrl">
          </div>
          <div class="col-md-8">
            <a :href="'#'">
              <div class="topicName">{{topic.topicName}}</div>
            </a>
            <div class="count"><span>{{topic.fansCount}}</span>关注·<span>{{topic.pinsCount}}</span>沸点</div>
            <div>
              <span class="guanzhu" v-if="topic.status===0" @click="insertTopic(topic.topicId)">＋&nbsp;关注</span>
              <span class="yiguan" v-else @click="deleteTopic(topic.topicId)">已关注</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        user:JSON.parse(localStorage.getItem("loginUser")),
        topicList:[],
        topicedList:[],
        guangzhu:0
      }
    },
    created:function(){
      var that=this;
      this.$http
        .post("http://localhost:8080/topics/all",this.user)
        .then(function(res) {
          that.topicList=res.data.data;
          for(var i=0;i<res.data.data.length;i++){
            if(res.data.data[i].status===1){
              that.topicedList.unshift(res.data.data[i])
            }
          }
        })
    },
    methods:{
      insertTopic(topicId){
        var that=this
        this.$http
          .post("http://localhost:8080/topics/inserttopic",{"userId":this.user.userId,"topicId":topicId})
          .then(function (res) {
            that.$router.go(0)
          })
      },
      deleteTopic(topicId){
        var that=this
        this.$http
          .post("http://localhost:8080/topics/deletetopic",{"userId":this.user.userId,"topicId":topicId})
          .then(function (res) {
            that.$router.go(0)
          })
      }
    }
  }
</script>

<style scoped>
  a{
    color: slategray;
    text-decoration: none;
  }
  h4{
    font-weight: bold;
  }
  .huati{
    margin-top: 5%;
  }
  .topicUrl{
    width: 80px;
    height: 80px;
    border-radius: 5px;
  }
  .dange{
    padding: 15px;
  }
  .topicName{
    font-size: 18px;
    font-weight: bold;
  }
  .count{
    font-size: 14px;
    color: #909399;
  }
  .yiguan{
    font-size: 14px;
    color: #909399;
  }
  .guanzhu{
    color: #67C23A;
    font-size: 14px;
  }
</style>
