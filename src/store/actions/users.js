import * as actionTypes from './actionTypes'
import { getAllUsers, getRequestedUsers, getUsersByKeyword } from '../../API/users'

export const getUsersRequest = () => ({
  type: actionTypes.GET_USERS_REQUEST,
})

export const getUsersSuccess = users => ({
  type: actionTypes.GET_USERS_SUCCESS,
  users,
  count: users.length,
})

export const getUsersFailure = error => ({
  type: actionTypes.GET_USERS_FAILURE,
  error,
})

export const startSortUsers = (sortValue, sortType) => ({
  type: actionTypes.SORT_USERS,
  sortValue,
  sortType,
})

export const loadUsers = currentUserEmail => async dispatch => {
  dispatch(getUsersRequest())
  try {
    const users = await getAllUsers()
    dispatch(getUsersSuccess(users.filter(user => user.email !== currentUserEmail)))
  } catch (err) {
    dispatch(getUsersFailure(err))
  }
}

export const loadUsersByArguments = (currentUserEmail, startDate, endDate, sortBy, order, onlyAdminCreatedAccounts) => async dispatch => {
  dispatch(getUsersRequest())
  try {
    let users = await getRequestedUsers(currentUserEmail, startDate, endDate, sortBy, order)
    if (onlyAdminCreatedAccounts) {
      users = users.filter(user => user.method === 'admin')
    }
    dispatch(getUsersSuccess(users))
  } catch (err) {
    dispatch(getUsersFailure(err))
  }
}

export const loadUsersByKeyword = (currentUserEmail, searchKeyword, searchFor, orderBy, order) => async dispatch => {
  dispatch(getUsersRequest())
  try {
    const users = await getUsersByKeyword(currentUserEmail, searchKeyword, searchFor, orderBy, order)
    dispatch(getUsersSuccess(users))
  } catch (err) {
    dispatch(getUsersFailure(err))
  }
}

export const sortUsers = (sortValue, sortType) => async dispatch => {
  dispatch(getUsersRequest())
  dispatch(startSortUsers(sortValue, sortType))
}
