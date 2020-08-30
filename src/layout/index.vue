<template>
  <el-container class="is-vertical jyz-layout">
    <jyz-header class="jyz-header"></jyz-header>
    <el-container class="jyz-middle">
      <jyz-lefter></jyz-lefter>
      <el-container>
        <jyz-main class="jyz-middle-main"></jyz-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import { JyzHeader, JyzLefter, JyzMain, JyzFooter } from './components';
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {
    JyzHeader,
    JyzLefter,
    JyzMain,
    JyzFooter,
  },
};
</script>
<style lang="scss">
@import '@/styles/theme/register.scss';
</style>
