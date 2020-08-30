<template>
  <el-button :size="size" :type="type" :loading="loading" :icon="icon" :circle="circle" :disabled="disabled" @click="handleClick">
    <span v-if="label!==''">
      {{label}}
    </span>
  </el-button>
</template>

<script>
export default {
  name: "Jyzbutton",
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
      //类名
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
    }
  },
  mounted() {
  }
};
</script>

<style scoped>
</style>