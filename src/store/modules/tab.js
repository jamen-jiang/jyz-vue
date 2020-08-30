const state = {
  tabs: [
    {
      route: '/',
      name: '首页',
    },
  ],
  currentTab: '/',
};

const mutations = {
  //添加tab
  tab_add(state, tab) {
    state.tabs.push(tab);
  },
  // 删除tabs
  tab_remove(state, route) {
    let index = 0;
    for (let tab of state.tabs) {
      if (tab.route === route) {
        break;
      }
      index++;
    }
    state.tabs.splice(index, 1);
  },
  // 设置当前激活的tab
  tab_active(state, index) {
    state.currentTab = index;
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
