import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  users: null,
  userCount: 0,
  usersPerPage: 15,
  loading: false,
  error: false,
}

const getUsersRequest = state => updateObj(state, { loading: true })
const getUsersSuccess = (state, action) => updateObj(state, {
  userCount: action.count,
  users: action.users,
  loading: false,
  error: false,
})
const getUsersFailure = state => updateObj(state, { loading: false, error: true })
const sortUsers = (state, action) => {
  const { sortValue } = action
  const { sortType } = action
  const newUsers = [...state.users].sort((a, b) => {
    const comp1 = sortType === 'date' ? a.created.seconds : a[sortType]
    const comp2 = sortType === 'date' ? b.created.seconds : b[sortType]
    const arg1 = sortValue === 'asc' ? comp1 > comp2 : comp1 < comp2
    const arg2 = sortValue === 'asc' ? comp2 > comp1 : comp2 < comp1
    if (arg1) {
      return 1
    }
    if (arg2) {
      return -1
    }
    return 0
  })
  return updateObj(state, {
    users: newUsers,
    loading: false,
    error: false,
  })
}

const cardsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USERS_REQUEST: return getUsersRequest(state)
    case actionTypes.GET_USERS_SUCCESS: return getUsersSuccess(state, action)
    case actionTypes.GET_USERS_FAILURE: return getUsersFailure(state)
    case actionTypes.SORT_USERS: return sortUsers(state, action)
    default: return state
  }
}

export default cardsReducer
