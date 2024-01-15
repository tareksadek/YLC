import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination,
} from '@material-ui/core'

import OrderRow from './OrderRow'

import { orderTableStyles } from './styles'

import { ORDERS_PER_PAGE } from '../../utilities/appVars'

const InvitationList = ({
  orders, deleteOrder,
}) => {
  const classes = orderTableStyles()

  const [currentPage, setCurrentPage] = useState(1)

  const pageOrders = pageNumber => {
    let ordersInPage

    if (orders) {
      ordersInPage = orders.slice(((pageNumber - 1) * (ORDERS_PER_PAGE)), ((pageNumber) * (ORDERS_PER_PAGE)))
    }

    return ordersInPage
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageOrders(page)
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Name</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Ordered At</TableCell>
              <TableCell align="left">Ordered By</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders && orders.map(order => (
              <OrderRow
                order={order}
                deleteOrder={deleteOrder}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orders.length}
        rowsPerPage={pageOrders(currentPage)}
        page={currentPage}
        onPageChange={paginationChangeHandler}
      />
    </>
  )
}

InvitationList.defaultProps = {
  orders: null,
}

InvitationList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  deleteOrder: PropTypes.func.isRequired,
}

export default InvitationList
