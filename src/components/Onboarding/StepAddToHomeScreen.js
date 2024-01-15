import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useWizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

// import InfoBox from '../Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import { onboardingStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const StepAddToHomeScreen = ({
  onLoadCard, onUpdate, isMaster, noSubscription,
}) => {
  const classes = onboardingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding

  const isSafari = !!navigator.userAgent.match(/Version\/[\d.]+.*Safari/)
  const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream

  const {
    previousStep, isFirstStep, activeStep,
  } = useWizard()

  const currentStep = isMaster && !noSubscription ? activeStep : activeStep + 1

  const goToProfile = async e => {
    e.preventDefault()
    await onUpdate(e)
    // console.log(auth);
    // await auth.refreshToken()
    // console.log(auth);
    await onLoadCard(auth.user.uid, isMaster)
    history.push(`/${auth.userUrlSuffix}`)
  }

  return (
    <>
      {isMaster ? (
        <Box className={classes.wizardSubtitleContainer} mb={4}>
          <Typography variant="body1" align="left" component="p" className={classes.onboardingHeaderSubtitle}>
            {pageStatics.data.titles.wizardSubtitleCompany}
          </Typography>
        </Box>
      ) : (
        <Box className={classes.wizardSubtitleContainer} mb={4}>
          <Typography variant="body1" align="left" component="p" className={classes.onboardingHeaderSubtitle}>
            {pageStatics.data.titles.wizardSubtitle}
          </Typography>
        </Box>
      )}
      {isMaster ? (
        <Stepper activeStep={noSubscription ? activeStep : activeStep - 1} className={classes.stepsBar}>
          <Step><StepLabel>1</StepLabel></Step>
          <Step><StepLabel>2</StepLabel></Step>
          <Step><StepLabel>3</StepLabel></Step>
          <Step><StepLabel>4</StepLabel></Step>
        </Stepper>
      ) : (
        <Stepper activeStep={activeStep} className={classes.stepsBar}>
          <Step><StepLabel>1</StepLabel></Step>
          <Step><StepLabel>2</StepLabel></Step>
          <Step><StepLabel>3</StepLabel></Step>
        </Stepper>
      )}
      <Box className={`${layoutClasses.panel} ${layoutClasses.transPanel} ${layoutClasses.onboardingPanel}`}>
        <PageTitle
          title={`${currentStep}. ${pageStatics.data.titles.stepAddToHomeScreen}`}
        />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.stepAddToHomeScreen.second}
          </Typography>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText} style={{ textAlign: 'center', marginTop: 16 }}>
            {pageStatics.data.description.stepAddToHomeScreen.first}
          </Typography>
        </Box>
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
        {/* <Box mb={2} mt={2}>
          <Typography variant="body1" align="center" component="p" className={layoutClasses.panelText} style={{ textAlign: 'center' }}>
            {pageStatics.data.description.stepAddToHomeScreen.second}
          </Typography>
        </Box> */}
      </Box>
      {
        // <Box mt={3}>
        //   <InfoBox infoList={[pageStatics.messages.info.stepThree.first]} />
        // </Box>
      }
      <Box className={classes.stepbuttonsContainer}>
        <Button
          onClick={() => previousStep()}
          disabled={isFirstStep}
          className={`${buttonClasses.defaultButton} ${classes.prevButton}`}
        >
          {pageStatics.buttons.prevStep}
        </Button>
        <Button
          onClick={e => goToProfile(e)}
          className={`${buttonClasses.defaultButton} ${classes.nextButton}`}
        >
          {pageStatics.buttons.lastStep}
        </Button>
        {/* <Box className={classes.onboardingIndicator}>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span className={classes.selected}>&nbsp;</span>
        </Box> */}
      </Box>
    </>
  )
}

StepAddToHomeScreen.defaultProps = {
  isMaster: false,
  noSubscription: false,
}

StepAddToHomeScreen.propTypes = {
  onLoadCard: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  isMaster: PropTypes.bool,
  noSubscription: PropTypes.bool,
}

export default StepAddToHomeScreen
