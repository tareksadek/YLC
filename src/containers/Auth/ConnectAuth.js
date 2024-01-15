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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

import HomeIcon from '@material-ui/icons/Home'
import { Logo } from '../../layout/CustomIcons'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'

import { disableInvitation } from '../../API/invitations'
import { getCardById } from '../../API/cards'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'
import * as vars from '../../utilities/appVars'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { mirrorStyles, authStyles } from './styles'

const ConnectAuth = ({
  code, onSetNotification,
}) => {
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const authClasses = authStyles()
  const classes = mirrorStyles()

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        fullLabel: 'Login with E-mail',
        disableSignUp: {
          status: true,
          helpLink: language.languageVars.connectCard,
        },
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        fullLabel: 'login with Google',
        disableSignUp: {
          status: true,
          helpLink: language.languageVars.connectCard,
        },
      },
    ],
    callbacks: {
      // eslint-disable-next-line
      signInSuccessWithAuthResult: result => { console.log(result); },
      signInFailure: error => {
        // Some unrecoverable error occurred during sign-in.
        // Return a promise when error handling is completed and FirebaseUI
        // will reset, clearing any UI. This commonly occurs for error code
        // 'firebaseui/anonymous-upgrade-merge-conflict' when merge conflict
        // occurs. Check below for more details on this.
        // eslint-disable-next-line
        console.log(error);
      },
    },
  }

  const [mirrorToProfile, setMirrorToProfile] = useState(null)
  const [processingMirrorActionDone, setProcessingMirrorActionDone] = useState(false)
  const [processingMirrorAction, setProcessingMirrorAction] = useState(false)
  const [mirrorMessage, setMirrorMessage] = useState('Processing...')
  const [mirrorDone, setMirrorDone] = useState(false)

  let panelTitle

  if (mirrorDone) {
    panelTitle = pageStatics.data.titles.connectSubTitleThree
  } else if (mirrorToProfile) {
    panelTitle = pageStatics.data.titles.connectSubTitleTwo
  } else {
    panelTitle = pageStatics.data.titles.connectSubTitle
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      (async () => {
        try {
          if (!code) {
            history.push('/')
          }
          if (auth.authStatus === 'loggedin' && auth.user && auth.userExist) {
            setMirrorMessage(pageStatics.messages.loading.loadingConnectProfile)
            setProcessingMirrorActionDone(false)
            setProcessingMirrorAction(true)
            const connectToUser = await getCardById(auth.user.uid)
            setMirrorToProfile(connectToUser)
            setProcessingMirrorActionDone(true)
            setTimeout(() => setProcessingMirrorAction(false), 1000)
          }
        } catch (err) {
          onSetNotification({
            message: pageStatics.messages.notifications.getMirrorProfileFail,
            type: 'error',
          })
        }
      })()
    }
    return () => { mounted = false }
  }, [
    auth.authStatus,
    auth.user,
    auth.userExist,
    onSetNotification,
    pageStatics.messages.notifications.getMirrorProfileFail,
    pageStatics.messages.loading.loadingConnectProfile,
    code,
    history,
  ])

  const connectProfile = async () => {
    setMirrorMessage(pageStatics.messages.loading.connectprofile)
    setProcessingMirrorActionDone(false)
    setProcessingMirrorAction(true)
    try {
      await disableInvitation(code, mirrorToProfile.userId)
      setMirrorMessage(pageStatics.messages.loading.connectprofileSuccess)
      setMirrorDone(true)
      setProcessingMirrorActionDone(true)
      setTimeout(() => setProcessingMirrorAction(false), 1000)
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

  const cancelConnect = async () => {
    await auth.logout()
    window.localStorage.removeItem('originalTheme')
    window.localStorage.removeItem('theme')
    window.localStorage.removeItem('layout')
    history.push(vars.CREATE_ACCOUNT_PAGE)
  }

  const continueToProfile = () => {
    history.push(`/profile/${mirrorToProfile.urlSuffix}`)
  }

  const goToLanding = () => {
    history.push('/')
  }

  // if (processingMirrorAction) {
  //   return <LoadingBackdrop done={processingMirrorActionDone} loadingText={mirrorMessage} />
  // }

  return (
    <Box className={layoutClasses.pageContainer}>
      {processingMirrorAction && <LoadingBackdrop done={processingMirrorActionDone} loadingText={mirrorMessage} />}
      <Box className={layoutClasses.contentContainer}>
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
        <Box mt={4}>
          {auth.authStatus !== 'loggedin' ? (
            <Alert
              title={pageStatics.data.titles.connectInfo}
              description={pageStatics.data.description.connectInfo}
              type="info"
            />
          ) : (
            <Alert
              title={mirrorDone ? pageStatics.messages.info.connectProfile.doneTitle : pageStatics.data.titles.connectWarning}
              description={mirrorDone ? pageStatics.messages.info.connectProfile.done : pageStatics.data.description.connectWarning}
              type={mirrorDone ? 'success' : 'warning'}
            />
          )}
        </Box>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle
            title={pageStatics.data.titles.connect}
            centered
          />
          <Box mb={2}>
            <Typography variant="body1" align="center" component="p" className={layoutClasses.panelText} style={{ textAlign: 'center' }}>
              {panelTitle}
            </Typography>
          </Box>
          {auth.authStatus !== 'loggedin' ? (
            <Box className={`${layoutClasses.authContainer}`} mb={2}>
              <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </Box>
          ) : (
            <Box className={classes.mirrorToProfileWrapper}>
              <Box>
                {mirrorToProfile && (
                  <Box>
                    <Box mt={2}>
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
                    </Box>
                      {mirrorDone ? (
                        <Button
                          className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                          onClick={() => continueToProfile()}
                          style={{
                            width: '100%',
                          }}
                        >
                          {pageStatics.buttons.continueConnect}
                        </Button>
                      ) : (
                        <Button
                          className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                          onClick={() => connectProfile()}
                          style={{
                            width: '100%',
                          }}
                        >
                          {pageStatics.buttons.connect}
                        </Button>
                      )}
                  </Box>
                )}
              </Box>
            </Box>
          )}
        </Box>
        {!mirrorDone && (
          <Button
            className={buttonClasses.textButton}
            onClick={() => cancelConnect()}
            style={{
              width: '100%',
              minWidth: 'auto',
              marginTop: '8px',
            }}
          >
            {pageStatics.buttons.cancelConnect}
          </Button>
        )}
      </Box>
    </Box>
  )
}

ConnectAuth.defaultProps = {
  code: null,
}

ConnectAuth.propTypes = {
  code: PropTypes.string,
  onSetNotification: PropTypes.func.isRequired,
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
  onSetNotification: (notification, duration) => dispatch(actions.setNotification(notification, duration)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectAuth)
