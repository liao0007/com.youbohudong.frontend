import { get } from '../services/home';
import { Constant } from '../../../../../constant';

export default {

  namespace: 'home',

  state: {
    redpacket: {},
    isLoading: false,
  },

  subscriptions: {},

  effects: {
    * get({ payload }, { call, put, select }) {
      yield put({ type: 'onGet' });
      const response = yield call(get, payload.from);
      yield put({ type: 'onGet', status: Constant.ActionStatus.Success, payload: response, });
    },
  },

  reducers: {
    onGet(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return { ...state, redpacket: action.payload, isLoading: false };
        default:
          return { ...state, isLoading: true };
      }
    },

  },

};
