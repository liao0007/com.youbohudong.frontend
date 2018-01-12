import request from '../../../../../utils/request';

export async function listBook({ activeCategory, activeSubcategory, keywords, page }) {
  const categoryQueryString = activeCategory ? `f.category=${activeCategory}` : undefined;
  const subcategoryQueryString = activeSubcategory ? `f.subcategory=${activeSubcategory}` : undefined;
  const keywordsQuery = keywords ? `f.keywords=${keywords.toLowerCase()}` : undefined;
  const filterQuery = [categoryQueryString, subcategoryQueryString, keywordsQuery].filter(item => item !== undefined).join('&');
  return request(`/api/biz/ub/itbooks/books?p.size=12&p.page=${page}&${filterQuery}`);
}

