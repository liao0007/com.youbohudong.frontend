import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import "./theme.less";

export default ({ app, history, match }) => {

  const SharePage = dynamic({
    app, models: () => [import('./models/home'),], component: () => import('./routes/SharePage'),
  });

  const HomePage = dynamic({
    app, models: () => [import('./models/home'),], component: () => import('./routes/HomePage'),
  });

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={`${match.path}`} render={(props) => <SharePage {...props} app={app}/>}/>
        <Route exact path={`${match.path}/:from/:to`} render={(props) => <HomePage {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
