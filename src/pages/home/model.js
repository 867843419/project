import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    banner: [],
    brands: [],
    products_list: [],
    recommend_products_list:[],
    page: 1,
    rows:10,
    totalPage:1,
    getCart:{
      userId:1,
      skuId:0,
      isCheck:0,
      num:1,
      catalog:0
    }
  },
  effects: {
    *page(_, { call, put }) {
      const { code, data } = yield call(homeApi.homePage, {});
      if (code === 200) {
        yield put({
          type: 'homePage',
          payload: {
            banner:data
          },
        });
      }
    },
    *list({ payload },{ call, put }) {
      const { code, data } = yield call(homeApi.homeList, payload);
      if (code === 200) {
        if(payload.isRecom == 0){
          yield put({
            type: 'homeList',
            payload: {
              products_list:data
            },
          });
        }else{
          yield put({
            type: 'homeList',
            payload: {
              recommend_products_list:data
            },
          });
        }
      }
    },
    *search({ payload },{ call, put }){
      const { code, data } = yield call(homeApi.homeSearch, payload);
      if (code === 200) {
        yield put({
          type: 'homeSearch',
          payload: {
            products_list:data
          },
        });
      }
    },
    *set({ payload },{ put }){
      yield put({
        type: 'cart',
        payload: {
          getCart:{...payload}
        },
      });
    }
  },
  reducers: {
    homePage(state, { payload }) {
      return { ...state, ...payload };
    },
    homeList(state, { payload }) {
      return { ...state, ...payload };
    },
    homeSearch(state, { payload }) {
      return { ...state, ...payload };
    },
    cart(state, { payload }) {
      return { ...state, ...payload };
    }
  },
};
