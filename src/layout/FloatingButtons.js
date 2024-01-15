import React from 'react'
import PropTypes from 'prop-types'

import Fab from '@material-ui/core/Fab'
import Brightness5Icon from '@material-ui/icons/Brightness5'
import Brightness4Icon from '@material-ui/icons/Brightness4'

import { floatingButtonsStyles } from './styles'

const FloatingButtons = ({
  theme, toggleTheme,
}) => {
  const classes = floatingButtonsStyles()

  return (
    <div className={classes.floatingContainer}>
      <Fab size="small" color="primary" aria-label="add" className={classes.margin} onClick={() => toggleTheme()}>
        {theme === 'light' ? <Brightness5Icon /> : <Brightness4Icon />}
      </Fab>
    </div>
  )
}

FloatingButtons.propTypes = {
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
}

export default FloatingButtons
