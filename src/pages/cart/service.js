import Request from '../../utils/request';
import api from '../../utils/api';

export const getCart = data =>
    Request({
        url: api.orderCarts,
        method: 'GET',
        data
    });

export const delCart = data =>
    Request({
        url: api.orderDel,
        method: 'POST',
        data
    });

export const updataCart = data =>
    Request({
        url: api.orderUpdate,
        method: 'POST',
        data
    });

export const ordersOne = data => 
    Request({
        url: api.ordersOne,
        method: 'POST',
        data
    });