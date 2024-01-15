import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  userId: null,
  active: false,
  code: null,
  image: null,
  title: null,
  description: null,
  tagLine: null,
  addedOn: null,
  startDate: null,
  endDate: null,
  limit: null,
  oldPrice: null,
  newPrice: null,
  discount: null,
  loading: false,
  error: false,
}

const getOfferRequest = state => updateObj(state, { loading: true })
const getOfferSuccess = (state, action) => updateObj(state, {
  userId: action.userId,
  active: action.active,
  code: action.code,
  image: action.image,
  title: action.title,
  description: action.description,
  tagLine: action.tagLine,
  addedOn: action.addedOn,
  startDate: action.startDate,
  endDate: action.endDate,
  limit: action.limit,
  oldPrice: action.oldPrice,
  newPrice: action.newPrice,
  discount: action.discount,
  loading: false,
  error: false,
})
const getOfferFailure = state => updateObj(state, { loading: false, error: true })
const updateOffer = (state, action) => updateObj(state, {
  ...action.newData,
  loading: false,
  error: false,
})
const clearOffer = state => state

const offerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_OFFER_REQUEST: return getOfferRequest(state)
    case actionTypes.GET_OFFER_SUCCESS: return getOfferSuccess(state, action)
    case actionTypes.GET_OFFER_FAILURE: return getOfferFailure(state)
    case actionTypes.UPDATE_OFFER: return updateOffer(state, action)
    case actionTypes.CLEAR_OFFER: return clearOffer(initialState)
    default: return state
  }
}

export default offerReducer
