import request from '../../../../../utils/request';

export async function listBook({ activeCategory, activeSubcategory, keywords, page }) {
  const categoryQueryString = activeCategory ? `f.category=${activeCategory}` : undefined;
  const subcategoryQueryString = activeSubcategory ? `f.subcategory=${activeSubcategory}` : undefined;
  const keywordsQuery = keywords ? `f.keywords=${keywords.toLowerCase()}` : undefined;
  const filterQuery = [categoryQueryString, subcategoryQueryString, keywordsQuery].filter(item => item !== undefined).join('&');
  return request(`/api/biz/ub/itbooks/books?s.att=year&s.ord=desc&p.size=12&p.page=${page}&${filterQuery}`);
}

export async function createOrder(order) {
  return request('/api/biz/ub/itbooks/order', {
    method: 'POST',
    body: order,
  });
}
