import { Effect, ImmerReducer, Reducer, Subscription } from 'umi'
import { getRemoteList, editRecord, deleteRecord } from './service'

interface UserModel {
    namespace: 'users',
    state: {},
    effects: {
        getRemote: Effect,
        edit: Effect,
        delete: Effect,
    },
    reducers: {
        getList: Reducer
    },
    subscriptions: {
        setup: Subscription
    }
}

const UserModel: UserModel = {
    namespace: 'users',

    state: {
        users: []
    },

    effects: {
        *getRemote({ payload }, { call, put }) {
            const data = yield call(getRemoteList)
            yield put({
                type: 'getList',
                payload: data
            })
        },
        *edit({ payload }, { put, call }) {
            const data = yield call(editRecord, payload)
        },
        *delete({ payload }, { put, call }) {
            const data = yield call(deleteRecord, payload)
        }
    },
    reducers: {
        getList(state, { payload }) {
            return {
                ...state,
                users: payload
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            // https://github.com/ReactTraining/history/tree/master/docs
            return history.listen(({ pathname }) => {
                if (pathname === '/users') {
                    dispatch({
                        type: 'getRemote'
                    })
                }
            })
        }
    }
}

export default UserModel