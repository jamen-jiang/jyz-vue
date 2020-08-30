<template>
  <aside style="width:200px;overflow: auto;">
    <el-menu :default-active="$route.path" :router="true" clss="left-menu">
      <label v-if="modules!=null && modules.length>0">
        <jyz-menu :data="modules"></jyz-menu>
      </label>
      <label v-else>
        <div class="menunone">
          <i class="el-icon-menu"></i>
          <span class="icon-name">没有侧栏菜单</span>
        </div>
      </label>
    </el-menu>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import { mapMutations } from "vuex";
export default {
  name: 'JyzLefter',
  props: {},
  data() {
    return {};
  },
  methods: {
  },
  components: {
  },
  computed: {
    ...mapState({
      modules: state => state.privilege.modules,
      tabs: state => state.tab.tabs,
    })
  },
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() { },
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() { },
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() { },
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() { },
  //状态更新之前执行此函数,此时 data 中的状态值是最新的,但是界面上显示的 数据还是旧的,因为此时还没有开始重新渲染DOM节点
  beforeUpdate() { },
  //实例更新完毕之后调用此函数,此时 data 中的状态值 和 界面上显示的数据,都已经完成了更新,界面已经被重新渲染好了!
  updated() { },
  //Vue实例销毁之前调用.在这一步,Vue实例仍然完全可用
  beforeDestroy() { },
  //Vue实例销毁后调用.调用后,Vue实例指示的所有东西都会解绑定,所有的事件监听器会被移除,所有的子实例也会被销毁
  destroyed() { },
  watch: {
    // $route(to) {
    //   let flag = false; //判断是否页面中是否已经存在该路由下的tab页
    //   //options记录当前页面中已存在的tab页
    //   for (let tab of this.tabs) {
    //     //用名称匹配，如果存在即将对应的tab页设置为active显示桌面前端
    //     if (tab.name === to.name) {
    //       flag = true;
    //       this.$store.commit("tab/tab_active", to.path);
    //       break;
    //     }
    //   }
    //   //如果不存在，则新增tab页，再将新增的tab页设置为active显示在桌面前端
    //   if (!flag) {
    //     this.$store.commit("tab/tab_add", { route: to.path, name: to.name });
    //     this.$store.commit("tab/tab_active", to.path);
    //   }
    // }
  }
};
</script>
<style scoped>
.menunone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #606266;
  height: 160px;
  margin: 10px;
  margin-top: 0px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.03);
  cursor: pointer;
}
.menunone:hover {
  color: #5cb6ff;
  background: rgba(0, 0, 0, 0.05);
}
.menunone i {
  font-size: 30px;
  margin-bottom: 10px;
}
.menunone span {
  font-size: 15px;
}
#aside {
  overflow: hidden;
}
</style>
