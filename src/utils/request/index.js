import router from '@/router';
import axios from 'axios';
import QS from 'qs';
import Cookies from 'js-cookie';
import { Message, MessageBox } from 'element-ui';
// 使用vuex做全局loading时使用
// import store from '@/store'

//设置超时时间
axios.defaults.timeout = 100000;
axios.defaults.baseURL = 'http://localhost:5000';
// post请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';

//对外接口
export default function request(config) {
  return new Promise((resolve, reject) => {
    axios(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}
// request 拦截器
axios.interceptors.request.use(
  config => {
    let token = Cookies.get('token');
    // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
    // console.log(store.state.loading)
    // console.log('准备发送请求...')
    // 2. 带上token
    if (token) {
      config.headers.Authorization = 'Bearer ' + token;
    } else {
      // 重定向到登录页面
      router.push('/login');
    }
    // 3. 根据请求方法，序列化传来的参数，根据后端需求是否序列化
    // if (config.method === 'post') {
    //   if (
    //     config.data.__proto__ === FormData.prototype ||
    //     config.url.endsWith('path') ||
    //     config.url.endsWith('mark') ||
    //     config.url.endsWith('patchs')
    //   ) {
    //   } else {
    //     config.data = QS.stringify(config.data);
    //   }
    // }
    return config;
  },
  error => {
    // 请求错误时
    console.log('request:', error);
    // 1. 判断请求超时
    if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
      console.log('timeout请求超时');
      // return service.request(originalRequest);// 再重复请求一次
    }
    // 2. 需要重定向到错误页面
    const errorInfo = error.response;
    console.log(errorInfo);
    if (errorInfo) {
      error = errorInfo.data; // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
      const errorStatus = errorInfo.status; // 404 403 500 ...
      router.push({
        path: `/error/${errorStatus}`,
      });
    }
    return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
  }
);

// response 拦截器
axios.interceptors.response.use(
  response => {
    let data;
    // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
    if (response.data == undefined) {
      data = JSON.parse(response.request.responseText);
    } else {
      data = response.data;
    }
    if (data.Status !== 200) {
      errorHandle(data.Status, data.Message);
      return Promise.reject(data);
    } else {
      return data;
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;
        case 401:
          err.message = '未授权，请登录';
          break;
        case 403:
          err.message = '拒绝访问';
          break;
        case 404:
          //err.message = '请求地址出错: ${err.response.config.url}';
          err.message = '请求地址出错';
          break;
        case 408:
          err.message = '请求超时';
          break;
        case 500:
          err.message = '服务器内部错误';
          break;
        case 501:
          err.message = '服务未实现';
          break;
        case 502:
          err.message = '网关错误';
          break;
        case 503:
          err.message = '服务不可用';
          break;
        case 504:
          err.message = '网关超时';
          break;
        case 505:
          err.message = 'HTTP版本不受支持';
          break;
        default:
          //err.message = '连接错误${err.response.status}';
          err.message = '连接错误';
      }
    } else {
      err.message = '连接到服务器失败';
    }
    Message.error(err.message);
    //console.error(err);
    return Promise.reject(err); // 返回接口返回的错误信息
  }
);
/**
 * 跳转登录页
 */
const toLogin = () => {
  //清除token
  Cookies.remove('token');
  setTimeout(() => {
    router.replace({
      path: '/login',
      // query: {
      //     redirect: router.currentRoute.fullPath
      // }
    });
  }, 1000);
};
/**
 * 请求失败后的错误统一处理
 * @param {Number} statusCode 请求失败的状态码
 * @param {String} message 提示信息
 */
const errorHandle = (status, message) => {
  switch (status) {
    case 1:
      Message.error('token无效');
      break;
    case 2:
      Message.error('token过期');
      toLogin();
      break;
    case 401:
      Message.error('权限不足,请联系管理员');
      break;
    case 403:
      Message.error('403');
      break;
    // case 98:
    //   Message.error(message);
    //   break;
    case 99:
      Message.error('系统异常');
      break;
    default:
      Message.error(message);
  }
};
