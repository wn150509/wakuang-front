<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="热门" name="first">
        <div class="row" v-for="pop in popular" :key="pop.articleId">
          <div class="col-md-10">
            <div class="up">
              <img v-bind:src="pop.authorAvatar" class="avatar">
              <span class="tsup">·&nbsp;{{pop.articleAuthor}}&nbsp;·</span>
              <span class="tsup">{{pop.createTime | formatDate}}</span>
            </div>
            <div class="center">
              <a :href=" '/p/'+pop.articleId">
                <p class="tscenter">{{pop.articleTitle}}</p>
              </a>
            </div>
            <div class="down">
              <span class="tsdown"><i class="far fa-heart"></i>&nbsp;{{pop.likeCount}}</span>
              <span class="btn"></span>
              <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pop.commentCount}}</span>
            </div><hr/>
          </div>
          <div class="col-md-2" v-if="pop.articlePic!=null">
            <img v-bind:src="pop.articlePic" class="img"/>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="最新" name="second">
        <div class="row" v-for="pop in newest" :key="pop.articleId">
          <div class="col-md-10">
            <div class="up">
              <img v-bind:src="pop.authorAvatar" class="avatar">
              <span class="tsup">·&nbsp;{{pop.articleAuthor}}&nbsp;·</span>
              <span class="tsup">{{pop.createTime | formatDate}}</span>
            </div>
            <div class="center">
              <a :href=" '/p/'+pop.articleId">
                <p class="tscenter">{{pop.articleTitle}}</p>
              </a>
            </div>
            <div class="down">
              <span class="tsdown"><i class="far fa-heart"></i>&nbsp;{{pop.likeCount}}</span>
              <span class="btn"></span>
              <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pop.commentCount}}</span>
            </div><hr/>
          </div>
          <div class="col-md-2" v-if="pop.articlePic!=null">
            <img v-bind:src="pop.articlePic" class="img"/>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="third">
        <div class="row" v-for="pop in comment" :key="pop.articleId">
          <div class="col-md-10">
            <div class="up">
              <img v-bind:src="pop.authorAvatar" class="avatar">
              <span class="tsup">·&nbsp;{{pop.articleAuthor}}&nbsp;·</span>
              <span class="tsup">{{pop.createTime | formatDate}}</span>
            </div>
            <div class="center">
              <a :href=" '/p/'+pop.articleId">
                <p class="tscenter">{{pop.articleTitle}}</p>
              </a>
            </div>
            <div class="down">
              <span class="tsdown"><i class="far fa-heart"></i>&nbsp;{{pop.likeCount}}</span>
              <span class="btn"></span>
              <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{pop.commentCount}}</span>
            </div><hr/>
          </div>
          <div class="col-md-2" v-if="pop.articlePic!=null">
            <img v-bind:src="pop.articlePic" class="img"/>
          </div>

        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {formatDate} from "../../../static/js/date";
  export default {
    name: "TSubscribe",
    data() {
      return {
        activeName: 'first',
        popular: [],
        newest: [],
        comment: []
      }
    },
    created() {
      var that = this
      this.$http
        .get("http://localhost:8080/articles/type/10")
        .then(function (response) {
          that.popular = response.data.data
        })
      this.$http
        .get("http://localhost:8080/articles/type/10/time")
        .then(function (response) {
          that.newest = response.data.data
        })
      this.$http
        .get("http://localhost:8080/articles/type/10/comment")
        .then(function (response) {
          that.comment = response.data.data
        })
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
  a {
    color: #324157;
    text-decoration: none;
  }
  .img{
    width: 70px;
    height: 70px;
  }
  .tsup{
    font-size: 12px;
    color: #909399;
  }
  .tscenter{
    font-size: 20px;
    font-weight: bold;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-top: 2%;
  }
  .tsdown{
    font-size: 15px;
    color: #909399;
  }
  .row{
    margin-top: 10px;
  }
  .col-md-2{
    text-align: center;
  }
  .avatar{
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }
</style>
