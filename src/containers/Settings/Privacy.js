import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Prompt } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import FormElement from '../../components/Ui/FormElement'
import InfoBox from '../../components/Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'
import SkeletonContainer from '../../layout/SkeletonContainer'

// import { setUserSettings, updateAccountActivity } from '../../API/users'
import { setCardSettings, updateProfileActivity } from '../../API/cards'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles, formStyles } from '../../theme/layout'
import { privacyStyles } from './styles'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const Privacy = ({
  cardData, onSetNotification, settings, onToggleProfileActivity, activeProfileId,
}) => {
  const classes = privacyStyles()
  const layoutClasses = layoutStyles()
  const formClasses = formStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const userId = auth.user.uid
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.settings
  const profileActive = settings ? settings.active === undefined || settings.active : true
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingKey)
  const [settingsSaved, setSettingsSaved] = useState(false)
  const [passwordFormEnabled, setPasswordFormEnabled] = useState(cardData.userId && cardData.settings.profilePasswordActive ? cardData.settings.profilePasswordActive : false)
  const [passwordFormValid, setPasswordFormValid] = useState(cardData.userId && cardData.settings.profilePassword)
  const [passwordFormTouched, setPasswordFormTouched] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    profilePassword: createFormElementObj('input', pageStatics.forms.profilePassword,
      { type: 'password', name: 'profilePassword', placeholder: pageStatics.forms.profilePassword },
      '',
      null,
      { required: false, minLength: 3, maxLength: 8 },
      false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }, true),
  })

  useEffect(() => {
    if (cardData.userId && !cardData.loading) {
      // setLoading(true)
      const adjustedPasswordForm = adjustFormValues(passwordForm, cardData.settings, null)
      setPasswordForm(prevForm => ({ ...prevForm, ...adjustedPasswordForm.adjustedForm }))
      setPasswordFormValid(adjustedPasswordForm.formValid)
      setPasswordFormEnabled(cardData.settings.profilePasswordActive || false)
      // setLoadingDone(true)
      // setTimeout(() => setLoading(false), 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  const passwordChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedPasswordForm = adjustFormValues(passwordForm, changeEvent, key)
    setPasswordForm(adjustedPasswordForm.adjustedForm)
    setPasswordFormValid(adjustedPasswordForm.formValid)
    setPasswordFormTouched(true)
    setSettingsSaved(false)
  }

  const enablePasswordHandler = () => {
    setPasswordFormEnabled(prevState => !prevState)
    setPasswordFormTouched(true)
    setSettingsSaved(false)
  }

  const loadForm = (form, changeHandler) => {
    const formElements = Object.keys(form).map((formEl, i) => (
      <FormElement
        elementType={form[formEl].elementType}
        label={form[formEl].elementLabel}
        value={form[formEl].value}
        elementOptions={form[formEl].elementOptions}
        touched={form[formEl].touched}
        valid={form[formEl].isValid}
        shouldValidate={form[formEl].validtationRules}
        elementSetup={form[formEl].elementSetup}
        changed={e => changeHandler(e, formEl)}
        grid={form[formEl].grid}
        disabled={loading || !passwordFormEnabled}
        errorMessage={form[formEl].errorMessage}
        key={formEl + i}
      />
    ))

    return formElements
  }

  const saveSettings = async () => {
    setLoadingDone(false)
    setLoading(true)
    setLoadingMessage(pageStatics.messages.loading.savingKey)
    const passwordFormData = createFormValuesObj(passwordForm)
    try {
      // await setUserSettings(activeProfileId || userId, {
      //   profilePasswordActive: passwordFormEnabled,
      //   profilePassword: passwordFormData.profilePassword,
      // })
      await setCardSettings(activeProfileId || userId, {
        profilePasswordActive: passwordFormEnabled,
        profilePassword: passwordFormData.profilePassword,
      })
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.loadingKey)
      setSettingsSaved(true)
      onSetNotification({
        message: pageStatics.messages.notifications.keySavedSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.keySavedError,
        type: 'error',
      })
    }
  }

  const toggleProfileActivityHandler = async (profileId, activeState) => {
    const confirmBox = !activeState ? window.confirm(pageStatics.messages.notifications.confirmDeactivate) : true
    if (confirmBox) {
      setLoadingDone(false)
      setLoading(true)
      setLoadingMessage(pageStatics.messages.loading.processing)
      try {
        // await updateAccountActivity(profileId, activeState)
        await updateProfileActivity(profileId, activeState)
        onToggleProfileActivity()
        onSetNotification({
          message: activeState ? pageStatics.messages.notifications.activateProfileSuccess : pageStatics.messages.notifications.deactivateProfileSuccess,
          type: 'success',
        })
      } catch (err) {
        onSetNotification({
          message: activeState ? pageStatics.messages.notifications.activateProfileError : pageStatics.messages.notifications.deactivateProfileError,
          type: 'error',
        })
      }
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.loadingKey)
    }
  }

  const buttonDisabled = !settings || (!passwordFormTouched && passwordFormEnabled) || settingsSaved || !passwordFormValid || loading
  // console.log(!settings);
  // console.log((!passwordFormTouched && passwordFormEnabled));
  // console.log(settingsSaved);
  // console.log(passwordFormTouched);
  // console.log(!passwordFormValid);
  // console.log((passwordFormTouched && !passwordFormValid));

  if (!cardData.userId || cardData.loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.privacy}>
          <Box>
            <InfoBox infoList={[pageStatics.messages.info.privacy.first]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />}
      <Prompt
        when={!buttonDisabled}
        message={pageStatics.messages.notifications.savePrompt}
      />
      <Header title={pageStatics.data.titles.privacy}>
        <Box>
          <InfoBox infoList={[pageStatics.messages.info.privacy.first]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box className={`${layoutClasses.panel} ${classes.privacyContainer}`}>
            <PageTitle title={pageStatics.data.titles.profileKey} />
            <Box mb={2}>
              <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                {pageStatics.data.description.profileKey}
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box className={formClasses.switchContainer}>
                  <Typography variant="body1" component="p" className={formClasses.switchLabel}>
                    {passwordFormEnabled ? pageStatics.forms.profileKeySwitchOff : pageStatics.forms.profileKeySwitchOn}
                  </Typography>
                  <Box className={formClasses.formSwitch}>
                    <Switch
                      edge="end"
                      onChange={() => enablePasswordHandler()}
                      checked={passwordFormEnabled}
                      inputProps={{ 'aria-labelledby': 'switchListLabel_profilePassword' }}
                    />
                  </Box>
                </Box>
              </Grid>
              <Box className={classes.KeyFormContainer}>
                {loadForm(passwordForm, passwordChangeHandler)}
              </Box>
              <Button
                className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                onClick={() => saveSettings()}
                disabled={buttonDisabled}
              >
                {pageStatics.buttons.savePrivacy}
              </Button>
            </Grid>
          </Box>
          <Box className={`${layoutClasses.panel} ${classes.privacyContainer}`}>
            <PageTitle title={pageStatics.data.titles.deactivateProfile} />
            <Box mb={2}>
              <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                {pageStatics.data.description.deactivateProfilePanel}
              </Typography>
            </Box>
            {!profileActive && (
              <Box mt={2}>
                <Alert
                  title={language.languageVars.pages.auth.messages.info.profileDeactivated.userTitle}
                  description={language.languageVars.pages.auth.messages.info.profileDeactivated.userFirst}
                  type="error"
                />
              </Box>
            )}
            <Button
              className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
              onClick={() => toggleProfileActivityHandler(activeProfileId || userId, !profileActive)}
              disabled={loading}
            >
              {profileActive ? pageStatics.buttons.deactivateProfile : pageStatics.buttons.activateProfile}
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  settings: state.cards.settings,
  cardData: state.cards,
  activeProfileId: state.profiles.activeProfileId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onToggleProfileActivity: () => dispatch(actions.toggleProfileActivity()),
})

Privacy.defaultProps = {
  settings: null,
  cardData: null,
  activeProfileId: null,
}

Privacy.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
  // onLoadCard: PropTypes.func.isRequired,
  settings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // switchTheme: PropTypes.func.isRequired,
  onToggleProfileActivity: PropTypes.func.isRequired,
  activeProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Privacy)
