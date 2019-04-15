<template>
  <div class="container">
    <div class="row books" v-for="books in booksList" :key="books.booksId">
      <div class="col-md-4">
        <img v-bind:src="books.booksAvatar" class="bookspic">
      </div>
      <div class="col-md-8">
        <h5>{{books.booksTitle}}</h5>
        <p class="booksinfo">{{books.booksInfo}}</p>
        <div>
          <img v-bind:src="books.authorAvatar" class="avatar">
          <span class="authorname">{{books.authorName}}</span>
          <span class="authorposit">{{books.authorPosition}}</span>
        </div>
        <div>
          <p class="price">¥{{books.booksPrice}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        booksList:[]
      }
    },
    created(){
      var that=this
      this.$http
        .get('http://localhost:8080/books/type3')
        .then(function (response) {
          that.booksList=response.data.data
        })
    }
  }
</script>

<style scoped>
  .bookspic{
    width: 100px;
    height: 150px;
    margin-left: 80px;
    box-shadow: 1px 1px 30px rgba(0,0,0,.1);
  }
  .books{
    padding: 15px;
  }
  .booksinfo{
    font-size: 15px;
    color: grey;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .avatar{
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
  .authorname{
    font-size: 13px;
    margin-left: 1%;
  }
  .authorposit{
    font-size: 13px;
    color: #909399;
    margin-left: 2%;
  }
  .price{
    font-size: 20px;
    color:#E6A23C ;
  }
</style>
