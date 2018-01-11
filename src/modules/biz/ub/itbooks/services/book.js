import request from '../../../../../utils/request';

export async function listBook() {
  return request('/api/biz/ub/itbooks/books');
}
