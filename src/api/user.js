import request from '@/utils/request';

const user = {
  // 登录
  login(data) {
    let url = '/user/login';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  // 登出
  logout() {
    let url = '/user/logout';
    return request({
      url: url,
      method: 'get',
    });
  },
  // 用户列表列表
  query(data) {
    let url = '/User/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  // 用户详情
  detail(params) {
    let url = '/User/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getRoles(data) {
    let url = '/User/GetRoles';
    return request({
      url: url,
      method: 'Post',
      data,
    });
  },
  getUserRoles(params) {
    let url = '/User/GetUserRoles';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getModuleOperates() {
    let url = '/User/GetModuleOperates';
    return request({
      url: url,
      method: 'get',
    });
  },
  getAuthorizeModuleOperateIds(params) {
    let url = '/User/getAuthorizeModuleOperateIds';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getOrganizations(data) {
    let url = '/User/GetOrganizations';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  // 修改用户信息
  modify(data) {
    let url = '/User/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  modifyProfile(data) {
    let url = '/User/ModifyProfile';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  changePassWord(data) {
    let url = '/User/ChangePassWord';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  getUserInfo() {
    let url = '/User/GetInformation';
    return request({
      url: url,
      method: 'get',
    });
  },
};
export default user;
