<template>
  <b-navbar toggleable="md" type="light" variant="default" class="box">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/collections/all"><span class="btn bt">全部</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/collections/ios"><span class="btn bt">iOS</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/collections/android"><span class="btn bt">Android</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/collections/frontend"><span class="btn bt">前端</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/collections/design"><span class="btn bt">设计</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/collections/product"><span class="btn bt">产品</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/collections/backend"><span class="btn bt">后端</span></router-link>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
    export default {
        name: "CHeader"
    }
</script>

<style scoped>
  a {
    color: #324157;
    text-decoration: none;
  }
  .box {
    border-bottom: 1px solid #eef1f6;
    height: 40px;
  }
  .bt{
    color: slategray;
    font-size: 15px;
  }
</style>
