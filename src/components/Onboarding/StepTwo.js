import React from 'react'
import PropTypes from 'prop-types'

import { useWizard } from 'react-use-wizard'
import Cropper from 'react-easy-crop'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

import FormElement from '../Ui/FormElement'
import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import { onboardingStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const StepTwo = ({
  onFileChange, loading, pictureForm, setPictureForm, newProfilePicture, imageSrc, crop, zoom, rotation, setCrop, setZoom, setRotation, onCropComplete,
  isMaster,
}) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const classes = onboardingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const {
    previousStep, isFirstStep, nextStep, activeStep,
  } = useWizard()

  const currentStep = isMaster ? activeStep : activeStep + 1

  // const processData = e => {
  //   if (isLastStep) {
  //     onUpdate(e)
  //   } else {
  //     nextStep()
  //   }
  // }

  const loadStepFormContent = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={newProfilePicture || null}
        elementOptions={formElements[formEl].elementOptions}
        touched={formElements[formEl].touched}
        valid={formElements[formEl].isValid}
        errorMessage={formElements[formEl].errorMessage}
        shouldValidate={formElements[formEl].validtationRules}
        elementSetup={formElements[formEl].elementSetup}
        changed={e => onFileChange(e, formEl)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  return (
    <>
      <Box className={classes.wizardSubtitleContainer} mb={4}>
        <Typography variant="body1" align="left" component="p" className={classes.onboardingHeaderSubtitle}>
          {pageStatics.data.titles.wizardSubtitle}
        </Typography>
      </Box>
      <Stepper activeStep={activeStep} className={classes.stepsBar}>
        <Step><StepLabel>1</StepLabel></Step>
        <Step><StepLabel>2</StepLabel></Step>
        <Step><StepLabel>3</StepLabel></Step>
      </Stepper>
      <Box className={`${layoutClasses.panel}`}>
        <PageTitle
          title={`${currentStep}. ${pageStatics.data.titles.stepTwo}`}
        />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.stepTwo}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {loadStepFormContent(pictureForm, setPictureForm)}
          <Grid item xs={12}>
            {newProfilePicture && (
              <Box mb={3} className={classes.cropper}>
                <Box className={classes.cropContainer}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1 / 1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                  />
                </Box>
                <Box className={classes.controls}>
                  <Box className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}
                    >
                      {pageStatics.data.titles.zoom}
                    </Typography>
                    <Slider
                      value={zoom}
                      min={1}
                      max={3}
                      step={0.1}
                      aria-labelledby="Zoom"
                      onChange={(e, zoomNu) => setZoom(zoomNu)}
                      classes={{
                        root: classes.sliderRoot,
                        thumb: classes.sliderThumb,
                        track: classes.sliderTrack,
                        rail: classes.sliderRail,
                        mark: classes.sliderMark,
                        markActive: classes.markActive,
                      }}
                    />
                  </Box>
                  <Box className={classes.sliderContainer}>
                    <Typography
                      variant="overline"
                      classes={{ root: classes.sliderLabel }}
                    >
                      {pageStatics.data.titles.rotate}
                    </Typography>
                    <Slider
                      value={rotation}
                      min={0}
                      max={360}
                      step={1}
                      aria-labelledby="Rotation"
                      classes={{
                        root: classes.sliderRoot,
                        thumb: classes.sliderThumb,
                        track: classes.sliderTrack,
                        rail: classes.sliderRail,
                        mark: classes.sliderMark,
                        markActive: classes.markActive,
                      }}
                      onChange={(e, rotationNu) => setRotation(rotationNu)}
                    />
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
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
          onClick={e => processData(e)}
          className={buttonClasses.defaultButton}
        >
          {isLastStep ? pageStatics.buttons.lastStep : pageStatics.buttons.nextStep}
        </Button>
        <Box className={classes.onboardingIndicator}>
          <span>&nbsp;</span>
          <span className={classes.selected}>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
        </Box> */}
      </Box>
    </>
  )
}

StepTwo.defaultProps = {
  pictureForm: null,
  loading: false,
  newProfilePicture: null,
  imageSrc: null,
  crop: null,
  zoom: 0,
  rotation: 0,
  isMaster: false,
}

StepTwo.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  setPictureForm: PropTypes.func.isRequired,
  pictureForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  loading: PropTypes.bool,
  newProfilePicture: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  imageSrc: PropTypes.string,
  crop: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  zoom: PropTypes.number,
  rotation: PropTypes.number,
  setCrop: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  setRotation: PropTypes.func.isRequired,
  onCropComplete: PropTypes.func.isRequired,
  isMaster: PropTypes.bool,
}

export default StepTwo
