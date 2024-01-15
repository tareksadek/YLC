import React from 'react'
import parse from 'html-react-parser'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import PageTitle from '../../layout/PageTitle'

import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'
import { invitationBlockStyles } from './styles'

const ConfirmEmailRequest = () => {
  const layoutClasses = layoutStyles()
  const classes = invitationBlockStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth

  return (
    <Box className={layoutClasses.formContainer}>
      <PageTitle title={pageStatics.data.titles.verifyEmail} />
      <Box>
        <Typography component="p" variant="body1" align="center" className={classes.invitationBlockText}>
          {parse(pageStatics.data.verifyEmail)}
        </Typography>
      </Box>
    </Box>
  )
}

export default ConfirmEmailRequest
