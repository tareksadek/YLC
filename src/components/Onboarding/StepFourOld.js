import React from 'react'
import PropTypes from 'prop-types'

import { useWizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import FormElement from '../Ui/FormElement'
// import InfoBox from '../Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import { onboardingStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const StepFour = ({
  inputChangeHandler, videoForm, setVideoForm, loading,
}) => {
  const classes = onboardingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const {
    previousStep, nextStep, isFirstStep,
  } = useWizard()

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
      <Box className={`${layoutClasses.panel}`}>
        <PageTitle
          title={pageStatics.data.titles.stepFour}
        />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.stepFour}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {loadStepFormContent(videoForm, setVideoForm)}
        </Grid>
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
          <span>&nbsp;</span>
          <span className={classes.selected}>&nbsp;</span>
          <span>&nbsp;</span>
        </Box>
      </Box>
    </>
  )
}

StepFour.defaultProps = {
  videoForm: null,
  loading: false,
}

StepFour.propTypes = {
  inputChangeHandler: PropTypes.func.isRequired,
  setVideoForm: PropTypes.func.isRequired,
  videoForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  loading: PropTypes.bool,
}

export default StepFour
