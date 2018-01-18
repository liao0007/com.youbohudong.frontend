import { Constant } from '../../../../../constant';
import { createOrder, listBook } from '../services/book';

export default {
  namespace: 'book',

  state: {
    books: { records: [] },
    isUpdating: false,
    order: {
      book: undefined,
      order: {},
      step: 0,
      isUpdating: false,
    },
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

    * createOrder({ payload }, { call, put }) {
      yield put({ type: 'onCreateOrder' });
      const response = yield call(createOrder, payload.order);
      yield put({ type: 'onCreateOrder', status: Constant.ActionStatus.Success, payload: { order: response } });
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

    onOrderBook(state, action) {
      return {
        ...state,
        order: {
          ...state.order,
          book: action.payload.book,
        },
      };
    },

    onCreateOrder(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            order: {
              ...state.order,
              order: action.payload.order,
              step: 1,
              isUpdating: false,
            },
          };

        default:
          return {
            ...state,
            order: {
              ...state.order,
              isUpdating: true,
            },
          };
      }
    },

    onGoToStep(state, action) {
      return {
        ...state,
        order: {
          ...state.order,
          step: action.payload.step,
        },
      };
    },
  },
};
