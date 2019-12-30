import Request from '../../utils/request';
import api from '../../utils/api';

export const homePage = data =>
  Request({
    url: api.banner,
    method: 'GET',
    data,
  });
  
export const homeList = data =>
  Request({
    url: api.homeList,
    method: 'GET',
    data,
  });

export const homeSearch = data =>
  Request({
    url: api.search,
    method: 'GET',
    data,
  });
