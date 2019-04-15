<template>
  <b-navbar toggleable="md" type="light" variant="default" class="box">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <p class="btn bt"></p>
            <router-link to="/search/articles"><span class="bt">文章</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <p class="btn bt"></p>
            <router-link to="/search/labels"><span class="bt">标签</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <p class="btn bt"></p>
            <router-link to="/search/users"><span class="bt">用户</span></router-link>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
  import Picker from "element-ui/packages/date-picker/src/picker";
  export default {
    components: {Picker}
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
