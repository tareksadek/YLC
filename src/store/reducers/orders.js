import * as actionTypes from '../actions/actionTypes'
import { updateObj } from '../../utilities/utils'

const initialState = {
  orders: null,
  orderCount: 0,
  ordersPerPage: 15,
  loading: false,
  error: false,
}

const getOrdersRequest = state => updateObj(state, { loading: true })
const getOrdersSuccess = (state, action) => updateObj(state, {
  orderCount: action.count,
  orders: action.orders,
  loading: false,
  error: false,
})
const getOrdersFailure = state => updateObj(state, { loading: false, error: true })
const sortOrders = (state, action) => {
  const { sortValue } = action
  const { sortType } = action
  const newOrders = [...state.orders].sort((a, b) => {
    const comp1 = sortType === 'date' ? a.proccessedAt : a[sortType]
    const comp2 = sortType === 'date' ? b.proccessedAt : b[sortType]
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
    orders: newOrders,
    loading: false,
    error: false,
  })
}

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ORDERS_REQUEST: return getOrdersRequest(state)
    case actionTypes.GET_ORDERS_SUCCESS: return getOrdersSuccess(state, action)
    case actionTypes.GET_ORDERS_FAILURE: return getOrdersFailure(state)
    case actionTypes.SORT_ORDERS: return sortOrders(state, action)
    default: return state
  }
}

export default ordersReducer
