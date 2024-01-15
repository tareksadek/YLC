import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import HomeIcon from '@material-ui/icons/Home'
import { Logo } from '../../layout/CustomIcons'

// import PageTitle from '../../layout/PageTitle'
import FormElement from '../../components/Ui/FormElement'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Alert from '../../layout/Alert'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { connectInvitation } from '../../API/invitations'

import * as actions from '../../store/actions'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { authStyles } from './styles'
import { LOGIN_PAGE, CREATE_ACCOUNT_PAGE } from '../../utilities/appVars'

const ProcessInvitation = ({
  onSetNotification,
  onCheckInvitation,
  onClearCard,
  onClearInvitation,
}) => {
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const authClasses = authStyles()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [invitationForm, setInvitationForm] = useState({
    invitationCode: createFormElementObj('input',
      pageStatics.forms.invitation,
      {
        type: 'text',
        name: 'invitationCode',
        placeholder: pageStatics.forms.invitation,
      },
      '',
      null,
      { required: true },
      false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const inputChangeHandler = async (eve, key) => {
    let changeEvent
    let e = eve
    if (!e) {
      e = ''
    }
    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedInfoForm = adjustFormValues(invitationForm, changeEvent, key)
    setInvitationForm(adjustedInfoForm.adjustedForm)
    setFormValid(adjustedInfoForm.formValid)
    setFormTouched(true)
  }

  const loadTabFormContent = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
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
        key={formEl + i}
      />
    ))

    return form
  }

  const checkInvitationHandler = async () => {
    setLoading(true)
    const invitationFormDetails = createFormValuesObj(invitationForm)
    try {
      const currentStatus = await onCheckInvitation(invitationFormDetails.invitationCode.trim())
      if (currentStatus.invitationStatus === 'invalid') {
        setLoading(false)
        setErrorMessage(pageStatics.messages.notifications.processInvitation.invalidCode)
        setError(true)
        return
      }

      if (currentStatus.invitationStatus === 'valid' && !currentStatus.used) {
        await connectInvitation(invitationFormDetails.invitationCode.trim())
        await auth.logout()
        onClearCard()

        window.localStorage.clear()
        window.localStorage.setItem('package', currentStatus.invitationPackage)
        window.localStorage.setItem('accountType', currentStatus.accountType)
        window.localStorage.setItem('invitationCode', currentStatus.invitationCode)
        window.localStorage.setItem('patch', currentStatus.patch)
        window.localStorage.setItem('authType', 'signup')
        window.localStorage.setItem('invitationTheme', currentStatus.invitationTheme ? currentStatus.invitationTheme.theme : null)
        window.localStorage.setItem('invitationLayout', currentStatus.invitationTheme ? currentStatus.invitationTheme.layout : null)
        window.localStorage.setItem('invitationColorName', currentStatus.invitationTheme ? currentStatus.invitationTheme.selectedColor.name : null)
        window.localStorage.setItem('invitationColorCode', currentStatus.invitationTheme ? currentStatus.invitationTheme.selectedColor.code : null)

        onSetNotification({
          message: pageStatics.messages.notifications.invitationValid,
          type: 'success',
        })

        history.push(CREATE_ACCOUNT_PAGE)
        return
      }

      if (currentStatus.invitationStatus === 'used' && currentStatus.used) {
        window.localStorage.clear()
        onClearInvitation()
        onSetNotification({
          message: pageStatics.messages.notifications.invitationUsed,
          type: 'warning',
        }, 5000)
        history.push(LOGIN_PAGE)
      }
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.invitationError,
        type: 'error',
      })
    }

    setLoading(false)
  }
  const goToLogin = () => {
    history.push(LOGIN_PAGE)
  }

  const goToLanding = () => {
    history.push('/')
  }

  if (loading) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.validatingInvitationCode} boxed />
  }

  const buttonDisabled = (formTouched && !formValid) || !formTouched || loading

  return (
    <Box className={layoutClasses.pageContainer}>
      <Box className={layoutClasses.contentContainer} style={{ paddingTop: 20 }}>
        <Box className={`${layoutClasses.authContainer}`}>
          <Box className={authClasses.landingHeader}>
            <Box className={authClasses.landingNav}>
              <Logo className={authClasses.logo} />
              <Button
                disableRipple
                onClick={() => goToLanding()}
              >
                <HomeIcon />
              </Button>
            </Box>
          </Box>
          <Box className={authClasses.landingTextContainerSlim}>
            <Typography variant="body1" component="p" align="center">
              <span>{pageStatics.data.titles.processInvitation.first}</span>
            </Typography>
            <Typography variant="body1" component="p" align="center">
              {pageStatics.data.titles.processInvitation.second}
            </Typography>
            <Box className={authClasses.descriptionText}>
              <Typography variant="body1" component="p" align="center">
                {pageStatics.data.description.processInvitation}
              </Typography>
            </Box>
          </Box>
          {auth.authStatus !== 'loggedin' && (
            <Box mt={4}>
              <Box className={`${layoutClasses.authContainer}`} mb={2}>
                <Box className={`${layoutClasses.panel}`}>
                  {/* <PageTitle
                    title={pageStatics.data.titles.invitationCode}
                  /> */}
                  {error && !!errorMessage && (
                    <Alert
                      // title={pageStatics.messages.info.noTeamMembers.title}
                      title={errorMessage}
                      type="error"
                    />
                  )}
                  <Grid container spacing={3}>
                    {loadTabFormContent(invitationForm)}
                  </Grid>
                  <Box className={layoutClasses.panelButtonsContainer}>
                    <Button
                      className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                      onClick={() => checkInvitationHandler()}
                      disabled={buttonDisabled}
                      style={{
                        maxWidth: 'initial',
                      }}
                    >
                      {pageStatics.buttons.checkInvitation}
                    </Button>
                  </Box>
                </Box>
                <Box mt={3}>
                  <Button
                    className={buttonClasses.textButton}
                    onClick={() => goToLogin()}
                    style={{
                      margin: '0 auto',
                    }}
                  >
                    <b>
                      {pageStatics.buttons.goToLogin}
                    </b>
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

ProcessInvitation.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onCheckInvitation: PropTypes.func.isRequired,
  onClearCard: PropTypes.func.isRequired,
  onClearInvitation: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onCheckInvitation: invitationCode => dispatch(actions.checkInvitation(invitationCode)),
  onSetNotification: (notification, duration) => dispatch(actions.setNotification(notification, duration)),
  onClearCard: () => dispatch(actions.clearCard()),
  onClearInvitation: () => dispatch(actions.clearInvitation()),
})

export default connect(null, mapDispatchToProps)(ProcessInvitation)
