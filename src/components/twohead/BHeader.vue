<template>
  <b-navbar toggleable="md" type="light" variant="default" class="box">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/books/all"><span class="bt">全部</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/books/frontend"><span class="bt">前端</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/books/backend"><span class="bt">后端</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/books/mobile"><span class="bt">移动开发</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/books/blockchain"><span class="bt">区块链</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/books/general"><span class="bt">通用</span></router-link>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
    export default {
        name: "BHeader"
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
