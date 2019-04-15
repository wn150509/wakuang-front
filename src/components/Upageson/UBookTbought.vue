<template>
    <div>
      <h3>{{text}}</h3>
    </div>
</template>

<script>
  export default {
    data: function () {
      return {
        text:''
      }
    },
    created () {
      if(this.$route.query.type==='bought'){
        this.text = '购买的'
      }
    },
    name: "UBookTbought"
  }
</script>

<style scoped>

</style>
