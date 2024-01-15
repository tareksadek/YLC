import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import GoogleMapReact from 'google-map-react'
import Geocode from 'react-geocode'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import RoomIcon from '@material-ui/icons/Room'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import FormElement from '../Ui/FormElement'
import Alert from '../../layout/Alert'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import {
  getCardById, updateCard,
} from '../../API/cards'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { editProfileStyles } from '../../containers/EditProfile/styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

import { GOOGLE_MAPS_KEY } from '../../utilities/appVars'

const EditContacts = ({
  closeDialog, dialogOpen, onSetNotification, userId,
}) => {
  const classes = editProfileStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile
  Geocode.setApiKey(GOOGLE_MAPS_KEY)

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading')
  const [formSaved, setFormSaved] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [markerPos, setMarkerPos] = useState(null)
  const [addressError, setAddressError] = useState(false)
  const originalState = {
    email: createFormElementObj('input', pageStatics.forms.contactTab.email,
      { type: 'text', name: 'email', placeholder: pageStatics.forms.contactTab.email },
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
    workPhone: createFormElementObj('input', pageStatics.forms.contactTab.workPhone,
      { type: 'tel', name: 'workPhone', placeholder: pageStatics.forms.contactTab.workPhone },
      '',
      null,
      { required: false, onlyNumber: true },
      true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    workFax: createFormElementObj('input', pageStatics.forms.contactTab.workFax,
      { type: 'tel', name: 'workfax', placeholder: pageStatics.forms.contactTab.workFax },
      '',
      null,
      { required: false, onlyNumber: true },
      true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    homePhone: createFormElementObj('input', pageStatics.forms.contactTab.homePhone,
      {
        type: 'tel',
        name: 'homePhone',
        placeholder: pageStatics.forms.contactTab.homePhone,
        help: pageStatics.forms.contactTab.homePhoneHelp,
      },
      '',
      null,
      { required: false, onlyNumber: true },
      true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    address: createFormElementObj('input', pageStatics.forms.contactTab.address,
      {
        type: 'text',
        name: 'address',
        placeholder: pageStatics.forms.contactTab.address,
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
  }
  const [contactsForm, setContactsForm] = useState({ ...originalState })

  useEffect(() => {
    let mounted = true

    if (mounted && userId) {
      (async () => {
        try {
          setLoading(true)
          const data = await getCardById(userId)
          setUserInfo(data)
          if (data.marker) {
            setMarkerPos(data.marker)
          }
          const adjustedInfoForm = adjustFormValues(contactsForm, data, null)
          setContactsForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
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

    const adjustedInfoForm = adjustFormValues(contactsForm, changeEvent, key)
    setContactsForm(adjustedInfoForm.adjustedForm)
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

  const getCoordinatesFromAddress = async address => {
    setAddressError(false)
    try {
      const directions = await Geocode.fromAddress(address)
      const { lat, lng } = directions.results[0].geometry.location
      return {
        lat,
        lng,
      }
    } catch (err) {
      setAddressError(true)
    }
    return null
  }

  const showOnMap = async e => {
    e.preventDefault()
    setAddressError(false)
    try {
      const infoFormDetails = createFormValuesObj(contactsForm)
      const { address } = infoFormDetails
      const coordinates = await getCoordinatesFromAddress(address)
      if (coordinates) {
        setMarkerPos(coordinates)
      }
    } catch (err) {
      setAddressError(true)
    }
  }

  const cleanClose = () => {
    setContactsForm(originalState)
    setMarkerPos(null)
    setAddressError(false)
    closeDialog()
  }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const contactFormDetails = createFormValuesObj(contactsForm)
    const { address } = contactFormDetails
    if (address && address !== '') {
      const coordinates = await getCoordinatesFromAddress(address)
      if (coordinates) {
        setMarkerPos(coordinates)
        contactFormDetails.marker = coordinates
      } else {
        contactFormDetails.marker = null
      }
    }
    const cardDetails = {
      ...userInfo,
      ...contactFormDetails,
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
          {pageStatics.buttons.updateContact}
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
                {loadTabFormContent(contactsForm)}
              </Grid>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Button
                  color="secondary"
                  onClick={e => showOnMap(e)}
                  className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                  disabled={(!contactsForm.address.value || contactsForm.address.value === '') && !markerPos}
                >
                  {pageStatics.buttons.showOnMap}
                </Button>
              </Box>
              {addressError && (
                <Box mt={2}>
                  <Alert
                    title={pageStatics.messages.notifications.wrongAddress.title}
                    description={pageStatics.messages.notifications.wrongAddress.body}
                    type="warning"
                  />
                </Box>
              )}
              {markerPos && !addressError && (
                <Box className={classes.mapContainer}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: GOOGLE_MAPS_KEY }}
                    yesIWantToUseGoogleMapApiInternals
                    defaultCenter={markerPos}
                    defaultZoom={15}
                  >
                    <RoomIcon
                      style={{ color: '#272727', fontSize: 36 }}
                      className={classes.mapMarker}
                      lat={markerPos.lat}
                      lng={markerPos.lng}
                    />
                  </GoogleMapReact>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

EditContacts.defaultProps = {
  dialogOpen: false,
  userId: null,
}

EditContacts.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

export default EditContacts
