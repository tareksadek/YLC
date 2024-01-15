import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  teamMembers: null,
  teamMembersCount: 0,
  teamMembersPerPage: 15,
  loading: false,
  error: false,
}

const getTeamMembersRequest = state => updateObj(state, { loading: true })
const getTeamMembersSuccess = (state, action) => updateObj(state, {
  teamMembersCount: action.count,
  teamMembers: action.teamMembers,
  loading: false,
  error: false,
})
const getTeamMembersFailure = state => updateObj(state, { loading: false, error: true })
const sortTeamMembers = (state, action) => {
  const { sortValue, sortType } = action
  const newTeamMembers = [...state.teamMembers].sort((a, b) => {
    const comp1 = String(a[sortType]).toLowerCase()
    const comp2 = String(b[sortType]).toLowerCase()
    let r
    if (sortValue === 'asc') {
      if (comp1 > comp2) {
        r = 1
      } else if (comp1 < comp2) {
        r = -1
      } else {
        r = 0
      }
    } else if (sortValue === 'desc') {
      if (comp2 > comp1) {
        r = 1
      } else if (comp2 < comp1) {
        r = -1
      } else {
        r = 0
      }
    }

    if (r === 0) {
      r = (typeof a.key !== 'undefined' && typeof b.key !== 'undefined') ? a.key - b.key : 0
    }

    return r
  })
  return updateObj(state, {
    teamMembers: newTeamMembers,
    loading: false,
    error: false,
  })
}
const toggleTeamMemberProfileActivity = (state, action) => {
  const currentTeamMembers = [
    ...state.teamMembers,
  ]
  const teamMemberIndex = currentTeamMembers.findIndex(item => item.userId === action.userId)
  currentTeamMembers[teamMemberIndex].settings.active = action.active
  return updateObj(state, {
    teamMembers: currentTeamMembers,
    loading: false,
    error: false,
  })
}
const removeTeamMember = (state, action) => {
  const currentMembers = [...state.teamMembers]
  const updatedMembers = currentMembers.filter(member => member.id !== action.memberId)
  return updateObj(state, {
    teamMembers: updatedMembers,
    loading: false,
    error: false,
  })
}

const teamMembersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_TEAM_MEMBERS_REQUEST: return getTeamMembersRequest(state)
    case actionTypes.GET_TEAM_MEMBERS_SUCCESS: return getTeamMembersSuccess(state, action)
    case actionTypes.GET_TEAM_MEMBERS_FAILURE: return getTeamMembersFailure(state)
    case actionTypes.SORT_TEAM_MEMBERS: return sortTeamMembers(state, action)
    case actionTypes.TOGGLE_TEAM_MEMBER_PROFILE_ACTIVITY: return toggleTeamMemberProfileActivity(state, action)
    case actionTypes.REMOVE_TEAM_MEMBERS: return removeTeamMember(state, action)
    default: return state
  }
}

export default teamMembersReducer
