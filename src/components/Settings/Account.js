import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import PageTitle from '../../layout/PageTitle'
import InfoBox from '../Ui/InfoBox'

import { buttonStyles } from '../../theme/buttons'
import { accountStyles } from './styles'

import { useLanguage } from '../../hooks/useLang'

const Account = ({
  passwordRequestSent, resetPassword, color, loadForm,
  userForm, onInputChange, resetEmail, userFormValid, emailRequest,
  hideChangeEmailForm, emailFormVisible, emailRequestSent, showChangeEmailForm,
}) => {
  const classes = accountStyles()
  const buttonClasses = buttonStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings

  return (
    <Box className={classes.accountContainer}>
      <PageTitle title={pageStatics.data.titles.accountTab} />
      <Box mb={3}>
        <InfoBox infoList={[pageStatics.messages.info.account.first]} />
      </Box>
      <Box className={classes.resetPasswordContainer}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography variant="body1" component="p" className={classes.settingsTitle}>
              {pageStatics.data.titles.changePassword}
            </Typography>
          </Grid>
          <Grid item md={6} xs={12}>
            {passwordRequestSent ? (
              <Typography variant="body1" component="p" className={classes.settingsTitle}>
                <b>{pageStatics.messages.notifications.passwordChangeEmailSent.title}</b>
                <br />
                {pageStatics.messages.notifications.passwordChangeEmailSent.body}
              </Typography>
            ) : (
              <>
                <Button
                  className={buttonClasses.defaultButton}
                  onClick={() => resetPassword()}
                  style={{
                    backgroundColor: color.color.code,
                  }}
                >
                  {pageStatics.buttons.changePassword}
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Box>

      <Box className={classes.resetPasswordContainer}>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Typography variant="body1" component="p" className={classes.settingsTitle}>
              {pageStatics.data.titles.changeEmail}
            </Typography>
          </Grid>
          {emailFormVisible ? (
            <Grid item md={6} xs={12}>
              {emailRequestSent ? (
                <Typography variant="body1" component="p" className={classes.settingsTitle}>
                  <b>{pageStatics.messages.notifications.emailChangeEmailSent.title}</b>
                  <br />
                  {pageStatics.messages.notifications.emailChangeEmailSent.body}
                </Typography>
              ) : (
                <Box className={classes.emailFormContainer}>
                  {loadForm(userForm, onInputChange)}
                  <Box className={classes.formButtonsContainer}>
                    <Button
                      className={buttonClasses.defaultButton}
                      onClick={e => resetEmail(e)}
                      disabled={!userFormValid || emailRequest}
                      style={{
                        backgroundColor: color.color.code,
                      }}
                    >
                      {pageStatics.buttons.changeEmailRequest}
                    </Button>
                    <Button
                      className={buttonClasses.defaultButton}
                      onClick={() => hideChangeEmailForm()}
                    >
                      {pageStatics.buttons.changeEmailCancel}
                    </Button>
                  </Box>
                </Box>
              )}
            </Grid>
          ) : (
            <Grid item md={6} xs={12}>
              <Button
                className={buttonClasses.defaultButton}
                onClick={() => showChangeEmailForm()}
                style={{
                  backgroundColor: color.color.code,
                }}
              >
                {pageStatics.buttons.changeEmail}
              </Button>
            </Grid>
          )}
        </Grid>
      </Box>
    </Box>
  )
}

Account.defaultProps = {
  passwordRequestSent: false,
  color: null,
  userForm: null,
  userFormValid: false,
  emailRequest: false,
  emailFormVisible: false,
  emailRequestSent: false,
}

Account.propTypes = {
  passwordRequestSent: PropTypes.bool,
  color: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  userForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  userFormValid: PropTypes.bool,
  emailRequest: PropTypes.bool,
  emailFormVisible: PropTypes.bool,
  emailRequestSent: PropTypes.bool,
  resetPassword: PropTypes.func.isRequired,
  loadForm: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  resetEmail: PropTypes.func.isRequired,
  hideChangeEmailForm: PropTypes.func.isRequired,
  showChangeEmailForm: PropTypes.func.isRequired,
}

export default Account
