import 'babel-polyfill';
import dva from 'dva';
import 'moment/locale/zh-cn';
import './index.css';
import createHistory from 'history/createBrowserHistory';
import FastClick from 'fastclick';
import ReactGA from 'react-ga';

const history = createHistory();
ReactGA.initialize('UA-68706897-1', { debug: false }); //Unique Google Analytics tracking number
ReactGA.pageview(window.location.pathname + window.location.search);
history.listen((location) => {
  ReactGA.pageview(location.pathname + location.search);
});

// 1. Initialize
// const app = dva({ history });
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./kfc/calendar-2018/models/task'));

// 4. Router
app.router(require('./modules/router'));

// 5. Start
app.start('#root');
FastClick.attach(document.body);
