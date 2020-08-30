<template>
  <div>
    <el-form :model="operate" ref="operate" :rules="rules">
      <el-form-item label="菜单" prop="ModuleId" :label-width="formLabelWidth">
        <el-select ref="pidsel" v-model="selectedName" placeholder="请选择">
          <el-option :value="operate.ModuleId" :label="selectedName" style="height: auto">
            <el-tree :data="modules" default-expand-all check-strictly :expand-on-click-node='false' node-key="Id" ref="tree" highlight-current :props="defaultProps" @node-click="setSelectValue"></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth" prop="Name">
        <el-input v-model="operate.Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="Action" :label-width="formLabelWidth" prop="Action">
        <el-input v-model="operate.Action" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth" prop="Type">
        <el-select v-model="operate.Type" placeholder="请选择">
          <el-option v-for="item in operateTypes" :key="item.Value" :label="item.Name" :value="item.Value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="operate.Remark"></el-input>
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
      operate: {},
      operateTypes: [],
      modules: [],
      formLabelWidth: "80px",
      rules: {
        ModuleId: [{ required: true, message: "请选择菜单", trigger: "blur" }],
        Name: [{ required: true, message: "请输入功能名称", trigger: "blur" }],
        Action: [{ required: true, message: "请输入功能Action", trigger: "blur" }],
        Type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      defaultProps: {
        children: "Children",
        label: "Name"
      },
      selectedName: '',
    };
  },
  methods: {
    detail() {
      var params = {
        Id: this.id
      }
      this.$api.operate.detail(params).then(res => {
        this.operate = res.Data;
        var node = this.$refs.tree.getNode(this.operate.ModuleId)
        this.selectedId = node.key;
        this.selectedName = node.label;
        this.$refs.tree.setCurrentKey(this.selectedId)
      })
    },
    getOperateTypes() {
      this.$api.common.getOperateTypes().then(res => {
        this.operateTypes = res.Data;
      });
    },
    getModules() {
      this.$api.common.getModules().then(res => {
        this.modules = res.Data;
        if (this.id) {
          this.detail();
        }
      });
    },
    isValid() {
      let flag = true;
      this.$refs['operate'].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      return flag;
    },
    setSelectValue(data, node) {
      if (node.childNodes.length <= 0) {
        this.operate.ModuleId = node.key
        this.selectedName = data.Name
        this.$refs.pidsel.blur();
      } else {
        if (this.operate.ModuleId)
          this.$refs.tree.setCurrentKey(this.operate.ModuleId)
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
    //this.$refs.module.resetFields();
    this.getOperateTypes();
    this.getModules();
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
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected.hover {
  background-color: #fff;
}
</style>
