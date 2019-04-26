<template>
  <b-navbar toggleable="md" type="light" variant="default" class="box">
    <div class="container">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <router-link to="/">
        <b-navbar-brand>
          <b-img width="100" height="50" src="/static/img/wk.png"/>
        </b-navbar-brand>
      </router-link>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>

          <b-nav-item>
            <span class="btn bt"></span>
            <router-link to="/timeline/subscribe"><span class="btn bt">首页</span></router-link>
          </b-nav-item>

          <b-nav-item>
            <span class="btn bt"></span>
            <router-link to="/activities"><span class="btn bt">动态</span></router-link>
          </b-nav-item>

          <b-nav-item>
            <span class="btn bt"></span>
            <router-link to="/topics"><span class="btn bt">话题</span></router-link>
          </b-nav-item>

          <!--<b-nav-item>-->
            <!--<router-link to="/repos"><span class="btn bt">开源库</span></router-link>-->
          <!--</b-nav-item>-->

          <!--<b-nav-item>-->
            <!--<router-link to="/events"><span class="btn bt">活动</span></router-link>-->
          <!--</b-nav-item>-->
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2 search-input" type="text" placeholder="搜索挖矿" v-model="searchValue"/>
            <font-awesome-icon @click="search" icon="search" style="color: #999;font-size: 20px;margin-left:-30px;"/>
          </b-nav-form>
          <span class="btn"></span><span class="btn"></span>

          <a class="btn write-btn" href="/write" v-if="user!=null">写文章</a>

          <a class="btn" v-if="user===null" @click="open5">
            <i class="far fa-file-alt"></i>&nbsp;写文章
          </a>
          <span class="btn" v-if="user===null">│</span>
          <b-nav-item v-if="user===null">
            <router-link to="/sign_in">登录</router-link>
            <span>·</span>
            <router-link to="/sign_up">注册</router-link>
          </b-nav-item>

          <b-nav-item-dropdown right v-if="user!=null">
            <template slot="button-content">
              <b-img rounded="circle" width="35" height="35" :src="user.userAvatar"/>
            </template>
            <b-dropdown-item>
              <router-link to="/write">
                <li class="el-icon-edit" style="color: #C0C4CC"></li>&nbsp;&nbsp;写文章
              </router-link>
            </b-dropdown-item><hr/>
            <!--<b-dropdown-item>-->
              <!--<router-link to="/editor/drafts">-->
                <!--<li class="el-icon-document" style="color: #C0C4CC"></li>&nbsp;&nbsp;草稿-->
              <!--</router-link>-->
            <!--</b-dropdown-item>-->

            <b-dropdown-item>
              <router-link :to=" '/user/'+user.userId+'/posts'"><i class="fas fa-user" style="color:#C0C4CC"></i>&nbsp;&nbsp;我的主页</router-link>
            </b-dropdown-item>
            <b-dropdown-item>
              <router-link :to=" '/user/'+user.userId+ '/likes'">
                <i class="far fa-heart" style="color:#C0C4CC"></i>&nbsp;&nbsp;我赞过的
              </router-link>
            </b-dropdown-item>
            <!--<b-dropdown-item>-->
              <!--<router-link :to=" '/user/'+user.userId+'/collections'">-->
                <!--<i class="el-icon-star-on" style="color: #C0C4CC"></i>&nbsp;&nbsp;我的收藏集-->
              <!--</router-link>-->
            <!--</b-dropdown-item>-->
            <!--<b-dropdown-item>-->
              <!--<router-link :to=" '/user/'+user.userId+'/books'">-->
                <!--<li class="el-icon-goods" style="color: #C0C4CC"></li>&nbsp;&nbsp;已购-->
              <!--</router-link>-->
            <!--</b-dropdown-item>-->
            <b-dropdown-item>
              <router-link to="/subscribe">
                <i class="fas fa-tag" style="color: #C0C4CC"></i>&nbsp;&nbsp;标签管理
              </router-link>
            </b-dropdown-item><hr/>
            <b-dropdown-item>
              <router-link to="/settings">
                <i class="fas fa-cog" style="color: #C0C4CC"></i>&nbsp;&nbsp;设置
              </router-link>
            </b-dropdown-item>
            <!--<b-dropdown-item>-->
              <!--<el-dropdown>-->
              <!--<span class="el-dropdown-link">-->
                <!--<li class="el-icon-info"></li>&nbsp;&nbsp;关于-->
                <!--<i class="el-icon-arrow-right el-icon&#45;&#45;right"></i>-->
              <!--</span>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                  <!--<el-dropdown-item>下载应用</el-dropdown-item>-->
                  <!--<el-dropdown-item>关于</el-dropdown-item>-->
                  <!--<el-dropdown-item>加入我们</el-dropdown-item>-->
                  <!--<el-dropdown-item>翻译计划</el-dropdown-item>-->
                  <!--<el-dropdown-item>合作伙伴</el-dropdown-item>-->
                <!--</el-dropdown-menu>-->
              <!--</el-dropdown>-->
            <!--</b-dropdown-item><hr/>-->
            <b-dropdown-item  @click="logout">
              <i class="fas fa-sign-out-alt" style="color: #C0C4CC"></i>&nbsp;&nbsp;登出
            </b-dropdown-item>

          </b-nav-item-dropdown>

        </b-navbar-nav>

      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'jquery/dist/jquery.min'
  import 'bootstrap/dist/js/bootstrap.min'
  import bus from '../commons/bus'
  export default {
    data() {
      return {
        user: JSON.parse(localStorage.getItem('loginUser')),
        dialogFormVisible: false,
        form: {
          name: ''
        },
        searchValue:''
      };
    },
    methods: {
      logout() {
        this.$router.push("/");
        localStorage.removeItem('loginUser');
        this.$router.go(0);
      },
      open5() {
        this.$alert('请先登陆！', '提示', {
          dangerouslyUseHTMLString: true
        });
      },
      search(){
        if(this.searchValue===''){
          this.$message.error("请输入搜索内容！！！")
        } else {
          this.$router.push("/search");
          bus.$emit('key',this.searchValue)
        }
      }
    },
    mounted:function () {
      $('.bt').hover(function(){
        $(this).addClass('bian');
      },function(){
        $(this).removeClass('bian');
      });
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
    height: 55px;
  }
  .search-input {
    padding: 0 40px 0 20px;
    width: 160px;
    height: 35px;
    font-size: 14px;
    border: 1px solid #EEEEEE;
    background: #EEEEEE;
  }
  .bt{
    color: slategray;
  }
  .bian{
    color: #409EFF;
  }
  .write-btn {
    float: right;
    width: 100px;
    height: 40px;
    line-height: 24px;
    margin: 8px 15px 0;
    border-radius: 20px;
    font-size: 15px;
    color: #fff;
    background-color: #409EFF;
  }
</style>
