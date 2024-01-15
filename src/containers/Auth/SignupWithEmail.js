import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import FormElement from '../../components/Ui/FormElement'
import PageTitle from '../../layout/PageTitle'

import { firebaseApp } from '../../API/firebase'
import { createUser } from '../../API/users'

import { useLanguage } from '../../hooks/useLang'

import { createUrlSuffix } from '../../utilities/utils'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
import { emailAuthStyles } from './styles'

const SignupWithEmail = ({ onCreateAccount }) => {
  const layoutClasses = layoutStyles()
  const classes = emailAuthStyles()
  const buttons = buttonStyles()
  const auth = firebaseApp.auth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  const [processing, setProcessing] = useState(false)
  const [signupError, setSignupError] = useState(false)
  const [signupFormValid, setSignupFormValid] = useState(false)
  const [signupForm, setSignupForm] = useState({
    email: createFormElementObj('input', 'E-mail*',
      { type: 'email', name: 'email', placeholder: 'E-mail*' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    firstName: createFormElementObj('input', 'First name*',
      { type: 'text', name: 'first_name', placeholder: 'First name*' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    lastName: createFormElementObj('input', 'Last name*',
      { type: 'text', name: 'last_name', placeholder: 'Last name*' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    password: createFormElementObj('input', 'Current password',
      { type: 'password', name: 'password', placeholder: 'Current password' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const registerWithEmailAndPassword = async (email, password, firstName, lastName) => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      const { user } = res
      await user.sendEmailVerification()
      const userUrlSuffix = await createUrlSuffix(`${firstName} ${lastName}`)
      const anonymouseSuffix = `${userUrlSuffix.urlSuffix}_${language.languageVars.appNameCAPS}_${user.uid}`
      await createUser(user.uid, user.email, `${firstName} ${lastName}`, anonymouseSuffix, 'invitation', 'single', null, 'individual', new Date(), null, null, false)
      onCreateAccount()
    } catch (err) {
      setSignupError(err.message)
    }
  }

  const inputChangeHandler = (e, key, form) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(form, changeEvent, key)
    setSignupForm(adjustedForm.adjustedForm)
    setSignupFormValid(adjustedForm.formValid)
  }

  const loadResetForm = formState => {
    const form = Object.keys(formState).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3}>
          <FormElement
            elementType={formState[formEl].elementType}
            label={formState[formEl].elementLabel}
            value={formState[formEl].value}
            elementOptions={formState[formEl].elementOptions}
            touched={formState[formEl].touched}
            valid={formState[formEl].isValid}
            shouldValidate={formState[formEl].validtationRules}
            elementSetup={formState[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl, formState)}
            grid={formState[formEl].grid}
            disabled={processing}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const signupHandler = async e => {
    e.preventDefault()
    setProcessing(true)
    try {
      const data = createFormValuesObj(signupForm)
      const {
        email, password, firstName, lastName,
      } = data
      await registerWithEmailAndPassword(email, password, firstName, lastName)
    } catch (err) {
      setSignupError(err.message)
    }
    setProcessing(false)
  }

  return (
    <Box className={layoutClasses.formContainer}>
      <PageTitle title={pageStatics.data.titles.signupWithEmail} />
      {signupError && (
        <Typography
          align="center"
          component="p"
          className={classes.errorText}
        >
          {signupError}
        </Typography>
      )}
      <Box className={classes.resetPasswordContainer}>
        {loadResetForm(signupForm)}
        <Button
          color="primary"
          className={buttons.defaultButton}
          onClick={e => signupHandler(e)}
          disabled={!signupFormValid || processing}
        >
          {pageStatics.buttons.signup}
        </Button>
      </Box>
    </Box>

  )
}

SignupWithEmail.propTypes = {
  onCreateAccount: PropTypes.func.isRequired,
}

export default SignupWithEmail
