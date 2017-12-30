import { queryFakeList } from '../services/api';
import { Constant } from '../../../../../constant';
import responsive from '../../../../../components/antd-pro/DescriptionList/responsive';
import { list } from '../services/badge';

export default {
  namespace: 'badge',

  state: {
    employees: [],
    isUpdatingEmployees: false,
    updatingEmployeeUids: [],
    isUploadingEmployeeList: false,

    regions: [
      {
        key: 'nw', name: '华北', cities: [
          { key: '010', name: '北京' },
          { key: '011', name: '天津' },
          { key: '012', name: '上海' },
        ],
      },
      {
        key: 'nb', name: '西南', cities: [
          { key: '020', name: '重庆' },
          { key: '021', name: '成都' },
          { key: '022', name: '西安' },
        ],
      },
    ],
    activeRegion: undefined,
    activeCity: undefined,
  },

  effects: {
    * changeRegion({ payload }, { call, put }) {
      yield put({ type: 'onRegionChanged', payload: payload });
    },

    * changeCity({ payload }, { call, put }) {
      yield put({ type: 'onCityChanged', payload: payload });
    },

    * list({ payload }, { call, put }) {
      yield put({ type: 'onList' });
      const response = yield call(list, payload.city);
      yield put({ type: 'onList', status: Constant.ActionStatus.Success, payload: { employees: response } });
    },

    * fetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    * appendFetch({ payload }, { call, put }) {
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
  },

  reducers: {
    onRegionChanged(state, action) {
      return {
        ...state,
        activeRegion: action.payload.region,
      };
    },
    onCityChanged(state, action) {
      return {
        ...state,
        activeCity: action.payload.city,
      };
    },
    onList(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            employees: action.payload.employees,
            updatingEmployeeUids: [],
            isUpdatingEmployees: false,
          };

        default:
          return {
            ...state,
            isUpdatingEmployees: true,
          };
      }
    },
    onCreate(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            activeEmployee: undefined,
            isUpdatingEmployees: false,
            employees: [
              action.payload.employee,
              ...state.employees,
            ],
          };
        default:
          return {
            ...state,
            isUpdatingEmployees: true,
          };
      }
    },
    onUpdate(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            isUpdatingEmployees: false,
            activeEmployee: undefined,
            employees: state.employees.map((employee) => {
              return employee.uid === action.payload.employee.uid ? action.payload.employee : employee;
            }),
          };
        default:
          return {
            ...state,
            isUpdatingEmployees: true,
          };
      }
    },
    onDelete(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            updatingEmployeeUids: state.updatingEmployeeUids.filter((employee) => {
              return employee.uid !== action.payload.employee.uid;
            }),
            isUpdatingEmployees: false,
            employees: state.employees.filter((employee) => {
              return employee.uid !== action.payload.employee.uid;
            }),
          };
        default:
          return {
            ...state,
            updatingEmployeeUids: [action.payload.employee.uid, ...state.updatingEmployeeUids],
            isUpdatingEmployees: true,
          };
      }
    },
    onBatchDelete(state, action) {
      let employeeUids = action.payload.employees.map((employee) => {
        return employee.uid;
      });
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            isUpdatingEmployees: false,
            updatingEmployeeUids: state.updatingEmployeeUids.filter((employeeUid) => {
              return !employeeUids.includes(employeeUid);
            }),
            employees: state.employees.filter((employee) => {
              return !employeeUids.includes(employee.uid);
            }),
          };
        default:
          return {
            ...state,
            updatingEmployeeUids: [
              ...employeeUids,
              state.updatingEmployeeUids,
            ],
            isUpdatingEmployees: true,
          };
      }
    },
    onUploadAvatar(state, action) {
      let avatarInfo = action.payload.info;
      if (avatarInfo.file.status === 'uploading') {
        return {
          ...state,
          isUpdatingEmployees: true,
          updatingEmployeeUids: [...state.updatingEmployeeUids, action.payload.employee.uid],
        };
      } else if (avatarInfo.file.status === 'done') {
        return {
          ...state,
          employees: state.employees.map((employee) => {
            return employee.uid === avatarInfo.file.response.uid ? avatarInfo.file.response : employee;
          }),
          isUpdatingEmployees: false,
          updatingEmployeeUids: state.employees.filter((employee) => {
            return employee.uid !== action.payload.employee.uid;
          }),
        };
      } else if (avatarInfo.file.status === 'error') {
        notification['error']({
          message: avatarInfo.file.status,
          description: avatarInfo.file.name + '上传失败',
        });
        return {
          ...state,
          isUpdatingEmployees: false,
          updatingEmployeeUids: state.employees.filter((employee) => {
            return employee.uid !== action.payload.employee.uid;
          }),
        };
      } else {
        return state;
      }
    },
    onUploadList(state, action) {
      let employeeListInfo = action.payload.info;
      if (employeeListInfo.file.status === 'uploading') {
        return {
          ...state,
          isUpdatingEmployees: true,
          isUploadingEmployeeList: true,
        };
      } else if (employeeListInfo.file.status === 'done') {
        return {
          ...state,
          isUpdatingEmployees: false,
          isUploadingEmployeeList: false,
          employees: [
            ...employeeListInfo.file.response,
          ],
        };
      } else if (employeeListInfo.file.status === 'error') {
        notification['error']({
          message: employeeListInfo.file.status,
          description: employeeListInfo.file.name + '上传失败',
        });
        return {
          ...state,
          isUpdatingEmployees: false,
          isUploadingEmployeeList: false,
        };
      }
    },
    onCheckChanged(state, action) {
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee.uid === action.payload.employee.uid) {
            employee.isChecked = action.payload.checked;
          }
          return employee;
        }),
      };
    },
  },
};
