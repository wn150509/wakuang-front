<template>
    <div class="container row">
      <div class="col-md-8">
        <div>
          <el-form ref="form" :model="form" class="dt">
            <el-form-item>
              <el-input type="textarea" id="t1" v-model="form.desc" placeholder="发布动态..."></el-input>
            </el-form-item>
            <el-form-item>
              <span class="btn"><i class="far fa-comment-dots"></i>&nbsp;话题</span>
              <el-button type="primary" @click="onSubmit" id="btn">发布</el-button>
            </el-form-item>
          </el-form>
        </div>
        <v-a-header></v-a-header>
        <router-view></router-view>
      </div>

      <div class="col-md-4">
        <v-self-message></v-self-message>
        <v-author class="author"></v-author>
        <v-topic class="topic"></v-topic>
      </div>
    </div>
</template>

<script>
  import vAHeader from '../twohead/AHeader.vue'
  import vAuthor from '../IndexRightModel/Author.vue'
  import vSelfMessage from '../ActivityRightModel/SelfMessage.vue'
  import vTopic from '../ActivityRightModel/Topic.vue'
    export default {
      data() {
        return {
          form: {
            region: '',
            delivery: false,
            resource: '',
            desc: ''
          }
        }
      },
      components:{
        vAHeader,
        vAuthor,
        vSelfMessage,
        vTopic
      },
      methods: {
        onSubmit() {
          if (!this.form.desc){
            this.$message.error("请输入发布内容")
          } else {
            this.$message.success("发布成功")
          }
        }
      },
      mounted:function () {
        // $(document).ready(function(){
        //   // $('#t1').on('keyup', function(){
        //   //
        //   // });
        //   console.log("1111")
        //   $('#btn').click(function () {
        //     var v=$('#t1').val();
        //     if(!v){
        //       // $('#btn').attr('disabled', true)
        //       alert("请输入发布内容")
        //     }
        //     else{
        //       alert(v)
        //       // $('#btn').attr('disabled', false)
        //     }
        //   })
        // });
      }
    }
</script>

<style scoped>
.row{
  margin-top: 20px;
}
  .dt{
    background-color: #F8F8F8;
    padding: 10px;
    border-radius: 5px;
  }
  #btn{
    float: right;
  }
  .author{
    margin-top: 8%;
  }
  .topic{
    margin-top: 8%;
  }
</style>
