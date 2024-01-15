import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'

import CloseIcon from '@material-ui/icons/Close'

import {
  EmailShareButton,
  FacebookShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'react-share'

import FacebookIcon from '@material-ui/icons/Facebook'
import EmailIcon from '@material-ui/icons/Email'
import WhatsAppIcon from '@material-ui/icons/WhatsApp'
import TelegramIcon from '@material-ui/icons/Telegram'

import { createFormElementObj, adjustFormValues } from '../../utilities/form'

import FormElement from '../Ui/FormElement'
import InfoBox from '../Ui/InfoBox'
import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { shareDialogStyles } from './styles'

const ShareDialog = ({
  loading, open, url, message, invitationUrl, title, onClose,
}) => {
  const classes = shareDialogStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.userInvitations
  const [shareForm, setShareForm] = useState({
    shareMessage: createFormElementObj('textarea', 'Share message',
      { type: 'text', name: 'message', placeholder: 'Share message' }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  useEffect(() => {
    const data = {
      shareMessage: `${message}${invitationUrl}`,
    }

    const adjustedShareForm = adjustFormValues(shareForm, data, null)
    setShareForm(prevForm => ({ ...prevForm, ...adjustedShareForm.adjustedForm }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationUrl, message])

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
        {pageStatics.data.titles.shareInvitationCodeDialog}
        <IconButton className={`${classes.dialogClose}`} edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {loading || invitationUrl === 'null' || !invitationUrl ? (
        <LoadingBackdrop placement="inset" loadingText={pageStatics.messages.loading.loadingInvitations} />
      ) : (
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
      )}
    </Dialog>
  )
}

ShareDialog.defaultProps = {
  open: false,
  url: null,
  message: null,
  title: null,
  invitationUrl: null,
  loading: false,
}

ShareDialog.propTypes = {
  loading: PropTypes.bool,
  open: PropTypes.bool,
  url: PropTypes.string,
  message: PropTypes.string,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  invitationUrl: PropTypes.string,
}

export default ShareDialog
