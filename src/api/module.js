import request from '@/utils/request';

const module = {
  getAuthorizeModules() {
    let url = '/Module/GetAuthorizeModule';
    return request('get', url);
  },
  query(data) {
    let url = '/Module/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  // 模块详情
  detail(params) {
    let url = '/Module/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  add(data) {
    let url = '/Module/Add';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  modify(data) {
    let url = '/Module/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default module;
