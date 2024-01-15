import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'

import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { useLanguage } from '../../hooks/useLang'

import { buttonStyles } from '../../theme/buttons'
import { verifyEmailDialogStyles } from './styles'

const VerifyEmailDialog = ({
  open, onClose, sendVerificationEmail, verifyEmailSent, loading, buttonColor,
}) => {
  const classes = verifyEmailDialogStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings

  return (
    <Dialog
      aria-labelledby="details-dialog-title"
      open={open}
      onClose={() => onClose()}
      maxWidth="sm"
      fullWidth
      classes={{ paper: classes.dialogContainer }}
    >
      <Box className={`${classes.DialogContentContainer}`}>
        <DialogTitle id="details-dialog-title" align="center" className={classes.titleContainer}>
          {pageStatics.data.titles.verifyEmailDialog}
        </DialogTitle>
        <DialogContent className={classes.dialogContentContainer}>
          {loading && <LoadingBackdrop placement="inset" loadingText={pageStatics.messages.loading.verifyEmailRequest} />}
          {verifyEmailSent ? (
            <Box>
              <Typography variant="body1" align="center" component="p">
                {pageStatics.data.dialog.verifyEmail.emailSent}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Box>
                <Typography variant="body1" align="center" component="p">
                  {pageStatics.data.dialog.verifyEmail.notVerified}
                </Typography>
              </Box>
              <Box className={classes.dialogButtonContainer} mt={3} mb={3}>
                <Button
                  color="secondary"
                  onClick={() => sendVerificationEmail()}
                  className={buttonClasses.defaultButton}
                  style={{
                    backgroundColor: buttonColor,
                  }}
                >
                  {pageStatics.buttons.verifyEmail}
                </Button>
              </Box>
            </Box>
          )}
        </DialogContent>
      </Box>
    </Dialog>
  )
}

VerifyEmailDialog.defaultProps = {
  open: false,
  verifyEmailSent: false,
  loading: false,
  buttonColor: null,
}

VerifyEmailDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  sendVerificationEmail: PropTypes.func.isRequired,
  verifyEmailSent: PropTypes.bool,
  loading: PropTypes.bool,
  buttonColor: PropTypes.string,
}

export default VerifyEmailDialog
