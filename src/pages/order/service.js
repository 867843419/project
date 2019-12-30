import Request from '../../utils/request';
import api from '../../utils/api';

export const ordersList = data => Request({
  url: api.ordersList,
  method: 'GET',
  data,
});

export const ordersConfirm = data => Request({
  url: api.ordersConfirm,
  method: 'POST',
  data,
});

export const ordersDetail = data => Request({
  url: api.ordersDetail,
  method: 'GET',
  data,
});

export const goodsComment = data => Request({
  url: api.goodsComment,
  method: 'POST',
  data,
});

export const ordersChange = data => Request({
  url: api.ordersChange,
  method: 'POST',
  data,
});

export const ordersPlace = data => Request({
  url: api.ordersPlace,
  method: 'POST',
  data,
});

export const pay = data => Request({
  url: api.pay,
  method: 'GET',
  data,
});
