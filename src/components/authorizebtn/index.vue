<template>
  <jyz-button :size="size" :type="type" :loading="loading" :icon="icon" :circle="circle" :label='label' :classname="classname" :disabled="!isAuthorize(code)" @click="handleClick">
  </jyz-button>
</template>

<script>
import isAuthorize from "@/utils/authorize";
import JyzButton from '../button';
export default {
  name: "JyzAuthorizebtn",
  props: {
    label: {
      // 按钮显示文本
      type: String,
      default: ''
    },
    size: {
      // 按钮尺寸
      type: String,
      default: "mini"
    },
    type: {
      // 按钮类型
      type: String,
      default: null
    },
    loading: {
      // 按钮加载标识
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: ''
    },
    circle: {
      type: Boolean,
      default: false
    },
    disabled: {
      // 按钮是否禁用
      type: Boolean,
      default: false
    },
    classname: {
      type: String,
      default: null
    },
    code: {
      // 按钮权限标识，外部使用者传入
      type: String,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClick: function () {
      // 按钮操作处理函数
      this.$emit("click", {});
    },
    isAuthorize: function (code) {
      // 根据权限标识和外部指示状态进行权限判断
      return isAuthorize(code) & !this.disabled;
    }
  },
  mounted() {

  },
  components: {
    JyzButton
  }
};
</script>

<style scoped>
</style>