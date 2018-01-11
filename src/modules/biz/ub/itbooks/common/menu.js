export const categoriesToMenuData = (categories) => {
  return categories.map(category => ({
    name: category.name,
    key: category.key,
    path: category.key,
    children: category.subcategories.map(subcategory => (
      {
        name: subcategory.name,
        key: subcategory.key,
        path: subcategory.key,
      }
    )),
  }));
};
