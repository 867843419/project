import * as classificationApi from './service';

export default {
  namespace: 'classification',
  state: {
    classificationList:[],
    list:[]
  },

  effects: {
    * page({ payload }, { call, put }) {
      const { code, data } = yield call(classificationApi.classificationPage, {});
      if (code === 200) {
        const firstId = data[payload.index].id
        yield put({ 
            type: 'list',
            payload: {
              classificationList:data,
              id:firstId
            }
          }
        );
      }
    },
    * list({ payload }, { call, put }) {
      const { code, data } = yield call(classificationApi.classificationPage, {id:payload.id});
      if (code === 200) {
        yield put({ type: 'save',
          payload: {
            list:data,
            classificationList:payload.classificationList
          }
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    }
  },

};
