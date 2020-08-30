import request from '@/utils/request';

const logoperate = {
  // 用户列表列表
  query(data) {
    let url = '/LogOperate/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default logoperate;
