import Request from '../../utils/request';
import api from '../../utils/api';

export const user = data =>
  Request({
    url: api.userDetail,
    method: 'GET',
    data,
  });