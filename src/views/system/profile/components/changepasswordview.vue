<template>
  <div>
    <el-form :model="passwordForm" ref="passwordForm" :rules="rules" :label-width="formLabelWidth">
      <el-form-item label="旧密码" prop="OldPassWord">
        <el-input type="password" v-model="passwordForm.OldPassWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="NewPassWord">
        <el-input type="password" v-model="passwordForm.NewPassWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="NewPassWordConfirm">
        <el-input type="password" v-model="passwordForm.NewPassWordConfirm" autocomplete="off"></el-input>
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
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordForm.NewPassWordConfirm !== '') {
          this.$refs.passwordForm.validateField('NewPassWordConfirm');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.NewPassWord) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      passwordForm: {
        OldPassWord: '',
        NewPassWord: '',
        NewPassWordConfirm: '',
      },
      OldPassWord: '',
      NewPassWord: '',
      NewPassWordConfirm: '',
      formLabelWidth: "120px",
      rules: {
        OldPassWord: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        NewPassWord: [
          { validator: validatePass, trigger: 'blur' },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
        NewPassWordConfirm: [
          { validator: validatePass2, trigger: 'blur' },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    save() {
      this.$refs['passwordForm'].validate((valid) => {
        if (valid) {
          this.$api.user.changePassWord(this.passwordForm).then(res => {
            this.$message({
              showClose: true,
              message: '密码修改成功',
              type: 'success'
            });
          });
        }
      }
      )
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
