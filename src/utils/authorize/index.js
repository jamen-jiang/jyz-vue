import store from '@/store';
/**
 * 判断用户是否拥有操作权限
 * 根据传入的权限标识，查看是否存在用户权限标识集合
 * @param {String} code
 */
export default function isAuthorize(code) {
  let isAuthorize = false;
  let operates = store.state.privilege.currentModule.Operates;
  for (let i = 0, len = operates.length; i < len; i++) {
    if (operates[i].Action === code) {
      isAuthorize = true;
      break;
    }
  }
  return isAuthorize;
}
