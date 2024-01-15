import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormElement from '../Ui/FormElement'
import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'

import { editProfileStyles } from '../../containers/EditProfile/styles'
import { buttonStyles } from '../../theme/buttons'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import { updateConnectionById } from '../../API/connections'

import * as actions from '../../store/actions'

const EditConnectionDialog = ({
  open, onClose, connection, onSetNotification, onUpdateConnection, color, userId,
}) => {
  const classes = editProfileStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.connections
  const connectionsStatics = language.languageVars.pages.viewProfile

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [formSaved, setFormSaved] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingConnectionInfo)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [connectForm, setConnectForm] = useState({
    firstName: createFormElementObj('input', `${connectionsStatics.forms.connectDialog.firstName}*`,
      {
        type: 'text', name: 'firstName', placeholder: `${connectionsStatics.forms.connectDialog.firstName}*`, tag: 'text',
      },
      connection && connection.firstName ? connection.firstName : '',
      null,
      { required: true },
      false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    lastName: createFormElementObj('input', `${connectionsStatics.forms.connectDialog.lastName}`,
      {
        type: 'text', name: 'lastName', placeholder: `${connectionsStatics.forms.connectDialog.lastName}`, tag: 'text',
      },
      connection && connection.lastName ? connection.lastName : '',
      null,
      { required: false },
      false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    workPhone: createFormElementObj('input', `${connectionsStatics.forms.connectDialog.phone}*`,
      {
        type: 'tel', name: 'workPhone', placeholder: `${connectionsStatics.forms.connectDialog.phone}*`, tag: 'phone',
      },
      connection && connection.workPhone ? connection.workPhone : '',
      null,
      { required: true, phoneNumber: true },
      false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    email: createFormElementObj('input', `${connectionsStatics.forms.connectDialog.email}`,
      {
        type: 'email', name: 'email', placeholder: `${connectionsStatics.forms.connectDialog.email}`, tag: 'email',
      },
      connection && connection.email ? connection.email : '',
      null,
      { required: false },
      false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    note: createFormElementObj('textarea', connectionsStatics.forms.connectDialog.note,
      {
        type: 'text', name: 'note', placeholder: connectionsStatics.forms.connectDialog.note, tag: 'text',
      },
      connection && connection.note ? connection.note : '',
      null,
      { required: false },
      true,
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
    if (connection) {
      const adjustedInfoForm = adjustFormValues(connectForm, connection, null)
      setConnectForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
      setFormValid(adjustedInfoForm.formValid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user.uid, connection])

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

  const editContactHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.updatingConnectionInfo)
    setLoadingDone(false)
    setLoading(true)
    const contactDetails = createFormValuesObj(connectForm)
    const { workPhone } = contactDetails

    if (workPhone.trim() === '' || workPhone.trim() === '+') {
      setLoading(false)
      setFormTouched(false)
      return
    }

    try {
      contactDetails.userName = `${contactDetails.firstName || ''} ${contactDetails.lastName || ''}`
      await updateConnectionById(userId, connection.id, contactDetails)
      onUpdateConnection(connection.id, contactDetails)
      setFormTouched(false)

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setTimeout(() => onClose(), 1100)
      setLoadingMessage(pageStatics.messages.loading.loadingConnectionInfo)

      onSetNotification({
        message: pageStatics.messages.notifications.connectionEditSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      onClose()
      onSetNotification({
        message: pageStatics.messages.notifications.connectionEditError,
        type: 'error',
      })
      throw new Error(err)
    }
  }

  const closeDialog = () => {
    onClose()
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  return (
    <FullScreenDialog
      title={`Edit ${connection && connection.firstName} ${(connection && connection.lastName) && connection.lastName}`}
      open={open && !!connection}
      onClose={() => closeDialog()}
      titleBackground={color}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => editContactHandler(e)}
          disabled={buttonDisabled}
          className={buttonClasses.defaultButton}
          style={{
            backgroundColor: !buttonDisabled && color,
          }}
        >
          {pageStatics.buttons.editConnection}
        </Button>
      )}
    >
      <Box className={`${classes.dialogContent}`}>
        {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} />}
        <Grid container spacing={3}>
          {loadConnectForm()}
        </Grid>
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onUpdateConnection: (connectionId, connectionData) => dispatch(actions.updateUserConnection(connectionId, connectionData)),
})

EditConnectionDialog.defaultProps = {
  open: false,
  connection: null,
  color: null,
  userId: null,
}

EditConnectionDialog.propTypes = {
  open: PropTypes.bool,
  connection: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onClose: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onUpdateConnection: PropTypes.func.isRequired,
  color: PropTypes.string,
  userId: PropTypes.string,
}

export default connect(null, mapDispatchToProps)(EditConnectionDialog)
