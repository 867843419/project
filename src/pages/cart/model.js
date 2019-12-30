import * as cartApi from './service';

export default {
  namespace: 'cart',
  state: {
    cartList:[]
  },
  effects: {
    *page({ payload }, { call, put }) {
      const { code, data } = yield call(cartApi.getCart, payload);
      if (code === 200) {
        yield put({
          type: 'cartPage',
          payload: {
            cartList:data
          },
        });
      }
    },
    *del({payload}, { call, put }){
      const { code, data } = yield call(cartApi.delCart, payload);
      if (code === 200) {
        yield put({
          type: 'cartPage',
          payload: {
            cartList:data
          },
        });
      }
    },
    *updata({payload, callback}, { call, put }){
      const { code, data } = yield call(cartApi.updataCart, JSON.stringify(payload.list));
      if (code === 200) {
        yield put({
          type: 'cartPage',
          payload: {
            cartList:data
          },
        });
        callback()
      }
    },
    *updataAll({payload}, { call, put }){
      const { code, data } = yield call(cartApi.updataCartAll, payload);
      if (code === 200) {
        yield put({
          type: 'cartPage',
          payload: {
            cartList:data
          },
        });
      }
    },
    * one({ payload, callback }, { call, put }) {
      const { code, data } = yield call(cartApi.ordersOne, JSON.stringify(payload.list));
      if (code === 200) {
        yield put({
          type: 'cartPage',
          payload: {
            cartList:data
          },
        });
        callback()
      }
    }
  },
  reducers: {
    cartPage(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
