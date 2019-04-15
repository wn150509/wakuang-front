<template>
  <div>
    <v-search-header></v-search-header>
    <div class="row">
      <div class="col-md-2"></div>
      <div class="col-md-8 ">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
      <div class="col-md-8"></div>
    </div>
  </div>
</template>

<script>
  import vSearchHeader from '../twohead/SearchHeader.vue'
  export default {
    name: "Search",
    components: {
      vSearchHeader
    }
  }
</script>

<style scoped>

</style>
