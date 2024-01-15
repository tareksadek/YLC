import React, { useState } from 'react'
import PropTypes from 'prop-types'

import {
  Table, TableBody, TableCell, TableHead, TableRow, IconButton, Collapse, Box, Typography,
} from '@material-ui/core'

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import DeleteIcon from '@material-ui/icons/Delete'

import { orderTableStyles } from './styles'

const OrderRow = ({ order, deleteOrder }) => {
  const classes = orderTableStyles()

  const [open, setOpen] = useState(false)
  console.log(Date.parse(order.proccessedAt));

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">{order.orderName}</TableCell>
        <TableCell>{order.orderId}</TableCell>
        <TableCell>{order.orderQuantity}</TableCell>
        <TableCell>{order.proccessedAt}</TableCell>
        <TableCell>
          {`${order.user.firstName} ${order.user.lastName}`}
          <span className={classes.buyerEmail}>{order.user.email}</span>
        </TableCell>
        <TableCell>{order.status && order.status === 'fulfilled' ? 'Fulfilled' : 'Unfulfilled'}</TableCell>
        <TableCell>
          <IconButton aria-label="delete" onClick={() => deleteOrder(order.orderId)}>
            <DeleteIcon color="primary" />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Items
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell component="th" scope="row">{item.itemName}</TableCell>
                      <TableCell>{item.itemQantity}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

OrderRow.defaultProps = {
  order: null,
}

OrderRow.propTypes = {
  order: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  deleteOrder: PropTypes.func.isRequired,
}

export default OrderRow
