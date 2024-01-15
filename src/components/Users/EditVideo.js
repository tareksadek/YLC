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

const EditVideo = ({
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
    bioVideo: createFormElementObj('video', 'Video Url',
      { type: 'text', name: 'email', placeholder: 'Video Url' },
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
  const [bioForm, setBioForm] = useState({ ...originalState })

  useEffect(() => {
    let mounted = true

    if (mounted && userId) {
      (async () => {
        try {
          setLoading(true)
          const data = await getCardById(userId)
          setUserInfo(data)
          const adjustedBioForm = adjustFormValues(bioForm, data, null)
          setBioForm(prevForm => ({ ...prevForm, ...adjustedBioForm.adjustedForm }))
          setFormValid(adjustedBioForm.formValid)
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

    const adjustedInfoForm = adjustFormValues(bioForm, changeEvent, key)
    setBioForm(adjustedInfoForm.adjustedForm)
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
    setBioForm(originalState)
    closeDialog()
  }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const infoFormDetails = createFormValuesObj(bioForm)
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
      title={`${userInfo && userInfo.firstName ? userInfo.firstName : ''} ${userInfo && userInfo.lastName ? userInfo.lastName : ''} Video`}
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
          {pageStatics.buttons.updateBio}
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
                {loadTabFormContent(bioForm)}
              </Grid>
            </Box>
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

EditVideo.defaultProps = {
  dialogOpen: false,
  userId: null,
}

EditVideo.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

export default EditVideo
