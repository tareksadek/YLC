import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useLocation, useHistory, Redirect } from 'react-router-dom'
import queryString from 'query-string'
import parse from 'html-react-parser'

// import emailjs from 'emailjs-com'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'
import FormElement from '../../components/Ui/FormElement'
import PageTitle from '../../layout/PageTitle'
import InfoBox from '../../components/Ui/InfoBox'
import Alert from '../../layout/Alert'

import { firebaseApp } from '../../API/firebase'
import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

// import {
//   getUserById, setWelcomeEmailSent,
// } from '../../API/users'
// import { getInvitationByCode, disableChildInvitation, disableInvitation } from '../../API/invitations'
// import { disableChildInvitationInParent } from '../../API/cards'

// import { breakName, capitalizeFirst } from '../../utilities/utils'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

// import { MAILJS_CONFIG } from '../../utilities/appVars'

import { layoutStyles } from '../../theme/layout'
import { changePasswordStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'

import * as actions from '../../store/actions'

const ConfirmEmailStatus = lazy(() => import('../../components/Auth/ConfirmEmailStatus'))

const AuthVerified = ({ onSetNotification }) => {
  const auth = useAuth()
  const location = useLocation()
  const history = useHistory()
  const language = useLanguage()
  const color = useColor()
  const pageStatics = language.languageVars.pages.auth
  const { oobCode, mode } = queryString.parse(location.search)
  const [validOobCode, setValidOobCode] = useState('processing')
  const [isAuthUser, setIsAuthUser] = useState(true)
  const [resetPassword, setResetPassword] = useState(false)
  const [resetPasswordFormValid, setResetPasswordFormValid] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [changePasswordResult, setChangePasswordResult] = useState(null)
  const [changePasswordError, setChangePasswordError] = useState(null)
  const [resetPasswordForm, setResetPasswordForm] = useState({
    oldPassword: createFormElementObj('input', 'Old password',
      { type: 'text', name: 'oldPassword', placeholder: 'Old password' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    newPassword: createFormElementObj('input', 'New Password',
      {
        type: 'text',
        name: 'newPassword',
        placeholder: 'New password',
        help: 'Min length 6 characters',
      }, '', null, { required: true, minLength: 6 }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })
  const [changeEmail, setChangeEmail] = useState()
  const [changingEmail, setChangingEmail] = useState(false)
  const [changeEmailFormValid, setChangeEmailFormValid] = useState(false)
  const [changeEmailResult, setChangeEmailResult] = useState(null)
  const [changeEmailError, setChangeEmailError] = useState(null)
  const [changeEmailForm, setChangeEmailForm] = useState({
    email: createFormElementObj('input', 'E-mail',
      { type: 'email', name: 'email', placeholder: 'E-mail' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    password: createFormElementObj('input', 'Current password',
      { type: 'text', name: 'password', placeholder: 'Current password' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const layoutClasses = layoutStyles()
  const classes = changePasswordStyles()
  const buttons = buttonStyles()

  useEffect(() => {
    let mounted = true;

    (async () => {
      if (auth.user) {
        try {
          if (oobCode && !auth.emailVerified) {
            const checkedOobCode = await firebaseApp.auth().checkActionCode(oobCode)
            if (mounted) {
              if (auth.user.email === checkedOobCode.data.email && mode === 'verifyEmail') {
                await firebaseApp.auth().applyActionCode(oobCode)
                await firebaseApp.auth().currentUser.reload()
                auth.confirmLogin()
                setValidOobCode('valid')

                onSetNotification({
                  message: pageStatics.messages.notifications.emailVerifiedSuccess,
                  type: 'success',
                })

                // const userNameObj = breakName(auth.user.displayName)
                // const templateParams = {
                //   fromName: language.languageVars.appAppr,
                //   firstName: capitalizeFirst(userNameObj.firstName),
                //   toEmail: auth.user.email,
                //   editProfileLink: `${language.languageVars.appEditProfileURL}/${auth.user.uid}/edit`,
                //   learnConnectTapplLink: `${language.languageVars.appDomain}/activate`,
                //   tapplCodesLink: `${language.languageVars.appDomain}/invitations`,
                // }
                // const user = await getUserById(auth.user.uid)
                // const { invitationCode, accountType } = user.settings
                // await disableInvitation(invitationCode, auth.user.uid)
                // if (accountType === 'child') {
                //   const { parentInvitation } = await getInvitationByCode(invitationCode)
                //   const { usedBy } = await getInvitationByCode(parentInvitation)
                //   await disableChildInvitationInParent(usedBy, invitationCode, auth.user.uid)
                //   await disableChildInvitation(parentInvitation, invitationCode, auth.user.uid)
                //   await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeChildTemplateId, templateParams, MAILJS_CONFIG.userId)
                // } else if (accountType === 'single') {
                //   await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeChildTemplateId, templateParams, MAILJS_CONFIG.userId)
                // } else {
                //   await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeCorporateTemplateId, templateParams, MAILJS_CONFIG.userId)
                // }
                // await setWelcomeEmailSent(auth.user.uid)
                // if (auth.vCardFileExists) {
                //   history.push(`/profile/${auth.userUrlSuffix}`)
                // } else {
                //   history.push('/welcome')
                // }
              } else {
                setValidOobCode('invalid')
                history.push('/')
              }
            }
          } else if (oobCode && auth.emailVerified && mode !== 'verifyEmail') {
            const checkedOobCode = await firebaseApp.auth().checkActionCode(oobCode)
            if (mounted) {
              if (auth.user.email === checkedOobCode.data.email && mode === 'resetPassword') {
                setValidOobCode('valid')
                setResetPassword(true)
              } else if (auth.user.email === checkedOobCode.data.email && mode === 'recoverEmail') {
                setValidOobCode('valid')
                setChangeEmail(true)
              }
            }
          } else {
            history.push('/settings/account')
          }
        } catch (err) {
          setValidOobCode('invalid')
          history.push('/')
        }
      } else {
        setIsAuthUser(false)
      }
    })()

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.user,
    auth.emailVerified,
    history,
    oobCode,
    mode,
    language.languageVars.appAppr,
    language.languageVars.appDomain,
    language.languageVars.appEditProfileURL,
  ])

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
    if (form.email) {
      setChangeEmailForm(adjustedForm.adjustedForm)
      setChangeEmailFormValid(adjustedForm.formValid)
    } else {
      setResetPasswordForm(adjustedForm.adjustedForm)
      setResetPasswordFormValid(adjustedForm.formValid)
    }
  }

  const loadResetForm = formState => {
    const form = Object.keys(formState).map((formEl, i) => (
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
        disabled={changingPassword}
        key={formEl + i}
      />
    ))

    return form
  }

  const changePasswordHandler = async e => {
    e.preventDefault()
    setChangingPassword(true)
    try {
      const data = createFormValuesObj(resetPasswordForm)
      const { oldPassword, newPassword } = data
      const changeResult = await auth.changePassword(oldPassword, newPassword)
      setChangePasswordResult(changeResult.status)
      if (changeResult.status === 'failure' && changeResult.error === 'auth/wrong-password') {
        setChangePasswordError(pageStatics.messages.notifications.wrongOldPassword)
      } else {
        setChangePasswordError(null)
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(`from ddd ${err}`);
    }
    setChangingPassword(false)
  }

  const changeEmailHandler = async e => {
    e.preventDefault()
    setChangingEmail(true)
    try {
      const data = createFormValuesObj(changeEmailForm)
      const { email, password } = data
      const changeResult = await auth.changeEmail(password, email)
      setChangeEmailResult(changeResult.status)
      if (changeResult.status === 'failure') {
        setChangeEmailError(pageStatics.messages.notifications.wrongChangeEmail)
      } else {
        setChangeEmailError(null)
      }
    } catch (err) {
      // eslint-disable-next-line
      console.log(`from ddd ${err}`);
    }
    setChangingEmail(false)
  }

  const continueHandler = () => {
    history.push('/settings/account')
  }

  const loginHandler = () => {
    history.push('/login')
  }

  if (!oobCode) {
    return <Redirect to="/" />
  }

  if (validOobCode === 'processing') {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.validatingEmail} />
  }

  if (changingPassword) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.changingPassword} />
  }

  if (!isAuthUser) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.confirmEmail}>
          <Box mb={3}>
            <InfoBox infoList={[pageStatics.data.description.confirmEmail]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Alert
            title={pageStatics.messages.notifications.wrongAuth.title}
            description={pageStatics.messages.notifications.wrongAuth.description}
            buttonText={pageStatics.buttons.login}
            onClickHandler={() => loginHandler()}
            type="success"
          />
        </Box>
      </Box>
    )
  }

  if (changePasswordResult === 'success') {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.changePassword}>
          <Box mb={3}>
            <InfoBox infoList={[pageStatics.data.titles.passwordSuccess]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Alert
            title={pageStatics.data.titles.passwordSuccess}
            description={pageStatics.messages.notifications.passwordChangeSuccess}
            buttonText={pageStatics.buttons.continueAfterPasswordChange}
            onClickHandler={() => continueHandler()}
            type="success"
          />
        </Box>
      </Box>
    )
  }

  if (changeEmailResult === 'success') {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.recoverEmail} />
        <Box className={layoutClasses.contentContainer}>
          <Box className={classes.layout}>
            <Paper className={classes.paper} square elevation={0}>
              <CheckCircleIcon style={{ fontSize: 48 }} />
              <Box mt={1}>
                <Typography
                  align="center"
                  component="p"
                >
                  {parse(pageStatics.messages.notifications.emailRecoverSuccess)}
                </Typography>
              </Box>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={continueHandler}
                  className={buttons.defaultButton}
                  style={{
                    backgroundColor: color.color.code,
                  }}
                >
                  {pageStatics.buttons.continueAfterPasswordChange}
                </Button>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    )
  }

  if (changeEmail) {
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.changePassword} />
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <PageTitle title={pageStatics.data.titles.changePasswordPage} />
          {changeEmailError && (
            <Typography
              align="center"
              component="p"
              className={classes.errorText}
            >
              {changeEmailError}
            </Typography>
          )}
          <Box className={classes.resetPasswordContainer}>
            {loadResetForm(changeEmailForm)}
            <Button
              color="primary"
              className={buttons.defaultButton}
              style={{
                backgroundColor: color.color.code,
              }}
              onClick={e => changeEmailHandler(e)}
              disabled={!changeEmailFormValid || changingEmail}
            >
              {pageStatics.buttons.changePassword}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  }

  return (
    <>
      {resetPassword ? (
        <Box className={layoutClasses.pageContainer}>
          <Header title={pageStatics.data.titles.changePassword}>
            <Box mb={3}>
              <InfoBox infoList={[pageStatics.data.titles.changePasswordPage]} />
            </Box>
          </Header>
          <Box className={layoutClasses.contentContainer}>
            <Box className={layoutClasses.formContainer}>
              {changePasswordError && (
                <Alert
                  title={pageStatics.data.titles.passwordError}
                  description={changePasswordError}
                  type="error"
                />
              )}
              <Box className={`${layoutClasses.panel}`}>
                <PageTitle title={pageStatics.data.titles.changePassword} />
                <Box mb={2}>
                  <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                    {pageStatics.data.description.changePassword}
                  </Typography>
                </Box>
                <Box>
                  {loadResetForm(resetPasswordForm)}
                  <Button
                    color="primary"
                    className={`${buttons.defaultButton} ${layoutClasses.panelButton}`}
                    onClick={e => changePasswordHandler(e)}
                    disabled={!resetPasswordFormValid || changingPassword}
                  >
                    {pageStatics.buttons.changePassword}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ) : (
        <Box className={layoutClasses.pageContainer}>
          <Header title={pageStatics.data.titles.verify} />
          <Box className={layoutClasses.contentContainer}>
            <Suspense fallback={language.languageVars.loading}>
              <ConfirmEmailStatus validStatus={validOobCode} />
            </Suspense>
          </Box>
        </Box>
      )}
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

AuthVerified.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AuthVerified)
