<template>
  <div>
    <el-form :model="organization" ref="organization" :rules="rules">
      <el-form-item label="组织组" prop="PId" :label-width="formLabelWidth">
        <el-select ref="pidsel" v-model="selectedName" placeholder="请选择" :disabled='isFirst'>
          <el-option :value="organization.PId" :label="selectedName" style="height: auto">
            <el-tree :data="organizations" default-expand-all check-strictly :expand-on-click-node='false' node-key="Id" ref="tree" highlight-current :props="defaultProps" @node-click="setSelectValue"></el-tree>
          </el-option>
        </el-select>
        &nbsp;<el-checkbox v-model="isFirst" label="是否顶级组织" border @change='firstChange'></el-checkbox>
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth" prop="Type">
        <el-select v-model="organization.Type" placeholder="请选择">
          <el-option v-for="item in organizationTypes" :key="item.Value" :label="item.Name" :value="item.Value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="组织名称" :label-width="formLabelWidth" prop="Name">
        <el-input v-model="organization.Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" :label-width="formLabelWidth" prop="Telephone">
        <el-input v-model="organization.Telephone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="传真" :label-width="formLabelWidth" prop="Fax">
        <el-input v-model="organization.Fax" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="Email">
        <el-input v-model="organization.Email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="Sort">
        <el-input v-model="organization.Sort" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="organization.Remark"></el-input>
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
      organization: {
      },
      organizationTypes: [],
      organizations: [],
      formLabelWidth: "110px",
      rules: {
        Name: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        Type: [{ required: true, message: "请选择类型", trigger: "blur" }],
      },
      defaultProps: {
        children: "Children",
        label: "Name"
      },
      selectedName: '',
      isFirst: false
    };
  },
  methods: {
    detail() {
      var params = {
        Id: this.id
      }
      this.$api.organization.detail(params).then(res => {
        this.organization = res.Data;
        if (!this.organization.PId) {
          this.isFirst = true;
          return
        }
        var node = this.$refs.tree.getNode(this.organization.PId)
        this.selectedId = node.key;
        this.selectedName = node.label;
        // console.log(this.valueTitle)
        this.$refs.tree.setCurrentKey(this.selectedId)
      })
    },
    getOrganizationTypes() {
      this.$api.common.getOrganizationTypes().then(res => {
        debugger
        this.organizationTypes = res.Data;
        if (this.id) {
          this.detail();
        }
      });
    },
    getOrganizations() {
      this.$api.common.getOrganizations().then(res => {
        this.organizations = res.Data;
        this.getOrganizationTypes();
      });
    },
    firstChange(vaule) {
      if (vaule)
        this.organization.PId = null;
    },
    isValid() {
      let flag = true;
      this.$refs['organization'].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      return flag;
    },
    setSelectValue(data, node) {
      this.organization.PId = node.key
      this.selectedName = data.Name
      this.$refs.pidsel.blur();
      //let res = this.$refs.tree.getCheckedNodes(false, true); //true，1. 是否只是叶子节点 2.选择的时候不包含父节点）
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
    this.getOrganizations();
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
