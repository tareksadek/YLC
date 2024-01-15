import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import LoadingBackdrop from '../../Loading/LoadingBackdrop'
import PageTitle from '../../../layout/PageTitle'

import { useLanguage } from '../../../hooks/useLang'

import { buttonStyles } from '../../../theme/buttons'
import { layoutStyles } from '../../../theme/layout'
import { passwordProtectedStyles } from '../styles'

const PasswordProtected = ({
  passwordFormLoading, loadForm, passwordForm, passwordChangeHandler, revealInfo, passwordFormTouched, passwordFormValid,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = passwordProtectedStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.viewProfile

  return (
    <Box className={classes.container} mt={4}>
      <Box className={layoutClasses.panel}>
        <PageTitle title={pageStatics.data.titles.privateProfile} />
        <Box mb={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.messages.info.passwordProtected.first}
          </Typography>
        </Box>
        <Box mt={3} className={classes.passwordFormContainer}>
          {passwordFormLoading && <LoadingBackdrop placement="inset" loadingText={language.languageVars.pages.viewProfile.messages.loading.validatingProfileKey} />}
          {loadForm(passwordForm, passwordChangeHandler)}
          <Button
            className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
            onClick={() => revealInfo()}
            disabled={!passwordFormTouched || (passwordFormTouched && !passwordFormValid)}
          >
            {language.languageVars.pages.viewProfile.buttons.revealProtectedprofileInfo}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

PasswordProtected.defaultProps = {
  passwordFormLoading: false,
  passwordForm: null,
  passwordFormTouched: false,
  passwordFormValid: false,
}

PasswordProtected.propTypes = {
  passwordFormLoading: PropTypes.bool,
  passwordForm: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  passwordFormTouched: PropTypes.bool,
  passwordFormValid: PropTypes.bool,
  loadForm: PropTypes.func.isRequired,
  passwordChangeHandler: PropTypes.func.isRequired,
  revealInfo: PropTypes.func.isRequired,
}

export default PasswordProtected
