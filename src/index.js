import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import FastClick from 'fastclick';

// 1. Initialize
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./kfc/calendar-2018/models/task'));

// 4. Router
app.router(require('./modules/router'));

// 5. Start
app.start('#root');
FastClick.attach(document.body);
