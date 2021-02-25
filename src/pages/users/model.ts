import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { getRemoteList, editRecord, deleteRecord, addRecord } from './service';
import { SingleUserType } from './data';

export interface UserState {
  data: SingleUserType[];
  meta: {
    total: number;
    per_page: number;
    page: number;
  };
}

interface UserModel {
  namespace: 'users';
  state: UserState;
  effects: {
    getRemote: Effect;
    edit: Effect;
    delete: Effect;
    add: Effect;
  };
  reducers: {
    getList: Reducer<UserState>;
  };
  subscriptions: {
    setup: Subscription;
  };
}

const UserModel: UserModel = {
  namespace: 'users',

  state: {
    data: [],
    meta: {
      total: 0,
      per_page: 5,
      page: 1,
    },
  },

  effects: {
    *getRemote({ payload: { page, per_page } }, { call, put }) {
      const data = yield call(getRemoteList, { page, per_page });
      if (!data) {
        return false;
      }
      yield put({
        type: 'getList',
        payload: data,
      });
    },
    *edit({ payload }, { put, call, select }) {
      const data = yield call(editRecord, payload);
      if (!data) {
        return false;
      }
      const { page, per_page } = yield select((state: any) => state.users.meta);
      yield put({
        type: 'getRemote',
        payload: {
          page,
          per_page,
        },
      });
    },
    *add({ payload }, { put, call, select }) {
      const data = yield call(addRecord, payload);
      if (!data) {
        return false;
      }
      const { page, per_page } = yield select((state: any) => state.users.meta);
      yield put({
        type: 'getRemote',
        payload: {
          page,
          per_page,
        },
      });
    },
    *delete({ payload }, { put, call, select }) {
      const data = yield call(deleteRecord, payload);
      if (!data) {
        return false;
      }
      const { page, per_page } = yield select((state: any) => state.users.meta);
      yield put({
        type: 'getRemote',
        payload: {
          page,
          per_page,
        },
      });
    },
  },
  reducers: {
    getList(state, { payload }) {
      return payload;
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      // https://github.com/ReactTraining/history/tree/master/docs
      return history.listen(({ pathname }) => {
        if (pathname === '/users') {
          // dispatch({
          //     type: 'getRemote'
          // })
        }
      });
    },
  },
};

export default UserModel;
