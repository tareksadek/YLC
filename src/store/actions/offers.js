import * as actionTypes from './actionTypes'
import { getOfferById } from '../../API/offers'

export const getOfferRequest = () => ({
  type: actionTypes.GET_OFFER_REQUEST,
})
export const getOfferSuccess = offer => ({
  type: actionTypes.GET_OFFER_SUCCESS,
  userId: offer.userId || null,
  active: offer.active || null,
  code: offer.code || null,
  image: offer.image || null,
  title: offer.title || null,
  description: offer.description || null,
  tagLine: offer.tagLine || null,
  addedOn: offer.addedOn || null,
  startDate: offer.startDate || null,
  endDate: offer.endDate || null,
  limit: offer.limit || null,
  oldPrice: offer.oldPrice || null,
  newPrice: offer.newPrice || null,
  discount: offer.discount || null,
})

export const getOfferFailure = error => ({
  type: actionTypes.GET_OFFER_FAILURE,
  error,
})

export const clearOffer = () => ({
  type: actionTypes.CLEAR_OFFER,
})

export const updateOfferData = newData => ({
  type: actionTypes.UPDATE_OFFER,
  newData,
})

export const loadOffer = offerData => async dispatch => {
  try {
    dispatch(getOfferRequest())
    dispatch(getOfferSuccess(offerData))
  } catch (err) {
    dispatch(getOfferFailure(err && { message: 'Weak or no internet connection.' }))
  }
}

export const loadOfferByUserId = userId => async dispatch => {
  dispatch(getOfferRequest())
  try {
    const offer = await getOfferById(userId)
    dispatch(getOfferSuccess(offer))
  } catch (err) {
    dispatch(getOfferFailure(err))
  }
}

export const updateOffer = newData => async dispatch => {
  dispatch(getOfferRequest())
  dispatch(updateOfferData(newData))
}
