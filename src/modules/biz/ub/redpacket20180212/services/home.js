import request from '../../../../../utils/request';

export async function get(from) {
  return request(`/api/biz/ub/redpacket20180212/${from}`);
};
