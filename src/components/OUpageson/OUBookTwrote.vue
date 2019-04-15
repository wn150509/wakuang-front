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
        if(this.$route.query.type==='wrote'){
          this.text='撰写的'
        }
      },
        name: "UBookTwrote"
    }
</script>

<style scoped>

</style>
