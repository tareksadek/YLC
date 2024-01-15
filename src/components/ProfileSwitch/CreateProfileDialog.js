import React, { useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'

import FormElement from '../Ui/FormElement'
import FullScreenDialog from '../../layout/FullScreenDialog'
import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'
import { useLayoutMode } from '../../hooks/useLayoutMode'
import { useColor } from '../../hooks/useDarkMode'

import {
  createUserCard, addExtraProfile,
} from '../../API/cards'

import { profileStyles } from './styles'
import { buttonStyles } from '../../theme/buttons'

import * as actions from '../../store/actions'
import { defaultSettings } from '../../utilities/appVars'

const CreateProfileDialog = ({
  open, onClose, onSetNotification, cardData, color, onAddProfile, onLoadCard, isPro,
  switchTheme, profileCount,
}) => {
  const classes = profileStyles()
  const buttonClasses = buttonStyles()
  const auth = useAuth()
  const { switchLayout } = useLayoutMode()
  const colorMode = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.switchProfile
  const initialFormState = {
    profileTitle: createFormElementObj('input', `${pageStatics.forms.profileForm.title}`,
      { type: 'text', name: 'profileTitle', placeholder: `${pageStatics.forms.profileForm.title}` },
      '',
      null,
      { required: false },
      true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  }

  const [formValid, setFormValid] = useState(true)
  const [formTouched, setFormTouched] = useState(true)
  const [formSaved, setFormSaved] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [profileForm, setProfileForm] = useState({ ...initialFormState })
  const [profileImports, setProfileImports] = useState({
    layout: false,
    color: false,
    theme: false,
    title: false,
    note: false,
    address: false,
    bioVideo: false,
    organization: false,
    logo: false,
    image: false,
    phoneNumbers: false,
    links: false,
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

    const adjustedForm = adjustFormValues(profileForm, changeEvent, key)
    setProfileForm(adjustedForm.adjustedForm)
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
    setFormSaved(false)
  }

  const loadProfileForm = () => {
    const form = Object.keys(profileForm).map((formEl, i) => (
      <FormElement
        elementType={profileForm[formEl].elementType}
        label={profileForm[formEl].elementLabel}
        value={profileForm[formEl].value}
        elementOptions={profileForm[formEl].elementOptions}
        touched={profileForm[formEl].touched}
        valid={profileForm[formEl].isValid}
        shouldValidate={profileForm[formEl].validtationRules}
        elementSetup={profileForm[formEl].elementSetup}
        errorMessage={profileForm[formEl].errorMessage}
        changed={e => inputChangeHandler(e, formEl)}
        grid={profileForm[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  const addContactHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.addingProfile)
    setLoading(true)
    setLoadingDone(false)
    const profileDetails = createFormValuesObj(profileForm)
    let { profileTitle } = profileDetails

    if (!profileTitle || profileTitle === '') {
      profileTitle = `Profile ${profileCount + 1}`
    }

    const settings = {}
    if (profileImports.layout) {
      settings.layout = cardData.settings.layout
    } else {
      settings.layout = defaultSettings.layout
    }
    if (profileImports.color) {
      settings.selectedColor = cardData.settings.selectedColor
    } else {
      settings.selectedColor = defaultSettings.selectedColor
    }
    if (profileImports.theme) {
      settings.theme = cardData.settings.theme
    } else {
      settings.theme = defaultSettings.theme
    }

    try {
      const profileData = {
        userId: auth.user.uid,
        firstName: cardData.firstName || null,
        middleName: cardData.middleName || null,
        lastName: cardData.lastName || null,
        title: profileImports.title ? cardData.title : null,
        settings,
        note: profileImports.note ? cardData.note : null,
        parentId: auth.user.uid,
        defaultId: auth.user.uid,
        email: cardData.email || auth.user.email,
        address: profileImports.address ? cardData.address : null,
        marker: profileImports.address && cardData.marker ? cardData.marker : null,
        bioVideo: profileImports.bioVideo ? cardData.bioVideo : null,
        organization: profileImports.organization ? cardData.organization : null,
        logo: profileImports.logo ? cardData.logo : null,
        homeFax: profileImports.phoneNumbers ? cardData.homeFax : null,
        homePhone: profileImports.phoneNumbers ? cardData.homePhone : null,
        workFax: profileImports.phoneNumbers ? cardData.workFax : null,
        workPhone: profileImports.phoneNumbers ? cardData.workPhone : null,
        image: profileImports.image ? cardData.image : null,
        links: profileImports.links && cardData.links ? cardData.links : null,
        socialLinksOrder: profileImports.links && cardData.links && cardData.socialLinksOrder ? cardData.socialLinksOrder : null,
        method: 'extra',
        namePrefix: null,
        nameSuffix: null,
        nickname: null,
        passwordProtected: false,
        redirect: null,
        birthday: null,
        clickedNo: 0,
        connections: null,
        gender: null,
        invitationCode: null,
        invitations: null,
        career: null,
        defaultLinksToTheme: false,
        store: cardData.store || null,
        error: false,
        visits: 0,
      }

      const newCard = await createUserCard(
        profileData,
        null,
        cardData.accountSecret,
        null,
        true,
      )

      const extraProfile = {
        id: newCard.extraProfileId,
        title: profileTitle,
      }

      await addExtraProfile(auth.user.uid, extraProfile)
      await onLoadCard(auth.user.uid, isPro)
      onAddProfile(extraProfile)
      switchLayout(settings.layout)
      window.localStorage.setItem('originalTheme', settings.theme)
      switchTheme(settings.theme)
      colorMode.switchColor(settings.selectedColor)

      setProfileForm(initialFormState)
      setFormTouched(false)

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setTimeout(() => onClose(), 1100)
      setLoadingMessage(pageStatics.messages.loading.addingProfile)

      onSetNotification({
        message: pageStatics.messages.notifications.profileAddSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.profileAddError,
        type: 'error',
      })
      onClose()
      throw new Error(err)
    }
  }

  const closeDialog = () => {
    onClose()
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  return (
    <FullScreenDialog
      title={pageStatics.data.titles.addNewProfile}
      open={open}
      onClose={() => closeDialog()}
      titleBackground={color}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => addContactHandler(e)}
          disabled={buttonDisabled}
          className={buttonClasses.defaultButton}
          style={{
            backgroundColor: !buttonDisabled && color,
          }}
        >
          {pageStatics.buttons.addNewProfile}
        </Button>
      )}
    >
      <Box className={`${classes.dialogContent}`}>
        {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} />}
        {loadProfileForm()}
        <Box className={classes.profileImportContainer}>
          <Box mt={3} mb={3}>
            <Typography variant="body1" component="p" align="center" className={classes.switchTitle}>
              {pageStatics.data.titles.importData}
            </Typography>
            <Typography variant="body1" component="p" align="center" className={classes.switchDescription}>
              {pageStatics.data.description.importData}
            </Typography>
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importLayout}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, layout: !prevState.layout }))}
              checked={profileImports.layout}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importLayout}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importColor}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, color: !prevState.color }))}
              checked={profileImports.color}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importColor}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importTheme}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, theme: !prevState.theme }))}
              checked={profileImports.theme}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importTheme}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importPhoneNumbers}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, phoneNumbers: !prevState.phoneNumbers }))}
              checked={profileImports.phoneNumbers}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importPhoneNumbers}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importAddress}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, address: !prevState.address }))}
              checked={profileImports.address}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importAddress}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importTitle}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, title: !prevState.title }))}
              checked={profileImports.title}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importTitle}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importOrganization}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, organization: !prevState.organization }))}
              checked={profileImports.organization}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importOrganization}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importVideo}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, bioVideo: !prevState.bioVideo }))}
              checked={profileImports.bioVideo}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importVideo}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importLogo}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, logo: !prevState.logo }))}
              checked={profileImports.logo}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importLogo}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importImage}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, image: !prevState.image }))}
              checked={profileImports.image}
              inputProps={{ 'aria-labelledby': `${pageStatics.forms.profileForm.importImage}` }}
            />
          </Box>

          <Box className={classes.profileImportSwitchContainer}>
            <Typography variant="body1" component="p" className={classes.switchLabel}>
              {pageStatics.forms.profileForm.importLinks}
            </Typography>
            <Switch
              edge="end"
              onChange={() => setProfileImports(prevState => ({ ...prevState, links: !prevState.links }))}
              checked={profileImports.links}
              inputProps={{ 'aria-labelledby': 'switchListLabel_profilePassword' }}
            />
          </Box>
        </Box>
      </Box>
    </FullScreenDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onAddProfile: extraProfile => dispatch(actions.addProfile(extraProfile)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCard: (userId, isPro) => dispatch(actions.loadCardByUserId(userId, isPro)),
})

CreateProfileDialog.defaultProps = {
  open: false,
  cardData: null,
  color: null,
  profileCount: null,
  isPro: false,
}

CreateProfileDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onAddProfile: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onLoadCard: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  color: PropTypes.string,
  profileCount: PropTypes.number,
  isPro: PropTypes.bool,
}

export default connect(null, mapDispatchToProps)(CreateProfileDialog)
