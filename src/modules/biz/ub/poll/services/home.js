import request from '../../../../../utils/request';

export async function getInfo(udid) {
  return request(`/api/biz/vip/kfc/christmas-20171218/${udid}`);
};

export async function completeTask(udid, task) {
  return request(`/api/biz/vip/kfc/christmas-20171218/complete-task/${udid}/${task.id}`);
};

export async function collectCoupon(udid, task) {
  return request(`/api/biz/vip/kfc/christmas-20171218/collect-coupon/${udid}/${task.id}`);
};

export async function rollGrandPrize(udid) {
  return request(`/api/biz/vip/kfc/christmas-20171218/roll-grand-prize/${udid}`);
};

export async function collectGrandPrize(udid) {
  return request(`/api/biz/vip/kfc/christmas-20171218/collect-grand-prize/${udid}`);
};

export async function updateContactInfo(udid, mobile, join) {
  return request(`/api/biz/vip/kfc/christmas-20171218/update-contact-info/${udid}/${mobile}/${join}`);
};
