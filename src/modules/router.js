import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import { LocaleProvider, Spin } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import dynamic from 'dva/dynamic';

export default ({ history, app }) => {
  const BizModule = dynamic({ app, component: () => import('./biz/router'), });

  return (
    <LocaleProvider locale={zhCN} >
      <Router history={history} >
        <Switch >
          <Route path="/biz" render={(props) => <BizModule {...props} app={app} />} />
        </Switch >
      </Router >
    </LocaleProvider >
  );
};
