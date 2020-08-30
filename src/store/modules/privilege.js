const state = {
  modules: [],
  moduleId: '',
  isCollapse: false,
  currentModule: {},
};

const mutations = {
  modules_set(state, modules) {
    state.modules = modules;
  },
  module_select(state, module) {
    state.currentModule = module;
  },
  module_setCollapse(state, isCollapse) {
    debugger;
    state.isCollapse = isCollapse;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
