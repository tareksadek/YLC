import React from 'react'
import PropTypes from 'prop-types'

import { useWizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import FormElement from '../Ui/FormElement'
// import InfoBox from '../Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'

import { useLanguage } from '../../hooks/useLang'

import { socialPlatforms } from '../../utilities/appVars'

import { onboardingStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const StepThree = ({
  inputChangeHandler, inputBlurHandler, linksForm, setLinksForm, loading, isMaster, noSubscription,
}) => {
  const classes = onboardingStyles()
  const buttonClasses = buttonStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const {
    previousStep, nextStep, isFirstStep, activeStep,
  } = useWizard()

  const currentStep = isMaster && !noSubscription ? activeStep : activeStep + 1

  const getPlatformDomain = platform => {
    const socialLinkIndex = socialPlatforms.findIndex(socialPlatfrom => socialPlatfrom.platform === platform)
    const socialLinkDomain = socialPlatforms[socialLinkIndex].domain || ''

    return socialLinkDomain
  }

  const loadStepFormContent = (formElements, setForm) => {
    const form = Object.keys(formElements).map((formEl, i) => {
      const platformDomainExists = getPlatformDomain(formElements[formEl].elementSetup.name)
      let label
      if (platformDomainExists) {
        label = `https://${platformDomainExists}/PROFILE NAME`
      } else if (!platformDomainExists) {
        label = 'https://YOUR URL'
      } else {
        label = pageStatics.forms.socialLinks.labelInactive
      }
      return (
        <FormElement
          elementType={formElements[formEl].elementType}
          label={formElements[formEl].elementLabel}
          value={formElements[formEl].value}
          elementOptions={formElements[formEl].elementOptions}
          touched={formElements[formEl].touched}
          valid={formElements[formEl].isValid}
          errorMessage={formElements[formEl].errorMessage}
          shouldValidate={formElements[formEl].validtationRules}
          elementSetup={{ ...formElements[formEl].elementSetup, placeholder: label }}
          changed={e => inputChangeHandler(e, formEl, formElements, setForm)}
          blured={e => { inputBlurHandler(e, formElements[formEl].elementSetup.name, formEl) }}
          grid={formElements[formEl].grid}
          disabled={loading}
          key={formEl + i}
        />
      )
    })

    return form
  }

  return (
    <>
      {isMaster && (
        <Box className={classes.wizardSubtitleContainer} mb={4}>
          <Typography variant="body1" align="left" component="p" className={classes.onboardingHeaderSubtitle}>
            {pageStatics.data.titles.wizardSubtitleCompany}
          </Typography>
        </Box>
      )}
      <Stepper activeStep={noSubscription ? activeStep : activeStep - 1} className={classes.stepsBar}>
        <Step><StepLabel>1</StepLabel></Step>
        <Step><StepLabel>2</StepLabel></Step>
        <Step><StepLabel>3</StepLabel></Step>
        <Step><StepLabel>4</StepLabel></Step>
      </Stepper>
      <Box className={`${layoutClasses.panel}`}>
        <PageTitle
          title={`${currentStep}. ${pageStatics.data.titles.stepThreeMaster}`}
        />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.stepThree}
          </Typography>
        </Box>
        <Alert
          description={pageStatics.messages.notifications.stepThree.descriptionTwo}
          type="info"
        />
        <Grid container spacing={3}>
          {loadStepFormContent(linksForm, setLinksForm)}
        </Grid>
      </Box>
      {/* <Alert
        description={pageStatics.messages.notifications.stepThree.description}
        type="info"
      /> */}
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
          onClick={() => nextStep()}
          className={`${buttonClasses.defaultButton} ${classes.nextButton}`}
        >
          {pageStatics.buttons.nextStep}
        </Button>
        {/* <Button
          onClick={() => previousStep()}
          disabled={isFirstStep}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.prevStep}
        </Button>
        <Button
          onClick={() => nextStep()}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.nextStep}
        </Button>
        <Box className={classes.onboardingIndicator}>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span className={classes.selected}>&nbsp;</span>
          <span>&nbsp;</span>
        </Box> */}
      </Box>
    </>
  )
}

StepThree.defaultProps = {
  linksForm: null,
  loading: false,
  isMaster: false,
  noSubscription: false,
}

StepThree.propTypes = {
  inputChangeHandler: PropTypes.func.isRequired,
  inputBlurHandler: PropTypes.func.isRequired,
  setLinksForm: PropTypes.func.isRequired,
  linksForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  loading: PropTypes.bool,
  isMaster: PropTypes.bool,
  noSubscription: PropTypes.bool,
}

export default StepThree
