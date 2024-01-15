import React from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'

import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import CloseIcon from '@material-ui/icons/Close'

import LoadingBackdrop from '../components/Loading/LoadingBackdrop'

import { buttonStyles } from '../theme/buttons'
import { notificationDialogStyles } from './styles'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const NotificationDialog = ({
  open, onClose, actionOne, actionTwo, loading, loadingMessage, children, title, type, background, icon, titleColor,
}) => {
  const classes = notificationDialogStyles()
  const buttonClasses = buttonStyles()
  const typeContainerClass = classes[`${type}DialogContainer`]
  const typeIconContainerClass = classes[`${type}DialogIconContainer`]
  const typeButtonClass = classes[`${type}DialogButton`]

  return (
    <Dialog
      aria-labelledby="details-dialog-title"
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
      fullWidth
      fullScreen
      classes={{
        root: classes.dialogRoot,
        container: classes.dialogContainer,
        paper: type ? typeContainerClass : '',
      }}
      PaperProps={{
        style: {
          backgroundColor: background,
        },
      }}
      TransitionComponent={Transition}
    >
      <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close" className={classes.closeDialogButton}>
        <CloseIcon />
      </IconButton>
      {icon && (
        <Box
          className={classes.dialogCustomIconContainer}
          style={{
            backgroundColor: background,
            borderColor: background === '#fff' ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)',
          }}
        >
          {icon}
        </Box>
      )}
      {type && (
        <Box className={`${classes.dialogTypeIconContainer} ${type ? typeIconContainerClass : ''}`}>
          {type === 'warning' && <ReportProblemOutlinedIcon />}
        </Box>
      )}
      <DialogTitle id="details-dialog-title" align="center" className={classes.titleContainer} style={{ color: titleColor }}>
        {title}
      </DialogTitle>
      <DialogContent className={classes.dialogContentContainer}>
        {loading && <LoadingBackdrop placement="inset" loadingText={loadingMessage} />}
        { children }
      </DialogContent>
      {(actionOne || actionTwo) && (
        <DialogActions className={classes.dialogActionsContainer}>
          {actionOne && !actionOne.hidden && (
            <Button
              color="secondary"
              onClick={actionOne.clicked}
              className={`
                ${actionOne.borderedButton ? buttonClasses.outlineButton : buttonClasses.defaultButton}
                ${actionOne.disabled ? classes.dialogActionDisabled : ''}
                ${type && type !== 'custom' ? typeButtonClass : ''}
              `}
              disabled={actionOne.disabled}
              style={{
                backgroundColor: 'transparent',
                color: actionOne.textColor || '#272727',
                borderColor: actionOne.background,
              }}
            >
              {actionOne.text}
            </Button>
          )}
          {actionTwo && (
            <Button
              color="secondary"
              onClick={actionTwo.clicked}
              className={`${buttonClasses.defaultButton} ${type && type !== 'custom' ? typeButtonClass : ''}`}
              disabled={actionTwo.disabled}
              style={{
                backgroundColor: actionTwo.background,
                color: actionTwo.textColor || '#272727',
              }}
            >
              {actionTwo.text}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  )
}

NotificationDialog.defaultProps = {
  open: false,
  actionOne: null,
  actionTwo: null,
  loading: false,
  loadingMessage: null,
  title: null,
  type: null,
  background: null,
  icon: null,
  titleColor: null,
}

NotificationDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  actionOne: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  actionTwo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  type: PropTypes.string,
  background: PropTypes.string,
  icon: PropTypes.node,
  titleColor: PropTypes.string,
}

export default NotificationDialog
