import { Constant } from '../../../../../constant';
import { listBook } from '../services/book';

export default {
  namespace: 'book',

  state: {
    books: { records: [] },
    isUpdating: false,
  },

  subscriptions: {},

  effects: {
    * listBook({ payload }, { call, put }) {
      yield put({ type: 'onListBook' });
      const response = yield call(listBook, payload);
      yield put({ type: 'onListBook', status: Constant.ActionStatus.Success, payload: { books: response } });
    },

    * concatBook({ payload }, { call, put }) {
      yield put({ type: 'onConcatBook' });
      const response = yield call(listBook, payload);
      yield put({ type: 'onConcatBook', status: Constant.ActionStatus.Success, payload: { books: response } });
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
    onConcatBook(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          let newRecords = action.payload.books.records;
          return {
            ...state,
            books: { ...action.payload.books, records: [...state.books.records, ...newRecords] },
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
