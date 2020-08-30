<template>
  <div>
    <el-form :model="user" ref="user" :rules="rules" :label-width="formLabelWidth">
      <el-form-item label="用户名" prop="Name">
        <el-input v-model="user.Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户账号" prop="UserName">
        <el-input v-model="user.UserName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="MobilePhone">
        <el-input v-model="user.MobilePhone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="Email">
        <el-input v-model="user.Email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="Gender">
        <el-radio-group v-model="user.Gender">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save()" size="mini">保 存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      timer: '',
      user: {},
      formLabelWidth: "120px",
      rules: {
        Name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        UserName: [
          { required: true, message: "用户账号不能为空", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    detail() {
      if (this.id) {
        clearInterval(this.timer);
        var params = {
          id: this.id,
        }
        this.$api.user.detail(params).then(res => {
          this.user = res.Data;
        });
      }
    },
    save() {
      if (this.$refs['user'].validate) {
        this.$api.user.modifyProfile(this.user).then(res => {
          this.$message({
            showClose: true,
            message: '用户信息修改成功',
            type: 'success'
          });
        });
      }
    }
  },
  components: {

  },
  computed: {

  },
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() {

  },
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() {

  },
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() {

  },
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() {
    this.timer = setInterval(() => {
      this.detail();
    }, 1000);
  },
  //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
  beforeUpdate() {

  },
  //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
  updated() {

  },
  //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
  beforeDestroy() {

  },
  //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
  destroyed() {

  },
  watch: {

  },
};
</script>

<style scoped>
.el-select {
  display: block;
}
</style>
