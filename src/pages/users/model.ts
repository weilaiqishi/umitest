import { Effect, ImmerReducer, Reducer, Subscription } from 'umi'
import { getRemoteList } from './service'

interface UserModel {
    namespace: 'users',
    state: {},
    effects: {
        getRemote: Effect
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