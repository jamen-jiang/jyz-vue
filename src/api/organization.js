import request from '@/utils/request';

const organization = {
  // 部门列表
  query(data) {
    let url = '/Organization/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  detail(params) {
    let url = '/Organization/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getModuleOperates() {
    let url = '/Organization/GetModuleOperates';
    return request({
      url: url,
      method: 'get',
    });
  },
  getAuthorizeModuleOperateIds(params) {
    let url = '/Organization/getAuthorizeModuleOperateIds';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  getRoles(data) {
    let url = '/Organization/GetRoles';
    return request({
      url: url,
      method: 'Post',
      data,
    });
  },
  getOrganizationRoles(params) {
    let url = '/Organization/GetOrganizationRoles';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  modify(data) {
    let url = '/Organization/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  add(data) {
    let url = '/Organization/Add';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default organization;
