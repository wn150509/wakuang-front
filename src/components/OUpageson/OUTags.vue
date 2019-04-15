<template>
  <div>
    <el-tabs v-model="activeName" tab-position="left" style="margin-top: 20px">
      <el-tab-pane label="关注了" name="first">关注了</el-tab-pane>
      <el-tab-pane label="关注者" name="second">关注者</el-tab-pane>
      <el-tab-pane label="关注标签" name="third">
        <div class="container">
          <div class="row" v-for="labels in labelList" :key="labels.labelsId" v-if="labels.status==1">
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
        activeName: 'third',
        labelList:[]
      };
    },
    created(){
      var that=this
      this.$http
        .post('http://localhost:8080/labels/concern',{"userId":this.$route.params.id})
        .then(function (response) {
          that.labelList=response.data.data
        })
    },
    methods: {
      deletelabel(labelId) {
        var that = this
        this.$http
          .post('http://localhost:8080/labels/deletelabel', {"userId": this.$route.params.id, "labelId": labelId})
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
</style>
