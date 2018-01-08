import request from '../../../../../utils/request';

export async function listEmployee(city) {
  return request('/api/biz/vip/ofo/badges/list/' + city);
}

export async function deleteEmployee(employee) {
  return request('/api/biz/vip/ofo/badges/delete/' + employee.uid, { method: 'DELETE' });
}

export async function batchDeleteEmployee(employees) {
  return request('/api/biz/vip/ofo/badges/delete/batch', { method: 'POST', body: employees.map(employee => (employee.uid)) });
}

export async function createEmployee(city, employee) {
  return request('/api/biz/vip/ofo/badges/new/' + city, { method: 'POST', body: employee });
}

export async function updateEmployee(employee) {
  return request('/api/biz/vip/ofo/badges/update/' + employee.uid, { method: 'POST', body: employee });
}
