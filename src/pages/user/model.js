import * as userApi from './service';
import ion01 from '../../images/user/dzf.png';
import ion02 from '../../images/user/dsh.png';
import ion03 from '../../images/user/yfh.png';
import ion04 from '../../images/user/dgh.png';

export default {
  namespace: 'user',
  state: {
    list: [
      {
        txt: '待支付',
        img:ion01,
        num: 0,
        link: '/userOrder.html?type=1',
        type: 2,
      },
      {
        txt: '待发货',
        img:ion02,
        num: 0,
        link: '/userOrder.html?type=5',
        type: 3,
      },
      {
        txt: '待收货',
        img:ion03,
        num: 0,
        link: '/userOrder.html?type=3',
        type: 9, // 已发货的类型海伦正在加，后续会补上
      },
      {
        txt: '待评价',
        img:ion04,
        num: 0,
        link: '/userOrder.html?type=6',
        type: 8,
      }
    ],
    user:{}
  },
  effects: {
    *page({ payload }, { call, put }) {
      const { code, data } = yield call(userApi.user, payload);
      if (code === 200) {
        yield put({
          type: 'save',
          payload: {
            user:data
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
