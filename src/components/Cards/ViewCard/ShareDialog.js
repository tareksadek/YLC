import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'

import CloseIcon from '@material-ui/icons/Close'

import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share'

import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email'
import TwitterIcon from '@material-ui/icons/Twitter'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'

import { createFormElementObj, adjustFormValues } from '../../../utilities/form'

import FormElement from '../../Ui/FormElement'
import InfoBox from '../../Ui/InfoBox'

import { useColor } from '../../../hooks/useDarkMode'

import { shareDialogStyles } from '../styles'

const ShareDialog = ({
  open, url, message, title, onClose,
}) => {
  const classes = shareDialogStyles()
  const color = useColor()
  const [shareForm, setShareForm] = useState({
    shareMessage: createFormElementObj('textarea', 'Share message',
      { type: 'text', name: 'message', placeholder: 'Share message' }, message, null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(shareForm, changeEvent, key)
    setShareForm(adjustedForm.adjustedForm)
  }

  const loadShareForm = () => {
    const form = Object.keys(shareForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={shareForm[formEl].elementType}
            label={shareForm[formEl].elementLabel}
            value={shareForm[formEl].value}
            elementOptions={shareForm[formEl].elementOptions}
            touched={shareForm[formEl].touched}
            valid={shareForm[formEl].isValid}
            shouldValidate={shareForm[formEl].validtationRules}
            elementSetup={shareForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={shareForm[formEl].grid}
            disabled={false}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  return (
    <Dialog aria-labelledby="share-dialog-title" open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="share-dialog-title" className={classes.titleContainer}>
        Share your profile
        <IconButton className={`${classes.dialogClose}`} edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <InfoBox infoList={['Write your message then select your prefered platform.']} />
        <Box className={classes.dialogContent}>
          <Box className={classes.shareMessageContainer}>
            {loadShareForm()}
          </Box>
          <Box className={classes.shareButtonsContainer}>
            <EmailShareButton subject={title} body={`${shareForm.shareMessage.value}: ${url}`}>
              <EmailIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
              <Typography className={classes.shareButtonText} component="p" variant="body1">
                E-mail
              </Typography>
            </EmailShareButton>
            <FacebookShareButton url={url} quote={shareForm.shareMessage.value}>
              <FacebookIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
              <Typography className={classes.shareButtonText} component="p" variant="body1">
                Facebook
              </Typography>
            </FacebookShareButton>
            <TwitterShareButton url={url} title={shareForm.shareMessage.value}>
              <TwitterIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
              <Typography className={classes.shareButtonText} component="p" variant="body1">
                Twitter
              </Typography>
            </TwitterShareButton>
            <LinkedinShareButton url={url} title={title} summary={shareForm.shareMessage.value} source="ONE Cards">
              <LinkedInIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
              <Typography className={classes.shareButtonText} component="p" variant="body1">
                Linked-In
              </Typography>
            </LinkedinShareButton>
            <WhatsappShareButton url={url} title={title} separator=" ">
              <WhatsAppIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
              <Typography className={classes.shareButtonText} component="p" variant="body1">
                WhatsApp
              </Typography>
            </WhatsappShareButton>
            <TelegramShareButton url={url}>
              <TelegramIcon classes={{ root: classes.icon }} style={{ color: color.color.code }} />
              <Typography className={classes.shareButtonText} component="p" variant="body1">
                Telegram
              </Typography>
            </TelegramShareButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

ShareDialog.defaultProps = {
  open: false,
  url: null,
  message: null,
  title: null,
}

ShareDialog.propTypes = {
  open: PropTypes.bool,
  url: PropTypes.string,
  message: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
}

export default ShareDialog
