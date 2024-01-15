import * as actionTypes from './actionTypes'
import { getInvitationByCode } from '../../API/invitations'

export const getInvitationRequest = () => ({
  type: actionTypes.GET_INVITATION_REQUEST,
})

export const getInvitationSuccess = (code, patchId, status, invitationType, expirationDate, used, usedBy,
  usedOn, parentInvitation, childInvitations, packageType, masterId, invitationTheme, store, masterProfileId, masterInvitationId, productId, alwaysPro) => ({
  type: actionTypes.GET_INVITATION_SUCCESS,
  code,
  patchId,
  status,
  invitationType,
  expirationDate,
  used,
  usedBy,
  usedOn,
  parentInvitation,
  childInvitations,
  masterId,
  package: packageType,
  invitationTheme: invitationTheme || null,
  store: store || null,
  masterProfileId,
  masterInvitationId,
  productId,
  alwaysPro: alwaysPro || false,
})

export const getInvitationFailure = (code, patchId, status, packageType) => ({
  type: actionTypes.GET_INVITATION_FAILURE,
  code,
  patchId,
  status,
  package: packageType,
})

export const clearInvitation = () => ({
  type: actionTypes.CLEAR_INVITATION,
})

const invitationCodeStatus = invitationObj => {
  let status
  if (invitationObj.used) {
    status = 'used'
  // } else if (invitationObj.expirationDate.toDate() < new Date()) {
  //   status = 'expired'
  } else {
    status = 'valid'
  }

  return status
}

export const checkInvitation = invitationCode => async dispatch => {
  let invitationStatus
  let invitationPackage
  let masterInvitationId
  let invitationTheme
  let store
  let productId
  dispatch(getInvitationRequest())
  try {
    const invitationObj = await getInvitationByCode(invitationCode)
    let masterProfileId = null
    if (invitationObj) {
      invitationStatus = invitationCodeStatus(invitationObj)
      invitationPackage = invitationObj.package
      masterInvitationId = invitationObj.masterInvitationId || null
      if (masterInvitationId) {
        const masterInvitation = await getInvitationByCode(masterInvitationId)
        masterProfileId = masterInvitation.usedBy
      }
      invitationTheme = invitationObj.theme || null
      store = invitationObj.store || null
      productId = invitationObj.productId || null
      if (invitationStatus === 'valid' || invitationStatus === 'used') {
        dispatch(getInvitationSuccess(
          invitationCode,
          invitationObj.patchId,
          invitationStatus,
          invitationObj.type,
          invitationObj.expirationDate.toDate(),
          invitationObj.used,
          invitationObj.usedBy,
          invitationObj.usedOn,
          invitationObj.parentInvitation,
          invitationObj.childInvitations,
          invitationPackage,
          invitationObj.masterId,
          invitationTheme,
          store,
          masterProfileId,
          masterInvitationId,
          productId,
          invitationObj.alwaysPro,
        ))
      } else {
        dispatch(getInvitationFailure(invitationCode, invitationStatus, null))
      }
    } else {
      invitationStatus = 'invalid'
      invitationPackage = null
      dispatch(getInvitationFailure(invitationCode, invitationStatus, invitationPackage))
    }
    return {
      invitationStatus,
      invitationPackage,
      invitationCode,
      masterId: invitationObj.masterId,
      masterInvitationId,
      accountType: invitationObj.type,
      patch: invitationObj.patchId,
      used: invitationObj.used,
      usedBy: invitationObj.usedBy,
      invitationTheme,
      store,
      productId,
    }
  } catch (err) {
    dispatch(getInvitationFailure(null, null, null))
  }
  return true
}
