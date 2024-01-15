import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

import {
  sortableHandle,
} from 'react-sortable-hoc'

import DragIndicatorIcon from '@material-ui/icons/DragIndicator'

import { dragHandleStyles } from '../styles'

const DragHandle = ({ color }) => {
  const classes = dragHandleStyles()

  return (
    <Box className={classes.container} style={{ borderColor: color === '#000000' ? 'rgba(0,0,0,0.3)' : 'rgba(255, 255, 255, 0.3)' }}>
      <DragIndicatorIcon style={{ color }} />
    </Box>
  )
}

DragHandle.defaultProps = {
  color: null,
}

DragHandle.propTypes = {
  color: PropTypes.string,
}

export default sortableHandle(DragHandle)
