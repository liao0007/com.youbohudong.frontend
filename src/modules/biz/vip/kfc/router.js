import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const Calendar2018Module = dynamic({ app, component: () => import('./calendar-2018/router'), });
  const Christmas20171218Module = dynamic({ app, component: () => import('./christmas-20171218/router'), });
  const BelgiumIceCream20171218App = dynamic({ app, component: () => import('./belgium-ice-cream-20171218/router'), });

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${match.path}/calendar-2018`} render={(props) => <Calendar2018Module {...props} app={app}/>}/>
        <Route path={`${match.path}/christmas-20171218`} render={(props) => <Christmas20171218Module {...props} app={app}/>}/>
        <Route path={`${match.path}/belgium-ice-cream-20171218`} render={(props) => <BelgiumIceCream20171218App {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
