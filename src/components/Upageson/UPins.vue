<template>
  <div>
    <div  v-if="PinVo.length===0" style="text-align: center;line-height: 200px ">
      (⊙﹏⊙)您 还 未 发 布 沸 点(⊙﹏⊙)
    </div>
    <div class="container" v-else>
      <div v-for="pinvo in PinVo" :key="pinvo.pinStatus.pinId" class="pinvo">
        <div class="row">
          <div class="col-md-10">
            <img v-bind:src="pinvo.userStatus.userAvatar" class="avatar">
            <span class="tsup">·&nbsp;{{pinvo.userStatus.userName}}&nbsp;·</span>
            <span class="tsup">{{pinvo.pinStatus.createTime | formatDate}}</span>
          </div>
          <div class="col-md-2" v-if="pinvo.userStatus.userId!==user.userId">
            <button class="guanzhu2" v-if="pinvo.userStatus.status===1" @click="deleteuser(pinvo.userStatus.userId)">已关注</button>
            <button class="guanzhu1" v-else @click="insertuser(pinvo.userStatus.userId)">关注</button>
          </div>
        </div>
        <div>
          <p class="pinContent">{{pinvo.pinStatus.pinContent}}</p>
        </div>
        <div v-if="pinvo.pinStatus.pinUrl!==null" class="Dpurl">
          <img v-bind:src="pinvo.pinStatus.pinUrl" class="pinUrl">
        </div>
        <span class="btn"></span>
        <div>
          <el-button type="primary" size="mini" plain round>{{pinvo.topics.topicName}}</el-button>
        </div>
        <div>
          <span class="tsdown">
              <span @click="deletelike(pinvo.pinStatus.pinId)" v-if="pinvo.pinStatus.status===1" style="color: #bd2c00">❤</span>
              <span v-else @click="insertlike(pinvo.pinStatus.pinId)"><i class="far fa-heart" ></i>
              </span>&nbsp;{{pinvo.pinStatus.likeCount}}</span>
          <span class="btn"></span>
          <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pinvo.pinStatus.commentCount}}</span>
        </div><hr/>
      </div>
    </div>

  </div>
</template>

<script>
  import {formatDate} from "../../../static/js/date";
  export default {
    name: "APosts",
    data(){
      return{
        user:JSON.parse(localStorage.getItem('loginUser')),
        PinVo:[]
      }
    },
    created(){
      var that=this;
      this.$http
        .post(this.GLOBAL.rootUrl+"pin/getUserPins",{"userId":this.user.userId})
        .then(function (res) {
          that.PinVo=res.data.data;
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
      },
      insertlike(pinId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'pin/insertPinUser',{"userId":this.user.userId,"pinId":pinId})
          .then(function (response) {
            that.$router.go(0)
          })
      },
      deletelike(pinId){
        var that=this;
        this.$http
          .post(this.GLOBAL.rootUrl+'pin/deletePinUser',{"userId":this.user.userId,"pinId":pinId})
          .then(function (response) {
            that.$router.go(0)
          })
      }
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style scoped>
  .pinvo{
    margin-top: 4%;
  }
  .avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
  .tsup{
    font-size: 12px;
    color: #909399;
  }
  .guanzhu1{
    width: 60px;
    height: 28px;
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
    width: 60px;
    height: 28px;
    border-radius: 5%;
    margin-top: 18%;
    color: white;
    overflow: hidden;
    padding: 0;
    text-transform: uppercase;
    cursor: pointer;
    background-color: #67C23A;
  }
  .pinContent{
    font-size: 18px;
    color: black;
    text-indent: 30px;
  }
  .pinUrl{
    width: 150px;
    height: 200px;
    border-radius: 5%;
  }
  .Dpurl img{
    cursor: pointer;
    transition: all 1s; /* 所有的属性变化在1s的时间段内完成 */
  }
  .Dpurl img:hover{
    transform: scale(2); /* 鼠标放到图片上的时候图片按比例放大2倍   */
  }
  .tsdown{
    font-size: 15px;
    color: #909399;
  }
</style>
