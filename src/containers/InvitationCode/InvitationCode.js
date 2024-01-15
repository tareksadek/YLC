import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'

import FormElement from '../../components/Ui/FormElement'
import PageTitle from '../../layout/PageTitle'
import Header from '../../layout/Header'

import { useColor } from '../../hooks/useDarkMode'
import { useLanguage } from '../../hooks/useLang'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { invitationCodeStyles } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import * as actions from '../../store/actions'

const InvitationCode = ({
  status,
  loading,
  onCheckInvitation,
  onClearInvitation,
}) => {
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.invitationCode

  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = invitationCodeStyles()
  const history = useHistory()
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [codeValidationError, setCodeValidationError] = useState(null)
  const [codeForm, setCodeForm] = useState({
    invitationCode: createFormElementObj('input', pageStatics.forms.invitationCode, { type: 'text', name: 'invitationCode', placeholder: pageStatics.forms.invitationCode }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const inputChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedForm = adjustFormValues(codeForm, changeEvent, key)
    setCodeForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
  }

  const loadForm = () => {
    const form = Object.keys(codeForm).map((formEl, i) => (
      <Grid item xs={12} key={formEl + i}>
        <Box mb={1}>
          <FormElement
            elementType={codeForm[formEl].elementType}
            label={codeForm[formEl].elementLabel}
            value={codeForm[formEl].value.trim()}
            elementOptions={codeForm[formEl].elementOptions}
            touched={codeForm[formEl].touched}
            valid={codeForm[formEl].isValid}
            errorMessage={codeForm[formEl].errorMessage}
            shouldValidate={codeForm[formEl].validtationRules}
            elementSetup={codeForm[formEl].elementSetup}
            changed={e => inputChangeHandler(e, formEl)}
            grid={codeForm[formEl].grid}
            disabled={loading}
          />
        </Box>
      </Grid>
    ))

    return form
  }

  const processInvitationCodeHandler = async e => {
    e.preventDefault()
    const formCode = createFormValuesObj(codeForm)
    try {
      const currentStatus = await onCheckInvitation(formCode.invitationCode.trim())
      if (currentStatus.invitationStatus !== 'valid') {
        onClearInvitation()
        setCodeValidationError(`${pageStatics.messages.notifications.invitationCodeError} ${currentStatus.invitationStatus}`)
      } else {
        window.localStorage.setItem('package', currentStatus.invitationPackage)
        window.localStorage.setItem('accountType', currentStatus.accountType)
        window.localStorage.setItem('invitationCode', currentStatus.invitationCode)
      }
    } catch (err) {
      throw new Error(err)
    }
  }

  const proceedToAuthHandler = () => {
    window.localStorage.setItem('authType', 'signup')
    history.push('/auth')
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <PageTitle title={pageStatics.data.titles.enterInvitationCode} />
          {status === 'valid' ? (
            <Box className={classes.codeMessageContainer}>
              <Typography component="p" variant="body1" align="center" className={classes.codeMessage}>
                {pageStatics.messages.notifications.invitationCodeSuccess}
              </Typography>
              <Button
                color="secondary"
                onClick={() => proceedToAuthHandler()}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: color.color.code,
                }}
              >
                {pageStatics.buttons.nextStep}
              </Button>
            </Box>
          ) : (
            <form>
              <Grid container spacing={3}>
                {loadForm()}
              </Grid>
              {codeValidationError && (
                <Typography component="p" variant="body1" align="center" className={classes.codeError}>
                  {codeValidationError}
                </Typography>
              )}
              <Button
                color="secondary"
                onClick={e => processInvitationCodeHandler(e)}
                disabled={!formValid || loading || !formTouched}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: color.color.code,
                }}
              >
                {pageStatics.buttons.activate}
              </Button>
              {loading && <CircularProgress size={20} />}
            </form>
          )}
        </Box>
      </Box>
    </Box>
  )
}

InvitationCode.defaultProps = {
  status: null,
  loading: false,
}

InvitationCode.propTypes = {
  status: PropTypes.string,
  loading: PropTypes.bool,
  onCheckInvitation: PropTypes.func.isRequired,
  onClearInvitation: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  code: state.invitations.code,
  status: state.invitations.status,
  loading: state.invitations.loading,
  error: state.invitations.error,
})

const mapDispatchToProps = dispatch => ({
  onCheckInvitation: invitationCode => dispatch(actions.checkInvitation(invitationCode)),
  onClearInvitation: () => dispatch(actions.clearInvitation()),
})

export default connect(mapStateToProps, mapDispatchToProps)(InvitationCode)
