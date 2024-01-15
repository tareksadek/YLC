import React from 'react'
import PropTypes from 'prop-types'

import { useWizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import CheckIcon from '@material-ui/icons/Check'

import Alert from '../../layout/Alert'
import PageTitle from '../../layout/PageTitle'

import {
  SocialLayoutIcon, BusinessLayoutIcon, BasicLayoutIcon,
} from '../../layout/CustomIcons'

import { useLanguage } from '../../hooks/useLang'

import { themeColors } from '../../utilities/appVars'

import { onboardingStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const StepFive = ({
  changeColorHandler, changeThemeHandler, changeLayoutHandler, color, theme, layout, onUpdate, isMaster,
}) => {
  const classes = onboardingStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding

  const {
    previousStep, nextStep, isFirstStep, isLastStep, activeStep,
  } = useWizard()

  const currentStep = isMaster ? activeStep : activeStep + 1

  const processData = e => {
    if (isLastStep) {
      onUpdate(e)
    } else {
      nextStep()
    }
  }

  return (
    <>
      <Box className={`${layoutClasses.panel}`}>
        <PageTitle
          title={`${currentStep}. ${pageStatics.data.titles.stepFive}`}
        />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.stepFive}
          </Typography>
        </Box>
        <Box>
          <Box className={classes.layoutContainer}>
            <Typography variant="body1" component="p" className={classes.stepSubtitle}>
              {pageStatics.data.titles.selectLayout}
            </Typography>
            <Box className={classes.layoutButtonsContainer}>
              <Button onClick={() => changeLayoutHandler('social')} className={layout === 'social' ? classes.selectedLayout : ''}>
                <SocialLayoutIcon
                  fill="#bbb"
                  background={theme === 'dark' ? '#272727' : '#fff'}
                  backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                  selectedcolor={color.color.code || '#bbb'}
                />
                <span className={classes.buttonText}>
                  {pageStatics.data.titles.basicLayout}
                </span>
              </Button>
              <Button onClick={() => changeLayoutHandler('basic')} className={layout === 'basic' ? classes.selectedLayout : ''}>
                <BasicLayoutIcon
                  fill="#bbb"
                  background={theme === 'dark' ? '#272727' : '#fff'}
                  backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                  selectedcolor={color.color.code || '#bbb'}
                />
                <span className={classes.buttonText}>
                  {pageStatics.data.titles.socialLayout}
                </span>
              </Button>
              <Button onClick={() => changeLayoutHandler('business')} className={layout === 'business' ? classes.selectedLayout : ''}>
                <BusinessLayoutIcon
                  fill="#bbb"
                  background={theme === 'dark' ? '#272727' : '#fff'}
                  backgroundrev={theme === 'dark' ? '#eee' : '#272727'}
                  selectedcolor={color.color.code || '#bbb'}
                />
                <span className={classes.buttonText}>
                  {pageStatics.data.titles.businessLayout}
                </span>
              </Button>
            </Box>
          </Box>
          <Box className={classes.themeContainer}>
            <Typography variant="body1" component="p" className={classes.stepSubtitle}>
              {pageStatics.data.titles.selectBackground}
            </Typography>
            <Box className={classes.themeButtonsContainer}>
              <Button
                className={`${classes.themeButton} ${classes.lightThemeButton} ${theme === 'light' ? classes.selectedTheme : ''}`}
                onClick={() => changeThemeHandler('light')}
              >
                <CheckIcon />
              </Button>
              <Button
                className={`${classes.themeButton} ${classes.darkThemeButton} ${theme === 'dark' ? classes.selectedTheme : ''}`}
                onClick={() => changeThemeHandler('dark')}
              >
                <CheckIcon />
              </Button>
            </Box>
          </Box>
          <Box className={classes.colorsContainer}>
            <Typography variant="body1" component="p" className={classes.stepSubtitle}>
              {pageStatics.data.titles.selectColor}
            </Typography>
            <Box className={classes.colorsButtonsContainer}>
              {themeColors.map(colorObj => (
                <Button
                  key={colorObj.name}
                  className={`${classes.colorButton} ${colorObj.name === 'black' ? classes.blackColorButton : ''}`}
                  onClick={() => changeColorHandler(colorObj)}
                  style={{ backgroundColor: colorObj.code }}
                >
                  {colorObj.name === color.color.name && (
                    <CheckIcon />
                  )}
                </Button>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
      <Alert
        description={pageStatics.messages.notifications.stepFive.descriptionTwo}
        type="info"
      />
      <Alert
        description={pageStatics.messages.notifications.stepFive.description}
        type="info"
      />
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
          onClick={e => processData(e)}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.lastStep}
        </Button>
        <Box className={classes.onboardingIndicator}>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span>&nbsp;</span>
          <span className={classes.selected}>&nbsp;</span>
        </Box>
      </Box>
    </>
  )
}

StepFive.defaultProps = {
  color: null,
  theme: null,
  layout: null,
  isMaster: false,
}

StepFive.propTypes = {
  changeColorHandler: PropTypes.func.isRequired,
  changeThemeHandler: PropTypes.func.isRequired,
  changeLayoutHandler: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  color: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  theme: PropTypes.string,
  layout: PropTypes.string,
  isMaster: PropTypes.bool,
}

export default StepFive
