export function menuFormatter(data, parentPath = '') {
  return data.map((item) => item.children ? {
      ...item,
      path: `${parentPath}${item.path}`,
      children: menuFormatter(item.children, `${parentPath}${item.path}/`),
    } : {
      ...item,
      path: `${parentPath}${item.path}`,
    },
  );
}

function getFlatMenuData(menus) {
  return menus.reduce((accumulator, menu) => menu.children ? [...accumulator, menu, ...getFlatMenuData(menu.children)] : [...accumulator, menu],
    []);
}

export function getFlatMenuDataWithName(menuData, routerData, parentPath) {
  const flatMenuData = getFlatMenuData(menuFormatter(menuData, parentPath));
  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[parentPath + item] = {
      ...routerData[item],
      name: routerData[item].name,
    };
  });
  return routerDataWithName;
}




