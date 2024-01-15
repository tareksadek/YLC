import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { format } from 'date-fns'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import WarningIcon from '@material-ui/icons/Warning'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import FormElement from '../../components/Ui/FormElement'
import InfoBox from '../../components/Ui/InfoBox'
import NotificationDialog from '../../layout/NotificationDialog'
import Alert from '../../layout/Alert'
import PageTitle from '../../layout/PageTitle'
import SkeletonContainer from '../../layout/SkeletonContainer'

import { updateEmail } from '../../API/users'
// import { sendToCustomerPortal } from '../../API/subscriptions'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { accountStyles } from './styles'

import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const Account = ({
  cardData, onSetNotification,
}) => {
  const color = useColor()
  const classes = accountStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix
  // const [loadingDone, setLoadingDone] = useState(false)
  // const [loading, setLoading] = useState(false)
  const [passwordRequestDone, setPasswordRequestDone] = useState(false)
  const [passwordRequest, setPasswordRequest] = useState(false)
  const [passwordRequestSent, setPasswordRequestSent] = useState(false)
  const [emailRequestDone, setEmailRequestDone] = useState(false)
  const [emailRequest, setEmailRequest] = useState(false)
  const [emailRequestSent, setEmailRequestSent] = useState(false)
  const [emailFormVisible, setEmailFormVisible] = useState(false)
  const [wrongCurrentEmail, setWrongCurrentEmail] = useState(false)
  const [userFormValid, setUserFormValid] = useState(false)
  const [verificationRequestDone, setVerficationRequestDone] = useState(false)
  const [verificationRequest, setVerficationRequest] = useState(false)
  const [verifyEmailSent, setVerifyEmailSent] = useState(false)
  const [verifyEmailDialogOpen, setVerifyEmailDialogOpen] = useState(window.location.hash === '#verify')
  // const [manageSubscription, setManageSubscription] = useState(false)
  const [userForm, setUserForm] = useState({
    currentEmail: createFormElementObj('input', pageStatics.forms.currentEmail,
      { type: 'email', name: 'email', placeholder: pageStatics.forms.currentEmail }, '', null, { required: true, email: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    newEmail: createFormElementObj('input', pageStatics.forms.newEmail,
      { type: 'email', name: 'email', placeholder: pageStatics.forms.newEmail }, '', null, { required: true, email: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  // useEffect(() => {
  //   let mounted = true

  //   if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadCard(auth.user.uid)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [onLoadCard, auth.user.uid, cardData.userId, isTheLoggedinUser])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  useEffect(() => {
    const onHashChange = () => {
      setVerifyEmailDialogOpen(window.location.hash === '#verify')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedUserForm = adjustFormValues(userForm, changeEvent, key)
    setUserForm(adjustedUserForm.adjustedForm)
    setUserFormValid(adjustedUserForm.formValid)
  }

  const loadForm = (form, changeHandler) => {
    const formElements = Object.keys(form).map((formEl, i) => (
      <FormElement
        elementType={form[formEl].elementType}
        label={form[formEl].elementLabel}
        value={form[formEl].value}
        elementOptions={form[formEl].elementOptions}
        touched={form[formEl].touched}
        valid={form[formEl].isValid}
        shouldValidate={form[formEl].validtationRules}
        elementSetup={form[formEl].elementSetup}
        changed={e => changeHandler(e, formEl)}
        grid={form[formEl].grid}
        disabled={form[formEl].disabled}
        errorMessage={form[formEl].errorMessage}
        key={formEl + i}
      />
    ))

    return formElements
  }

  const closeVerifyEmailDialogHandler = () => {
    window.history.back()
  }

  const openVerifyEmailDialogHandler = () => {
    window.location.hash = '#verify'
  }

  const sendVerificationEmailHandler = async () => {
    setVerficationRequestDone(false)
    setVerficationRequest(true)
    try {
      await auth.user.sendEmailVerification()
      setVerifyEmailSent(true)
      onSetNotification({
        message: pageStatics.messages.notifications.verificationEmailSentSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.verificationEmailSentError,
        type: 'error',
      })
    }
    setVerficationRequestDone(true)
    setTimeout(() => setVerficationRequest(false), 1000)
  }

  const resetPasswordHandler = async () => {
    setPasswordRequestDone(false)
    if (auth.user.providerData[0].providerId === 'password' && !auth.user.emailVerified) {
      openVerifyEmailDialogHandler()
      return
    }
    setPasswordRequest(true)
    try {
      await auth.resetPassword(auth.user.email)
      setPasswordRequestSent(true)
      onSetNotification({
        message: pageStatics.messages.notifications.passwordChangeEmailSentSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.passwordChangeEmailSentError,
        type: 'error',
      })
    }
    setPasswordRequestDone(true)
    setTimeout(() => setPasswordRequest(false), 1000)
  }

  const showChangeEmailForm = () => {
    if (auth.user.providerData[0].providerId === 'password' && !auth.user.emailVerified) {
      openVerifyEmailDialogHandler()
      return
    }
    setEmailFormVisible(true)
  }

  const hideChangeEmailForm = () => {
    setEmailFormVisible(false)
  }

  const resetEmailHandler = async e => {
    e.preventDefault()
    setEmailRequestDone(false)
    setEmailRequest(true)
    const userDetails = createFormValuesObj(userForm)
    const { currentEmail, newEmail } = userDetails
    if (auth.user.email !== currentEmail) {
      setWrongCurrentEmail(true)
      setEmailRequestDone(true)
      setTimeout(() => setEmailRequest(false), 1000)
      return
    }
    try {
      await auth.resetEmail(newEmail)
      await updateEmail(auth.user.uid, auth.user.email)
      setEmailRequestSent(true)
      onSetNotification({
        message: pageStatics.messages.notifications.emailChangeEmailSentSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.emailChangeEmailSentError,
        type: 'error',
      })
    }
    setEmailRequestDone(true)
    setTimeout(() => setEmailRequest(false), 1000)
  }

  // const manageSubscriptionHandler = async () => {
  //   try {
  //     setManageSubscription(true)
  //     await sendToCustomerPortal()
  //   } catch (err) {
  //     throw new Error()
  //   }
  // }

  // if (auth.user.providerData[0].providerId !== 'password') {
  //   return <Redirect to={`/profile/${auth.userUrlSuffix}`} />
  // }

  if (!cardData.userId || cardData.loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.account}>
          <Box>
            <InfoBox infoList={[
              pageStatics.messages.info.account.first,
              // ...auth.user.providerData[0].providerId === 'password' && !auth.user.emailVerified ? [pageStatics.messages.info.account.second] : [],
            ]}
            />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={!auth.loadingAuth} loadingText={pageStatics.messages.loading.loadingAccounData} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {/* {loading && <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingAccounData} />} */}

      {verificationRequest && <LoadingBackdrop done={verificationRequestDone} loadingText={pageStatics.messages.loading.verifyEmailRequest} boxed />}

      {passwordRequest && <LoadingBackdrop done={passwordRequestDone} loadingText={pageStatics.messages.loading.passwordChangeRequest} boxed />}

      {emailRequest && <LoadingBackdrop done={emailRequestDone} loadingText={pageStatics.messages.loading.emailChangeRequest} boxed />}

      {/* {manageSubscription && <LoadingBackdrop done={!manageSubscription} loadingText={pageStatics.messages.loading.manageSubscription} boxed />} */}
      <Header title={pageStatics.data.titles.account}>
        <Box>
          <InfoBox infoList={[
            pageStatics.messages.info.account.first,
            // ...auth.user.providerData[0].providerId === 'password' && !auth.user.emailVerified ? [pageStatics.messages.info.account.second] : [],
          ]}
          />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          {auth.user.providerData[0].providerId === 'password' && !auth.user.emailVerified && !verifyEmailSent && (
            <Box className={classes.placeholderContainer} mb={3}>
              <Alert
                title={pageStatics.data.placeholders.verifyEmail.title}
                description={pageStatics.data.placeholders.verifyEmail.description}
                buttonText={pageStatics.data.placeholders.verifyEmail.button}
                type="warning"
                onClickHandler={() => sendVerificationEmailHandler()}
              />
            </Box>
          )}
          {/* {(!auth.isAdminCreated && auth.isMaster) && (
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle title={pageStatics.data.titles.subscription} />
              <Box mb={2}>
                <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                  {pageStatics.data.description.subscriptionPanel}
                </Typography>
              </Box>
              <Box mb={2}>
                <Box>
                  {auth.inTrial && (
                    <Alert
                      title={pageStatics.data.description.trialEnds}
                      description={format(new Date(auth.subscriberData.trial_end.toDate()), 'dd-MM-yyyy')}
                      type="warning"
                    />
                  )}
                  {auth.isSubscriber && auth.subscriberData.cancel_at && (
                    <Alert
                      title={pageStatics.data.description.subscriptionCancel}
                      description={format(new Date(auth.subscriberData.cancel_at.toDate()), 'dd-MM-yyyy')}
                      type="warning"
                    />
                  )}
                  {auth.isSubscriber && !auth.inTrial && !auth.subscriberData.cancel_at && (
                    <Alert
                      title={pageStatics.data.description.subscriptionRenews}
                      description={format(new Date(auth.subscriberData.current_period_end.toDate()), 'dd-MM-yyyy')}
                      type="info"
                    />
                  )}
                </Box>
              </Box>
              <Button
                className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                onClick={() => manageSubscriptionHandler()}
                style={{
                  backgroundColor: color.color.code,
                }}
              >
                {pageStatics.buttons.manageSubscription}
              </Button>
            </Box>
          )} */}
          {/* {!isSubscriber && (
            <Box className={`${layoutClasses.panel}`}>
              <PageTitle title={pageStatics.data.titles.subscription} />
              <Box mb={2}>
                <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                  {pageStatics.data.description.subscriptionPanel}
                </Typography>
              </Box>
              <Box mb={2}>
                <Alert
                  title={`${pageStatics.messages.notifications.becomePro.title}`}
                  description={pageStatics.messages.notifications.becomePro.body}
                  type="info"
                  buttonText={pageStatics.buttons.goPro}
                  onClickHandler={() => goToSubscribe()}
                  onClickTwoHandler={() => openProDialogHandler()}
                  buttonTwoText={pageStatics.buttons.whyPro}
                  noMargin
                />
              </Box>
            </Box>
          )} */}
          <Box className={classes.accountContainer}>
            {auth.user.providerData[0].providerId === 'password' && !auth.user.emailVerified && verifyEmailSent && (
              <Box className={classes.placeholderContainer} mb={3}>
                <Alert
                  title={pageStatics.data.placeholders.verifyEmailSent.title}
                  description={pageStatics.data.placeholders.verifyEmailSent.description}
                  type="info"
                />
              </Box>
            )}
            {emailFormVisible ? (
              <>
                {emailRequestSent ? (
                  <Alert
                    title={pageStatics.messages.notifications.emailChangeEmailSent.title}
                    description={pageStatics.messages.notifications.emailChangeEmailSent.body}
                    type="success"
                  />
                ) : (
                  <Box className={`${layoutClasses.panel}`}>
                    <PageTitle title={pageStatics.data.titles.changeEmail} />
                    <Box mb={2}>
                      <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                        {pageStatics.data.titles.changeEmailSubtitle}
                      </Typography>
                    </Box>
                    {wrongCurrentEmail && (
                      <Alert
                        title={pageStatics.messages.notifications.wrongCurrentEmail.title}
                        description={pageStatics.messages.notifications.wrongCurrentEmail.body}
                        type="error"
                      />
                    )}
                    <Box>
                      {loadForm(userForm, inputChangeHandler)}
                    </Box>
                    <Box className={layoutClasses.panelButtonsContainer}>
                      <Button
                        className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                        onClick={e => resetEmailHandler(e)}
                        disabled={!userFormValid || emailRequest}
                        style={{
                          backgroundColor: color.color.code,
                        }}
                      >
                        {pageStatics.buttons.changeEmailRequest}
                      </Button>
                      <Button
                        className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                        onClick={() => hideChangeEmailForm()}
                        style={{
                          backgroundColor: color.color.code,
                        }}
                      >
                        {pageStatics.buttons.changeEmailCancel}
                      </Button>
                    </Box>
                  </Box>
                )}
              </>
            ) : (
              <Box className={`${layoutClasses.panel}`}>
                <PageTitle title={pageStatics.data.titles.loginEmail} />
                <Box mb={2}>
                  <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                    {pageStatics.data.description.emailPanel}
                  </Typography>
                </Box>
                <Box mb={2} className={classes.loginEmailContainer}>
                  <Typography variant="body1" align="center" component="p">
                    {auth.user.email}
                  </Typography>
                  {auth.user.providerData[0].providerId === 'password' && auth.user.emailVerified ? (
                    <Tooltip title={pageStatics.data.tooltips.emailVerified} placement="top">
                      <VerifiedUserIcon className={classes.verifiedIcon} />
                    </Tooltip>
                  ) : (
                    <Tooltip title={pageStatics.data.tooltips.emailUnverified} placement="top">
                      <WarningIcon className={classes.unverifiedIcon} />
                    </Tooltip>
                  )}
                </Box>
                {!auth.isAdminCreated && auth.user.providerData[0].providerId === 'password' && (
                  <Button
                    className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                    onClick={() => showChangeEmailForm()}
                    style={{
                      backgroundColor: color.color.code,
                    }}
                  >
                    {pageStatics.buttons.changeEmail}
                  </Button>
                )}
              </Box>
            )}
            {passwordRequestSent ? (
              <Alert
                title={pageStatics.messages.notifications.passwordChangeEmailSent.title}
                description={pageStatics.messages.notifications.passwordChangeEmailSent.body}
                type="info"
              />
            ) : (
              <>
                {!auth.isAdminCreated && auth.user.providerData[0].providerId === 'password' && (
                  <Box className={`${layoutClasses.panel}`}>
                    <PageTitle title={pageStatics.data.titles.password} />
                    <Box mb={2}>
                      <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                        {pageStatics.data.description.passwordPanel}
                      </Typography>
                    </Box>
                    <Button
                      className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                      onClick={() => resetPasswordHandler()}
                      style={{
                        backgroundColor: color.color.code,
                      }}
                    >
                      {pageStatics.buttons.changePassword}
                    </Button>
                  </Box>
                )}
              </>
            )}
            <NotificationDialog
              open={verifyEmailDialogOpen}
              onClose={closeVerifyEmailDialogHandler}
              loading={verificationRequest}
              loadingMessage="Loading message..."
              title={pageStatics.data.placeholders.verifyEmail.title}
              type="warning"
              actionOne={{
                clicked: () => sendVerificationEmailHandler(),
                text: pageStatics.data.placeholders.verifyEmail.button,
              }}
            >
              {verifyEmailSent ? (
                <Box>
                  <Typography variant="body1" align="center" component="p">
                    {pageStatics.data.dialog.verifyEmail.emailSent}
                  </Typography>
                </Box>
              ) : (
                <Box>
                  <Typography variant="body1" align="center" component="p">
                    {pageStatics.data.dialog.verifyEmail.notVerified}
                  </Typography>
                </Box>
              )}
            </NotificationDialog>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
})

Account.defaultProps = {
  cardData: null,
}

Account.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // onLoadCard: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  // switchTheme: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Account)
