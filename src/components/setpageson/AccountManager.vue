<template>
  <div>
    <h5>永久删除账号</h5><hr/>
    <ul>
      <li>你不小心创建出了多余的帐号?</li>
      <li>你对挖矿上的某些内容、功能或社区规则不满意？</li>
      <li>删除帐号前，请确保已经没有任何公开或私密文章，且钱包中全部余额已清零。</li>
      <li class="danger">删除帐号是不可逆的操作，删除后将无法恢复。</li>
    </ul>
    <b-button variant="outline-danger sm" class="delete">删除账号</b-button>
  </div>
</template>

<script>
    export default {
        name: "AccountManager"
    }
</script>

<style scoped>
  h5{
    color: #C0C4CC;
  }
  ul li{
    margin-top: 3%;
  }
  .danger{
    color: #F56C6C;
  }
</style>
