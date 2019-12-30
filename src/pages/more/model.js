import * as moreApi from './service';

export default {
  namespace: 'more',
  state: {
    maskShow:true
  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(moreApi.demo, {});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
