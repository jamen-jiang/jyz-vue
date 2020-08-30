import request from '@/utils/request';

const privilege = {
  getAuthorizeModuleOperates() {
    let url = '/Privilege/GetAuthorizeModuleOperates';
    return request({
      url: url,
      method: 'get',
    });
  },
};
export default privilege;
