import * as actionTypes from './actionTypes'
import { getOrders } from '../../API/orders'

export const getOrdersRequest = () => ({
  type: actionTypes.GET_ORDERS_REQUEST,
})

export const getOrdersSuccess = orders => ({
  type: actionTypes.GET_ORDERS_SUCCESS,
  orders,
  count: orders.length,
})

export const getOrdersFailure = error => ({
  type: actionTypes.GET_ORDERS_FAILURE,
  error,
})

export const startSortOrders = (sortValue, sortType) => ({
  type: actionTypes.SORT_ORDERS,
  sortValue,
  sortType,
})

export const loadOrders = () => async dispatch => {
  dispatch(getOrdersRequest())
  try {
    const orders = await getOrders()
    dispatch(getOrdersSuccess(orders))
  } catch (err) {
    dispatch(getOrdersFailure(err))
  }
}

export const sortOrders = (sortValue, sortType) => async dispatch => {
  dispatch(getOrdersRequest())
  dispatch(startSortOrders(sortValue, sortType))
}
