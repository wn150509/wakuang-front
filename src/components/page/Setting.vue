<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <b-nav vertical>
          <b-nav-item>
            <router-link to="/settings/person">
              <div class="bat">
                <span><i class="fas fa-address-book" style="color: #777777"></i>&nbsp;&nbsp;个人资料</span>
              </div>
            </router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/settings/accountset">
              <div class="bat">
                <span><i class="fas fa-cog" style="color: #777777"></i>&nbsp;&nbsp;账号管理</span>
              </div>
            </router-link>
          </b-nav-item>
        </b-nav>
      </div>
      <div class="col-md-8">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Setting"
    }
</script>

<style scoped>
  .row{
    margin-top: 20px;
  }
  .bat{
    width: 300px;
    height: 55px;
    background-color: #C4C4C4;
    border-radius: 5px;
  }
  span{
    color: #1A1A1A;
    font-size: 18px;
    margin-left: 60px;
    line-height: 50px;
  }
  a{
    text-decoration: none;
  }
</style>
