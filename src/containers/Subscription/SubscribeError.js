import React, {
  useEffect, useState,
} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import 'firebase/auth'

import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import HomeIcon from '@material-ui/icons/Home'
import { Logo } from '../../layout/CustomIcons'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'

import { deleteUserById } from '../../API/users'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

import { layoutStyles } from '../../theme/layout'
import { authStyles } from '../Auth/styles'
import { buttonStyles } from '../../theme/buttons'
import { onboardingStyles } from '../../components/Onboarding/styles'

const SubscribeError = ({ onSetNotification }) => {
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  const layoutClasses = layoutStyles()
  const onBoardingClasses = onboardingStyles()
  const buttonClasses = buttonStyles()
  const authClasses = authStyles()

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    if (mounted) {
      (async () => {
        try {
          // let invitationMaster = null
          if (auth.user && auth.user.uid) {
            setLoading(true)
            await deleteUserById(auth.user.uid)
            await auth.user.delete()
            auth.logout()
            setLoading(false)
          }
        } catch (err) {
          onSetNotification({
            message: pageStatics.messages.notifications.CreateAccountFail,
            type: 'error',
          })
        }
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    auth.user,
  ])

  const goToLanding = () => {
    history.push('/')
  }

  // const goToLogin = () => {
  //   history.push(vars.LOGIN_PAGE)
  // }

  // const goToConnectCard = () => {
  //   history.push(vars.CONNECT_ACCOUNT_PAGE)
  // }

  if (loading || (auth.user && auth.user.uid)) {
    return <LoadingBackdrop loadingText={pageStatics.messages.loading.processing} boxed />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Box className={layoutClasses.contentContainer} style={{ paddingTop: 20 }}>
        <Box className={`${layoutClasses.authContainer} ${layoutClasses.authContainerSignup}`}>
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
          {/* <Box className={authClasses.landingTextContainer}>
            <Typography variant="body1" component="p" align="center" className={authClasses.landingTextOne} style={{ lineHeight: '3.5rem', fontWeight: 700 }}>
              {pageStatics.data.titles.welcome.first}
            </Typography>
            <Typography variant="body1" component="p" align="center" className={authClasses.landingTextOne} style={{ lineHeight: '3.5rem' }}>
              {pageStatics.data.titles.welcome.second}
              <span>{pageStatics.data.titles.welcome.third}</span>
            </Typography>
            <Typography variant="body1" component="p" align="center" className={authClasses.landingTextFour} style={{ marginTop: 20 }}>
              {pageStatics.data.description.signupPanel}
            </Typography>
          </Box> */}
          <Box className={authClasses.landingTextContainerSlim}>
            <Typography variant="body1" component="p" align="center">
              {pageStatics.data.titles.errorSlim.first}
            </Typography>

            <Box className={authClasses.descriptionText}>
              <Typography variant="body1" component="p" align="center">
                {pageStatics.data.description.signupPanelMasterFailed}
              </Typography>
            </Box>
          </Box>
          <Box className={`${onBoardingClasses.stepbuttonsContainer} ${onBoardingClasses.stepbuttonsContainerFull}`}>
            <Button
              onClick={() => goToLanding()}
              className={buttonClasses.defaultButton}
            >
              {pageStatics.buttons.startOver}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

SubscribeError.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  priceId: state.createAccountProcessor.priceId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeError)
