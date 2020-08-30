const state = {
  current: {},
};

const mutations = {
  user_set(state, user) {
    state.current = user;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
