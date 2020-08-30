<template>
  <el-header id="header">
    <div class="logo-group">
      <img src="../../assets/logo.png" style="height: 45px;" />
      <span>JYZ后台管理系统</span>
    </div>
    <!-- <div class="toggle-btn" @click="toggle">
      <i class="iconfont icon-bars"></i>
    </div>
    <el-menu mode="horizontal">
      <el-menu-item @click="selecthome">首页</el-menu-item>
      <el-menu-item v-for="(m,index) in modules" :key="m.Id" :index="index+''" @click="select(m.Id)">
        <i :class="m.Icon"></i>
        <span slot="title">{{m.Name}}</span>
      </el-menu-item>
    </el-menu> -->
    <div class="jyz-header-right">
      <el-dropdown trigger="click" @command="handleCommand">
        <div class="jyz-header-right-user">
          <jyz-avatar :src="user.Avatar"></jyz-avatar>
          <p>{{user.Name}}</p>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <router-link to='/system/profile/index'>个人中心</router-link>
          </el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script>
import Cookies from 'js-cookie';
import { mapState } from "vuex";
export default {
  name: 'JyzHeader',
  props: {},
  data() {
    return {
      menuTree: [],
      avatarUrl: require("@/assets/avatar.jpg")
    };
  },
  methods: {
    handleCommand(command) {
      if (command == 'logout') {
        this.logout();
      }
    },
    logout() {
      this.$api.user.logout().then(res => {
        Cookies.remove('token');
        this.$router.push({ path: '/login' })
      });

    },
    // select(id) {
    //   this.menuTree = [];
    //   this.menus.forEach(m => {
    //     if (m.ModuleId == id) {
    //       this.menuTree.push(m);
    //     }
    //   });
    //   if (this.menuTree.length > 0) {
    //     setRouter(this.menuTree);
    //   }
    //   this.$store.commit("permission/get_menus", this.menuTree);
    // },
    selecthome() {
      // this.$router.push({ path: "/" });
      // this.$store.commit("permission/get_menus", []);
    },
    toggle() {
      this.$store.commit("privilege/module_setCollapse", !this.isCollapse);
    }
  },
  components: {},
  computed: {
    ...mapState({
      modules: state => state.privilege.modules,
      isCollapse: state => state.privilege.isCollapse,
      user: state => state.user.current
    })
  },
  //实例刚在内存中被创建出来,此时,还没有初始化好 data 和 methods 属性
  beforeCreate() { },
  //实例已经在内存中创建OK,此时 data 和 methods 已经创建OK,此时还没有开始 编译模板
  created() { },
  //此时已经完成了模板的编译,但是还没有挂载到页面中
  beforeMount() { },
  //此时,已经将编译好的模板,挂载到了页面指定的容器中显示
  mounted() {
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
/* 下面的样式可以单独写，然后引入 */
@font-face {
  /* Unicode  */
  font-family: 'iconfont';
  src: url('../../icons/iconfont/iconfont.eot');
  src: url('../../icons/iconfont/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../../icons/iconfont/iconfont.woff2') format('woff2'),
    url('../../icons/iconfont/iconfont.woff') format('woff'),
    url('../../icons/iconfont/iconfont.ttf') format('truetype'),
    url('../../icons/iconfont/iconfont.svg#iconfont') format('svg');
}
.iconfont {
  font-family: 'iconfont' !important;
  font-size: 1em;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
