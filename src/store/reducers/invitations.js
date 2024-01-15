import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  code: null,
  patchId: null,
  status: null,
  type: null,
  expirationDate: null,
  used: false,
  usedBy: null,
  usedOn: null,
  parentInvitation: null,
  childInvitations: null,
  masterId: null,
  package: null,
  invitationTheme: null,
  store: null,
  masterProfileId: null,
  masterInvitationId: null,
  productId: null,
  alwaysPro: false,
  loading: false,
  error: false,
}

const getInvitationRequest = state => updateObj(state, { loading: true })
const getInvitationSuccess = (state, action) => updateObj(state, {
  code: action.code,
  patchId: action.patchId,
  status: action.status,
  type: action.invitationType,
  expirationDate: action.expirationDate,
  used: action.used,
  usedBy: action.usedBy,
  usedOn: action.usedOn,
  parentInvitation: action.parentInvitation,
  childInvitations: action.childInvitations,
  masterId: action.masterId,
  package: action.package,
  invitationTheme: action.invitationTheme,
  store: action.store,
  masterProfileId: action.masterProfileId,
  masterInvitationId: action.masterInvitationId,
  productId: action.productId,
  alwaysPro: action.alwaysPro,
  loading: false,
  error: false,
})
const getInvitationFailure = (state, action) => updateObj(state, {
  code: action.code,
  patchId: action.patchId,
  status: action.status,
  package: action.package,
  loading: false,
  error: true,
})
const clearInvitation = state => state

const invitationReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_INVITATION_REQUEST: return getInvitationRequest(state)
    case actionTypes.GET_INVITATION_SUCCESS: return getInvitationSuccess(state, action)
    case actionTypes.GET_INVITATION_FAILURE: return getInvitationFailure(state, action)
    case actionTypes.CLEAR_INVITATION: return clearInvitation(initialState)
    default: return state
  }
}

export default invitationReducer
