import * as actionTypes from './actionTypes'

export const setError = error => ({
  type: actionTypes.SET_ERROR,
  error,
})

export const hideError = () => ({
  type: actionTypes.HIDE_ERROR,
})
