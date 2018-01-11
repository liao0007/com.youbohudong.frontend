import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const KFCModule = dynamic({ app, component: () => import('./kfc/router'), });
  const OFOModule = dynamic({ app, component: () => import('./ofo/router'), });

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${match.path}/kfc`} render={(props) => <KFCModule {...props} app={app}/>}/>
        <Route path={`${match.path}/ofo`} render={(props) => <OFOModule {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
