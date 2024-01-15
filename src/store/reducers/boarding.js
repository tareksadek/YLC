import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  run: false,
  status: null,
  type: null,
  steps: [
    {
      content: 'Lets begin our journey!',
      locale: {
        skip: '<strong aria-label="skip">S-K-I-P</strong>',
      },
      placement: 'center',
      target: 'body',
    },
    {
      content: 'Sticky elements',
      floaterProps: {
        disableAnimation: true,
      },
      spotlightPadding: 20,
      target: '.star-burst',
    },
    {
      content: 'These are our super awesome projects!',
      placement: 'bottom',
      styles: {
        options: {
          width: 300,
        },
      },
      target: '.demo',
      title: 'Our projects',
    },
    {
      content: '<div>You can render anything!<br /><h3>Like this H3 title</h3></div>',
      placement: 'top',
      target: '.navigation',
      title: 'Our Mission',
    },
  ],
  loading: false,
  error: false,
}

const getBoardingRequest = state => updateObj(state, { loading: true })
const getBoardingSuccess = state => updateObj(state, { loading: false })
const runBoardingSuccess = state => updateObj(state, { loading: false, run: true })
const getBoardingFailure = state => updateObj(state, { loading: false, error: true })
const getBoardingCallback = (state, action) => {
  console.log(action.boardingState);
  const finishedStatuses = [action.boardingState.FINISHED, action.boardingState.SKIPPED]
  let doesRun = true
  if (finishedStatuses.includes(action.data.status)) {
    doesRun = false
  }
  return updateObj(state, {
    status: action.data.status,
    type: action.data.type,
    run: doesRun,
    loading: false,
    error: false,
  })
}
const clearBoarding = state => state

const boardingReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_BOARDING_REQUEST: return getBoardingRequest(state)
    case actionTypes.GET_BOARDING_SUCCESS: return getBoardingSuccess(state)
    case actionTypes.RUN_BOARDING_SUCCESS: return runBoardingSuccess(state)
    case actionTypes.GET_BOARDING_FAILURE: return getBoardingFailure(state)
    case actionTypes.GET_BOARDING_CALLBACK: return getBoardingCallback(state, action)
    case actionTypes.CLEAR_BOARDING: return clearBoarding(initialState)
    default: return state
  }
}

export default boardingReducer
