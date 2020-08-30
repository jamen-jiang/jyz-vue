<template>
  <jyz-container>
    <div slot="header">
      <el-form ref="form" :model="queryData" class="query">
        <el-form-item label="字典类型">
          <el-input size="mini" v-model="queryData.Category" placeholder="字典类型"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-button-group>
            <jyz-authorizebtn label="查询" code="Query" type="primary" icon="el-icon-search" @click="query()"></jyz-authorizebtn>
            <jyz-authorizebtn label="新增字典" code="Add" type="primary" @click="add"></jyz-authorizebtn>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <el-table ref="table" :data="dictionarys" style="width:100%" row-key="Id" height="100%" :tree-props="{children: 'Children', hasChildren: 'hasChildren'}" highlight-current-row default-expand-all>
      <el-table-column prop="Category" label="字典类型" align="center"></el-table-column>
      <el-table-column prop="Name" label="字典类型名称" align="center"></el-table-column>
      <el-table-column prop="Code" label="字典编码" align="center"></el-table-column>
      <el-table-column prop="Value" label="字典值" align="center"></el-table-column>
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
    <el-dialog title="编辑信息" :visible.sync="dialogFormVisible" v-if='dialogFormVisible' :close-on-click-modal="false" top="0" width="600px">
      <infoview ref="infoview" :id='currentId'></infoview>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="primary" @click="save()" size="mini">确 定</el-button>
      </div>
    </el-dialog>

  </jyz-container>
</template>

<script>
import { infoview } from './components'
export default {
  props: {

  },
  data() {
    return {
      dictionarys: [],
      currentId: '',
      treeProps: {
        label: 'Name',
        children: 'Children'
      },
      dialogFormVisible: false,
      queryData: {},

    };
  },
  methods: {
    query() {
      this.$api.dictionary.query().then((res) => {
        this.dictionarys = res.Data;
      });
    },
    add() {
      this.currentId = "";
      this.dialogFormVisible = true;
    },
    modify(id) {
      this.currentId = id;
      this.dialogFormVisible = true;
    },
    save() {
      if (!this.$refs.infoview.isValid()) {
        return;
      }
      let dictionary = this.$refs.infoview.dictionary;
      debugger
      if (dictionary.Id) {
        this.$api.dictionary.modify(dictionary).then(res => {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.query();
        })
      } else {
        this.$api.dictionary.add(dictionary).then(res => {
          this.$message({
            showClose: true,
            message: '保存成功',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.query();
        })
      }
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
    this.query();
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
