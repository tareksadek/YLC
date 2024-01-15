import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import Slide from '@material-ui/core/Slide'

import * as actions from '../../store/actions'

import { notificationStyles } from './styles'

const SlideTransition = props => {
  const {
    // eslint-disable-next-line
    onClose, alertclass, severity, message,
  } = props
  return (
    <Slide {...props} direction="down">
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={onClose}
        className={alertclass}
        severity={severity}
      >
        {message}
      </MuiAlert>
    </Slide>
  )
}

const Notification = ({
  notification,
  isOpen,
  duration,
  hideNotification,
}) => {
  const classes = notificationStyles()

  const handleClose = () => {
    hideNotification()
  }

  if (!notification) {
    return false
  }

  const horizontal = notification.horizontal || 'right'
  const vertical = notification.vertical || 'top'
  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration || 2000}
      onClose={handleClose}
      anchorOrigin={{ horizontal, vertical }}
      TransitionComponent={props => (
        <SlideTransition
          onClose={handleClose}
          alertclass={classes.notificationContainer}
          severity={notification.type}
          message={notification.message}
          {...props}
        />
      )}
      classes={{ root: classes.notificationSnakbarContainer }}
      message={notification.message}
    />
  )
}

const mapStateToProps = state => ({
  notification: state.notification.notification,
  duration: state.notification.duration,
  isOpen: state.notification.isOpen,
})

const mapDispatchToProps = dispatch => ({
  hideNotification: () => dispatch(actions.hideNotification()),
})

Notification.defaultProps = {
  notification: null,
  isOpen: false,
  duration: null,
}

Notification.propTypes = {
  notification: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  isOpen: PropTypes.bool,
  hideNotification: PropTypes.func.isRequired,
  duration: PropTypes.number,
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification)
