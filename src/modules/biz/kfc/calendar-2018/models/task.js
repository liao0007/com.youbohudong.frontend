import { list } from '../services/task';
import { Constant } from '../../../../../constant';

export default {

  namespace: 'task',

  state: {
    list: [],
    isLoading: false,
  },

  subscriptions: {},

  effects: {
    * fetchList(_, { call, put, select }) {
      const taskList = yield select(state => state.task.list);
      if (taskList.length === 0) {
        yield put({ type: 'list' });
        const response = yield call(list);
        yield put({ type: 'list', status: Constant.ActionStatus.Success, payload: response, });
      }
    },
  },

  reducers: {
    list(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return { ...state, list: action.payload, isLoading: false };
        default:
          return { ...state, isLoading: true };
      }
    },
  },

};
