import * as actionTypes from './actionTypes'

export const setNotification = (notification, duration) => ({
  type: actionTypes.SET_NOTIFICATION,
  notification,
  duration: duration || null,
})

export const hideNotification = () => ({
  type: actionTypes.HIDE_NOTIFICATION,
})
