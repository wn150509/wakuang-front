<template>
  <div class="zuozhe">
    <div class="H">
      <span>作者相关</span>
    </div><hr/>
    <div class="msg">
      <div class="row">
        <div class="col-md-4">
          <img :src="Article.userStatus.userAvatar" class="avatar"/>
        </div>
        <div class="col-md-8">
          <p class="name">{{Article.userStatus.userName}}</p>
          <p class="description">{{Article.userStatus.description}}</p>
        </div>
      </div><hr/>
      <div class="row">
        <div class="col-md-3 down">
          <p class="u">沸点</p>
          <p class="d">{{messageCount.pinCount}}</p>
        </div>
        <div class="col-md-3 down">
          <p class="u">专栏</p>
          <p class="d">{{messageCount.articleCount}}</p>
        </div>
        <div class="col-md-3 down">
          <p class="u">关注</p>
          <p class="d">{{messageCount.userConcernCount}}</p>
        </div>
        <div class="col-md-3 down">
          <p class="u">关注者</p>
          <p class="d">{{messageCount.userConcernedCount}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        id:this.$route.params.id,
        Article:{},
        user:JSON.parse(localStorage.getItem('loginUser')),
        messageCount:{}
      }
    },
    created:function () {
      var that=this;
      this.$http
        .post(this.$baseUrl+"articles/oneArticle",{"userId":this.user.userId,"articleId":this.id})
        .then(function (res) {
          that.Article=res.data.data;
        });
      this.$http
        .get(this.$baseUrl+"user/article/"+this.id)
        .then(function (res) {
          that.messageCount=res.data.data;
        });
    },
    methods:{

    }
  }
</script>

<style scoped>
  .H{
    display: inline-block;
    margin-left: 10px;
  }
  .zuozhe{
    width: 280px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .msg{
    background-color: #F8F8F8;
    width: 280px;
  }
  .avatar{
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
  .name{
    font-size: 18px;
    font-weight: bold;
  }
  .description{
    font-size: 15px;
    font-weight: lighter;
    color: #969896;
  }
  .down{
    text-align: center;
  }
  .u{
    font-size: 15px;
    color: #666666;
  }
  .d{
    font-size: 20px;
    font-weight: bold;
  }
</style>
