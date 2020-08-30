<template>
  <div class="jyz-profile">
    <el-card class="box-card jyz-profile-left">
      <div slot="header" class="clearfix">
        <span>个人信息</span>
      </div>
      <div class="jyz-profile-left-info">
        <div class="jyz-profile-left-info-header">
          <jyz-avatar :size='100' :src="user.Avatar"></jyz-avatar>
          <p>{{user.Name}}</p>
        </div>
        <div class="jyz-profile-left-info-bottom">
          <div>
            <span>组织机构:</span>
            <div>
              <el-tag v-for="item in user.OrganizationNames" :key="item" type="warning" effect="dark">
                {{ item }}
              </el-tag>
            </div>
          </div>
          <div>
            <span>角色:</span>
            <div>
              <el-tag v-for="item in user.RoleNames" :key="item" type="primary" effect="dark">
                {{ item }}
              </el-tag>
            </div>
          </div>
          <div>
            <span>性别:</span>
            <div>{{user.GenderName}}</div>
          </div>
          <div>
            <span>手机:</span>
            <div> {{user.MobilePhone}}</div>
          </div>
          <div>
            <span>邮箱:</span>
            <div> {{user.Email}}</div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card jyz-profile-right">
      <el-tabs value="info">
        <el-tab-pane label="基本设置" name="info">
          <infoview ref="infoview" :id='user.Id'></infoview>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="changepassword">
          <changepasswordview ref="changepasswordview" :id='user.Id'></changepasswordview>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { infoview, changepasswordview } from './components'
export default {
  props: {

  },
  data() {
    return {

    };
  },
  methods: {

  },
  components: {
    infoview, changepasswordview
  },
  computed: {
    ...mapState({
      user: state => state.user.current
    })
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

<style scoped lang='scss'>
.jyz-profile {
  display: flex;
  padding: 15px;
  .jyz-profile-left {
    width: 380px;
    .jyz-profile-left-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      .jyz-profile-left-info-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 30px;
        p {
          margin-top: 10px;
          font-size: 18px;
          font-weight: bold;
        }
      }
      .jyz-profile-left-info-bottom {
        display: flex;
        flex-direction: column;
        width: 100%;
        & > div {
          display: flex;
          margin: 8px 0px;
          & > span {
            width: 80px;
            margin-right: 10px;
            text-align: right;
          }
          & > div {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
          }
          .el-tag {
            white-space: normal;
            height: auto;
            line-height: normal;
            padding: 5px;
            margin: 2px;
          }
        }
      }
    }
  }
  .jyz-profile-right {
    flex: 1;
    margin-left: 15px;
  }
}
</style>
