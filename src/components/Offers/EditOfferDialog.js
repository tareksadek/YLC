import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'

import PersonIcon from '@material-ui/icons/Person'

import FormElement from '../Ui/FormElement'
import LoadingBackdrop from '../Loading/LoadingBackdrop'
import NotificationDialog from '../../layout/NotificationDialog'

import { editProfileStyles } from '../../containers/EditProfile/styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import { updateOfferByDateAdded } from '../../API/cards'

import * as actions from '../../store/actions'

const EditConnectionDialog = ({
  open, onClose, connection, onSetNotification, onUpdateConnection,
}) => {
  const classes = editProfileStyles()
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
    website: createFormElementObj('input', `${connectionsStatics.forms.connectDialog.website}`,
      {
        type: 'text', name: 'website', placeholder: `${connectionsStatics.forms.connectDialog.website}`, tag: 'website',
      },
      connection && connection.website ? connection.website : '',
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
    organization: createFormElementObj('input', `${connectionsStatics.forms.connectDialog.organization}`,
      {
        type: 'text', name: 'organization', placeholder: `${connectionsStatics.forms.connectDialog.organization}`, tag: 'text',
      },
      connection && connection.organization ? connection.organization : '',
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
    title: createFormElementObj('input', connectionsStatics.forms.connectDialog.jobTitle,
      {
        type: 'text', name: 'title', placeholder: connectionsStatics.forms.connectDialog.jobTitle, tag: 'text',
      },
      connection && connection.title ? connection.title : '',
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
      contactDetails.userName = `${contactDetails.firstName || null} ${contactDetails.lastName || null}`
      await updateOfferByDateAdded(auth.user.uid, connection.addedOn, contactDetails)
      onUpdateConnection(connection.addedOn, contactDetails)
      setFormTouched(false)
      onClose()

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.loadingConnectionInfo)

      onSetNotification({
        message: pageStatics.messages.notifications.connectionEditSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
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

  if (loading) {
    return <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} />
  }

  return (
    <NotificationDialog
      type="custom"
      background="#fff"
      title={`Edit ${connection && connection.firstName} ${(connection && connection.lastName) && connection.lastName}`}
      icon={<PersonIcon style={{ color: '#272727' }} />}
      open={open && !!connection}
      onClose={() => closeDialog()}
      actionOne={{
        clicked: e => editContactHandler(e),
        borderedButton: true,
        text: pageStatics.buttons.editConnection,
        disabled: buttonDisabled,
        background: '#272727',
      }}
    >
      <Box className={`${classes.dialogContent} ${classes.formElementTextBlack}`}>
        <Grid container spacing={3}>
          {loadConnectForm()}
        </Grid>
      </Box>
    </NotificationDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onUpdateConnection: (addedOn, connectionData) => dispatch(actions.updateConnection(addedOn, connectionData)),
})

EditConnectionDialog.defaultProps = {
  open: false,
  connection: null,
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
}

export default connect(null, mapDispatchToProps)(EditConnectionDialog)
