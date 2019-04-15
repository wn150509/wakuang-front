<template>
  <b-navbar toggleable="md" type="light" variant="default" class="box">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item>
            <router-link to="/events/all"><span class="bt">热门活动</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/beijing"><span class="bt">北京</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/shanghai"><span class="bt">上海</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/guangzhou"><span class="bt">广州</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/shenzhen"><span class="bt">深圳</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/hangzhou"><span class="bt">杭州</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/chengdu"><span class="bt">成都</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/changsha"><span class="bt">长沙</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/chongqing"><span class="bt">重庆</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/nanjing"><span class="bt">南京</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/suzhou"><span class="bt">苏州</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/xian"><span class="bt">西安</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/xiamen"><span class="bt">厦门</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/fuzhou"><span class="bt">福州</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/events/wuhan"><span class="bt">武汉</span></router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right>
            <router-link to="/subscribe"><span class="bt">标签管理</span></router-link>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
    export default {
        name: "EHeader"
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
