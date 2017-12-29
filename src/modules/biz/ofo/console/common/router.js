import React from 'react';
import dynamic from 'dva/dynamic';
import { getMenuData } from './menu';

// wrapper of dynamic
const dynamicWrapper = (app, models, component, parentPath) => {
  return dynamic({
    app,
    // eslint-disable-next-line no-underscore-dangle
    models: () => models.filter(
      m => !app._models.some(({ namespace }) => namespace === m)).
      map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      const p = component();
      return new Promise((resolve, reject) => {
        p.then((Comp) => {
          resolve(props => <Comp {...props} routerData={getRouterData(app, parentPath)} />);
        }).catch(err => reject(err));
      });
    },
  });
};

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

export const getRouterData = (app, parentPath) => {
  const routerData = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'],
        () => import('../layouts/BasicLayout'), parentPath),

    },
    '/badge/card-list': {
      component: dynamicWrapper(app, ['list'],
        () => import('../routes/Badge/CardList'), parentPath),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [],
        () => import('../routes/Exception/403'), parentPath),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [],
        () => import('../routes/Exception/404'), parentPath),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [],
        () => import('../routes/Exception/500'), parentPath),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'],
        () => import('../routes/Exception/triggerException'), parentPath),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout'), parentPath),
    },
    // '/user/login': {
    //   component: dynamicWrapper(app, ['login'],
    //     () => import('../routes/User/Login')),
    // },
    // '/user/register': {
    //   component: dynamicWrapper(app, ['register'],
    //     () => import('../routes/User/Register')),
    // },
    // '/user/register-result': {
    //   component: dynamicWrapper(app, [],
    //     () => import('../routes/User/RegisterResult')),
    // },
    // '/user/:id': {
    //   component: dynamicWrapper(app, [], () => import('../routes/admin/User/SomeComponent')),
    // },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData(parentPath));
  const routerDataWithName = {};
  Object.keys(routerData).forEach((item) => {
    routerDataWithName[parentPath+item] = {
      ...routerData[item],
      name: routerData[item].name || menuData[item.replace(/^\//, '')],
    };
  });
  return routerDataWithName;
};
