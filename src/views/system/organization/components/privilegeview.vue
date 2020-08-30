<template>
  <div class="rolemodule">
    <el-tree ref="tree" :data="moduleOperates" :check-strictly="true" show-checkbox node-key="Id" :expand-on-click-node='false' default-expand-all :props="defaultProps" @check='check'>
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <el-checkbox-group v-model="selectedOperates" size="mini" v-if="data.Children.length<=0">
          <el-checkbox v-for="operate in data.Operates" :label="operate.Id" :key="operate.Id" :disabled="!node.checked"><i class=" el-icon-menu"></i>{{operate.Name}}</el-checkbox>
        </el-checkbox-group>
      </span>
    </el-tree>
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
      moduleOperates: [],
      defaultProps: {
        children: 'Children',
        label: 'Name'
      },
      selectedModules: [],
      selectedOperates: []
    };
  },
  methods: {
    getModuleOperates() {
      this.$api.organization.getModuleOperates().then(res => {
        this.moduleOperates = res.Data;
        if (this.id)
          this.getAuthorizeModuleOperateIds();
      });
    },
    getAuthorizeModuleOperateIds() {
      var params = {
        id: this.id
      }
      this.$api.organization.getAuthorizeModuleOperateIds(params).then(res => {
        this.selectedModules = res.Data.ModuleIds;
        this.selectedOperates = res.Data.OperateIds;
        this.$refs.tree.setCheckedKeys(this.selectedModules)
      });
    },
    getPrivilege() {
      var node = this.$refs.tree.getCheckedNodes(false, true)
      var privilege = {};
      var selectedModules = [];
      for (let i in node) {
        selectedModules.push(node[i].Id)
      }
      privilege.ModuleIds = selectedModules;
      privilege.OperateIds = this.selectedOperates;
      return privilege
    },
    check(currentObj, treeStatus) {
      // 用于：父子节点严格互不关联时，父节点勾选变化时通知子节点同步变化，实现单向关联。
      let selected = treeStatus.checkedKeys.indexOf(currentObj.Id) // -1未选中
      // 选中
      if (selected !== -1) {
        // 子节点只要被选中父节点就被选中
        this.selectedParent(currentObj)
        // 统一处理子节点为相同的勾选状态
        this.uniteChildrenSame(currentObj, true)
      } else {
        if (currentObj.Operates.length > 0) {
          this.unSelectedOperate(currentObj.Operates);
        }
        // 未选中 处理子节点全部未选中
        if (currentObj.Children.length !== 0) {
          this.uniteChildrenSame(currentObj, false)
        }
      }
    },
    //菜单取消选中去掉选中的功能
    unSelectedOperate(operates) {
      for (let i = 0, len = operates.length; i < len; i++) {
        let index = this.selectedOperates.indexOf(operates[i].Id);
        if (index !== -1) {
          this.selectedOperates.splice(index, 1);
        }
      }
    },
    // 统一处理子节点为相同的勾选状态
    uniteChildrenSame(treeList, isSelected) {
      this.$refs.tree.setChecked(treeList.Id, isSelected)
      for (let i = 0; i < treeList.Children.length; i++) {
        this.uniteChildrenSame(treeList.Children[i], isSelected)
      }
    },
    // 统一处理父节点为选中
    selectedParent(currentObj) {
      let currentNode = this.$refs.tree.getNode(currentObj)
      if (currentNode.parent.key !== undefined) {
        this.$refs.tree.setChecked(currentNode.parent, true)
        this.selectedParent(currentNode.parent)
      }
    },
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
    this.getModuleOperates();
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
<style lang='scss' scoped>
.el-checkbox-group {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  .el-checkbox {
    margin: 5px 0px;
    margin-right: 0px;
    margin-left: 20px;
  }
}
</style>
<style lang='scss'>
.rolemodule {
  .el-tree-node__content {
    align-items: normal;
    height: auto;
    padding: 5px 0px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .el-tree-node.is-current > .el-tree-node__content {
    background: #f5f7fa;
    color: #606266;
    .el-checkbox {
      color: #606266;
    }
  }
}
</style>
