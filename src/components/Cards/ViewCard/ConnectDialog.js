import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import vCardsJS from 'vcards-js'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../../utilities/form'

import FormElement from '../../Ui/FormElement'
import InfoBox from '../../Ui/InfoBox'
import LoadingBackdrop from '../../Loading/LoadingBackdrop'

import { buttonStyles } from '../../../theme/buttons'
import { shareDialogStyles } from '../styles'

import { getFirebaseStorage } from '../../../API/firebase'
import { updateConnections } from '../../../API/cards'

import { useLanguage } from '../../../hooks/useLang'

import * as actions from '../../../store/actions'

const ConnectDialog = ({
  open, onClose, userName, colorCode, onSetNotification, userId,
}) => {
  const classes = shareDialogStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.viewProfile

  const [loading, setLoading] = useState(false)
  const [validPhone, setValidPhone] = useState(true)
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [connectForm, setConnectForm] = useState({
    firstName: createFormElementObj('input', `${pageStatics.forms.connectDialog.firstName}*`, { type: 'text', name: 'firstName', placeholder: `${pageStatics.forms.connectDialog.firstName}*` }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    lastName: createFormElementObj('input', `${pageStatics.forms.connectDialog.lastName}*`, { type: 'text', name: 'lastName', placeholder: `${pageStatics.forms.connectDialog.lastName}*` }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    email: createFormElementObj('input', `${pageStatics.forms.connectDialog.email}*`, { type: 'text', name: 'email', placeholder: `${pageStatics.forms.connectDialog.email}*` }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    workPhone: createFormElementObj('phone', `${pageStatics.forms.connectDialog.phone}*`, { type: 'text', name: 'workPhone', placeholder: `${pageStatics.forms.connectDialog.phone}*` }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    note: createFormElementObj('textarea', pageStatics.forms.connectDialog.note,
      { type: 'text', name: 'note', placeholder: pageStatics.forms.connectDialog.note }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const generateVcard = cardDetails => {
    const vCard = vCardsJS()

    vCard.firstName = cardDetails.firstName
    vCard.lastName = cardDetails.lastName
    vCard.workPhone = cardDetails.workPhone
    vCard.note = cardDetails.note
    vCard.email = cardDetails.email

    const blob = new Blob(
      [vCard.getFormattedString()],
      { type: 'text/vcard;charset=utf-8' },
    )

    const newVcardName = `Con_${cardDetails.firstName}_${new Date().getTime()}.vcf`

    return new File([blob], newVcardName, { type: 'text/vcard', lastModified: new Date().getTime() })
  }

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(connectForm, changeEvent, key)
    setConnectForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
    setValidPhone(true)
  }

  const loadShareForm = () => {
    const form = Object.keys(connectForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={connectForm[formEl].elementType}
            label={connectForm[formEl].elementLabel}
            value={connectForm[formEl].value}
            elementOptions={connectForm[formEl].elementOptions}
            touched={connectForm[formEl].touched}
            valid={connectForm[formEl].isValid}
            shouldValidate={connectForm[formEl].validtationRules}
            elementSetup={connectForm[formEl].elementSetup}
            errorMessage={connectForm[formEl].errorMessage}
            changed={e => inputChangeHandler(e, formEl)}
            grid={connectForm[formEl].grid}
            disabled={loading}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const addContactHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const contactDetails = createFormValuesObj(connectForm)
    const { workPhone } = contactDetails

    if (workPhone.trim() === '' || workPhone.trim() === '+') {
      setValidPhone(false)
      setLoading(false)
      setFormTouched(false)
      return
    }

    try {
      const vCardFile = generateVcard(contactDetails)
      contactDetails.vCardFile = vCardFile.name
      contactDetails.addedOn = new Date()
      contactDetails.userName = `${contactDetails.firstName} ${contactDetails.lastName}`
      const metaData = {
        contentDisposition: 'attachment',
        filename: vCardFile.name,
        contentType: 'text/vcard',
      }
      await getFirebaseStorage().ref(`/connections/${vCardFile.name}`).put(vCardFile, metaData)
      await updateConnections(userId, contactDetails)
      setLoading(false)
      setFormTouched(false)
      onClose()

      onSetNotification({
        message: pageStatics.messages.notifications.connectSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.connectError,
        type: 'error',
      })
      throw new Error(err)
    }
  }

  const buttonDisabled = !formTouched || (formTouched && !formValid)

  return (
    <Dialog aria-labelledby="share-dialog-title" open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle id="share-dialog-title" className={classes.titleContainer}>
        Connect
        <IconButton className={`${classes.dialogClose}`} edge="start" color="inherit" onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {loading && <LoadingBackdrop loadingText={pageStatics.messages.loading.connecting} />}
        <InfoBox infoList={[`${language.languageVars.pages.viewProfile.messages.info.connectDialog} ${userName}.`]} />
        {!validPhone && <Box mt={1}><InfoBox type="danger" infoList={[pageStatics.messages.info.invalidPhone]} /></Box>}
        <Box className={classes.dialogContent}>
          <Box className={classes.shareMessageContainer}>
            {loadShareForm()}
            <Box className={classes.connectButtonContainer} mb={2}>
              <Button
                color="secondary"
                onClick={e => addContactHandler(e)}
                disabled={buttonDisabled}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: !buttonDisabled && colorCode,
                  minWidth: '250px',
                }}
              >
                {pageStatics.buttons.sendContactInfo}
              </Button>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

const mapStateToProps = state => ({
  userId: state.cards.userId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

ConnectDialog.defaultProps = {
  open: false,
  userName: null,
  colorCode: null,
  userId: null,
}

ConnectDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  userName: PropTypes.string,
  colorCode: PropTypes.string,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectDialog)
