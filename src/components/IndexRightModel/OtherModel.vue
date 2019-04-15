<template>
  <div class="other">
    <div class="row">
      <div class="col-md-4">
        <img src="/static/img/collection.png"/>
      </div>
      <div class="col-md-8">
        <router-link to="/collections"><p>收藏集</p></router-link>
      </div>
    </div>
  </div>

</template>

<script>
    export default {
        name: "OtherModel"
    }
</script>

<style scoped>
  .row{
    padding: 10px;
  }
  .other{
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
    width: 280px;
  }
  img{
    width: 50px;
    height: 50px;
  }
  .col-md-8{
    line-height: 40px;
  }
  a {
    color: #324157;
    text-decoration: none;
  }
</style>
