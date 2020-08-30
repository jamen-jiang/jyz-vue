import request from '@/utils/request';

const loglogin = {
  // 用户列表列表
  query(data) {
    let url = '/LogLogin/Query';
    return request({
      url: url,
      method: 'post',
      data,
    });
  },
};
export default loglogin;
