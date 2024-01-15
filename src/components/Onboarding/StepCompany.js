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
import Alert from '../../layout/Alert'
import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'
import { onboardingStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'

const StepCompany = ({
  inputChangeHandler, companyForm, setCompanyForm, loading, isMaster, noSubscription,
}) => {
  const classes = onboardingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const {
    nextStep, activeStep,
  } = useWizard()

  const currentStep = isMaster && !noSubscription ? activeStep : activeStep + 1

  const loadStepFormContent = (formElements, setForm) => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={formElements[formEl].value}
        elementOptions={formElements[formEl].elementOptions}
        touched={formElements[formEl].touched}
        valid={formElements[formEl].isValid}
        errorMessage={formElements[formEl].errorMessage}
        shouldValidate={formElements[formEl].validtationRules}
        elementSetup={formElements[formEl].elementSetup}
        changed={e => inputChangeHandler(e, formEl, formElements, setForm)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

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
          title={`${currentStep}. ${pageStatics.data.titles.stepCompany}`}
        />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.stepCompany}
          </Typography>
        </Box>
        <Alert
          description={pageStatics.messages.notifications.stepCompany.description}
          type="info"
        />
        <Grid container spacing={3}>
          {loadStepFormContent(companyForm, setCompanyForm)}
        </Grid>
      </Box>
      <Box className={classes.stepbuttonsContainer}>
        {/* <Button
          onClick={() => previousStep()}
          disabled={isFirstStep}
          className={`${buttonClasses.defaultButton} ${classes.prevButton}`}
        >
          {pageStatics.buttons.prevStep}
        </Button> */}
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
          <span className={classes.selected}>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </Box> */}
      </Box>
      {
        // <Box mt={3}>
        //   <InfoBox infoList={[pageStatics.messages.info.stepOne.first]} />
        // </Box>
      }
    </>
  )
}

StepCompany.defaultProps = {
  companyForm: null,
  loading: false,
  isMaster: false,
  noSubscription: false,
}

StepCompany.propTypes = {
  inputChangeHandler: PropTypes.func.isRequired,
  setCompanyForm: PropTypes.func.isRequired,
  companyForm: PropTypes.objectOf(PropTypes.oneOfType([
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

export default StepCompany
