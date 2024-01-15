import * as actionTypes from './actionTypes'

export const getBoardingRequest = () => ({
  type: actionTypes.GET_BOARDING_REQUEST,
})

export const getBoardingSuccess = () => ({
  type: actionTypes.GET_BOARDING_SUCCESS,
})

export const runBoardingSuccess = () => ({
  type: actionTypes.RUN_BOARDING_SUCCESS,
})

export const getBoardingFailure = error => ({
  type: actionTypes.GET_BOARDING_FAILURE,
  error,
})

export const clearBoarding = () => ({
  type: actionTypes.CLEAR_BOARDING,
})

export const getBoardingCallback = (boardingState, data) => ({
  type: actionTypes.GET_BOARDING_CALLBACK,
  boardingState,
  data,
})

export const runBoarding = () => dispatch => {
  dispatch(runBoardingSuccess())
}

export const boardingCallback = (boardingState, data) => dispatch => {
  dispatch(getBoardingCallback(boardingState, data))
}
