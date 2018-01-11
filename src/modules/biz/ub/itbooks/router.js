import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { Spin } from 'antd';
import dynamic from 'dva/dynamic';
import { getRouterData } from './common/router';
import onError from './error';
import styles from './index.less';
import { connect } from 'dva';

dynamic.setDefaultLoadingComponent(() => {
  return <Spin size="large" className={styles.globalSpin} />;
});

function RouterConfig({ history, app, match }) {
  if (!app._models.some(({ namespace }) => namespace === 'global')) {
    app.model(require('./models/global'));
    app.model(require('./models/category'));
  }
  app.onError = onError;

  const routerData = getRouterData(app, match.path);
  const BasicLayout = routerData[`${match.path}/`].component;
  const UserLayout = routerData[`${match.path}/user`].component;

  return (
    <Router history={history} >
      <Switch >
        <Route path={`${match.path}/`} render={props => <BasicLayout {...props} />} />
        <Route path={`${match.path}/user`} render={props => <UserLayout {...props} />} />
      </Switch >
    </Router >
  );
}

export default RouterConfig;
