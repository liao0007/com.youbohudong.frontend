import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const ConsoleModule = dynamic({ app, component: () => import('./console/router'), });

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${match.path}/console`} render={(props) => <ConsoleModule {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
