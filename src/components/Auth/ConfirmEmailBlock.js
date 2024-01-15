import React from 'react'
import parse from 'html-react-parser'

import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { invitationBlockStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'

const ConfirmEmailBlock = () => {
  const classes = invitationBlockStyles()
  const buttons = buttonStyles()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth
  const color = useColor()
  const history = useHistory()

  const closeMessageHandler = () => {
    auth.logout()
    history.push('/')
  }

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper} square elevation={0}>
        <>
          <Typography component="h1" variant="h4" align="center" className={classes.errorTitle}>
            {pageStatics.data.titles.emailNotVerified}
          </Typography>
          <Box>
            <Typography component="p" variant="body1" align="center">
              {parse(pageStatics.data.emailNotVerified)}
            </Typography>
          </Box>
          <br />
          <Box className={classes.buttonContainer}>
            <Button
              size="small"
              onClick={() => auth.resendVerificationEmail()}
              className={buttons.defaultButton}
              style={{
                backgroundColor: color.color.code,
              }}
            >
              {pageStatics.buttons.resendVerificationEmail}
            </Button>
            <br />
            <Button
              size="small"
              onClick={() => closeMessageHandler()}
              className={buttons.outlineButton}
              style={{
                borderColor: color.color.code,
                color: color.color.code,
              }}
            >
              {pageStatics.buttons.closeConfirmEmail}
            </Button>
          </Box>
        </>
      </Paper>
    </main>
  )
}

export default ConfirmEmailBlock
