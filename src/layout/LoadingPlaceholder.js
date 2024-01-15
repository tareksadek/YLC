import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

import { useLanguage } from '../hooks/useLang'

const loadingPlaceholderStyles = makeStyles(theme => ({
  loadingPlaceholderContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '400px',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
  },
}))

const LoadingPlaceholder = ({ loadingText }) => {
  const classes = loadingPlaceholderStyles()
  const language = useLanguage()

  return (
    <Box className={classes.loadingPlaceholderContainer}>
      <Box>
        <CircularProgress color="inherit" />
        <Typography className={language.direction === 'rtl' ? classes.arabicFont : ''}>{loadingText}</Typography>
      </Box>
    </Box>
  )
}

LoadingPlaceholder.defaultProps = {
  loadingText: null,
}

LoadingPlaceholder.propTypes = {
  loadingText: PropTypes.string,
}

export default LoadingPlaceholder
