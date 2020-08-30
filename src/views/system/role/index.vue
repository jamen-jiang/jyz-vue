<template>
  <jyz-container>
    <div slot="header">
      <el-form ref="form" :model="queryData" class="query">
        <el-form-item label="角色名称">
          <el-input size="mini" v-model="queryData.Name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-button-group>
            <jyz-authorizebtn label="查询" code="Query" type="primary" icon="el-icon-search" @click="query()"></jyz-authorizebtn>
            <jyz-authorizebtn label="新增" code="AddRole" type="primary" icon="el-icon-plus"></jyz-authorizebtn>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="roles" row-key="Id" height='100%'>
      <el-table-column prop="Name" label="角色名称"></el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
      <el-table-column prop="CreatedOn" label="创建日期"></el-table-column>
      <el-table-column prop="CreatedByName" label="创建人"></el-table-column>
      <el-table-column prop="Id" label="操作" width="300" fixed="right">
        <template slot-scope="scope">
          <jyz-authorizebtn code="Modify" type="primary" icon='el-icon-edit-outline' circle @click="modifyRole(scope.row.Id)"></jyz-authorizebtn>
          <jyz-authorizebtn code="Remove" type="danger" icon='el-icon-delete' circle></jyz-authorizebtn>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" v-if='dialogFormVisible' :close-on-click-modal="false" top="0">
      <el-tabs value="info" type="border-card" v-model='tabValue'>
        <el-tab-pane label="基本信息" name="info">
          <infoview ref="infoview" :id='currentId'></infoview>
        </el-tab-pane>
        <el-tab-pane label="用户" name="user">
          <userview ref="userview" :id='currentId'></userview>
        </el-tab-pane>
        <el-tab-pane label="权限" name="privilege">
          <privilegeview ref="privilegeview" :id='currentId'></privilegeview>
        </el-tab-pane>
      </el-tabs>
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
import { infoview, userview, privilegeview } from './components'
export default {
  props: {},
  data() {
    return {
      roles: [],
      currentId: '',
      user: {},
      dialogFormVisible: false,
      formLabelWidth: "120px",
      rules: {
        Name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        UserName: [
          { required: true, message: "请输入用户账号", trigger: "blur" },
          { min: 5, max: 20, message: "长度在 5 到 20 个字符", trigger: "blur" }
        ]
      },
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      tabValue: 'info',
      queryData: {}
    };
  },
  methods: {
    query() {
      var data = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        query: this.queryData
      }
      this.$api.role.query(data).then(res => {
        this.roles = res.Data.List;
        this.totalCount = res.Data.TotalCount;
      });
    },
    modifyRole(id) {
      this.currentId = id;
      this.dialogFormVisible = true;
    },
    save() {
      if (!this.$refs.infoview.isValid()) {
        this.tabValue = 'info';
        return;
      }
      let role = this.$refs.infoview.role;
      let roleUsers = this.$refs.userview.roleUsers;
      let userIds = [];
      roleUsers.forEach(item => {
        userIds.push(item.Id)
      })
      let privilege = this.$refs.privilegeview.getPrivilege();
      let data = {
        Role: role,
        Id: this.currentId,
        UserIds: userIds,
        ModuleIds: privilege.ModuleIds,
        OperateIds: privilege.OperateIds,
      }
      this.$api.role.modify(data).then(res => {
        this.$message({
          showClose: true,
          message: '角色信息修改成功',
          type: 'success'
        });
        this.dialogFormVisible = false;
        this.query();
      });
    },
    sizeChange(val) {
      this.pageSize = val;
      this.query();
    },
    currentChange(val) {
      this.pageIndex = val;
      this.query();
    }
  },
  components: {
    infoview, userview, privilegeview
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
    this.query();
  },
  //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
  beforeUpdate() { },
  //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
  updated() { },
  //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
  beforeDestroy() { },
  //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
  destroyed() { },
  watch: {}
};
</script>

<style scoped>
.el-dialog {
  width: 500px;
}
</style>
