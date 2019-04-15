<template>
  <div class="books">
    <div class="tou">
      <span>挖矿小册</span>
    </div><hr/>
    <div class="body">
      <div class="row" v-for="index in arr">
        <div class="col-md-4">
          <img :src="Books[index].booksAvatar" class="bookpic"/>
        </div>
        <div class="col-md-8">
          <p class="bookstitle">{{Books[index].booksTitle}}</p>
          <span class="price">￥{{Books[index].booksPrice}}</span>
        </div>
      </div>
      <div>
        <router-link to="/books/all">
          <b-button variant="outline-secondary" class="qb">
            查看全部&nbsp;&nbsp;>
          </b-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        Books: [],
        arr:[0,1,2,3]
      }
    },
    created() {
      var that = this
      this.$http
        .get('http://localhost:8080/books/type1')
        .then(function (response) {
          that.Books = response.data.data;
        })
    },
    methods:{
      replace(){
        var a = [];
        var j= 0;
        while(j<4){
          var b = Math.floor((Math.random()*this.Books.length));
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
  .bookpic{
    width: 50px;
    height: 80px;
  }
  .row{
    padding: 8px;
  }
  .qb{
    margin-top: 15px;
    width: 270px;
    height: 35px;
  }
  .price{
    color: #F56C6C;
    font-size: 15px;
  }
  .bookstitle{
    font-size: 15px;
  }
</style>
