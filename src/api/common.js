import request from '@/utils/request';

const common = {
  getOperateTypes() {
    let url = '/Common/GetOperateTypes';
    return request({
      url: url,
      method: 'get',
    });
  },
  getModuleTypes() {
    let url = '/Common/GetModuleTypes';
    return request({
      url: url,
      method: 'get',
    });
  },
  getModuleCatalogs() {
    let url = '/Common/GetModuleCatalogs';
    return request({
      url: url,
      method: 'get',
    });
  },
  getModules() {
    let url = '/Common/GetModules';
    return request({
      url: url,
      method: 'get',
    });
  },
  getOrganizations() {
    let url = '/Common/GetOrganizations';
    return request({
      url: url,
      method: 'get',
    });
  },
  getDictionaryCategorys() {
    let url = '/Common/GetDictionaryCategorys';
    return request({
      url: url,
      method: 'get',
    });
  },
  getOrganizationTypes() {
    let url = '/Common/GetOrganizationTypes';
    return request({
      url: url,
      method: 'get',
    });
  },
};
export default common;
