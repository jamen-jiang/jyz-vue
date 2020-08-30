import request from '@/utils/request';

const operate = {
  getModules(data) {
    let url = '/Operate/GetModules';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  query(data) {
    let url = '/Operate/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  // 模块详情
  detail(params) {
    let url = '/Operate/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  add(data) {
    let url = '/Operate/Add';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  modify(data) {
    let url = '/Operate/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default operate;
