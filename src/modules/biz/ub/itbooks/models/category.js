import { Constant } from '../../../../../constant';
import { listCategory } from '../services/category';

export default {
  namespace: 'category',

  state: {
    categories: [],
    activeCategory: undefined,
    activeSubcategory: undefined,
    isUpdating: false,
  },

  subscriptions: {
    setup({ history, dispatch }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname }) => {
        dispatch({ type: 'listCategory' });
      });
    },
  },

  effects: {
    * changeCategory({ payload }, { call, put }) {
      yield put({ type: 'onChangeCategory', payload: payload });
    },

    * listCategory({ payload }, { call, put }) {
      yield put({ type: 'onListCategory' });
      const response = yield call(listCategory);
      yield put({ type: 'onListCategory', status: Constant.ActionStatus.Success, payload: { categories: response } });
    },
  },

  reducers: {
    changeCategory(state, action) {
      return {
        ...state,
        activeCategory: action.payload.category,
        activeSubcategory: action.payload.subcategory,
      };
    },

    onListCategory(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            categories: action.payload.categories,
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
