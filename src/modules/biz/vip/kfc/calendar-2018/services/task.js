import request from '../../../../../../utils/request';

export async function list() {
  return request('/api/biz/vip/kfc/calendar-2018/tasks');
}
