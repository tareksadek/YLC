import React from 'react'
import { useHistory } from 'react-router-dom'
import parse from 'html-react-parser'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { buttonStyles } from '../../theme/buttons'
import { invitationBlockStyles } from './styles'

const ConfirmEmailStatus = () => {
  const classes = invitationBlockStyles()
  const buttons = buttonStyles()

  const history = useHistory()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.auth
  const color = useColor()

  const startOnboarding = () => {
    history.push('/settings/account')
  }

  // if (validStatus !== 'valid') {
  //   return <Redirect to="/" />
  // }

  return (
    <Box className={classes.layout}>
      <Paper className={classes.paper} square elevation={0}>
        <CheckCircleIcon style={{ fontSize: 48 }} />
        <Box mt={1}>
          <Typography
            align="center"
            component="p"
          >
            {parse(pageStatics.messages.notifications.verificationSuccess)}
          </Typography>
        </Box>
        <Box mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={startOnboarding}
            className={buttons.defaultButton}
            style={{
              backgroundColor: color.color.code,
              minWidth: 200,
            }}
          >
            {pageStatics.buttons.continueAfterConfirmation}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}

export default ConfirmEmailStatus
