import * as actionTypes from './actionTypes'
import { getTeamCards } from '../../API/cards'

export const getTeamMembersRequest = () => ({
  type: actionTypes.GET_TEAM_MEMBERS_REQUEST,
})

export const getTeamMembersSuccess = teamMembers => ({
  type: actionTypes.GET_TEAM_MEMBERS_SUCCESS,
  teamMembers,
  count: teamMembers.length,
})

export const getTeamMembersFailure = error => ({
  type: actionTypes.GET_TEAM_MEMBERS_FAILURE,
  error,
})

export const startSortTeamMembers = (sortValue, sortType) => ({
  type: actionTypes.SORT_TEAM_MEMBERS,
  sortValue,
  sortType,
})

export const startToggleTeamMemberProfileActivity = (userId, active) => ({
  type: actionTypes.TOGGLE_TEAM_MEMBER_PROFILE_ACTIVITY,
  userId,
  active,
})

export const startRemoveMember = memberId => ({
  type: actionTypes.REMOVE_TEAM_MEMBERS,
  memberId,
})

export const loadTeamMembers = masterId => async dispatch => {
  let teamMembers = []
  dispatch(getTeamMembersRequest())
  try {
    teamMembers = await getTeamCards(masterId)
    dispatch(getTeamMembersSuccess(teamMembers))
    return teamMembers
  } catch (err) {
    dispatch(getTeamMembersFailure(err))
  }
  return teamMembers
}

export const sortTeamMembers = (sortValue, sortType) => async dispatch => {
  dispatch(getTeamMembersRequest())
  dispatch(startSortTeamMembers(sortValue, sortType))
}

export const toggleTeamMemberProfileActivity = (userId, active) => dispatch => {
  dispatch(getTeamMembersRequest())
  dispatch(startToggleTeamMemberProfileActivity(userId, active))
}

export const removeTeamMember = memberId => async dispatch => {
  dispatch(startRemoveMember(memberId))
}
