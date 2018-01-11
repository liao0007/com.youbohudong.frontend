import request from '../../../../../utils/request';

export async function listCategory() {
  return request('/api/biz/ub/itbooks/categories');
}
