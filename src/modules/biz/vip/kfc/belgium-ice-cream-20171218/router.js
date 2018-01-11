import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const HomePage = dynamic({ app, component: () => import('./routes/HomePage'), });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={`${match.path}`} render={(props) => <HomePage {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
