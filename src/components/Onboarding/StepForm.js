import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { useWizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// import InfoBox from '../Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'
import FormsList from './FormsList'

import { useLanguage } from '../../hooks/useLang'

import { onboardingStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const StepFour = ({
  loading, forms,
}) => {
  const classes = onboardingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const {
    previousStep, nextStep, isFirstStep,
  } = useWizard()

  const [formDialogData, setFormDialogData] = useState(null)

  const openFormDialogHandler = form => {
    setFormDialogData(form)
    window.location.hash = '#form'
  }

  console.log(loading);
  console.log(formDialogData);

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
        <FormsList
          forms={forms}
          onOpenFormDialog={openFormDialogHandler}
        />
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
  loading: false,
  forms: null,
}

StepFour.propTypes = {
  loading: PropTypes.bool,
  forms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
}

export default StepFour
