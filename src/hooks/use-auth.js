import React, {
  useState,
  useEffect,
  useContext,
  createContext,
} from 'react'

import { connect } from 'react-redux'

import { useHistory, useLocation } from 'react-router-dom'

import PropTypes from 'prop-types'

import firebase from 'firebase/app'

import { differenceInDays } from 'date-fns'

// import LoadingBackdrop from '../components/Loading/LoadingBackdrop'

import * as actions from '../store/actions'

import { useLanguage } from './useLang'
import { useColor, useDarkMode } from './useDarkMode'

import { firebaseApp } from '../API/firebase'
import { createUser, getUserById } from '../API/users'
import { getCardById } from '../API/cards'
import { getSubscribedUser, getOneTimeUser } from '../API/subscriptions'
import { getInvitationByCode } from '../API/invitations'

import { defaultSettings } from '../utilities/appVars'

import { createUrlSuffix, generateRandomString } from '../utilities/utils'

const authContext = createContext()

export const useAuth = () => useContext(authContext)

const useProvideAuth = () => {
  const history = useHistory()
  const color = useColor()
  const { switchTheme } = useDarkMode()
  const [user, setUser] = useState(null)
  const [userExist, setUserExist] = useState(false)
  const [emailVerified, setEmailVerified] = useState(false)
  const [verifyEmailSent, setVerifyEmailSent] = useState(false)
  const [authStatus, setAuthStatus] = useState('starting')
  const [adminStatus, setAdminStatus] = useState(false)
  const [superAdminStatus, setSuperAdminStatus] = useState(false)
  const [isSubscriber, setIsSubscriber] = useState(false)
  const [isBoarded, setIsBoarded] = useState(false)
  const [subscriberStatus, setSubscriberStatus] = useState(false)
  const [subscriberData, setSubscriberData] = useState(false)
  const [loginError, setLoginerror] = useState(null)
  const [userUrlSuffix, setUserUrlSuffix] = useState(null)
  const [welcomeEmailSent, setWelcomeEmailSent] = useState(false)
  const [accountSecret, setAccountSecret] = useState(null)
  const [isProfileActive, setIsProfileActive] = useState(true)
  const [createdOn, setCreatedOn] = useState(null)
  const [isAdminCreated, setIsAdminCreated] = useState(false)
  const [isTheLoggedinUser, setIsTheLoggedinUser] = useState(true)
  const [hasTrialPeriod, setHasTrialPeriod] = useState(false)
  const [inTrial, setInTrial] = useState(false)
  const [trialEndsIn, setTrialEndsIn] = useState(null)
  const [isMaster, setIsMaster] = useState(false)
  const [isMasterLocked, setIsMasterLocked] = useState(false)
  const [invitationNumber, setInvitationNumber] = useState(null)
  const [productId, setProductId] = useState(null)
  const [alwaysPro, setAlwaysPro] = useState(null)
  const [withCards, setWithCards] = useState(false)

  const authenticate = () => firebaseApp.auth().onAuthStateChanged(authUser => {
    if (authUser) {
      setUser(authUser)
      return authUser
    }

    return false
  })

  const logout = () => firebaseApp.auth().signOut().then(() => {
    setUser(null)
    setAuthStatus('failed')
    setUserExist(true)
    setAdminStatus(false)
    setSuperAdminStatus(false)
  })

  const confirmLogin = () => {
    setEmailVerified(true)
    setAuthStatus('loggedin')
  }

  const resendVerificationEmail = () => {
    firebaseApp.auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        try {
          await authUser.sendEmailVerification()
          setVerifyEmailSent(false)
        } catch (err) {
          throw new Error(err.message)
        }
      }
    })
  }

  // const refreshAuthToken = async () => {
  //   try {
  //     const idToken = await firebaseApp.auth().currentUser.getIdToken(true)
  //     console.log(idToken);
  //     const refreshedUser = await firebaseApp.auth().signInWithCustomToken(idToken)
  //     console.log('Auth token refreshed for user', refreshedUser.uid)
  //   } catch (err) {
  //     throw new Error(err.message)
  //   }
  // }

  const getTokenClaims = async () => {
    try {
      await firebaseApp.auth().currentUser.getIdToken(true)
      const idToken = await firebaseApp.auth().currentUser.getIdTokenResult()
      const tokenClaims = idToken.claims.claims
      return tokenClaims
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const updateMasterClaim = masterStatus => {
    setIsMaster(masterStatus)
  }

  const updateInvitationCode = invCode => {
    setInvitationNumber(invCode)
  }

  const refreshToken = async () => {
    try {
      await firebaseApp.auth().currentUser.getIdToken(true)
    } catch (err) {
      throw new Error(err.message)
    }
  }

  const resetPassword = async email => {
    try {
      await firebaseApp.auth().sendPasswordResetEmail(email)
    } catch (err) {
      throw new Error(err)
    }
  }

  const resetEmail = async email => {
    const reqUser = firebaseApp.auth().currentUser
    try {
      await reqUser.updateEmail(email)
      await reqUser.sendEmailVerification()
    } catch (err) {
      if (err.code === 'auth/requires-recent-login') {
        alert('This operation is sensitive and requires recent authentication. Log out then log in again before retrying this request.')
      } else if (err.code === 'auth/email-already-in-use') {
        alert('The new email used is already linked to a different Tappl account. Please use a different email address.')
      }
      throw new Error(err)
    }
  }

  const reauthenticate = currentPassword => {
    const { currentUser } = firebaseApp.auth()
    const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, currentPassword);
    return user.reauthenticateWithCredential(cred)
  }

  const changePassword = async (currentPassword, newPassword) => {
    const { currentUser } = firebaseApp.auth()
    try {
      await reauthenticate(currentPassword)
      await currentUser.updatePassword(newPassword)
      return { status: 'success' }
    } catch (err) {
      return { status: 'failure', error: err.code }
    }
  }

  const changeEmail = async (currentPassword, newEmail) => {
    const { currentUser } = firebaseApp.auth()
    try {
      await reauthenticate(currentPassword)
      await currentUser.updateEmail(newEmail)
      return { status: 'success' }
    } catch (err) {
      return { status: 'failure', error: err.code }
    }
  }

  const updateProClaim = isPro => {
    setAlwaysPro(isPro)
    setIsSubscriber(isPro)
  }

  useEffect(() => {
    setAuthStatus('processing')
    const unsubscribe = firebaseApp.auth().onAuthStateChanged(async authUser => {
      if (authUser) {
        await firebase.auth().currentUser.getIdToken(true)
        const idToken = await authUser.getIdTokenResult()
        const tokenClaims = idToken.claims.claims
        const alwaysProClaim = tokenClaims && tokenClaims.alwaysPro
        setIsMaster(tokenClaims && tokenClaims.isMaster ? tokenClaims.isMaster : false)
        setAdminStatus(tokenClaims ? tokenClaims.admin : false)
        setSuperAdminStatus(tokenClaims ? tokenClaims.superAdmin : false)

        try {
          const userCardExists = await getUserById(authUser.uid)
          let urlSuffix
          let generatedAccountSecret = null
          if (userCardExists) {
            const adminUser = userCardExists.method === 'admin'
            let subscriber
            if (alwaysProClaim) {
              subscriber = [
                {
                  role: 'subscriber',
                  status: 'active',
                },
              ]
            } else {
              subscriber = await getSubscribedUser(authUser.uid) || await getOneTimeUser(authUser.uid)
            }
            if (subscriber && !adminUser) {
              setSubscriberStatus(subscriber[0].status)
              setSubscriberData(subscriber[0])
              if (subscriber[0].trial_end) {
                const daysCreated = differenceInDays(subscriber[0].trial_end.toDate(), new Date())
                setTrialEndsIn(daysCreated)
                setInTrial(subscriber[0].status === 'trialing')
                setHasTrialPeriod(true)
              }
            }
            if (adminUser) {
              setIsAdminCreated(true)
              setSubscriberStatus('active')
              setSubscriberData({
                role: 'subscriber',
                status: 'active',
              })
            }
            const userCard = await getCardById(authUser.uid)
            if (userCard) {
              let profileMainColor = userCard.settings ? userCard.settings.selectedColor : defaultSettings.selectedColor
              let profileTheme = userCard.settings ? userCard.settings.theme : defaultSettings.theme
              let activeProfile = null
              if (
                userCard.activeProfileId
                && userCard.activeProfileId !== authUser.uid
                && (subscriber ? subscriber[0].status === 'trialing' || subscriber[0].status === 'active' : false)
              ) {
                activeProfile = await getCardById(userCard.activeProfileId)
                profileMainColor = activeProfile.settings ? activeProfile.settings.selectedColor : defaultSettings.selectedColor
                profileTheme = activeProfile.settings ? activeProfile.settings.theme : defaultSettings.theme
              }
              if (userCard.masterInvitationId) {
                const { usedBy } = await getInvitationByCode(userCard.masterInvitationId)
                const masterCard = await getCardById(usedBy)
                profileMainColor = masterCard.settings ? masterCard.settings.selectedColor : defaultSettings.selectedColor
                profileTheme = masterCard.settings ? masterCard.settings.theme : defaultSettings.theme
              } else if (userCard.masterProfileId) {
                const masterCard = await getCardById(userCard.masterProfileId)
                profileMainColor = masterCard.settings ? masterCard.settings.selectedColor : defaultSettings.selectedColor
                profileTheme = masterCard.settings ? masterCard.settings.theme : defaultSettings.theme
              }
              color.switchColor(profileMainColor)
              switchTheme(profileTheme)
              setIsTheLoggedinUser(userCard.defaultId === authUser.uid)
              generatedAccountSecret = userCard.accountSecret
              urlSuffix = userCard.urlSuffix
              setUserExist(true)

              const accountCreatedOn = userCardExists.created
              setCreatedOn(accountCreatedOn)

              setIsBoarded(userCardExists.settings.boarded)
              // setIsMaster(userCard.isMaster)
              setUserUrlSuffix(userCard.urlSuffix)
              setIsMasterLocked(userCard.masterLocked)
              setInvitationNumber(userCard.invitationData.code)
              setProductId(userCard.invitationData.productId || (userCardExists && userCardExists.settings && userCardExists.settings.shopData ? userCardExists.settings.shopData.productId : null))
            } else {
              setUserExist(true)
              setIsBoarded(false)
              setUserUrlSuffix(userCardExists.urlSuffix)
              setIsMaster(!userCardExists.accountType)
            }
          } else {
            const createdSuffix = await createUrlSuffix(authUser.displayName)
            generatedAccountSecret = generateRandomString(4)
            urlSuffix = `${createdSuffix.urlSuffix}`
            setUserUrlSuffix(urlSuffix)
            setUserExist(false)
          }
          await createUser(
            authUser.uid,
            authUser.email,
            authUser.displayName,
            urlSuffix,
            'invitation',
            null,
            '',
            '',
            '',
            new Date(),
            new Date(),
            null,
            generatedAccountSecret,
          )
          // const subscriberClaim = idToken.claims.stripeRole
          // setIsSubscriber((!!(subscriberClaim && subscriberClaim === 'subscriber')))
          setIsSubscriber(true)
          setAlwaysPro(alwaysProClaim)
          if (userCardExists && userCardExists.method === 'admin') {
            setIsSubscriber(true)
            setIsMaster(true)
          }

          if (userCardExists && authUser.providerData[0].providerId === 'password' && !authUser.emailVerified) {
            setEmailVerified(false)
            setVerifyEmailSent(false)
          } else {
            setEmailVerified(true)
            setVerifyEmailSent(true)
          }
          setWelcomeEmailSent(false)
          setUser(authUser)
          setAuthStatus('prelogin')
          setTimeout(() => setAuthStatus('loggedin'), 1000)
          setAccountSecret(generatedAccountSecret || null)
          setIsProfileActive(userCardExists ? userCardExists.settings.active : true)
          setWithCards(userCardExists && userCardExists.settings && userCardExists.settings.shopData && userCardExists.settings.shopData.cardsIncluded)
        } catch (err) {
          setLoginerror(err.message)
          setAuthStatus('failed')
          setUserUrlSuffix(null)
        }
      } else {
        setUser(null)
        setIsTheLoggedinUser(false)
        color.switchColor(defaultSettings.selectedColor)
        setAuthStatus('failed')
        setUserUrlSuffix(null)
      }
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return {
    user,
    emailVerified,
    verifyEmailSent,
    authStatus,
    adminStatus,
    superAdminStatus,
    subscriberStatus,
    isSubscriber,
    isBoarded,
    loginError,
    authenticate,
    resendVerificationEmail,
    refreshToken,
    updateMasterClaim,
    updateInvitationCode,
    // refreshAuthToken,
    getTokenClaims,
    logout,
    confirmLogin,
    resetPassword,
    resetEmail,
    userUrlSuffix,
    userExist,
    welcomeEmailSent,
    changePassword,
    changeEmail,
    accountSecret,
    isProfileActive,
    createdOn,
    subscriberData,
    isAdminCreated,
    isTheLoggedinUser,
    inTrial,
    trialEndsIn,
    hasTrialPeriod,
    isMaster,
    isMasterLocked,
    invitationNumber,
    productId,
    alwaysPro,
    updateProClaim,
    withCards,
  }
}

const ProvideAuth = ({
  children, onSetNotification, onLoadCardByUserId, card,
}) => {
  const auth = useProvideAuth()
  const { isMaster } = auth
  const language = useLanguage()
  const location = useLocation()
  const history = useHistory()

  const [loading, setLoading] = useState(false)

  // const isPublicPage = location.pathname.includes('auth')
  // || location.pathname.includes('welcome')
  // || location.pathname.includes('welcomeMember')
  // || location.pathname.includes(userUrlSuffix)
  // || location.pathname.includes('activate')
  // || location.pathname.includes('onboard')
  // || location.pathname.includes('login')
  // || location.pathname.includes('createAccount')
  // || location.pathname.includes('subscribe')
  // || location.pathname === '/'

  const isPrivateRoute = location.pathname.includes('subscriberThanks')
  || location.pathname.includes('welcome')
  || location.pathname.includes('welcomeMember')
  || location.pathname.includes('patches')
  || location.pathname.includes('invitationsAdmin')
  || location.pathname.includes('users')
  || location.pathname.includes('info')
  || location.pathname.includes('contact')
  || location.pathname.includes('picture')
  || location.pathname.includes('logo')
  || location.pathname.includes('links')
  || location.pathname.includes('bio')
  || location.pathname.includes('changePassword')
  || location.pathname.includes('settings')
  || location.pathname.includes('connections')
  || location.pathname.includes('connectionTags')
  || location.pathname.includes('connectionForm')
  || location.pathname.includes('qrcode')
  || location.pathname.includes('share')
  || location.pathname.includes('analytics')
  || location.pathname.includes('impact')
  || location.pathname.includes('privacyPolicy')
  || location.pathname.includes('myTeam')
  || (auth.user && location.pathname.includes(auth.userUrlSuffix))

  const masterPages = location.pathname.includes('connectionForm')
  || location.pathname.includes('connectionTags')
  || location.pathname.includes('picture')
  || location.pathname.includes('bio')
  || location.pathname.includes('links')
  || location.pathname.includes('subscriberThanks')
  // || location.pathname.includes('settings')
  || location.pathname.includes('qrcode')
  || location.pathname.includes('privacy')
  || location.pathname.includes('myTeam')

  const x = auth && auth.user && auth.user.uid === card.defaultId

  useEffect(() => {
    let mounted = true

    if ((mounted && auth.authStatus === 'loggedin' && isPrivateRoute && (!card.userId || !x)) || (mounted && !auth.isTheLoggedinUser && isPrivateRoute)) {
      (async () => {
        setLoading(true)
        await onLoadCardByUserId(auth.user.uid, isMaster)
        setTimeout(() => setLoading(false), 1000)
      })()
    }
    if (auth.userUrlSuffix && (auth.isMasterLocked || (!isMaster && masterPages))) {
      history.push(`/${auth.userUrlSuffix}`)
    }

    return () => { mounted = false }
  }, [
    auth.authStatus,
    auth.user,
    auth.isTheLoggedinUser,
    auth.isMasterLocked,
    auth.userUrlSuffix,
    isPrivateRoute,
    masterPages,
    isMaster,
    card.userId,
    x,
    onLoadCardByUserId,
    history,
  ])

  if (auth.authStatus === 'failed' && auth.loginError === 'Failed to get document because the client is offline.') {
    onSetNotification({
      message: language.languageVars.pages.auth.messages.notifications.clientOffline,
      type: 'error',
    })
  }
  auth.loadingAuth = auth.authStatus === 'processing' || loading
  return (
    <authContext.Provider value={auth}>
      {/* {(auth.authStatus === 'processing' || loading) && <LoadingBackdrop done={loadingDone} loadingText="&nbsp;" boxed />} */}
      {children}
    </authContext.Provider>
  )
}
const mapStateToProps = state => ({
  card: state.cards,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCardByUserId: (userId, isMaster) => dispatch(actions.loadCardByUserId(userId, isMaster)),
})

ProvideAuth.defaultProps = {
  card: null,
}

ProvideAuth.propTypes = {
  children: PropTypes.node.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onLoadCardByUserId: PropTypes.func.isRequired,
  card: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default connect(mapStateToProps, mapDispatchToProps)(ProvideAuth)
