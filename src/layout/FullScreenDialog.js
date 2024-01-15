import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

import LoadingBackdrop from '../components/Loading/LoadingBackdrop'

import { useColor } from '../hooks/useDarkMode'

import { fullScreenDialogStyles } from './styles'

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />)

const FullScreenDialog = ({
  open, onClose, loading, loadingMessage, children, title, titleColor, titleBackground, titleStyles, noSidePadding, actionButtonOne,
  noHeader, bodyBackground, buttonBackground,
}) => {
  const classes = fullScreenDialogStyles()
  const color = useColor()

  return (
    <Dialog
      aria-labelledby="details-dialog-title"
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
      fullWidth
      fullScreen
      classes={{
        root: classes.fullScreenDialogRoot,
        container: classes.fullScreenDialogContainer,
        paper: `${classes.fullScreenDialogPaper} ${bodyBackground === 'dark' ? classes.fullScreenDialogPaperDark : ''}`,
      }}
      TransitionComponent={Transition}
    >
      <DialogTitle
        id="details-dialog-title"
        align="center"
        className={`${classes.fullScreenDialogTitleContainer} ${noHeader ? classes.fullScreenDialogNoHeader : ''}`}
        style={{
          background: titleBackground || color.color.code,
        }}
      >
        <IconButton edge="start" color="inherit" onClick={onClose} aria-label="close" className={`${classes.fullScreenDialogClose} ${titleColor === 'transparent' ? classes.reverseTitleColor : ''}`}>
          <KeyboardReturnIcon />
        </IconButton>
        <Typography
          variant="body1"
          component="p"
          className={`${classes.fullScreenDialogTitle} ${titleColor === 'transparent' ? classes.reverseTitleColor : ''}`}
          style={{
            ...titleStyles,
          }}
        >
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent className={`${classes.fullScreenDialogContent} ${noSidePadding ? classes.noSidePadding : ''}`}>
        {loading && <LoadingBackdrop placement="inset" loadingText={loadingMessage} />}
        { children }
      </DialogContent>
      {actionButtonOne && (
        <DialogActions className={`${classes.fullScreenDialogActions}`} style={{ ...(buttonBackground && { backgroundColor: buttonBackground }) }}>
          {actionButtonOne}
        </DialogActions>
      )}
    </Dialog>
  )
}

FullScreenDialog.defaultProps = {
  open: false,
  loading: false,
  loadingMessage: null,
  title: null,
  titleColor: null,
  titleBackground: null,
  noSidePadding: false,
  titleStyles: null,
  actionButtonOne: null,
  noHeader: false,
  bodyBackground: null,
  buttonBackground: null,
}

FullScreenDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  loadingMessage: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  titleColor: PropTypes.string,
  titleBackground: PropTypes.string,
  noSidePadding: PropTypes.bool,
  titleStyles: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  actionButtonOne: PropTypes.node,
  noHeader: PropTypes.bool,
  bodyBackground: PropTypes.string,
  buttonBackground: PropTypes.string,
}

export default FullScreenDialog
