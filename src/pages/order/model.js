import * as orderApi from './service';

export default {
  namespace: 'order',
  state: {
    page:1,
    rows:10,
    totalPage:1,
    list:[],
    placeList:[],
    detailList:{},
    confirmList:{},
    payList:{}
  },

  effects: {
    * page({ payload, callback }, { call, put }) {
      const { code, data } = yield call(orderApi.ordersList, payload);
      if (code === 200) {
        yield put({ type: 'save',
          payload: {
            list:data.data,
            page:data.page,
            totalPage:data.totalPage
          }});
        callback(data.totalPage)
      }
    },
    * confirm({ payload, callback }, { call, put }) {
      const { code, data } = yield call(orderApi.ordersConfirm, payload);
      if (code === 200) {
        yield put({ type: 'save'});
        callback(data.id)
      }
    },
    * detail({ payload }, { call, put }) {
      const { code, data } = yield call(orderApi.ordersDetail, payload);
      if (code === 200) {
        yield put({ type: 'save',
          payload: {
            detailList: data
          }
        });
      }
    },
    * comment({ payload, callback }, { call, put }) {
      const { code, data } = yield call(orderApi.goodsComment, JSON.stringify(payload));
      if (code === 200) {
        yield put({ type: 'save'});
        callback();
      }
    },
    * change({ payload, callback }, { call, put }) {
      const { code, data } = yield call(orderApi.ordersChange, payload);
      if (code === 200) {
        yield put({ type: 'save'});
        callback()
      }
    },
    * place({ payload, callback }, { call, put }) {
      const { code, data } = yield call(orderApi.ordersPlace, payload);
      if (code === 200) {
        yield put({ type: 'save',
          payload: {
            placeList: data
          }});
        callback()
      }
    },
    * pay({ payload, callback }, { call, put }) {
      const { success, obj } = yield call(orderApi.pay, payload);
      if (success) {
        yield put({ type: 'save',
        payload: {
          payList:obj
        }});
        callback(obj)
      }
    }
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
