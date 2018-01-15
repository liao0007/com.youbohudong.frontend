import React from 'react';
import { Route, Router, Switch } from 'dva/router';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import onError from './error';
import styles from './index.less';
import NotFound from './routes/Exception/404';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} style={{ marginTop: Math.floor(window.innerHeight / 2) - 10 }}/>;
});

function RouterConfig({ history, app, match }) {
  if (!app._models.some(({ namespace }) => namespace === 'global')) {
    app.model(require('./models/global'));
    app.model(require('./models/category'));
  }
  app.onError = onError;

  const CardListPage = dynamic({
    app,
    models: () => [import('./models/user'), import('./models/book')],
    component: () => import('./routes/CardList'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${match.path}/search/:keywords`} render={props => <CardListPage {...props} moduleRootPath={match.path + '/'}/>}/>
        <Route path={`${match.path}/:activeCategory/:activeSubcategory`}
               render={props => <CardListPage {...props} moduleRootPath={match.path + '/'}/>}/>
        <Route path={`${match.path}/:activeCategory`} render={props => <CardListPage {...props} moduleRootPath={match.path + '/'}/>}/>
        <Route path={`${match.path}`} render={props => <CardListPage {...props} moduleRootPath={match.path + '/'}/>}/>

        <Route render={NotFound}/>
      </Switch>
    </Router>
  );
}

export default RouterConfig;
