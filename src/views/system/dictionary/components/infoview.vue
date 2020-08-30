<template>
  <div>
    <el-form :model="dictionary" ref="dictionary" :rules="isFirst?categoryRules:contentRules">
      <el-form-item label="字典类型" prop="PId" :label-width="formLabelWidth">
        <el-select v-model="dictionary.PId" placeholder="请选择" :disabled='isFirst'>
          <el-option v-for="item in categorys" :key="item.Value" :label="item.Name" :value="item.Value">
          </el-option>
        </el-select>
        &nbsp;<el-checkbox v-model="isFirst" label="是否字典类型" border @change='firstChange'></el-checkbox>
      </el-form-item>
      <el-form-item label="字典类型" :label-width="formLabelWidth" prop="Category" v-show="isFirst">
        <el-input v-model="dictionary.Category" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="字典类型名称" :label-width="formLabelWidth" prop="Name" v-show="isFirst">
        <el-input v-model="dictionary.Name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="字典编码" :label-width="formLabelWidth" prop="Code" v-show="!isFirst">
        <el-input v-model="dictionary.Code" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="字典值" :label-width="formLabelWidth" prop="Value" v-show="!isFirst">
        <el-input v-model="dictionary.Value" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth" prop="Sort">
        <el-input v-model="dictionary.Sort" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth" prop="Remark">
        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="dictionary.Remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      dictionary: {
      },
      categorys: [],
      formLabelWidth: "110px",
      categoryRules: {
        Category: [{ required: true, message: "请输入字典类型", trigger: "blur" }],
        Name: [{ required: true, message: "请输入字典类型名称", trigger: "blur" }],

      },
      contentRules: {
        Code: [{ required: true, message: "请输入字典编码", trigger: "blur" }],
        Value: [{ required: true, message: "请输入字典值", trigger: "blur" }],
      },
      isFirst: false
    };
  },
  methods: {
    detail() {
      var params = {
        Id: this.id
      }
      this.$api.dictionary.detail(params).then(res => {
        this.dictionary = res.Data;
        if (!this.dictionary.PId) {
          this.isFirst = true;
          return
        }
      })
    },
    getDictionaryCategorys() {
      this.$api.common.getDictionaryCategorys().then(res => {
        this.categorys = res.Data;
        if (this.id) {
          this.detail();
        }
      });
    },
    firstChange(vaule) {
      if (vaule)
        this.dictionary.PId = null;
    },
    isValid() {
      let flag = true;
      this.$refs['dictionary'].validate(valid => {
        if (!valid) {
          flag = false;
        }
      });
      return flag;
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
    //this.$refs.module.resetFields();
    this.getDictionaryCategorys();
    // this.getModuleTypes();
    // if (this.moduleId) {
    //   this.detail();
    // }
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
