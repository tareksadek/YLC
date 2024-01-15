import React, {
  useState, useEffect,
} from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

import {
  deleteOrderById, getOrders,
} from '../../API/orders'

import * as actions from '../../store/actions'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import OrderList from '../../components/Orders/OrderList'
import Header from '../../layout/Header'
import FilterInvitations from '../../components/InvitationsAdmin/FilterInvitations'

import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'

const Orders = ({ onSetNotification }) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.invitations

  const layoutClasses = layoutStyles()
  const [orders, setOrders] = useState(null)
  const [filteredOrders, setFilteredOrders] = useState(null)
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        const allOrders = await getOrders()
        setOrders(allOrders)
        setFilteredOrders(allOrders)
        setUpdated(false)
      })()
    }

    return () => { mounted = false }
  }, [updated])

  console.log(filteredOrders);

  const filterOrders = status => {
    let newOrders = null
    if (orders && status === 'fulfilled') {
      newOrders = [...orders].filter(order => order.status === 'fulfilled')
    } else if (orders && status !== 'fulfilled') {
      newOrders = [...orders].filter(order => order.status !== 'fulfilled')
    } else {
      newOrders = [...orders]
    }
    setFilteredOrders(newOrders)
  }

  const deleteOrderHandler = async orderId => {
    try {
      await deleteOrderById(orderId)
      setUpdated(true)
      onSetNotification({
        message: pageStatics.messages.notifications.deleteOrderSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.deleteOrderError,
        type: 'error',
      })
    }
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        {!orders ? (
          <LoadingBackdrop loadingText={pageStatics.messages.loading.loadingOrders} placement="inset" />
        ) : (
          <Box mt={3}>
            <FilterInvitations onFilter={filterOrders} />
            <OrderList
              orders={orders}
              deleteOrder={deleteOrderHandler}
            />
          </Box>
        )}
      </Box>
    </Box>
  )
}

Orders.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(null, mapDispatchToProps)(Orders)
