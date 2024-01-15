import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  notification: null,
  isOpen: false,
  duration: null,
}

const setNotification = (state, action) => updateObj(state, {
  notification: action.notification,
  isOpen: true,
  duration: action.duration,
})

const hideNotification = state => updateObj(state, { notification: null, isOpen: false, duration: null })

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_NOTIFICATION: return setNotification(state, action)
    case actionTypes.HIDE_NOTIFICATION: return hideNotification(state)
    default: return state
  }
}

export default reducer
