import Request from '../../utils/request';
import api from '../../utils/api';

// 获取商品详情
export const getProductInfo = id =>
  Request({
    url: api.goodsDetail,
    method: 'GET',
    data:{
      id
    }
  });
