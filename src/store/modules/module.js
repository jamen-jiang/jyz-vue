const state = {
  authorizeModules: [],
};

const mutations = {
  authorizeModules_set(state, authorizeModules) {
    state.authorizeModules = authorizeModules;
  },
  authorizeModule_select(state, moduleId) {
    state.moduleId = moduleId;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
