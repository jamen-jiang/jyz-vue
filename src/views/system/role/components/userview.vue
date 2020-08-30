<template>
  <div class="roleuser">
    <el-table :data="users" row-key="Id" height='100%'>
      <el-table-column prop="Name" label="用户名"></el-table-column>
      <el-table-column prop="Remark" label="备注"></el-table-column>
      <el-table-column prop="Id" label="操作" width="100">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" icon='el-icon-plus' circle @click="selected(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pageIndex" :page-sizes="[5, 10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
    </el-pagination>
    <div class="roleuser-footer">
      <p>已选用户:</p>
      <el-card>
        <div class="selected">
          <el-tag :key="user.Id" v-for="(user,index) in roleUsers" size="small" closable @close="removeUser(index)">
            {{user.Name}}
          </el-tag>
        </div>
      </el-card>

    </div>

  </div>
</template>

<script>
export default {
  name: 'roleuser',
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      users: [],
      roleUsers: [],
      pageIndex: 1,
      pageSize: 5,
      totalCount: 0,
    };
  },
  methods: {
    getUsers() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$api.role.getUsers(params).then(res => {
        this.users = res.Data.List;
        this.totalCount = res.Data.TotalCount;
      });

    },
    getRoleUsers() {
      var params = {
        id: this.id,
      }
      this.$api.role.getRoleUsers(params).then(res => {
        this.roleUsers = res.Data;
      });
    },
    sizeChange(val) {
      this.pageSize = val;
      this.getUsers();
    },
    currentChange(val) {
      this.pageIndex = val;
      this.getUsers();
    },
    selected(user) {
      let flag = true;
      for (let i in this.roleUsers) {
        if (user.Id == this.roleUsers[i].Id) {
          flag = false;
          return;
        }
      }
      if (flag)
        this.roleUsers.push(user);
    },
    removeUser(index) {
      this.roleUsers.splice(index, 1);
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
    this.getUsers();
    this.getRoleUsers();
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
<style lang="scss">
.roleuser .roleuser-footer .el-card__body {
  padding: 5px;
}
</style>
<style scoped lang="scss">
.roleuser {
  display: flex;
  flex-direction: column;
  height: 350px;
}
.roleuser-footer {
  margin-top: 15px;
  p {
    margin-bottom: 10px;
  }
  .selected {
    display: flex;
    flex-wrap: wrap;
    .el-tag {
      margin: 3px;
    }
  }
}
</style>
