import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'

import { Widget } from '@typeform/embed-react'

// import { parse, parseJSON } from 'date-fns'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import FormElement from '../Ui/FormElement'
import FullScreenDialog from '../../layout/FullScreenDialog'
import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import {
  createConnection,
  // updateTagCount,
} from '../../API/connections'
// import { updateProfileConnectionsById } from '../../API/cards'

import { editProfileStyles } from '../../containers/EditProfile/styles'
import { buttonStyles } from '../../theme/buttons'

import * as actions from '../../store/actions'

const AddConnectionDialog = ({
  open, onClose, onSetNotification, userId, color, activeForm, connectionSettings, onAddConnection, isEmbedForm,
  defaultId,
}) => {
  const classes = editProfileStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections
  const isTheLoggedinUser = auth && auth.user && auth.user.uid === defaultId

  const initialFormState = activeForm && !isEmbedForm && activeForm.fields ? activeForm.fields.reduce((o, key) => ({
    ...o,
    [key.name]: createFormElementObj(key.type, `${key.label}${key.validationRules.required ? '*' : ''}`,
      {
        type: key.inputOptions.type,
        name: key.name,
        placeholder: `${key.label}${key.validationRules.required ? '*' : ''}`,
      },
      key.value,
      key.selectOptions,
      key.validationRules,
      key.isValid,
      key.grid),
  }), {}) : null

  const connectFormTitle = connectionSettings && connectionSettings.formTitle ? connectionSettings.formTitle : pageStatics.data.titles.defaultFormTitle
  const connectionFormDescription = connectionSettings && connectionSettings.formDescription ? connectionSettings.formDescription : pageStatics.data.description.defaultFormDescription

  // const hasTags = activeForm && 'tags' in activeForm && activeForm.tags !== undefined
  // const hasManyTags = hasTags ? activeForm.tags !== '' && activeForm.tags.tags.length > 0 : false
  // const existingTags = hasManyTags ? activeForm.tags.tags : null

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [formSaved, setFormSaved] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(auth.user ? pageStatics.messages.loading.addingConnection : pageStatics.messages.loading.sendingContactInfo)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [connectForm, setConnectForm] = useState({ ...initialFormState })

  useEffect(() => {
    if (activeForm) {
      setConnectForm({ ...initialFormState })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeForm])

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
    setFormSaved(false)
  }

  const loadConnectForm = () => {
    const form = Object.keys(connectForm).map((formEl, i) => (
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
        key={formEl + i}
      />
    ))

    return form
  }

  const addContactHandler = async e => {
    e.preventDefault()
    setLoadingMessage(auth.user ? pageStatics.messages.loading.addingConnection : pageStatics.messages.loading.sendingContactInfo)
    setLoading(true)
    setLoadingDone(false)
    const contactDetails = createFormValuesObj(connectForm)
    const { workPhone } = contactDetails

    if (workPhone.trim() === '' || workPhone.trim() === '+') {
      setLoading(false)
      setFormTouched(false)
      return
    }

    try {
      contactDetails.addedOn = new Date()
      contactDetails.userName = `${contactDetails.firstName || ''} ${contactDetails.lastName || ''}`
      contactDetails.tags = activeForm.tags && activeForm.tags.tags && activeForm.tags.tags.length > 0 ? [...activeForm.tags.tags] : null
      contactDetails.tagsDisplay = activeForm.tags && activeForm.tags.tagsDisplay && activeForm.tags.tagsDisplay.length > 0 ? [...activeForm.tags.tagsDisplay] : null
      contactDetails.addedByOwner = !!auth.user
      await createConnection(userId, contactDetails)
      // await updateProfileConnectionsById(userId, defaultId, !!auth.user)

      if (auth.user && isTheLoggedinUser) {
        onAddConnection(contactDetails)
      }

      // if (existingTags && existingTags.length > 0) {
      //   /* eslint-disable */
      //   for (const tag of existingTags) {
      //     await updateTagCount(userId, tag)
      //   }
      //   /* eslint-enable */
      // }
      setConnectForm(initialFormState)
      setFormTouched(false)

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setTimeout(() => onClose(), 1100)
      setLoadingMessage(auth.user ? pageStatics.messages.loading.addingConnection : pageStatics.messages.loading.sendingContactInfo)

      onSetNotification({
        message: auth.user ? pageStatics.messages.notifications.connectAddedSuccess : pageStatics.messages.notifications.connectSentSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: auth.user ? pageStatics.messages.notifications.connectAddedError : pageStatics.messages.notifications.connectSentError,
        type: 'error',
      })
      onClose()
      throw new Error(err)
    }
  }

  const closeDialog = () => {
    onClose()
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading
  const formType = connectionSettings && connectionSettings.embedForm ? connectionSettings.embedForm.formType : null

  return (
    <FullScreenDialog
      title={connectFormTitle}
      open={open}
      onClose={() => closeDialog()}
      titleBackground={color}
      actionButtonOne={!isEmbedForm ? (
        <Button
          color="secondary"
          onClick={e => addContactHandler(e)}
          disabled={buttonDisabled}
          className={buttonClasses.defaultButton}
          style={{
            backgroundColor: !buttonDisabled && color,
          }}
        >
          {auth.user && isTheLoggedinUser ? pageStatics.buttons.addNewContact : pageStatics.buttons.sendContactInfo}
        </Button>
      ) : null}
    >
      <Box className={`${classes.dialogContent}`}>
        {loading && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.addingConnection}`} boxed />}
        {activeForm ? (
          <>
            {isEmbedForm ? (
              <Box className={classes.embedFormContainer}>
                <Box mb={2}>
                  <Typography variant="body1" component="p" align="center">
                    {connectionFormDescription}
                  </Typography>
                </Box>
                {connectionSettings && formType === 'typeform' && (
                  <Widget id={activeForm.embedCode} style={{ width: '100%', height: '100%' }} className="my-form" />
                )}
                {connectionSettings && (formType === 'google' || formType === 'microsoft' || formType === 'jotform') && (
                  parse(connectionSettings.embedForm.embedCode)
                )}
              </Box>
            ) : (
              <>
                <Box mb={2}>
                  <Typography variant="body1" component="p" align="center">
                    {connectionFormDescription}
                  </Typography>
                </Box>
                <Grid container spacing={3}>
                  {activeForm && loadConnectForm()}
                </Grid>
              </>
            )}
          </>
        ) : (
          <Box className={classes.connectFormLoadingContainer}>
            <CircularProgress color="secondary" size={20} />
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onAddConnection: connectionObj => dispatch(actions.addUserConnection(connectionObj)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

AddConnectionDialog.defaultProps = {
  open: false,
  userId: null,
  color: null,
  activeForm: null,
  connectionSettings: null,
  isEmbedForm: false,
  defaultId: null,
}

AddConnectionDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
  defaultId: PropTypes.string,
  onAddConnection: PropTypes.func.isRequired,
  color: PropTypes.string,
  activeForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  connectionSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  isEmbedForm: PropTypes.bool,
}

export default connect(null, mapDispatchToProps)(AddConnectionDialog)
