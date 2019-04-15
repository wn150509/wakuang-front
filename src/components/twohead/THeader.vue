<template>
  <b-navbar toggleable="md" type="light" variant="default" class="box">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item v-if="user!=null">
            <router-link to="/timeline/subscribe"><span class="bt">我的关注</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/android"><span class="bt">Android</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/frontend"><span class="bt">前端</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/ios"><span class="bt">iOS</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/backend"><span class="bt">后端</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/design"><span class="bt">设计</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/product"><span class="bt">产品</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/freebie"><span class="bt">工具资源</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/article"><span class="bt">阅读</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/ai"><span class="bt">人工智能</span></router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/timeline/devops"><span class="bt">运维</span></router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item right v-if="user!=null">
            <router-link to="/subscribe"><span class="bt">标签管理</span></router-link>
          </b-nav-item>

          <b-nav-item right v-if="user===null">
            <router-link to="/subscribe"><span class="bt">全部标签</span></router-link>
          </b-nav-item>
        </b-navbar-nav>

      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
    export default {
      name: "THeader",
      data() {
        return {
          activeIndex: '1',
          user: JSON.parse(localStorage.getItem('loginUser'))
        };
      }
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
