import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const HomePage = dynamic({
    app,
    models: () => [
      import('./models/home'),
    ],
    component: () => import('./routes/HomePage'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${match.path}/:from`} render={(props) => <HomePage {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
