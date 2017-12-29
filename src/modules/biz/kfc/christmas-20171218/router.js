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
    <Router history={history} >
      <Switch >
        <Route exact path={`${match.path}/:taskId`} render={(props) => <HomePage {...props} app={app} />} />
        <Route path={`${match.path}`} render={(props) => <HomePage {...props} app={app} />} />
      </Switch >
    </Router >
  );
};
