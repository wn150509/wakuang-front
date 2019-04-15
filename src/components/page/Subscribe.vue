<template>
    <div>
      <v-s-header></v-s-header>
      <div>
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
</template>

<script>
  import vSHeader from '../twohead/SHeader.vue'
  export default {
    name: "Subscribe",
    components:{
      vSHeader
    }
  }
</script>

<style scoped>

</style>
