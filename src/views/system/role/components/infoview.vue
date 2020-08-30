<template>
  <div>
    <el-form :model="role" ref="role" :rules="rules">
      <el-form-item label="名称" :label-width="formLabelWidth" prop="Name">
        <el-input v-model="role.Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="role.Remark"></el-input>
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
      role: {},
      formLabelWidth: "120px",
      rules: {
        Name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ]
      },
    };
  },
  methods: {
    detail() {
      var params = {
        id: this.id,
      }
      this.$api.role.detail(params).then(res => {
        this.role = res.Data;
      });
    },
    isValid() {
      let flag = true;
      this.$refs['role'].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      return flag;
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
    //this.$refs["role"].resetFields();
    if (this.id) {
      this.detail();
    }
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
</style>
