import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const VIPModule = dynamic({ app, component: () => import('./vip/router'), });
  const UBModule = dynamic({ app, component: () => import('./ub/router'), });

  return (
    <Router history={history} >
      <Switch >
        <Route path={`${match.path}/vip`} render={(props) => <VIPModule {...props} app={app} />} />
        <Route path={`${match.path}/ub`} render={(props) => <UBModule {...props} app={app} />} />
      </Switch >
    </Router >
  );
};
