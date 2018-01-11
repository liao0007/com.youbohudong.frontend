import React from 'react';
import dynamic from 'dva/dynamic';
import { categoriesToMenuData, menuData } from './menu';
import { getFlatMenuDataWithName } from '../../../../../utils/menu';

// wrapper of dynamic
const dynamicWrapper = (app, models, component, parentPath, categories) => {
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
          resolve(props => <Comp {...props} routerData={getRouterData(app, parentPath, categories)} />);
        }).catch(err => reject(err));
      });
    },
  });
};

export const getRouterData = (app, parentPath, categories) => {
  const routerData = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'],
        () => import('../layouts/BasicLayout'), parentPath, categories),
    },
    '/badge/card-list/:activeRegion/:activeCity': {
      component: dynamicWrapper(app, ['badge'],
        () => import('../routes/Badge/CardList'), parentPath, categories),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [],
        () => import('../routes/Exception/403'), parentPath, categories),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [],
        () => import('../routes/Exception/404'), parentPath, categories),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [],
        () => import('../routes/Exception/500'), parentPath, categories),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'],
        () => import('../routes/Exception/triggerException'), parentPath, categories),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout'), parentPath, categories),
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
  let menuData = categoriesToMenuData(categories);
  return getFlatMenuDataWithName(menuData, routerData, parentPath);
};
