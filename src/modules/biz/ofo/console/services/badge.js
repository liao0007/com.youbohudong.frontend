import request from '../../../../../utils/request';

export async function list(city) {
  return request('/api/biz/vip/ofo/badges/list/' + city);
}
