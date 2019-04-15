<template>
  <div>
    <v-t-header></v-t-header>
    <div class="row">
      <div class="col-md-8">
        <div class="Xbox" v-if="user!=null">
          <img v-bind:src="user.userAvatar" class="avatar"/>
          <span class="btn" @click="dialogFormVisible = true">
            <i class="fas fa-paper-plane"></i>&nbsp;&nbsp;发沸点
          </span>
          <span class="btn">
            <a href="/write"><i class="far fa-file-alt"></i>&nbsp;&nbsp;写文章</a>
          </span>
          <span class="btn"><i class="fas fa-link"></i>&nbsp;&nbsp;分享链接</span>
        </div>
        <el-dialog title="发沸点" :visible.sync="dialogFormVisible" center>
          <el-form :model="form">
            <el-form-item>
              <el-input type="textarea" v-model="form.name" placeholder="发布动态..." id="fd"></el-input>
            </el-form-item>
            <el-form-item>
              <span class="btn"><i class="far fa-smile-beam"></i>&nbsp;表情</span>
              <span class="btn"><li class="el-icon-picture-outline"></li>&nbsp;图片</span>
              <span class="btn"><i class="fas fa-link"></i>&nbsp;链接</span>
              <span class="btn"><i class="fas fa-link"></i>&nbsp;话题</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible=false">取 消</el-button>
            <el-button type="primary" @click="dialogFormVisible=false">确 定</el-button>
          </div>
        </el-dialog>
        <div class="content">
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
      <div class="col-md-4">
        <v-register v-if="user===null"></v-register>
        <v-author></v-author>
        <!--<v-books></v-books>-->
        <v-others class="others"></v-others>
      </div>
    </div>
  </div>
</template>

<script>
  import vTHeader from '../twohead/THeader.vue'
  import vAuthor from '../IndexRightModel/Author.vue'
  // import vBooks from  '../IndexRightModel/Books.vue'
  import vOthers from '../IndexRightModel/OtherModel.vue'
  import vRegister from '../IndexRightModel/Register.vue'
  export default {
    data() {
      return {
        user:JSON.parse(localStorage.getItem('loginUser')),
        dialogFormVisible: false,
        form: {
          name: ''
        }
      }
    },
    components: {
      vTHeader,
      vAuthor,
      // vBooks,
      vOthers,
      vRegister
    }
  }
</script>

<style scoped>
  .Xbox {
    border-bottom: 1px solid #eef1f6;
    height: 50px;
    background-color: #F8F8F8;
    box-shadow: 0 0 8px rgba(0,0,0,.1);
  }
  .row{
    margin-top: 20px;
  }
  .avatar{
    width: 50px;
    height: 50px;
  }
  .btn{
    font-size: 13px;
  }
  a {
    color: #324157;
    text-decoration: none;
  }
  .content{
    margin-top: 20px;
  }
  .others{
    margin-top: 20px;
  }
</style>
