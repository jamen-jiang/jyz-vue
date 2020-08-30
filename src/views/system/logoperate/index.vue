<template>
  <jyz-container>
    <div slot="header">
      <el-form ref="form" :model="queryData" class="query">
        <el-form-item label="操作日期">
          <el-date-picker size="mini" v-model="queryData.LoginOnStart" type="date" placeholder="开始日期"></el-date-picker>
          -
          <el-date-picker size="mini" v-model="queryData.LoginOnEnd" type="date" placeholder="结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="操作">
          <el-button-group>
            <jyz-authorizebtn label="查询" code="Query" type="primary" icon="el-icon-search" @click="query()"></jyz-authorizebtn>
          </el-button-group>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="logOperates" row-key="Id" height='100%'>
      <el-table-column prop="ApiName" label="模块名称"></el-table-column>
      <el-table-column prop="Type" label="操作名称"></el-table-column>
      <el-table-column prop="ApiUrl" label="操作接口"></el-table-column>
      <el-table-column prop="UserName" label="操作用户"></el-table-column>
      <el-table-column prop="LogOn" label="操作日期"></el-table-column>
      <el-table-column prop="IP" label="IP地址"></el-table-column>
      <el-table-column prop="Browser" label="浏览器"></el-table-column>
      <el-table-column prop="Os" label="操作系统"></el-table-column>
      <el-table-column prop="ElapsedMilliseconds" label="耗时(ms)"></el-table-column>
      <el-table-column prop="IsSuccess" label="操作状态">
        <template slot-scope="scope">
          <el-tag size="mini" type="success" effect="dark" v-if="scope.row.IsSuccess">成功</el-tag>
          <el-tag size="mini" type="danger" effect="dark" v-else>失败</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page="pageIndex" :page-sizes="[10, 20, 30, 40,50,60,70,80,90,100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
      </el-pagination>
    </div>
  </jyz-container>
</template>

<script>
export default {
  props: {

  },
  data() {
    return {
      logOperates: [],
      pageIndex: 1,
      pageSize: 10,
      totalCount: 0,
      queryData: {}
    };
  },
  methods: {
    query() {
      var params = {
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      this.$api.logoperate.query(params).then(res => {
        this.logOperates = res.Data.List;
        this.totalCount = res.Data.TotalCount;
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
