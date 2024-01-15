import React, { useState } from 'react'
import PropTypes from 'prop-types'

import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { layoutStyles } from '../../theme/layout'
import { analyticsStyles } from './styles'

const CardMenu = ({ items }) => {
  const classes = analyticsStyles()
  const layoutClasses = layoutStyles()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = e => {
    e.stopPropagation()
    setAnchorEl(e.currentTarget)
  }

  const handleClose = e => {
    e.stopPropagation()
    setAnchorEl(null)
  }

  return (
    <>
      <IconButton aria-label="simple-menu1" aria-haspopup="true" onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu1"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        classes={{ paper: layoutClasses.menu }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {items.map(menuItem => (
          <MenuItem key={menuItem.text} onClick={menuItem.action} className={classes.cardMenuButton}>
            {menuItem.text}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

CardMenu.defaultProps = {
  items: null,
}

CardMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ]))),
}

export default CardMenu
