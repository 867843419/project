import Request from '../../utils/request';
import api from '../../utils/api';

export const classificationPage = data => 
  Request({
    url: api.classificationPage,
    method: 'GET',
    data,
  });
