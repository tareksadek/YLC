import * as actionTypes from './actionTypes'
import { getCounterBySuffix, countCardClicks, getCounterById } from '../../API/counter'

export const getCounterRequest = () => ({
  type: actionTypes.GET_COUNTER_REQUEST,
})

export const getCounterSuccess = counter => ({
  type: actionTypes.GET_COUNTER_SUCCESS,
  userId: counter.userId || null,
  urlSuffix: counter.urlSuffix || null,
  clickedNo: counter.clickedNo || 0,
})

export const getCounterFailure = error => ({
  type: actionTypes.GET_COUNTER_FAILURE,
  error,
})

export const clearCounter = () => ({
  type: actionTypes.CLEAR_COUNTER,
})

export const incrementCardClicks = suffix => async dispatch => {
  try {
    await countCardClicks(suffix)
  } catch (err) {
    dispatch(getCounterFailure(err))
  }
}

export const loadCounter = suffix => async dispatch => {
  dispatch(getCounterRequest())
  try {
    const counter = await getCounterBySuffix(suffix)
    dispatch(getCounterSuccess(counter))
  } catch (err) {
    dispatch(getCounterFailure(err))
  }
}

export const loadCounterById = id => async dispatch => {
  dispatch(getCounterRequest())
  try {
    const counter = await getCounterById(id)
    dispatch(getCounterSuccess(counter))
  } catch (err) {
    dispatch(getCounterFailure(err))
  }
}
