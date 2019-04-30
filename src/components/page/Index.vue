<template>
  <div>
    <v-t-header></v-t-header>
    <div class="row">
      <div class="col-md-8">
        <div class="content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
      <div class="col-md-4">
        <v-register v-if="user===null"></v-register>
        <v-author></v-author>
        <v-books v-if="user!==null"></v-books>
      </div>
    </div>
  </div>
</template>

<script>
  import vTHeader from '../twohead/THeader.vue'
  import vAuthor from '../IndexRightModel/Author.vue'
  import vBooks from  '../IndexRightModel/Books.vue'
  import vRegister from '../IndexRightModel/Register.vue'
  export default {
    data() {
      return {
        user:JSON.parse(localStorage.getItem('loginUser')),
        dialogFormVisible: false,
        form: {
          name: ''
        }
      }
    },
    components: {
      vTHeader,
      vAuthor,
      vBooks,
      vRegister
    }
  }
</script>

<style scoped>
  .row{
    margin-top: 20px;
  }
  a {
    color: #324157;
    text-decoration: none;
  }
  .content{
    margin-top: 20px;
  }
</style>
