import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import firebase from 'firebase/app'
import 'firebase/auth'

import { useHistory } from 'react-router-dom'

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import HomeIcon from '@material-ui/icons/Home'
import { Logo } from '../../layout/CustomIcons'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import {
  updateLoginDates, deleteUserById,
} from '../../API/users'

import * as actions from '../../store/actions'
import {
  settings, CREATE_ACCOUNT_PAGE, SUBSCRIBE_PAGE,
} from '../../utilities/appVars'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { authStyles } from './styles'

const Login = ({ onSetNotification }) => {
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const authClasses = authStyles()

  const [loading, setLoading] = useState(false)

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: pageStatics.buttons.loginWithEmail,
        disableSignUp: {
          status: true,
          helpLink: language.languageVars.supportPage,
        },
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: pageStatics.buttons.loginWithGoogle,
        disableSignUp: {
          status: true,
          helpLink: language.languageVars.supportPage,
        },
      },
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => {
        setLoading(true)
        return false
      },
      // signInFailure: error => {
      //   // Some unrecoverable error occurred during sign-in.
      //   // Return a promise when error handling is completed and FirebaseUI
      //   // will reset, clearing any UI. This commonly occurs for error code
      //   // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
      //   // occurs. Check below for more details on this.
      //   console.log('lklklk');
      //   console.log(error);
      // },
    },
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      (async () => {
        try {
          if (auth.authStatus === 'loggedin' && auth.user && auth.userExist) {
            setLoading(true)
            await updateLoginDates(auth.user.uid)
            if ((!auth.isSubscriber || (auth.subscriberStatus !== 'active' || auth.subscriberStatus !== 'succeeded')) && !settings.onlyInvitations) {
              history.push(SUBSCRIBE_PAGE)
            }
            if ((!auth.isSubscriber || (auth.subscriberStatus !== 'active' || auth.subscriberStatus !== 'succeeded')) && auth.isMaster) {
              // history.push(SUBSCRIBE_PAGE)
              history.push(`/${auth.userUrlSuffix}`)
            }
            if (auth.userExist && auth.isSubscriber) {
              history.push(`/${auth.userUrlSuffix}`)
            }
            if (auth.userExist && settings.onlyInvitations) {
              history.push(`/${auth.userUrlSuffix}`)
            }
          }

          if ((auth.authStatus === 'loggedin' || auth.authStatus === 'blocked') && auth.user && !auth.userExist) {
            setLoading(true)
            await deleteUserById(auth.user.uid)
            await auth.user.delete()
            await auth.logout()
            onSetNotification({
              message: pageStatics.messages.notifications.onlyExistingUsersCanLogin,
              type: 'error',
            })
            setLoading(false)
            history.push(CREATE_ACCOUNT_PAGE)
          }
        } catch (err) {
          onSetNotification({
            message: pageStatics.messages.notifications.loginFail,
            type: 'error',
          })
        }
      })()
    }
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.authStatus,
    auth.isSubscriber,
    auth.subscriberStatus,
    auth.user,
    auth.userExist,
    auth.userUrlSuffix,
    auth.isMaster,
    history,
    onSetNotification,
    pageStatics.messages.notifications.loginFail,
    pageStatics.messages.notifications.onlyExistingUsersCanLogin,
  ])

  const goToCreateAccount = () => {
    history.push(CREATE_ACCOUNT_PAGE)
  }

  const goToLanding = () => {
    history.push('/')
  }

  if (loading) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.authenticating} boxed />
  }

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
              <span>{pageStatics.data.titles.login.first}</span>
            </Typography>
            <Typography variant="body1" component="p" align="center">
              {pageStatics.data.titles.login.second}
            </Typography>
            <Box className={authClasses.descriptionText}>
              <Typography variant="body1" component="p" align="center">
                {pageStatics.data.description.loginPanel}
              </Typography>
            </Box>
          </Box>
          {auth.authStatus !== 'loggedin' && (
            <Box mt={4}>
              <Box className={`${layoutClasses.authContainer}`} mb={2}>
                <StyledFirebaseAuth
                  uiConfig={uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              </Box>
              <Box mt={6}>
                <Button
                  className={buttonClasses.textButton}
                  onClick={() => goToCreateAccount()}
                  style={{
                    margin: '0 auto',
                  }}
                >
                  <b>
                    {pageStatics.buttons.createAccount}
                  </b>
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  )
}

Login.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: (notification, duration) => dispatch(actions.setNotification(notification, duration)),
})

export default connect(null, mapDispatchToProps)(Login)
