import React from 'react'
import PropTypes from 'prop-types'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'

import InfoBox from '../../Ui/InfoBox'

import { shareDialogStyles } from '../styles'

const AndroidDialog = ({
  open, userName, onClose,
}) => {
  const classes = shareDialogStyles()

  return (
    <Dialog aria-labelledby="share-dialog-title" open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="share-dialog-title" className={classes.titleContainer}>
        Complete the process
        <IconButton className={`${classes.dialogClose}`} edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <InfoBox infoList={[`Click the downloaded <b>VCF</b> file to add ${userName} to your phone contacts.`]} />
      </DialogContent>
    </Dialog>
  )
}

AndroidDialog.defaultProps = {
  open: false,
  userName: null,
}

AndroidDialog.propTypes = {
  open: PropTypes.bool,
  userName: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

export default AndroidDialog
