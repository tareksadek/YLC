import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  priceId: null,
  productId: null,
  quantity: null,
  withCards: false,
  loading: false,
  error: false,
}

const getProcessRequest = state => updateObj(state, { loading: true })
const getPriceSuccess = (state, action) => updateObj(state, {
  priceId: action.priceId,
  productId: action.productId,
  quantity: action.quantity,
  withCards: action.withCards,
  loading: false,
  error: false,
})
const getPriceFailure = state => updateObj(state, {
  priceId: null,
  productId: null,
  loading: false,
  error: true,
})
const clearProcess = state => state

const createAccountProcessorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROCESS_REQUEST: return getProcessRequest(state)
    case actionTypes.GET_PRICE_SUCCESS: return getPriceSuccess(state, action)
    case actionTypes.GET_PRICE_FAILURE: return getPriceFailure(state, action)
    case actionTypes.CLEAR_PROCESS: return clearProcess(initialState)
    default: return state
  }
}

export default createAccountProcessorReducer
