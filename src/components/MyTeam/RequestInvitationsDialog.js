import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import emailjs from 'emailjs-com'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import FormElement from '../Ui/FormElement'
import FullScreenDialog from '../../layout/FullScreenDialog'
import LoadingBackdrop from '../Loading/LoadingBackdrop'
import Alert from '../../layout/Alert'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import { addRequest } from '../../API/cards'

import { MAILJS_CONFIG } from '../../utilities/appVars'

import { editProfileStyles } from '../../containers/EditProfile/styles'
import { buttonStyles } from '../../theme/buttons'

import * as actions from '../../store/actions'

const RequestInvitationsDialog = ({
  open, onClose, onSetNotification, color,
}) => {
  const classes = editProfileStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam

  const [formValid, setFormValid] = useState(true)
  const [formSaved, setFormSaved] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [requestSent, setRquestSent] = useState(false)
  const [requestForm, setRequestForm] = useState({
    invitationsNumber: createFormElementObj('input', pageStatics.forms.upgradeRequest.numberOfInvitations,
      { type: 'number', name: 'invitationsNumber', placeholder: pageStatics.forms.upgradeRequest.numberOfInvitations }, 1, null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    email: createFormElementObj('input', pageStatics.forms.upgradeRequest.email,
      { type: 'text', name: 'email', placeholder: pageStatics.forms.upgradeRequest.email }, auth.user.email, null, { required: false }, true,
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

    const adjustedForm = adjustFormValues(requestForm, changeEvent, key)
    setRequestForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormSaved(false)
  }

  const loadRequestForm = () => {
    const form = Object.keys(requestForm).map((formEl, i) => (
      <FormElement
        elementType={requestForm[formEl].elementType}
        label={requestForm[formEl].elementLabel}
        value={requestForm[formEl].value}
        elementOptions={requestForm[formEl].elementOptions}
        touched={requestForm[formEl].touched}
        valid={requestForm[formEl].isValid}
        shouldValidate={requestForm[formEl].validtationRules}
        elementSetup={requestForm[formEl].elementSetup}
        errorMessage={requestForm[formEl].errorMessage}
        changed={e => inputChangeHandler(e, formEl)}
        grid={requestForm[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  const requestUpgradeHandler = async e => {
    e.preventDefault()
    setLoading(true)
    setLoadingDone(false)
    const requestDetails = createFormValuesObj(requestForm)
    const { invitationsNumber, email } = requestDetails
    const invitationsCount = invitationsNumber > 0 ? invitationsNumber : 0
    const request = {
      invitationsNumber: invitationsCount,
      email,
      createdOn: new Date(),
      createdBy: auth.user.uid,
      type: 'Package Upgrade',
    }

    try {
      await addRequest(auth.user.uid, request)
      await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.subscriptionUpgradeTemplateId, request, MAILJS_CONFIG.userId)

      setRquestSent(true)

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)

      onSetNotification({
        message: pageStatics.messages.notifications.requestSentSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoading(false)
      setRquestSent(false)
      onSetNotification({
        message: pageStatics.messages.notifications.requestSentError,
        type: 'error',
      })
      throw new Error(err)
    }
  }

  const closeDialog = () => {
    onClose()
  }

  const buttonDisabled = formSaved || !formValid || loading

  return (
    <FullScreenDialog
      title={pageStatics.data.titles.requestUpgradeDialog}
      open={open}
      onClose={() => closeDialog()}
      titleBackground={color}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => requestUpgradeHandler(e)}
          disabled={buttonDisabled}
          className={buttonClasses.defaultButton}
          style={{
            backgroundColor: !buttonDisabled && color,
          }}
        >
          {pageStatics.buttons.requestUpgradeDialog}
        </Button>
      )}
    >
      <Box className={`${classes.dialogContent}`}>
        {loading && <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.sendingUpgradeRequest} />}
        {requestSent ? (
          <>
            <Alert
              title={pageStatics.messages.notifications.upgradeRequest.title}
              description={pageStatics.messages.notifications.upgradeRequest.description}
              type="success"
            />
            <Button
              color="secondary"
              onClick={() => closeDialog()}
              className={buttonClasses.defaultButton}
              style={{
                backgroundColor: color,
              }}
            >
              {pageStatics.buttons.closeUpgradeRequestDialog}
            </Button>
          </>
        ) : (
          <>
            <Box mb={2}>
              <Typography variant="body1" component="p" align="center">
                {pageStatics.data.description.requestUpgradeDialog}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              {loadRequestForm()}
            </Grid>
          </>
        )}
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

RequestInvitationsDialog.defaultProps = {
  open: false,
  color: null,
}

RequestInvitationsDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  color: PropTypes.string,
}

export default connect(null, mapDispatchToProps)(RequestInvitationsDialog)
