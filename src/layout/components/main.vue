<template>
  <el-main>
    <div class="jyz-middle-main-header">
      <el-tabs id="tabs" type="card" v-model="currentTab" @tab-click="tab_click" v-if="tabs.length" @tab-remove="tab_remove">
        <el-tab-pane v-for="(item) in tabs" :key="item.name" :label="item.name" :name="item.route" :closable="item.route == '/' ? false : true "></el-tab-pane>
      </el-tabs>
    </div>
    <div class="jyz-middle-main-content">
      <router-view />
    </div>
    <!-- <el-col class="breadcrumb-container" >
            <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-inner">
                <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
    </el-col>-->
    <!-- <el-divider></el-divider> -->
  </el-main>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'JyzMain',
  props: {},
  data() {
    return {};
  },
  methods: {
    // tab切换时，动态的切换路由
    tab_click(tab) {
      let path = tab.name;
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      // if (this.activeIndex === '/userInfo') {
      //     path = this.activeIndex + '/' + this.$store.state.userInfo.name;
      // }
      let isContains = false;
      if (this.tabs && this.tabs.length >= 1) {
        this.tabs.forEach(t => {
          if (path == t.route) {
            isContains = true;
            return;
          }
        });
      }
      this.$router.push({ path: path }); //路由跳转
    },
    tab_remove(targetName) {
      // 首页不可删除
      if (targetName == "/") {
        return;
      }
      //将改tab从tabs里移除
      this.$store.commit("tab/tab_remove", targetName);
      //还同时需要处理一种情况当需要移除的页面为当前激活的页面时，将上一个tab页作为激活tab
      if (this.currentTab === targetName) {
        // 设置当前激活的路由
        if (this.tabs && this.tabs.length >= 1) {
          this.$store.commit("tab/tab_active", this.tabs[this.tabs.length - 1].route
          );
          this.$router.push({ path: this.currentTab });
        } else {
          this.$router.push({ path: "/" });
        }
      }
    }
  },
  components: {},
  computed: {
    ...mapState({
      tabs: state => state.tab.tabs
    }),
    //动态设置及获取当前激活的tab页
    currentTab: {
      get() {
        return this.$store.state.tab.currentTab;
      },
      set(val) {
        this.$store.commit("tab/tab_active", val);
      }
    }
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
  watch: {}
};
</script>

<style scoped>
</style>
