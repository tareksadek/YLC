import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import firebase from 'firebase/app'
import 'firebase/auth'

import { useHistory } from 'react-router-dom'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

// import emailjs from 'emailjs-com'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import HomeIcon from '@material-ui/icons/Home'
import { Logo } from '../../layout/CustomIcons'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import InfoBox from '../../components/Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'

import { getInvitationByCode, disableInvitation, disableChildInvitation } from '../../API/invitations'
import {
  createUserCard, disableChildInvitationInParent, getCardBySecretCode, getCardById, updateFollowers, updateFollowing,
} from '../../API/cards'
import { createUserCounter, getCounterById } from '../../API/counter'
import {
  deleteUserById, updateLoginDates, updateUserSettings,
} from '../../API/users'
// import { getFirebaseStorage } from '../../API/firebase'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

// import { breakName, capitalizeFirst, generateVcard } from '../../utilities/utils'
import { breakName } from '../../utilities/utils'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import FormElement from '../../components/Ui/FormElement'

// import { MAILJS_CONFIG } from '../../utilities/appVars'

import * as actions from '../../store/actions'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { mirrorStyles, authStyles } from './styles'

const InvitationBlock = lazy(() => import('../../components/Auth/InvitationBlock'))

const Signup = ({
  code, status, masterId, invitationType, parentInvitation, childInvitations, onCheckInvitation, onSetNotification,
}) => {
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth
  const authType = window.localStorage.getItem('authType')
  // const authTitle = authType === 'signup' ? pageStatics.data.titles.signup : pageStatics.data.titles.signin
  const authButtonTitle = authType === 'signup' ? 'Create' : 'Login'
  const invitationCode = window.localStorage.getItem('invitationCode')

  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const authClasses = authStyles()
  const classes = mirrorStyles()

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: `${authButtonTitle} with E-mail`,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: `${authButtonTitle} with Google`,
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  const [validation, setValidation] = useState('valid')
  const [loading, setLoading] = useState(false)
  const [showMirror, setShowMirror] = useState(false)
  const [mirrorToProfile, setMirrorToProfile] = useState(null)
  const [processingMirrorAction, setProcessingMirrorAction] = useState(false)
  const [mirrorMessage, setMirrorMessage] = useState(null)
  const [masterProfile, setMasterProfile] = useState(null)
  const [mirrorForm, setMirrorForm] = useState({
    accountSecret: createFormElementObj('text', pageStatics.forms.accountSecret,
      { type: 'text', name: 'message', placeholder: pageStatics.forms.accountSecret }, '', null, { required: false }, false,
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
    let mounted = true
    if (mounted) {
      (async () => {
        let currentStatus = status
        let storageStatus = null
        let invitationMaster = null
        if (!currentStatus && invitationCode && authType === 'signup') {
          storageStatus = await onCheckInvitation(invitationCode.trim())
          currentStatus = storageStatus.status
          invitationMaster = storageStatus && storageStatus.masterId
          if (invitationMaster) {
            const masterInvitation = await getInvitationByCode(invitationMaster)
            const masterInvitationId = masterInvitation.usedBy
            const masterProfileData = await getCardById(masterInvitationId)
            window.localStorage.setItem('invitationTheme', masterProfileData.settings.theme)
            window.localStorage.setItem('invitationLayout', masterProfileData.settings.layout)
            window.localStorage.setItem('invitationColorName', masterProfileData.settings.selectedColor.name)
            window.localStorage.setItem('invitationColorCode', masterProfileData.settings.selectedColor.code)
            setMasterProfile(masterProfileData)
          }
        }

        if ((auth.authStatus === 'loggedin' || auth.authStatus === 'blocked') && auth.user && !auth.userExist && currentStatus !== 'valid') {
          setLoading(true)
          if (auth.user) {
            await deleteUserById(auth.user.uid)
            await auth.user.delete()
          }
          setValidation(currentStatus)
          setLoading(false)
        }

        if (auth.authStatus === 'loggedin' && auth.user && !auth.userExist && currentStatus === 'valid') {
          setLoading(true)
          const userNameObj = breakName(auth.user.displayName)
          // const templateParams = {
          //   fromName: language.languageVars.appAppr,
          //   firstName: capitalizeFirst(userNameObj.firstName),
          //   toEmail: auth.user.email,
          //   appEmail: language.languageVars.appEmail,
          //   editProfileLink: `${language.languageVars.appEditProfileURL}/${auth.user.uid}/edit`,
          //   learnConnectTapplLink: language.languageVars.learnFeatures,
          //   tapplCodesLink: `${language.languageVars.appDomain}/invitations`,
          // }
          // const cardDetails = {
          //   firstName: userNameObj.firstName || '',
          //   lastName: userNameObj.lastName || '',
          //   email: auth.user.email,
          //   organization: masterProfile ? masterProfile.organization : null,
          // }
          const cardLinks = masterProfile && masterProfile.links && masterProfile.links.length > 0 ? [...masterProfile.links] : null
          const socialLinksOrder = masterProfile && masterProfile.socialLinksOrder && masterProfile.socialLinksOrder.length > 0 ? [...masterProfile.socialLinksOrder] : null
          // const vCardFile = generateVcard(cardDetails, cardLinks, `${language.languageVars.appNameCAPS}_${auth.userUrlSuffix}.vcf`, null, null)
          // cardDetails.vCardFile = vCardFile.name
          // const metaData = {
          //   contentDisposition: 'attachment',
          //   filename: vCardFile.name,
          //   contentType: 'text/vcard',
          // }
          const profileData = {
            firstName: userNameObj.firstName,
            lastName: userNameObj.lastName,
            userId: auth.user.uid,
            email: auth.user.email,
            urlSuffix: auth.userUrlSuffix,
            organization: masterProfile ? masterProfile.organization : null,
            logo: masterProfile ? masterProfile.logo : null,
            career: masterProfile ? masterProfile.career : null,
            settings: masterProfile ? masterProfile.settings : null,
            defaultLinksToTheme: masterProfile ? masterProfile.defaultLinksToTheme : false,
            links: cardLinks,
            socialLinksOrder,
          }
          const invitationData = {
            method: 'invitation',
            code,
            parentInvitation,
            childInvitations,
            masterId,
          }
          if (masterId) {
            auth.checkMemberStatus(true)
          }
          await createUserCard(
            profileData,
            invitationData,
            auth.accountSecret,
            null,
          )
          // await getFirebaseStorage().ref(`/card/${vCardFile.name}`).put(vCardFile, metaData)
          await createUserCounter(auth.userUrlSuffix, auth.user.uid)
          await disableInvitation(code, auth.user.uid)
          if (masterProfile) {
            await updateFollowers(masterProfile.userId, { addedOn: new Date(), userId: auth.user.uid })
            await updateFollowing(auth.user.uid, { addedOn: new Date(), userId: masterProfile.userId })
            await updateFollowers(auth.user.uid, { addedOn: new Date(), userId: masterProfile.userId })
            await updateFollowing(masterProfile.userId, { addedOn: new Date(), userId: auth.user.uid })
          }

          if (invitationType === 'child') {
            const parentInvitationData = await getInvitationByCode(parentInvitation)
            const parentCardId = parentInvitationData.usedBy
            await disableChildInvitationInParent(parentCardId, code, auth.user.uid)
            await disableChildInvitation(parentInvitation, code, auth.user.uid)
            // await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeChildTemplateId, templateParams, MAILJS_CONFIG.userId)
          }
          // } else if (invitationType === 'single') {
          //   await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeChildTemplateId, templateParams, MAILJS_CONFIG.userId)
          // } else {
          //   await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeCorporateTemplateId, templateParams, MAILJS_CONFIG.userId)
          // }
          await updateUserSettings(auth.user.uid, invitationType, code, masterProfile ? masterProfile.userId : null)
          await updateLoginDates(auth.user.uid)
          setValidation(currentStatus)
          setLoading(false)
          if (auth.userExist) {
            history.push(`/profile/${auth.userUrlSuffix}`)
          } else {
            window.localStorage.removeItem('package')
            window.localStorage.removeItem('accountType')
            window.localStorage.removeItem('invitationCode')
            window.localStorage.removeItem('patch')
            // window.localStorage.removeItem('invitationTheme')
            // window.localStorage.removeItem('invitationLayout')
            // window.localStorage.removeItem('invitationColorName')
            // window.localStorage.removeItem('invitationColorCode')
            if (masterProfile) {
              history.push('/welcomeMember')
            } else {
              history.push('/welcome')
            }
          }
        }

        if (auth.authStatus === 'loggedin' && auth.user && auth.userExist) {
          setLoading(true)
          const counter = await getCounterById(auth.user.uid)
          if (!counter) {
            await createUserCounter(auth.userUrlSuffix, auth.user.uid)
          }
          await updateLoginDates(auth.user.uid)
          if (auth.userExist) {
            history.push(`/profile/${auth.userUrlSuffix}`)
          } else {
            window.localStorage.removeItem('package')
            window.localStorage.removeItem('accountType')
            window.localStorage.removeItem('invitationCode')
            window.localStorage.removeItem('patch')
            // window.localStorage.removeItem('invitationTheme')
            // window.localStorage.removeItem('invitationLayout')
            // window.localStorage.removeItem('invitationColorName')
            // window.localStorage.removeItem('invitationColorCode')
            history.push('/welcome')
          }
        }

        // if (auth.authStatus === 'blocked' && auth.user && auth.user.providerData[0].providerId === 'password') {
        //   setLoading(true)
        //   const userNameObj = breakName(auth.user.displayName)
        //   if (!auth.userExist && status === 'valid') {
        //     await createUserCard(userNameObj.firstName, userNameObj.lastName, auth.user.uid, auth.user.email, auth.userUrlSuffix, 'invitation', code, parentInvitation, childInvitations)
        //     await createUserCounter(auth.userUrlSuffix, auth.user.uid)
        //     await disableInvitation(code, auth.user.uid)
        //     await updateUserSettings(auth.user.uid, invitationType, code)
        //     await updateLoginDates(auth.user.uid)
        //     setValidation(status)
        //     setLoading(false)
        //     if (!auth.verifyEmailSent && !auth.emailVerified) {
        //       await auth.user.sendEmailVerification()
        //       setVerificationEmailSent(true)
        //     }
        //   }
        //   if (auth.userExist) {
        //     if (auth.verifyEmailSent && !auth.emailVerified) {
        //       setEmailVerified(true)
        //     }
        //   }
        //   setLoading(false)
        // }
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.user, auth.authStatus,
    auth.userExist, auth.emailVerified,
    auth.userUrlSuffix,
    auth.accountSecret,
    auth.checkMemberStatus,
    status,
    code,
    history,
    language.languageVars.appAppr,
    language.languageVars.appAdmin,
    language.languageVars.appDomain,
    language.languageVars.appEditProfileURL,
    language.languageVars.learnFeatures,
    language.languageVars.appNameCAPS,
    childInvitations,
    invitationType,
    parentInvitation,
    auth.welcomeEmailSent,
    invitationCode,
    onCheckInvitation,
    authType,
    masterId,
    masterProfile,
  ])

  // if (verificationEmailSent) {
  //   return (
  //     <Box className={layoutClasses.pageContainer}>
  //       {loading && <LoadingBackdrop loadingText={pageStatics.messages.loading.authenticating} />}
  //       <Header title={pageStatics.data.titles.signup} />
  //       <Box className={layoutClasses.contentContainer}>
  //         <ConfirmEmailRequest />
  //       </Box>
  //     </Box>
  //   )
  // }

  // if (emailVerified) {
  //   return (
  //     <Box className={layoutClasses.pageContainer}>
  //       {loading && <LoadingBackdrop loadingText={pageStatics.messages.loading.authenticating} />}
  //       <Header title={pageStatics.data.titles.signup} />
  //       <Box className={layoutClasses.contentContainer}>
  //         <ConfirmEmailBlock />
  //       </Box>
  //     </Box>
  //   )
  // }

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(mirrorForm, changeEvent, key)
    setMirrorForm(adjustedForm.adjustedForm)
  }

  const loadMirrorForm = () => {
    const form = Object.keys(mirrorForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={3} className={classes.readPrefContainer}>
          <FormElement
            elementType={mirrorForm[formEl].elementType}
            label={mirrorForm[formEl].elementLabel}
            value={mirrorForm[formEl].value}
            elementOptions={mirrorForm[formEl].elementOptions}
            touched={mirrorForm[formEl].touched}
            valid={mirrorForm[formEl].isValid}
            shouldValidate={mirrorForm[formEl].validtationRules}
            elementSetup={mirrorForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={mirrorForm[formEl].grid}
            disabled={false}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const getMirrorProfile = async () => {
    setMirrorMessage(pageStatics.messages.loading.findProfile)
    setProcessingMirrorAction(true)
    const mirrorFormData = createFormValuesObj(mirrorForm)
    if (mirrorFormData.accountSecret === auth.accountSecret) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.sameAccountCode,
        type: 'error',
      })
      return
    }
    try {
      const isSecretCodeValid = await getCardBySecretCode(mirrorFormData.accountSecret)
      setProcessingMirrorAction(false)
      if (isSecretCodeValid) {
        setMirrorToProfile(isSecretCodeValid)
      } else {
        onSetNotification({
          message: pageStatics.messages.notifications.invalidCode,
          type: 'error',
        })
        return
      }
    } catch (err) {
      setProcessingMirrorAction(false)
      onSetNotification({
        message: pageStatics.messages.notifications.getMirrorProfileFail,
        type: 'error',
      })
    }
  }

  const connectProfile = async () => {
    setShowMirror(true)
    setMirrorMessage(pageStatics.messages.loading.connectprofile)
    setProcessingMirrorAction(true)
    try {
      await disableInvitation(code, mirrorToProfile.userId)
      setMirrorMessage(pageStatics.messages.loading.connectprofileSuccess)
      history.push(`/profile/${mirrorToProfile.urlSuffix}`)
      setProcessingMirrorAction(false)
      onSetNotification({
        message: pageStatics.messages.loading.connectprofileSuccess,
        type: 'success',
      }, 4000)
    } catch (err) {
      setProcessingMirrorAction(false)
      onSetNotification({
        message: pageStatics.messages.notifications.getMirrorProfileFail,
        type: 'error',
      })
    }
  }

  // const connectProfileHandler = () => {
  //   history.push('/connect')
  // }

  const goToLanding = () => {
    history.push('/')
  }

  if (loading) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.authenticating} />
  }

  if (processingMirrorAction) {
    return <LoadingBackdrop loadingText={mirrorMessage} />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Box className={layoutClasses.contentContainer} style={{ paddingTop: 20 }}>
        {validation === 'valid' && auth.authStatus !== 'loggedin' ? (
          <Box className={`${layoutClasses.authContainer} ${authType === 'signup' ? layoutClasses.authContainerSignup : ''}`}>
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
            {authType === 'signup' ? (
              <Box className={authClasses.landingTextContainer}>
                <Typography variant="body1" component="p" align="center" className={authClasses.landingTextOne} style={{ lineHeight: '3.5rem', fontWeight: 700 }}>
                  Welcome
                </Typography>
                <Typography variant="body1" component="p" align="center" className={authClasses.landingTextOne} style={{ lineHeight: '3.5rem' }}>
                  to
                  <span>{language.languageVars.appNameCAPS}</span>
                </Typography>
                <Typography variant="body1" component="p" align="center" className={authClasses.landingTextFour} style={{ marginTop: 20 }}>
                  {pageStatics.data.description.signupPanel}
                </Typography>
              </Box>
            ) : (
              <Box className={authClasses.landingTextContainer}>
                <Typography variant="body1" component="p" align="center" className={authClasses.landingTextOne}>
                  <span>Welcome</span>
                </Typography>
                <Typography variant="body1" component="p" align="center" className={authClasses.landingTextThree}>
                  Back
                </Typography>
                <Typography variant="body1" component="p" align="center" className={authClasses.landingTextFour}>
                  {pageStatics.data.description.loginPanel}
                </Typography>
              </Box>
            )}
            <Box mt={4}>
              <Box mb={2}>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </Box>
            </Box>
            {authType === 'signup' && (
              <Box className={classes.mirrorToProfileWrapper}>
                {showMirror ? (
                  <Box className={`${layoutClasses.panel}`}>
                    <PageTitle
                      title={pageStatics.data.titles.connect}
                      centered
                    />
                    <Box mb={2}>
                      <Typography variant="body1" align="center" component="p" className={layoutClasses.panelText} style={{ textAlign: 'center' }}>
                        {pageStatics.data.description.connectPanel}
                      </Typography>
                    </Box>
                    {mirrorToProfile ? (
                      <Box className={classes.mirrorToProfileContainer}>
                        <InfoBox infoList={[pageStatics.messages.info.connectProfile.first, pageStatics.messages.info.connectProfile.second]} />
                        <List className={classes.mirrorToProfileContent}>
                          <ListItem className={classes.mirrorToProfile}>
                            <ListItemAvatar className={classes.connectionItemAvatarContainer}>
                              <Avatar
                                className={classes.connectionItemAvatar}
                                src={mirrorToProfile.base64Photo ? `data:${mirrorToProfile.base64Photo.type};base64,${mirrorToProfile.base64Photo.code}` : '/assets/images/avatar.svg'}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              disableTypography
                              className={classes.connectionItemTextContainer}
                              primary={(
                                <Box className={classes.connectionName}>
                                  <Typography component="p" variant="body1" className={classes.connectionNameText}>
                                    {`${mirrorToProfile.firstName} ${mirrorToProfile.lastName}`}
                                  </Typography>
                                </Box>
                              )}
                              secondary={(
                                <Box className={classes.connectionDetails}>
                                  <Typography component="p" variant="body1">
                                    {mirrorToProfile.email}
                                  </Typography>
                                </Box>
                              )}
                            />
                          </ListItem>
                        </List>
                        <Button
                          className={buttonClasses.defaultButton}
                          onClick={() => connectProfile()}
                          style={{
                            width: '100%',
                          }}
                        >
                          {pageStatics.buttons.connect}
                        </Button>
                      </Box>
                    ) : (
                      <Box className={classes.mirrorProfileFormContainer}>
                        {loadMirrorForm()}
                        <Button
                          className={buttonClasses.defaultButton}
                          onClick={() => getMirrorProfile()}
                          style={{
                            width: '100%',
                          }}
                        >
                          {pageStatics.buttons.getProfile}
                        </Button>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <span>&nbsp;</span>
                )}
              </Box>
            )}
          </Box>
        ) : (
          <Suspense fallback={language.languageVars.loading}>
            <InvitationBlock validation={validation} />
          </Suspense>
        )}
      </Box>
    </Box>
  )
}

Signup.defaultProps = {
  code: null,
  status: null,
  invitationType: null,
  parentInvitation: null,
  childInvitations: null,
  masterId: null,
}

Signup.propTypes = {
  code: PropTypes.string,
  status: PropTypes.string,
  invitationType: PropTypes.string,
  parentInvitation: PropTypes.string,
  childInvitations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onCheckInvitation: PropTypes.func.isRequired,
  masterId: PropTypes.string,
  onSetNotification: PropTypes.func.isRequired,
  // onClearInvitation: PropTypes.func.isRequired,
  // onClearCard: PropTypes.func.isRequired,
  // onClearCounter: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  code: state.invitations.code,
  status: state.invitations.status,
  invitationType: state.invitations.type,
  parentInvitation: state.invitations.parentInvitation,
  childInvitations: state.invitations.childInvitations,
  masterId: state.invitations.masterId,
})

const mapDispatchToProps = dispatch => ({
  onCheckInvitation: invitationCode => dispatch(actions.checkInvitation(invitationCode)),
  onSetNotification: (notification, duration) => dispatch(actions.setNotification(notification, duration)),
  onClearInvitation: () => dispatch(actions.clearInvitation()),
  onClearCard: () => dispatch(actions.clearCard()),
  onClearCounter: () => dispatch(actions.clearCounter()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
