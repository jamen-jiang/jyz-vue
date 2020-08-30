<template>
  <jyz-container>
    <div slot="header">
      <el-form ref="form" :model="queryData" class="query">
        <el-form-item label="功能名称">
          <el-input size="mini" v-model="queryData.Name" placeholder="功能名称"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-button-group>
            <jyz-authorizebtn label="查询" code="Query" type="primary" icon="el-icon-search" @click="query()"></jyz-authorizebtn>
            <jyz-authorizebtn label="新增功能" code="Add" type="primary" @click="add"></jyz-authorizebtn>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <el-tree node-key="Id" :data="modules" :props="treeProps" @node-click='nodeClick' default-expand-all :expand-on-click-node='false' ref="tree" slot="aside" highlight-current></el-tree>
    <el-table ref="table" :data="operates" style="width:100%" row-key="Id" height="100%" highlight-current-row>
      <el-table-column prop="Name" label="功能名称" align="center"></el-table-column>
      <el-table-column prop="Action" label="Action" align="center"></el-table-column>
      <el-table-column prop="TypeName" label="类型" align="center"></el-table-column>
      <el-table-column prop="ModuleName" label="菜单" align="center"></el-table-column>
      <el-table-column prop="CreatedOn" label="创建日期"></el-table-column>
      <el-table-column prop="CreatedByName" label="创建人"></el-table-column>
      <el-table-column prop="Remark" label="备注" align="center"></el-table-column>
      <el-table-column prop="Id" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <jyz-authorizebtn code="Modify" type="primary" icon='el-icon-edit-outline' circle @click="modify(scope.row.Id)"></jyz-authorizebtn>
          <jyz-authorizebtn code="Disable" type="danger" icon='el-icon-delete' circle v-if="scope.row.IsEnable"></jyz-authorizebtn>
          <jyz-authorizebtn code="Enable" type="Success" icon='el-icon-refresh-left' circle v-else></jyz-authorizebtn>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" v-if='dialogFormVisible' :close-on-click-modal="false" top="0" width="400px">
      <infoview ref="infoview" :id='currentId'></infoview>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="save()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <div slot="footer">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40,50,60,70,80,90,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </jyz-container>
</template>

<script>
import { infoview } from './components'
export default {
  props: {},
  data() {
    return {
      currentId: '',
      modules: [],
      module: {},
      operates: [],
      dialogFormVisible: false,
      treeProps: {
        label: 'Name',
        children: 'Children'
      },
      queryData: {},
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
    };
  },
  methods: {
    getModules() {
      this.$api.operate.getModules({}).then(res => {
        this.modules = res.Data;
        this.query();
      })
    },
    query() {
      this.queryData.ModuleId = this.module.Id;
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        query: this.queryData
      }
      this.$api.operate.query(params).then(res => {
        this.operates = res.Data.List;
        this.totalCount = res.Data.TotalCount;
      })
    },
    modify(id) {
      this.currentId = id;
      this.dialogFormVisible = true;
    },
    add() {
      this.currentId = "";
      this.dialogFormVisible = true;
    },
    save() {
      if (!this.$refs.infoview.isValid()) {
        return;
      }
      debugger
      let operate = this.$refs.infoview.operate;
      if (operate.Id) {
        this.$api.operate.modify(operate).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.query();
        })
      } else {
        this.$api.operate.add(operate).then(res => {
          this.$message({
            message: '保存成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.query();
        })
      }
    },
    nodeClick(data, node) {
      this.module = node.data;
      this.query();
    },
    sizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    currentChange(val) {
      this.pageIndex = val;
      this.query();
    },
  },
  components: {
    infoview
  },
  computed: {},
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() { },
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() { },
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() { },
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() {
    this.getModules();
  },
  //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
  beforeUpdate() { },
  //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
  updated() { },
  //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
  beforeDestroy() { },
  //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
  destroyed() { },
  watch: {},
};
</script>

<style scoped>
.box-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.col-operate-container {
  display: flex;
  flex-direction: column;
}
.btngroup {
  padding: 20px;
}
</style>
