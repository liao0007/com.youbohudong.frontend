import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';

export default ({ app, history, match }) => {

  const HomePage = dynamic({ app, component: () => import('./routes/HomePage'), });
  const DownloadPage = dynamic({ app, component: () => import('./routes/DownloadPage'), });
  const TaskListPage = dynamic({
    app,
    models: () => [
      import('./models/task'),
    ],
    component: () => import('./routes/TaskListPage'),
  });
  const TaskDetailPage = dynamic({
    app,
    models: () => [
      import('./models/task'),
    ],
    component: () => import('./routes/TaskDetailPage'),
  });

  return (
    <Router history={history} >
      <Switch >
        <Route exact path={`${match.path}`} render={(props) => <HomePage {...props} app={app} />} />
        <Route exact path={`${match.path}/download`} render={(props) => <DownloadPage {...props} app={app} />} />
        <Route exact path={`${match.path}/tasks`} render={(props) => <TaskListPage {...props} app={app} />} />
        <Route exact path={`${match.path}/tasks/:key`} render={(props) => <TaskDetailPage {...props} app={app} />} />
      </Switch >
    </Router >
  );
};
