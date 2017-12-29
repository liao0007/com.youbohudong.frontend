import { collectCoupon, collectGrandPrize, completeTask, list, rollGrandPrize, updateContactInfo } from '../services/home';
import { Constant } from '../../../../../constant';
import { getInfo } from '../services/home';

export default {

  namespace: 'home',

  state: {
    userInfo: {},
    taskInfos: [],
    isFetchingInfo: false,
  },

  subscriptions: {},

  effects: {
    * fetchInfo({ payload }, { call, put, select }) {
      yield put({ type: 'onFetchInfo' });
      const response = yield call(getInfo, payload.udid);
      yield put({ type: 'onFetchInfo', status: Constant.ActionStatus.Success, payload: response, });
    },

    * completeTask({ payload }, { call, put, select }) {
      yield put({ type: 'onFetchInfo' });
      const response = yield call(completeTask, payload.udid, payload.task);
      yield put({ type: 'onFetchInfo', status: Constant.ActionStatus.Success, payload: response, });
    },

    * collectCoupon({ payload }, { call, put, select }) {
      yield put({ type: 'onFetchInfo' });
      const response = yield call(collectCoupon, payload.udid, payload.task);
      if (typeof payload.callback === 'function') payload.callback();
      yield put({ type: 'onFetchInfo', status: Constant.ActionStatus.Success, payload: response, });
    },

    * rollGrandPrize({ payload }, { call, put, select }) {
      yield put({ type: 'onFetchInfo' });
      const response = yield call(rollGrandPrize, payload.udid, payload.task);
      yield put({ type: 'onFetchInfo', status: Constant.ActionStatus.Success, payload: response, });
    },

    * mobileChanged({ payload }, { call, put, select }) {
      yield put({ type: 'onMobileChanged', payload: payload, });
    },

    * isJoinOfflineEventChanged({ payload }, { call, put, select }) {
      yield put({ type: 'onIsJoinOfflineEventChanged', payload: payload, });
    },

    * updateContactInfo({ payload }, { call, put, select }) {
      yield put({ type: 'onFetchInfo' });
      const response = yield call(updateContactInfo, payload.udid, payload.mobile, payload.join);
      yield put({ type: 'onFetchInfo', status: Constant.ActionStatus.Success, payload: response, });
    },

    * collectGrandPrize({ payload }, { call, put, select }) {
      yield put({ type: 'onFetchInfo' });
      const response = yield call(collectGrandPrize, payload.udid);
      if (typeof payload.callback === 'function') payload.callback();
      yield put({ type: 'onFetchInfo', status: Constant.ActionStatus.Success, payload: response, });
    },
  },

  reducers: {
    onFetchInfo(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return { ...state, ...action.payload, isUpdatingInfo: false };
        default:
          return { ...state, isUpdatingInfo: true };
      }
    },

    onMobileChanged(state, action) {
      return {
        ...state,
        userInfo: { ...state.userInfo, mobile: action.payload.mobile },
      };
    },

    onIsJoinOfflineEventChanged(state, action) {
      return {
        ...state,
        userInfo: { ...state.userInfo, isJoinOfflineEvent: action.payload.isJoinOfflineEvent },
      };
    },

  },

};
