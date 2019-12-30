import Taro from '@tarojs/taro';
import { baseUrl, noConsole } from '../config';

export default (options = { method: 'GET', data: {} }) => {
  return Taro.request({
    url: baseUrl + options.url,
    data: options.data,
    header: {
      'Content-Type': 'application/json',
    },
    method: options.method.toUpperCase(),
  }).then(res => {
    const { statusCode, data } = res;
    if (statusCode >= 200 && statusCode < 300) {
      if (data.code !== 200) {
        Taro.showToast({
          title: `${res.data.message}`,
          icon: 'none',
          mask: true,
        });
      }
      return data;
    } else {
      throw new Error(`网络请求错误，状态码${statusCode}`);
    }
  });
};
