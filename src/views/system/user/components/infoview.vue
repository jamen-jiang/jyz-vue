<template>
  <div>
    <el-form :model="user" ref="user" :rules="rules">
      <el-form-item label="组织(可多选)" prop="OrganizationIds" :label-width="formLabelWidth">
        <el-select ref="pidsel" v-model="selectedName" placeholder="请选择" multiple>
          <el-option :value="user.OrganizationIds" style="height: auto">
            <el-tree :data="organizations" default-expand-all check-strictly :expand-on-click-node='false' node-key="Id" ref="tree" :props="defaultProps" @check-change="setSelectValue" show-checkbox></el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户名称" :label-width="formLabelWidth" prop="Name">
        <el-input v-model="user.Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户账号" :label-width="formLabelWidth" prop="UserName">
        <el-input v-model="user.UserName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="user.Remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getCurrentAndParent, treeToList } from '@/utils';
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      user: {},
      organizations: [],
      formLabelWidth: "120px",
      rules: {
        OrganizationIds: [{ required: true, message: "请选择组织", trigger: "blur" }],
        Name: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 20 个字符", trigger: "blur" }
        ],
        UserName: [
          { required: true, message: "用户名称不能为空", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "Children",
        label: "Name"
      },
      selectedName: []
    };
  },
  methods: {
    detail() {
      var params = {
        id: this.id,
      }
      this.$api.user.detail(params).then(res => {
        this.user = res.Data;
        // this.user.OrganizationIds.forEach(item => {
        //   var node = this.$refs.tree.getNode(item)
        //   if (node) {
        //     //this.selectedId.push(node.key);
        //     this.selectedName.push(node.label);
        //   }
        // })
        this.$refs.tree.setCheckedKeys(this.user.OrganizationIds);
        // if (node) {
        //   this.selectedId = node.key;
        //   this.selectedName = node.label;
        //   this.$refs.tree.setCurrentKey(this.selectedId)
        // }
      });
    },
    getOrganizations() {
      this.$api.common.getOrganizations().then(res => {
        this.organizations = res.Data;
        if (this.id) {
          this.detail();
        }
      });
    },
    isValid() {
      let flag = true;
      this.$refs['user'].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      return flag;
    },
    setSelectValue(node, isChecked) {
      this.user.OrganizationIds = [];
      this.selectedName = [];
      var list = this.$refs.tree.getCheckedNodes(this.user.OrganizationId);
      list.forEach(item => {
        var outList = [];
        var organizations = []
        treeToList(this.organizations, organizations);
        getCurrentAndParent(organizations, outList, item);
        let selectedName = '';
        outList.forEach(obj => {
          selectedName = obj.Name + '-' + selectedName;
        })
        if (selectedName)
          selectedName = selectedName.substring(0, selectedName.length - 1);
        this.user.OrganizationIds.push(item.Id)
        this.selectedName.push(selectedName)
      })
      // if (node.childNodes.length <= 0) {
      //   this.user.DepartmentId = node.key
      //   this.selectedName = data.Name
      //   this.$refs.pidsel.blur();
      // } else {
      //   if (this.user.DepartmentId)
      //     this.$refs.tree.setCurrentKey(this.user.DepartmentId)
      // }
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
.el-select {
  display: block;
}
</style>
