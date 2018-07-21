import React from 'react';
import {Route, Router, Switch} from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({app, history, match}) => {

  const ITBooksModule = dynamic({app, component: () => import('./itbooks/router'),});
  const PollModule = dynamic({app, component: () => import('./poll/router'),});
  const RedPacket20180218Module = dynamic({app, component: () => import('./redpacket20180212/router'),});

  return (
    <Router history={history}>
      <Switch>
        <Route path={`${match.path}/itbooks`} render={(props) => <ITBooksModule {...props} app={app}/>}/>
        <Route path={`${match.path}/poll`} render={(props) => <PollModule {...props} app={app}/>}/>
        <Route path={`${match.path}/redpacket20180212`}
               render={(props) => <RedPacket20180218Module {...props} app={app}/>}/>
      </Switch>
    </Router>
  );
};
