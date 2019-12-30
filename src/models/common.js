import Taro from '@tarojs/taro';

export default {
  namespace: 'common',
  state: {
    userId: Taro.getStorageSync('user_cookie'),
    url:'http://47.105.205.117:8088/'
  },

  effects: {},

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
