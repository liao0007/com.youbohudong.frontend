import { Constant } from '../../../../../constant';
import { listBook } from '../services/book';

export default {
  namespace: 'book',

  state: {
    books: [],
    isUpdating: false,
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        dispatch({ type: 'listBook' });
      });
    },
  },

  effects: {
    * changeBook({ payload }, { call, put }) {
      yield put({ type: 'onChangeBook', payload: payload });
    },

    * listBook({ payload }, { call, put }) {
      yield put({ type: 'onListBook' });
      const response = yield call(listBook);
      yield put({ type: 'onListBook', status: Constant.ActionStatus.Success, payload: { books: response } });
    },
  },

  reducers: {
    onListBook(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            books: action.payload.books,
            isUpdating: false,
          };

        default:
          return {
            ...state,
            isUpdating: true,
          };
      }
    },
  },
};
