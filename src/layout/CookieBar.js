import React from 'react'
import { Link } from 'react-router-dom'

import Box from '@material-ui/core/Box'

import CookieConsent from 'react-cookie-consent'

import { cookieBarStyles } from './styles'

import { useLanguage } from '../hooks/useLang'

const CookieBar = () => {
  const classes = cookieBarStyles()
  const language = useLanguage()

  return (
    <Box className={classes.container} dir={language.direction}>
      <CookieConsent
        location="bottom"
        buttonText={language.languageVars.cookieBar.button}
        cookieName="disclaimerCookie"
        buttonStyle={{ backgroundColor: '#83fda3', fontSize: '13px' }}
        expires={150}
        className={classes.cookiebarContainer}
      >
        {language.languageVars.cookieBar.message}
        &nbsp;
        <Link to="/privacyPolicy" className={classes.link}>{language.languageVars.cookieBar.link}</Link>
      </CookieConsent>
    </Box>
  )
}

export default CookieBar
