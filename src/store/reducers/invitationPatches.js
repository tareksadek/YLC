import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  patches: null,
  patchesCount: 0,
  patchesPerPage: 15,
  loading: false,
  error: false,
}

const getPatchesRequest = state => updateObj(state, { loading: true })
const getPatchesSuccess = (state, action) => updateObj(state, {
  patches: action.patches,
  patchesCount: action.count,
  loading: false,
  error: false,
})
const getPatchesFailure = state => updateObj(state, {
  loading: false,
  error: true,
})
const clearPatches = state => state
const sortPatches = (state, action) => {
  const { sortValue } = action
  const { sortType } = action
  const newPatches = [...state.patches].sort((a, b) => {
    const comp1 = sortType === 'date' ? a.createdOn.seconds : a[sortType]
    const comp2 = sortType === 'date' ? b.createdOn.seconds : b[sortType]
    const arg1 = sortValue === 'asc' ? comp1 > comp2 : comp1 < comp2
    const arg2 = sortValue === 'asc' ? comp2 > comp1 : comp2 < comp1
    if (arg1) {
      return 1
    }
    if (arg2) {
      return -1
    }
    return 0
  })
  return updateObj(state, {
    patches: newPatches,
    loading: false,
    error: false,
  })
}

const invitationPatchesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATCHES_REQUEST: return getPatchesRequest(state)
    case actionTypes.GET_PATCHES_SUCCESS: return getPatchesSuccess(state, action)
    case actionTypes.GET_PATCHES_FAILURE: return getPatchesFailure(state, action)
    case actionTypes.CLEAR_PATCHES: return clearPatches(initialState)
    case actionTypes.SORT_PATCHES: return sortPatches(state, action)
    default: return state
  }
}

export default invitationPatchesReducer
