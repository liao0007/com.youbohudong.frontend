import React from 'react';
import { Route, Router, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const ITBooksModule = dynamic({ app, component: () => import('./itbooks/router'), });

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${match.path}/itbooks`} render={(props) => <ITBooksModule {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
