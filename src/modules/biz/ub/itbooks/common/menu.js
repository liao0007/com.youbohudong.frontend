export const menuData = [
  {
    name: '工牌制作',
    icon: 'book',
    path: '/badge/card-list/main-land/010',
  },
];

export const categoriesToMenuData = (categories) => {
  return categories.map(category => ({
    name: category.name,
    path: category.key,
    children: category.subcategories.map(subcategory => (
      {
        name: subcategory.name,
        path: subcategory.key,
      }
    )),
  }));
};
