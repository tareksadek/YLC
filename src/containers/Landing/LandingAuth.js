import React, {
  useEffect, useState, Suspense, lazy,
} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import firebase from 'firebase/app'
import 'firebase/auth'

import { Redirect, useHistory } from 'react-router-dom'
import { useTheme } from '@material-ui/core/styles'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import emailjs from 'emailjs-com'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { Logo } from '../../layout/CustomIcons'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { getInvitationByCode, disableInvitation, disableChildInvitation } from '../../API/invitations'
import { createUserCard, disableChildInvitationInParent } from '../../API/cards'
import { createUserCounter, getCounterById } from '../../API/counter'
import {
  deleteUserById, updateLoginDates, updateUserSettings,
} from '../../API/users'
import { getFirebaseStorage } from '../../API/firebase'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { breakName, capitalizeFirst, generateVcard } from '../../utilities/utils'

import { MAILJS_CONFIG } from '../../utilities/appVars'

import { layoutStyles } from '../../theme/layout'

import * as actions from '../../store/actions'

const InvitationBlock = lazy(() => import('../../components/Auth/InvitationBlock'))

const LandingAuth = ({
  code, status, masterId, invitationType, parentInvitation, childInvitations, onCheckInvitation,
}) => {
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth
  const authType = window.localStorage.getItem('authType')
  const authTitle = authType === 'signup' ? pageStatics.data.titles.signup : pageStatics.data.titles.signin
  const defaultTheme = useTheme()

  const invitationCode = window.localStorage.getItem('invitationCode')

  const layoutClasses = layoutStyles()

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: `${authTitle} with E-mail`,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: `${authTitle} with Google`,
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  }

  const [validation, setValidation] = useState('valid')
  const [loading, setLoading] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      (async () => {
        let currentStatus = status
        if (!currentStatus && invitationCode && authType === 'signup') {
          const storageStatus = await onCheckInvitation(invitationCode.trim())
          currentStatus = storageStatus.status
        }

        // if (auth.authStatus === 'loggedin' && auth.user && auth.userExist && auth.authStatus !== 'failed') {
        //   history.push(`/profile/${auth.userUrlSuffix}`)
        //   return
        // }
        if ((auth.authStatus === 'loggedin' || auth.authStatus === 'blocked') && auth.user && !auth.userExist && status !== 'valid') {
          setLoading(true)
          if (auth.user) {
            await deleteUserById(auth.user.uid)
            await auth.user.delete()
          }
          setValidation(status)
          setLoading(false)
        }

        if (auth.authStatus === 'loggedin' && auth.user && !auth.userExist && status === 'valid') {
          setLoading(true)
          const userNameObj = breakName(auth.user.displayName)
          const templateParams = {
            fromName: language.languageVars.appAppr,
            firstName: capitalizeFirst(userNameObj.firstName),
            toEmail: auth.user.email,
            editProfileLink: `${language.languageVars.appEditProfileURL}/${auth.user.uid}/edit`,
            learnConnectTapplLink: `${language.languageVars.appDomain}/activate`,
            tapplCodesLink: `${language.languageVars.appDomain}/invitations`,
          }
          const cardDetails = {
            firstName: userNameObj.firstName || '',
            lastName: userNameObj.lastName || '',
            email: auth.user.email,
          }
          const vCardFile = generateVcard(cardDetails, null, `${language.languageVars.appNameCAPS}_${auth.userUrlSuffix}.vcf`, null, null)
          cardDetails.vCardFile = vCardFile.name
          const metaData = {
            contentDisposition: 'attachment',
            filename: vCardFile.name,
            contentType: 'text/vcard',
          }
          const profileData = {
            firstName: userNameObj.firstName,
            lastName: userNameObj.lastName,
            userId: auth.user.uid,
            email: auth.user.email,
            urlSuffix: auth.userUrlSuffix,
          }
          const invitationData = {
            method: 'invitation',
            code,
            parentInvitation,
            childInvitations,
            masterId,
          }
          await getFirebaseStorage().ref(`/card/${vCardFile.name}`).put(vCardFile, metaData)
          await createUserCard(
            profileData,
            invitationData,
            auth.accountSecret,
            vCardFile.name,
          )
          await createUserCounter(auth.userUrlSuffix, auth.user.uid)
          await disableInvitation(code, auth.user.uid)

          if (invitationType === 'child') {
            const parentInvitationData = await getInvitationByCode(parentInvitation)
            const parentCardId = parentInvitationData.usedBy
            await disableChildInvitationInParent(parentCardId, code, auth.user.uid)
            await disableChildInvitation(parentInvitation, code, auth.user.uid)
            await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeChildTemplateId, templateParams, MAILJS_CONFIG.userId)
          } else if (invitationType === 'single') {
            await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeChildTemplateId, templateParams, MAILJS_CONFIG.userId)
          } else {
            await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.welcomeCorporateTemplateId, templateParams, MAILJS_CONFIG.userId)
          }
          await updateUserSettings(auth.user.uid, invitationType, code)
          await updateLoginDates(auth.user.uid)
          setValidation(currentStatus)
          setLoading(false)
          if (auth.vCardFileExists) {
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

        if (auth.authStatus === 'loggedin' && auth.user && auth.userExist) {
          setLoading(true)
          const counter = await getCounterById(auth.user.uid)
          if (!counter) {
            await createUserCounter(auth.userUrlSuffix, auth.user.uid)
          }
          await updateLoginDates(auth.user.uid)
          if (auth.vCardFileExists) {
            setDataLoaded(true)
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
      })()
    }

    return () => { mounted = false }
  }, [
    auth.user, auth.authStatus,
    auth.userExist, auth.emailVerified,
    auth.verifyEmailSent,
    auth.userUrlSuffix,
    auth.vCardFileExists,
    auth.accountSecret,
    status,
    code,
    history,
    language.languageVars.appAppr,
    language.languageVars.appAdmin,
    language.languageVars.appDomain,
    language.languageVars.appEditProfileURL,
    language.languageVars.appNameCAPS,
    childInvitations,
    invitationType,
    parentInvitation,
    auth.welcomeEmailSent,
    invitationCode,
    onCheckInvitation,
    authType,
    masterId,
  ])
  // if (!auth.user && !code) {
  //   console.log('noinv');
  //   return (
  //     <Box>
  //       <Typography component="p" variant="body1">
  //         Could not authenticate user
  //       </Typography>
  //       <Typography component="p" variant="body1">
  //         You need an invitation to create a GCV account
  //       </Typography>
  //       <Button size="small" onClick={() => true}>
  //         Enter invitation code
  //       </Button>
  //       <Button size="small" onClick={() => true}>
  //         Contact us
  //       </Button>
  //     </Box>
  //   )
  // }

  // if (validation !== 'valid') {
  //   console.log('invalid');
  //   console.log(validation);
  //   return (
  //     <Box className={classes.loadingOverlay}>
  //       <LoadingBackdrop loadingText={language.languageVars.authenticating} />
  //     </Box>
  //   )
  // }

  // if (!auth.user && status === 'invalid') {
  //   console.log('invalid');
  //   auth.user.delete()
  //   return (
  //     <Box>
  //       <Typography component="p" variant="body1">
  //         Could not authenticate user
  //       </Typography>
  //       <Typography component="p" variant="body1">
  //         The invitation code used is not valid
  //       </Typography>
  //       <Button size="small" onClick={() => true}>
  //         Enter invitation code
  //       </Button>
  //       <Button size="small" onClick={() => true}>
  //         Contact us
  //       </Button>
  //     </Box>
  //   )
  // }
  //
  // if (code && status !== 'valid') {
  //   console.log(auth.invitationCodeStatus);
  //   return (
  //     <Box>
  //       <Typography component="p" variant="body1">
  //         Could not authenticate user
  //       </Typography>
  //       <Typography component="p" variant="body1">
  //         {`Invalid code. The code entered is ${status}`}
  //       </Typography>
  //       <Button size="small" onClick={() => true}>
  //         Enter invitation code
  //       </Button>
  //       <Button size="small" onClick={() => true}>
  //         Contact us
  //       </Button>
  //     </Box>
  //   )
  // }

  if (dataLoaded) {
    return <Redirect to={`/profile/${auth.userUrlSuffix}`} />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop loadingText={pageStatics.messages.loading.authenticating} />}
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.landingLogo}>
          <Logo fill={defaultTheme.palette.background.reverse} className={layoutClasses.logo} />
          <Typography component="p" variant="body1" className={layoutClasses.appSlogan}>
            {language.languageVars.appSlogan}
          </Typography>
        </Box>
        {validation === 'valid' ? (
          <Box className={layoutClasses.authContainer}>
            <Suspense fallback={pageStatics.messages.loading.loadingAuth}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Suspense>
          </Box>
        ) : (
          <Suspense fallback={pageStatics.messages.loading.loadingAuth}>
            <InvitationBlock validation={validation} />
          </Suspense>
        )}
      </Box>
    </Box>
  )
}

LandingAuth.defaultProps = {
  code: null,
  status: null,
  invitationType: null,
  parentInvitation: null,
  childInvitations: null,
  masterId: null,
}

LandingAuth.propTypes = {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(LandingAuth)
