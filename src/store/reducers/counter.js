import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  userId: null,
  urlSuffix: null,
  clickedNo: 0,
  loading: false,
  error: false,
}

const getCounterRequest = state => updateObj(state, { loading: true })
const getCounterSuccess = (state, action) => updateObj(state, {
  userId: action.userId,
  urlSuffix: action.urlSuffix,
  clickedNo: action.clickedNo,
  loading: false,
  error: false,
})
const getCounterFailure = state => updateObj(state, { loading: false, error: true })
const clearCounter = state => state

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COUNTER_REQUEST: return getCounterRequest(state)
    case actionTypes.GET_COUNTER_SUCCESS: return getCounterSuccess(state, action)
    case actionTypes.GET_COUNTER_FAILURE: return getCounterFailure(state)
    case actionTypes.CLEAR_COUNTER: return clearCounter(initialState)
    default: return state
  }
}

export default counterReducer
