import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

import * as actions from '../../store/actions'

const AddToHomeScreen = ({ onLoadCardByUserId }) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const history = useHistory()

  const isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  const goToProfile = async () => {
    await onLoadCardByUserId(auth.user.uid, auth.isMaster)
    history.push(`/${auth.userUrlSuffix}`)
  }

  return (
    <>
      <Box>
        <Box mt={2}>
          <Typography variant="body1" component="h3" className={layoutClasses.addToHomeScreenHeaderTitle}>
            {pageStatics.data.titles.addToHomeScreen}
            <span>{pageStatics.data.titles.addToHomeScreenSubtitle}</span>
          </Typography>
        </Box>
        <Box className={`${layoutClasses.panel}`} mt={3}>
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* <img
              className={layoutClasses.addToHomeScreenImage}
              src={isSafari || iOS ? '/assets/images/add_to_home_screen_ios.jpg' : '/assets/images/add_to_home_screen_android.jpg'}
              alt={language.languageVars.appNameCAPS}
            /> */}
            {
              isSafari || iOS ? (
                <video
                  src="/assets/images/add_to_home_screen_iphone.mp4"
                  height="480"
                  width="270"
                  controls
                  playsInline
                >
                  {pageStatics.data.installPWA.first}
                </video>
              ) : (
                <video
                  src="/assets/images/add_to_home_screen_android.webm"
                  height="480"
                  width="270"
                  preload="auto"
                  controls
                  playsInline
                  muted
                  loop
                >
                  {pageStatics.data.installPWA.first}
                </video>
              )
            }
          </Box>
        </Box>
        <Box mt={2}>
          <Typography variant="body1" component="p" className={layoutClasses.addToHomeScreenHeaderSubtitle}>
            {pageStatics.data.description.addToHomeScreen}
          </Typography>
        </Box>
      </Box>
      <Box className={`${layoutClasses.stepbuttonsContainer} ${layoutClasses.stepbuttonsContainerFull}`}>
        <Button
          onClick={() => goToProfile()}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.continueToProfile}
        </Button>
      </Box>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  onLoadCardByUserId: (userId, isMaster) => dispatch(actions.loadCardByUserId(userId, isMaster)),
})

AddToHomeScreen.propTypes = {
  onLoadCardByUserId: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AddToHomeScreen)
