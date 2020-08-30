import request from '@/utils/request';

const dictionary = {
  query() {
    let url = '/Dictionary/Query';
    return request({
      url: url,
      method: 'post',
    });
  },
  // 模块详情
  detail(params) {
    let url = '/Dictionary/Detail';
    return request({
      url: url,
      method: 'get',
      params,
    });
  },
  add(data) {
    let url = '/Dictionary/Add';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
  modify(data) {
    let url = '/Dictionary/Modify';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default dictionary;
