<template>
  <div class="books" v-if="relativeArticles.length!==0">
    <div class="tou">
      <span>推荐文章</span>
    </div><hr/>
    <div class="body" v-for="p in relativeArticles">
      <a :href=" '/p/'+p.articleId">
        <div class="at"><p>{{p.articleTitle}}</p></div>
        <div class="row">
          <div class="col-md-5">
            <span v-if="p.status===1" style="color: #bd2c00">❤</span>
            <span v-else><i class="far fa-heart" ></i></span>&nbsp;{{p.likeCount}}
          </div>
          <div class="col-md-2">｜</div>
          <div class="col-md-5">
            <span class="tsdown"><i class="fas fa-comment"></i>&nbsp;{{p.commentCount}}</span>
          </div>
        </div>
      </a><hr/>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        user:JSON.parse(localStorage.getItem('loginUser')),
        id:this.$route.params.id,
        relativeArticles:[]
      }
    },
    created() {
      var that = this;
      this.$http
        .post('http://localhost:8080/articles/getRelativeArticles',{"userId":this.user.userId,"articleId":this.id})
        .then(function (response) {
          that.relativeArticles = response.data.data;
        })
    },
  }
</script>

<style scoped>
  a {
    color: #324157;
    text-decoration: none;
  }
  .books{
    margin-top: 25px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    width: 280px;
  }
  .row{
    padding: 8px;
  }
  .col-md-5{
    text-align: center;
  }
  .col-md-2{
    text-align: center;
  }
  .at{
    text-align: center;
  }
</style>
