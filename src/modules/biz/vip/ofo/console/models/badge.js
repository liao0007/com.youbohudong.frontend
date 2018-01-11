import { queryFakeList } from '../services/api';
import { Constant } from '../../../../../../constant';
import { batchDeleteEmployee, createEmployee, deleteEmployee, listEmployee, updateEmployee } from '../services/badge';
import { notification } from 'antd';

export default {
  namespace: 'badge',

  state: {
    employees: [],
    activeEmployee: undefined,
    isUpdatingEmployees: false,
    updatingEmployeeUids: [],
    isUploadingEmployeeList: false,

    regions: [
      {
        key: 'main-land', name: '大陆', cities: [
          { key: '010', name: '北京' },
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

    * toggleCheck({ payload }, { call, put }) {
      yield put({ type: 'onToggleCheck', payload: payload });
    },

    * toggleCheckAll({ payload }, { call, put }) {
      yield put({ type: 'onToggleCheckAll', payload: payload });
    },

    * uploadEmployeeList({ payload }, { call, put }) {
      yield put({ type: 'onUploadEmployeeList', payload: payload });
    },

    * uploadEmployeeAvatar({ payload }, { call, put }) {
      yield put({ type: 'onUploadEmployeeAvatar', payload: payload });
    },

    * listEmployee({ payload }, { call, put }) {
      yield put({ type: 'onListEmployee' });
      const response = yield call(listEmployee, payload.city);
      yield put({ type: 'onListEmployee', status: Constant.ActionStatus.Success, payload: { employees: response } });
    },

    * deleteEmployee({ payload }, { call, put }) {
      yield put({ type: 'onDeleteEmployee', payload: payload });
      const response = yield call(deleteEmployee, payload.employee);
      yield put({ type: 'onDeleteEmployee', status: Constant.ActionStatus.Success, payload: { employee: response } });
    },

    * batchDeleteEmployee({ payload }, { call, put }) {
      yield put({ type: 'onBatchDeleteEmployee', payload: payload });
      const response = yield call(batchDeleteEmployee, payload.employees);
      yield put({ type: 'onBatchDeleteEmployee', status: Constant.ActionStatus.Success, payload: { employees: response } });
    },

    * createEmployee({ payload }, { call, put }) {
      yield put({ type: 'onCreateEmployee', payload: payload });
      const response = yield call(createEmployee, payload.city, payload.employee);
      yield put({ type: 'onCreateEmployee', status: Constant.ActionStatus.Success, payload: { employee: response } });
    },

    * updateEmployee({ payload }, { call, put }) {
      yield put({ type: 'onUpdateEmployee', payload: payload });
      const response = yield call(updateEmployee, payload.employee);
      yield put({ type: 'onUpdateEmployee', status: Constant.ActionStatus.Success, payload: { employee: response } });
    },

    * toggleActiveEmployee({ payload }, { call, put }) {
      yield put({ type: 'onToggleActiveEmployee', payload: payload });
    },

    * activeEmployeeFieldsChange({ payload }, { call, put }) {
      yield put({ type: 'onActiveEmployeeFieldsChange', payload: payload });
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
    onListEmployee(state, action) {
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
    onCreateEmployee(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            activeEmployee: undefined,
            updatingEmployeeUids: state.updatingEmployeeUids.filter(uid => (uid !== 0)),
            employees: [
              action.payload.employee,
              ...state.employees,
            ],
          };
        default:
          return {
            ...state,
            updatingEmployeeUids: [0, ...state.updatingEmployeeUids],
          };
      }
    },
    onUpdateEmployee(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            activeEmployee: undefined,
            updatingEmployeeUids: state.updatingEmployeeUids.filter(uid => (uid !== action.payload.employee.uid)),
            employees: state.employees.map((employee) => {
              return employee.uid === action.payload.employee.uid ? action.payload.employee : employee;
            }),
          };
        default:
          return {
            ...state,
            updatingEmployeeUids: [action.payload.employee.uid, ...state.updatingEmployeeUids],
          };
      }
    },
    onDeleteEmployee(state, action) {
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
            updatingEmployeeUids: state.updatingEmployeeUids.filter(uid => (uid !== action.payload.employee.uid)),
            employees: state.employees.filter((employee) => {
              return employee.uid !== action.payload.employee.uid;
            }),
          };
        default:
          return {
            ...state,
            updatingEmployeeUids: [action.payload.employee.uid, ...state.updatingEmployeeUids],
          };
      }
    },
    onBatchDeleteEmployee(state, action) {
      let employeeUids = action.payload.employees.map((employee) => {
        return employee.uid;
      });
      switch (action.status) {
        case Constant.ActionStatus.Success:
          return {
            ...state,
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
          };
      }
    },
    onUploadEmployeeAvatar(state, action) {
      let avatarInfo = action.payload.info;
      if (avatarInfo.file.status === 'uploading') {
        return {
          ...state,
          updatingEmployeeUids: [...state.updatingEmployeeUids, action.payload.employee.uid],
        };
      } else if (avatarInfo.file.status === 'done') {
        return {
          ...state,
          employees: state.employees.map((employee) => {
            return employee.uid === avatarInfo.file.response.uid ? avatarInfo.file.response : employee;
          }),
          updatingEmployeeUids: state.updatingEmployeeUids.filter(uid => (uid !== action.payload.employee.uid)),
        };
      } else if (avatarInfo.file.status === 'error') {
        notification['error']({
          message: avatarInfo.file.status,
          description: avatarInfo.file.name + '上传失败',
        });
        return {
          ...state,
          updatingEmployeeUids: state.updatingEmployeeUids.filter(uid => (uid !== action.payload.employee.uid)),
        };
      } else {
        return state;
      }
    },
    onUploadEmployeeList(state, action) {
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
    onToggleCheck(state, action) {
      return {
        ...state,
        employees: state.employees.map((employee) => {
          if (employee.uid === action.payload.employee.uid) {
            employee.isChecked = action.payload.checkbox.checked;
          }
          return employee;
        }),
      };
    },
    onToggleCheckAll(state, action) {
      return {
        ...state,
        employees: state.employees.map((employee) => {
          employee.isChecked = action.payload.checked;
          return employee;
        }),
      };
    },
    onToggleActiveEmployee(state, action) {
      return {
        ...state,
        activeEmployee: action.payload.employee,
      };
    },
    onActiveEmployeeFieldsChange(state, action) {
      let changedFieldObject = {};
      Object.keys(action.payload.changedFields).forEach((key) => {
        changedFieldObject[key] = action.payload.changedFields[key].value;
      });

      return {
        ...state,
        activeEmployee: {
          ...state.activeEmployee,
          ...changedFieldObject,
        },
      };
    },
  },
};
