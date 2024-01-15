import * as actionTypes from './actionTypes'
import { getAllPatches } from '../../API/invitationPatches'

export const getPatchesRequest = () => ({
  type: actionTypes.GET_PATCHES_REQUEST,
})

export const getPatchesSuccess = patches => ({
  type: actionTypes.GET_PATCHES_SUCCESS,
  patches,
  count: patches.length,
})

export const getPatchesFailure = () => ({
  type: actionTypes.GET_PATCHES_FAILURE,
})

export const startSortPatches = (sortValue, sortType) => ({
  type: actionTypes.SORT_PATCHES,
  sortValue,
  sortType,
})

export const clearPatches = () => ({
  type: actionTypes.CLEAR_PATCHES,
})

export const loadPatches = () => async dispatch => {
  dispatch(getPatchesRequest())
  try {
    const patches = await getAllPatches()
    dispatch(getPatchesSuccess(patches))
  } catch (err) {
    dispatch(getPatchesFailure(err))
  }
}

export const sortPatches = (sortValue, sortType) => async dispatch => {
  dispatch(getPatchesRequest())
  dispatch(startSortPatches(sortValue, sortType))
}
