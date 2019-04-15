<template>
  <div>
    <v-c-header></v-c-header>
    <div class="row">
      <div class="col-md-8">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <div class="col-md-4">
        <v-author></v-author>
        <v-books></v-books>
        <v-others class="others"></v-others>
      </div>
    </div>
  </div>
</template>

<script>
  import vCHeader from '../twohead/CHeader.vue'
  import vAuthor from '../IndexRightModel/Author.vue'
  import vBooks from  '../IndexRightModel/Books.vue'
  import vOthers from '../IndexRightModel/OtherModel.vue'
  export default {
    name: "Collections",
    components:{
      vCHeader,
      vAuthor,
      vBooks,
      vOthers
    }
  }
</script>

<style scoped>
  .row{
    margin-top: 15px;
  }
  .others{
    margin-top: 20px;
  }
</style>
