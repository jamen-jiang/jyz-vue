<template>
  <jyz-container>
    <div slot="header">
      <el-form ref="form" :model="queryData" class="query">
        <el-form-item label="用户名">
          <el-input size="mini" v-model="queryData.Name" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item label="用户账号">
          <el-input size="mini" v-model="queryData.UserName" placeholder="用户账号"></el-input>
        </el-form-item>
        <el-form-item label="创建日期">
          <el-date-picker size="mini" v-model="queryData.CreatedOnStart" type="date" placeholder="开始日期"></el-date-picker>
          -
          <el-date-picker size="mini" v-model="queryData.CreatedOnEnd" type="date" placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作">
          <el-button-group>
            <jyz-authorizebtn label="查询" code="Query" type="primary" icon="el-icon-search" @click="query()"></jyz-authorizebtn>
            <jyz-authorizebtn label="新增" code="Add" type="primary" icon="el-icon-plus"></jyz-authorizebtn>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <el-tree node-key="Id" :data="organizations" :props="treeProps" @node-click='nodeClick' default-expand-all :expand-on-click-node='false' ref="tree" slot="aside" highlight-current></el-tree>
    <el-table :data="users" row-key="Id" height='100%'>
      <el-table-column prop="UserName" label="登录账号"></el-table-column>
      <el-table-column prop="Name" label="姓名"></el-table-column>
      <el-table-column prop="OrganizationNames" label="组织机构" width="200">
        <template slot-scope="scope">
          <div>
            <el-tag v-for="item in scope.row.OrganizationNames" :key="item" type="warning" effect="dark">
              {{ item }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="MobilePhone" label="手机号码"></el-table-column>
      <el-table-column prop="Email" label="邮箱"></el-table-column>
      <el-table-column prop="GenderName" label="性别"></el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
      <el-table-column prop="CreatedOn" label="创建日期"></el-table-column>
      <el-table-column prop="CreatedByName" label="创建人"></el-table-column>
      <el-table-column prop="Id" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <jyz-authorizebtn code="Modify" type="primary" icon='el-icon-edit-outline' circle @click="modify(scope.row.Id)"></jyz-authorizebtn>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" v-if='dialogFormVisible' :close-on-click-modal="false" top="0">
      <el-tabs type="border-card" v-model='tabValue'>
        <el-tab-pane label="基本信息" name="info">
          <infoview ref="infoview" :id='currentId'></infoview>
        </el-tab-pane>
        <el-tab-pane label="角色" name="role">
          <roleview ref="roleview" :id='currentId'></roleview>
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
import { infoview, roleview, privilegeview } from './components'
export default {
  props: {},
  data() {
    return {
      organizations: [],
      organization: {},
      users: [],
      currentId: '',
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
      queryData: {
        Name: '',
        UserName: '',
        CreatedOnStart: '',
        CreatedOnEnd: ''
      },
      treeProps: {
        label: 'Name',
        children: 'Children'
      },
    };
  },
  methods: {
    getOrganizations() {
      this.$api.user.getOrganizations({}).then(res => {
        this.organizations = res.Data;
        this.query();
      })
    },
    query() {
      this.queryData.OrganizationId = this.organization.Id;
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize,
        query: this.queryData
      }
      this.$api.user.query(params).then(res => {
        this.users = res.Data.List;
        this.totalCount = res.Data.TotalCount;
      });
    },
    modify(id) {
      this.currentId = id;
      this.tabValue = 'info';
      this.dialogFormVisible = true;
    },
    add() {
      if (this.$refs["user"]) this.$refs["user"].resetFields();
      this.user = {};
      this.dialogFormVisible = true;
    },
    save() {
      if (!this.$refs.infoview.isValid()) {
        this.tabValue = 'info';
        return;
      }
      let user = this.$refs.infoview.user;
      let userRoles = this.$refs.roleview.userRoles;
      let roleIds = [];
      userRoles.forEach(item => {
        roleIds.push(item.Id)
      })
      let privilege = this.$refs.privilegeview.getPrivilege();
      let data = {
        User: user,
        Id: this.currentId,
        RoleIds: roleIds,
        ModuleIds: privilege.ModuleIds,
        OperateIds: privilege.OperateIds,
      }
      this.$api.user.modify(data).then(res => {
        this.$message({
          showClose: true,
          message: '用户信息修改成功',
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
    },
    nodeClick(data, node) {
      this.organization = node.data;
      this.query();
    }
  },
  components: {
    infoview, roleview, privilegeview
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
    this.getOrganizations();
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
<style lang='scss'scoped>
.el-dialog {
  width: 500px;
}
.el-tag {
  white-space: normal;
  height: auto;
  line-height: normal;
  padding: 5px;
  margin: 2px;
}
</style>
