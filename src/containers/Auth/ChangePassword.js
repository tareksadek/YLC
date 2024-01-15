import React, { useState } from 'react'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormElement from '../../components/Ui/FormElement'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { useLanguage } from '../../hooks/useLang'

import { changePasswordStyles } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

const ChangePassword = () => {
  const classes = changePasswordStyles()
  const language = useLanguage()

  const [loading, setLoading] = useState(false)
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [changePasswordForm, setChangePasswordForm] = useState({
    currentPassword: createFormElementObj('input', 'Current Password', { type: 'text', name: 'currentPassword', placeholder: 'Current Password' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    newPassword: createFormElementObj('input', 'New Password', { type: 'text', name: 'newPassword', placeholder: 'New Password' }, '', null, { required: true }, false,
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

    const adjustedForm = adjustFormValues(changePasswordForm, changeEvent, key)
    setChangePasswordForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
  }

  const loadFormContent = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3}>
          <FormElement
            elementType={formElements[formEl].elementType}
            label={formElements[formEl].elementLabel}
            value={formElements[formEl].value}
            elementOptions={formElements[formEl].elementOptions}
            touched={formElements[formEl].touched}
            valid={formElements[formEl].isValid}
            errorMessage={formElements[formEl].errorMessage}
            shouldValidate={formElements[formEl].validtationRules}
            elementSetup={formElements[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={formElements[formEl].grid}
            disabled={loading}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const changePasswordHandler = e => {
    e.preventDefault()
    setLoading(true)
    createFormValuesObj(changePasswordForm)
  }

  return (
    <Box className={classes.container}>
      {loading && <LoadingBackdrop loadingText={language.languageVars.processing} />}
      {loadFormContent(changePasswordForm)}
      <Button
        color="secondary"
        onClick={e => changePasswordHandler(e)}
        disabled={!formValid || loading || !formTouched}
        className={classes.changePasswordButton}
        classes={{
          disabled: classes.changePasswordButtonDisabled,
        }}
      >
        Change password
      </Button>
    </Box>
  )
}

export default ChangePassword
