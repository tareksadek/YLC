import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  profiles: null,
  profileCount: 0,
  activeProfileId: null,
  loading: false,
  error: false,
}

const getProfilesRequest = state => updateObj(state, { loading: true })
const getProfilesSuccess = (state, action) => updateObj(state, {
  profileCount: action.count,
  profiles: action.profiles,
  activeProfileId: action.activeProfileId,
  loading: false,
  error: false,
})
const getProfilesFailure = state => updateObj(state, { loading: false, error: true })
const addProfile = (state, action) => {
  const currentProfiles = state.profiles ? [...state.profiles] : []
  const newProfiles = [
    ...currentProfiles,
    action.extraProfile,
  ]

  return updateObj(state, {
    profiles: newProfiles,
    activeProfileId: action.extraProfile.id,
    loading: false,
    error: false,
  })
}
const activateProfile = (state, action) => updateObj(state, {
  activeProfileId: action.activeProfileId,
  loading: false,
  error: false,
})

const profilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROFILES_REQUEST: return getProfilesRequest(state)
    case actionTypes.GET_PROFILES_SUCCESS: return getProfilesSuccess(state, action)
    case actionTypes.ADD_PROFILE: return addProfile(state, action)
    case actionTypes.GET_PROFILES_FAILURE: return getProfilesFailure(state)
    case actionTypes.ACTIVATE_PROFILE: return activateProfile(state, action)
    default: return state
  }
}

export default profilesReducer
