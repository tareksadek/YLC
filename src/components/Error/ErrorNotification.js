import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

import { notificationStyles } from '../Notification/styles'

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />

const ErrorNotification = ({ error, isOpen, onHideError }) => {
  const language = useLanguage()
  const classes = notificationStyles()

  const handleClose = () => {
    onHideError()
  }

  if (!error) {
    return false
  }

  const horizontal = error.horizontal || 'right'
  const vertical = error.vertical || 'top'

  return (
    <>
      {isOpen && error && (
        <Snackbar open={isOpen} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ horizontal, vertical }}>
          <Alert
            onClose={handleClose}
            severity="error"
            className={language.direction === 'rtl' ? classes.arabicFont : ''}
          >
            {error.message}
          </Alert>
        </Snackbar>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  error: state.errorCenter.error,
  isOpen: state.errorCenter.isOpen,
})

const mapDispatchToProps = dispatch => ({
  onHideError: () => dispatch(actions.hideError()),
})

ErrorNotification.defaultProps = {
  error: null,
  isOpen: null,
}

ErrorNotification.propTypes = {
  error: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.object,
    PropTypes.bool,
    PropTypes.func,
  ])),
  isOpen: PropTypes.bool,
  onHideError: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorNotification)
