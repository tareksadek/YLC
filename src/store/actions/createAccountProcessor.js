import * as actionTypes from './actionTypes'
// import { getInvitationByCode } from '../../API/invitations'

export const getProcessRequest = () => ({
  type: actionTypes.GET_PROCESS_REQUEST,
})

export const getPriceSuccess = (priceId, productId, quantity, withCards) => ({
  type: actionTypes.GET_PRICE_SUCCESS,
  priceId,
  productId,
  quantity,
  withCards,
})

export const getPriceFailure = () => ({
  type: actionTypes.GET_PRICE_FAILURE,
})

export const clearProcess = () => ({
  type: actionTypes.CLEAR_PROCESS,
})

export const getPackagePrice = (priceId, productId, quantity, withCards) => async dispatch => {
  dispatch(getProcessRequest())
  dispatch(getPriceSuccess(priceId, productId, quantity, withCards))
  // return true
}
