import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
// import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import FormElement from '../Ui/FormElement'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import {
  getCardById, updateCard,
} from '../../API/cards'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

// import { accountInfo } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const EditInfo = ({
  closeDialog, dialogOpen, onSetNotification, userId,
}) => {
  // const classes = accountInfo()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading')
  const [formSaved, setFormSaved] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const originalState = {
    firstName: createFormElementObj('input', pageStatics.forms.infoTab.firstName,
      { type: 'text', name: 'firstName', placeholder: pageStatics.forms.infoTab.firstName },
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
    middleName: createFormElementObj('input', pageStatics.forms.infoTab.middleName,
      { type: 'text', name: 'middleName', placeholder: pageStatics.forms.infoTab.middleName },
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
    lastName: createFormElementObj('input', pageStatics.forms.infoTab.lastName,
      { type: 'text', name: 'lastName', placeholder: pageStatics.forms.infoTab.lastName },
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
    organization: createFormElementObj('input', pageStatics.forms.infoTab.organization,
      {
        type: 'text',
        name: 'organization',
        placeholder: pageStatics.forms.infoTab.organization,
        disabled: false,
      },
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
    title: createFormElementObj('input', pageStatics.forms.infoTab.title,
      { type: 'text', name: 'title', placeholder: pageStatics.forms.infoTab.title },
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
    career: createFormElementObj('select', pageStatics.forms.infoTab.career,
      { name: 'career', disabled: false },
      '',
      [
        { value: 'Accounting', display: 'Accounting' },
        { value: 'Architecture', display: 'Architecture' },
        { value: 'Automotive', display: 'Automotive' },
        { value: 'Blogging', display: 'Blogging' },
        { value: 'Education', display: 'Education' },
        { value: 'Energy', display: 'Energy' },
        { value: 'Engineering', display: 'Engineering' },
        { value: 'Entrepreneurship', display: 'Entrepreneurship' },
        { value: 'Farming', display: 'Farming' },
        { value: 'Fashion', display: 'Fashion' },
        { value: 'Filmmaking', display: 'Filmmaking' },
        { value: 'Government', display: 'Government' },
        { value: 'Graphic design', display: 'Graphic design' },
        { value: 'Health and medicine', display: 'Health and medicine' },
        { value: 'Human resources', display: 'Human resources' },
        { value: 'Journalism', display: 'Journalism' },
        { value: 'Law and public policy', display: 'Law and public policy' },
        { value: 'Marketing', display: 'Marketing' },
        { value: 'Modeling', display: 'Modeling' },
        { value: 'Multimedia', display: 'Multimedia' },
        { value: 'Music', display: 'Music' },
        { value: 'Photography', display: 'Photography' },
        { value: 'Real estate', display: 'Real estate' },
        { value: 'Repair and maintenance', display: 'Repair and maintenance' },
        { value: 'Sales', display: 'Sales' },
        { value: 'Science', display: 'Science' },
        { value: 'Software development', display: 'Software development' },
        { value: 'Technology', display: 'Technology' },
        { value: 'Videography', display: 'Videography' },
      ],
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
    note: createFormElementObj('textarea', 'Bio',
      { type: 'text', name: 'note', placeholder: 'Bio' },
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
  const [infoForm, setInfoForm] = useState({ ...originalState })

  useEffect(() => {
    let mounted = true

    if (mounted && userId) {
      (async () => {
        try {
          setLoading(true)
          const data = await getCardById(userId)
          setUserInfo(data)
          const adjustedInfoForm = adjustFormValues(infoForm, data, null)
          setInfoForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
          setFormValid(adjustedInfoForm.formValid)
          setLoading(false)
        } catch (err) {
          throw new Error(err)
        }
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  const inputChangeHandler = async (eve, key) => {
    let changeEvent
    let e = eve
    if (!e) {
      e = ''
    }
    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedInfoForm = adjustFormValues(infoForm, changeEvent, key)
    setInfoForm(adjustedInfoForm.adjustedForm)
    setFormValid(adjustedInfoForm.formValid)
    setFormTouched(true)
    setFormSaved(false)
  }

  const loadTabFormContent = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={formElements[formEl].value}
        elementOptions={formElements[formEl].elementOptions}
        touched={formElements[formEl].touched}
        valid={formElements[formEl].isValid}
        errorMessage={formElements[formEl].errorMessage}
        shouldValidate={formElements[formEl].validtationRules}
        elementSetup={formElements[formEl].elementSetup}
        changed={e => inputChangeHandler(e, formEl)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  const cleanClose = () => {
    setInfoForm(originalState)
    closeDialog()
  }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const infoFormDetails = createFormValuesObj(infoForm)
    const cardDetails = {
      ...userInfo,
      ...infoFormDetails,
    }

    try {
      setLoadingMessage(pageStatics.messages.loading.updatingVcard)
      await updateCard(userId, cardDetails)

      setFormSaved(true)
      setFormTouched(false)

      setLoading(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileInfoUpdateSuccess,
        type: 'success',
      })

      cleanClose()
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.profileInfoUpdateError,
        type: 'error',
      })
    }
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={cleanClose}
      title={`${userInfo && userInfo.firstName ? userInfo.firstName : ''} ${userInfo && userInfo.lastName ? userInfo.lastName : ''} Contacts`}
      loading={false}
      actionButtonOne={(
        <Button
          color="secondary"
          onClick={e => updateInfoHandler(e)}
          disabled={buttonDisabled}
          className={buttonClasses.defaultButton}
          style={{
            backgroundColor: !buttonDisabled && color,
          }}
        >
          {pageStatics.buttons.updateInfo}
        </Button>
      )}
    >
      <Box>
        {loading ? (
          <LoadingBackdrop loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingProfileInfo}`} />
        ) : (
          <Box>
            <Box className={`${layoutClasses.panel}`}>
              <Grid container spacing={3}>
                {loadTabFormContent(infoForm)}
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

EditInfo.defaultProps = {
  dialogOpen: false,
  userId: null,
}

EditInfo.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

export default EditInfo
