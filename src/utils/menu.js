export function menuFormatter(data, parentPath = '') {
  const list = [];
  data.forEach((item) => {
    if (item.children) {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
        children: menuFormatter(item.children, `${parentPath}${item.path}/`),
      });
    } else {
      list.push({
        ...item,
        path: `${parentPath}${item.path}`,
      });
    }
  });
  return list;
}

export function getFlatMenuDataWithName(menuData, routerData, parentPath) {
  function getFlatMenuData(menus) {
    let keys = {};
    menus.forEach((item) => {
      if (item.children) {
        keys[item.path] = item.name;
        keys = { ...keys, ...getFlatMenuData(item.children) };
      } else {
        keys[item.path] = item.name;
      }
    });
    return keys;
  }

  const flatMenuData = getFlatMenuData(menuFormatter(menuData, parentPath));
  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[parentPath + item] = {
      ...routerData[item],
      name: routerData[item].name || flatMenuData[item.replace(/^\//, '')],
    };
  });
  return routerDataWithName;
}




