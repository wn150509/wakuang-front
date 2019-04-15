<template>
  <div>
    <div v-if="articles.length===0">
      <h3>列表为空</h3>
    </div>
    <div v-else>
      <div class="row" v-for="pop in articles" :key="pop.articleId">
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
    </div>

  </div>
</template>

<script>
  import bus from '../commons/bus';
  import {formatDate} from "../../../static/js/date";
  export default {
    name: "ArticlesPage",
    data(){
      return{
        key:'',
        articles:[]
      }
    },
    created(){
      bus.$on('key',keyValue => {
        this.key=keyValue;
        var that=this;
        this.$http
          .post("http://localhost:8080/articles/queryarticle",{"articleTitle":this.key})
          .then(function (res) {
            that.articles=res.data.data;
            console.log(that.articles)
          })
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
  h3{
    text-align: center ;
  }
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
