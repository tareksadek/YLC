import * as actionTypes from '../actions/actionTypes'

const initialState = {
  error: null,
  isOpen: null,
}

const reducer = (state = initialState, action) => {
  const { error } = action

  if (error) {
    return {
      error,
      isOpen: true,
    }
  }
  if (action.type === actionTypes.HIDE_ERROR) {
    return {
      error: null,
      isOpen: false,
    }
  }

  return state
}

export default reducer
