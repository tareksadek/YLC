import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import PageTitle from '../../layout/PageTitle'
import InfoBox from '../Ui/InfoBox'

import { useLanguage } from '../../hooks/useLang'

import { privacyStyles } from './styles'

const Privacy = ({
  passwordFormEnabled, enablePassword, loadForm, passwordForm, onPasswordChange,
}) => {
  const classes = privacyStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings

  return (
    <Box className={classes.privacyContainer}>
      <PageTitle title={pageStatics.data.titles.privacyTab} />
      <Box mb={3}>
        <InfoBox infoList={[pageStatics.messages.info.privacy.first, pageStatics.messages.info.privacy.second]} />
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="body1" component="p" className={classes.formElementTitle}>
            {passwordFormEnabled ? pageStatics.forms.profileKeySwitchOff : pageStatics.forms.profileKeySwitchOn}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box className={classes.profilePasswordSwitch}>
            <Switch
              edge="end"
              onChange={() => enablePassword()}
              checked={passwordFormEnabled}
              inputProps={{ 'aria-labelledby': 'switchListLabel_profilePassword' }}
            />
          </Box>
        </Grid>
        <Box className={classes.KeyFormContainer}>
          {loadForm(passwordForm, onPasswordChange)}
        </Box>
      </Grid>
    </Box>
  )
}

Privacy.defaultProps = {
  passwordFormEnabled: false,
  passwordForm: null,
}

Privacy.propTypes = {
  passwordFormEnabled: PropTypes.bool,
  passwordForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  enablePassword: PropTypes.func.isRequired,
  loadForm: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
}

export default Privacy
