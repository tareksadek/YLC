import React from 'react'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { Logo } from '../../layout/CustomIcons'

import { useLanguage } from '../../hooks/useLang'

import { onboardingStyles } from './styles'

const Header = ({
  // firstName,
  stepsCount,
}) => {
  const classes = onboardingStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding

  return (
    <Box className={classes.onboardingHeaderContainer}>
      <Box className={classes.onboardingLogoContainer}>
        <Logo fill="#272727" className={classes.logo} />
      </Box>
      <Box mt={2}>
        <Typography variant="body1" component="h3" className={classes.onboardingHeaderTitle} key={stepsCount}>
          {/* {`Hello ${firstName}`} */}
          <span>{parse(pageStatics.data.titles.welcome)}</span>
        </Typography>
        {/* <Typography variant="body1" component="p" className={classes.onboardingHeaderSubtitle}>
          {`${pageStatics.data.titles.createProfile.first} ${stepsCount} ${pageStatics.data.titles.createProfile.second}`}
        </Typography> */}
      </Box>
    </Box>
  )
}

Header.defaultProps = {
  // firstName: null,
  stepsCount: null,
}

Header.propTypes = {
  // firstName: PropTypes.string,
  stepsCount: PropTypes.number,
}

export default Header
