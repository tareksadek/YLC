import * as actionTypes from './actionTypes'
import { getAllProfiles, activateProfile, getActiveProfileId } from '../../API/cards'

export const getProfilesRequest = () => ({
  type: actionTypes.GET_PROFILES_REQUEST,
})

export const getProfilesSuccess = (profiles, activeProfileId) => ({
  type: actionTypes.GET_PROFILES_SUCCESS,
  profiles: profiles || null,
  activeProfileId: activeProfileId || null,
  count: profiles ? profiles.length : 0,
})

export const getProfilesFailure = error => ({
  type: actionTypes.GET_PROFILES_FAILURE,
  error,
})

export const startAddProfile = extraProfile => ({
  type: actionTypes.ADD_PROFILE,
  extraProfile,
})

export const startActivateProfile = activeProfileId => ({
  type: actionTypes.ACTIVATE_PROFILE,
  activeProfileId,
})

export const loadProfiles = userId => async dispatch => {
  dispatch(getProfilesRequest())
  try {
    const profiles = await getAllProfiles(userId)
    const activeProfileId = await getActiveProfileId(userId)
    dispatch(getProfilesSuccess(profiles, activeProfileId))
  } catch (err) {
    dispatch(getProfilesFailure(err))
  }
}

export const addProfile = extraProfile => async dispatch => {
  dispatch(getProfilesRequest())
  try {
    dispatch(startAddProfile(extraProfile))
  } catch (err) {
    dispatch(getProfilesFailure(err))
  }
}

export const activateUserProfile = (userId, profileId) => async dispatch => {
  dispatch(getProfilesRequest())
  try {
    await activateProfile(userId, profileId)
    dispatch(startActivateProfile(profileId))
  } catch (err) {
    dispatch(getProfilesFailure(err))
  }
}
