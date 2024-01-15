import React, { useState, useCallback } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import imageCompression from 'browser-image-compression'
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Switch from '@material-ui/core/Switch'

import LocalOfferIcon from '@material-ui/icons/LocalOffer'

import FormElement from '../Ui/FormElement'
import NotificationDialog from '../../layout/NotificationDialog'
import LoadingBackdrop from '../Loading/LoadingBackdrop'

import { editProfileStyles } from '../../containers/EditProfile/styles'
import { layoutStyles, formStyles } from '../../theme/layout'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { renameFile, generateRandomString } from '../../utilities/utils'
import { getCroppedImg, getRotatedImage } from '../../utilities/canvasUtils'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { updateOffers } from '../../API/cards'

import { getFirebaseStorage } from '../../API/firebase'

import * as actions from '../../store/actions'

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AddOfferDialog = ({
  open, onClose, onSetNotification, onSortOffers, userId, onAddOffer,
}) => {
  const classes = editProfileStyles()
  const layoutClasses = layoutStyles()
  const formClasses = formStyles()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.offers

  const initialOfferInfoFormState = {
    title: createFormElementObj('input', `${pageStatics.forms.addOfferDialog.title}*`,
      {
        type: 'text', name: 'title', placeholder: `${pageStatics.forms.addOfferDialog.title}*`, tag: 'text',
      }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    description: createFormElementObj('textarea', pageStatics.forms.addOfferDialog.description,
      {
        type: 'text', name: 'description', placeholder: pageStatics.forms.addOfferDialog.description, tag: 'text',
      }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    tagLine: createFormElementObj('input', `${pageStatics.forms.addOfferDialog.tagLine}`,
      {
        type: 'text', name: 'tagLine', placeholder: `${pageStatics.forms.addOfferDialog.tagLine}`, tag: 'text',
      }, '', null, { required: false }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  }

  const initialOfferPriceFormState = {
    oldPrice: createFormElementObj('input', `${pageStatics.forms.addOfferDialog.oldPrice}`,
      {
        type: 'text', name: 'title', placeholder: `${pageStatics.forms.addOfferDialog.oldPrice}`, tag: 'text',
      }, '', null, { required: false }, false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    newPrice: createFormElementObj('input', `${pageStatics.forms.addOfferDialog.newPrice}`,
      {
        type: 'text', name: 'title', placeholder: `${pageStatics.forms.addOfferDialog.newPrice}`, tag: 'text',
      }, '', null, { required: false }, false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    discount: createFormElementObj('input', `${pageStatics.forms.addOfferDialog.discount}`,
      {
        type: 'text', name: 'title', placeholder: `${pageStatics.forms.addOfferDialog.discount}`, tag: 'text',
      }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  }

  const initialOfferImageFormState = {
    image: createFormElementObj('imageUpload', pageStatics.forms.addOfferDialog.image, {
      name: 'image',
      placeholder: pageStatics.forms.addOfferDialog.image,
      stateClass: 'cropActive',
      styleClass: 'light',
      withView: false,
      showLabel: false,
      label: null,
      selectButtonText: 'Upload image',
      changeButtonText: 'Change',
    },
    '',
    null,
    { required: false },
    false,
    {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
  }

  const initialOfferControlsFormState = {
    startDate: createFormElementObj('date', pageStatics.forms.addOfferDialog.startDate,
      {
        type: 'text',
        name: 'startDate',
        placeholder: pageStatics.forms.addOfferDialog.startDate,
        disablePast: true,
      },
      null,
      null,
      { required: false },
      false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    endDate: createFormElementObj('date', pageStatics.forms.addOfferDialog.endDate,
      { type: 'text', name: 'endDate', placeholder: pageStatics.forms.addOfferDialog.endDate },
      null,
      null,
      { required: false },
      false,
      {
        xs: 6,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    limit: createFormElementObj('input', `${pageStatics.forms.addOfferDialog.limit}`,
      {
        type: 'number', name: 'limit', placeholder: `${pageStatics.forms.addOfferDialog.limit}`, tag: 'text',
      }, '', null, { required: false, onlyNumber: true }, true,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  }

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [formSaved, setFormSaved] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.addingOffer)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [offerInfoForm, setOfferInfoForm] = useState({ ...initialOfferInfoFormState })
  const [offerPriceForm, setOfferPriceForm] = useState({ ...initialOfferPriceFormState })
  const [offerImageForm, setOfferImageForm] = useState({ ...initialOfferImageFormState })
  const [offerControlsForm, setOfferControlsForm] = useState({ ...initialOfferControlsFormState })
  const [offerImage, setOfferImage] = useState(false)
  const [offerImageType, setOfferImageType] = useState(false)
  const [offerImageDataUrl, setOfferImageDataUrl] = useState(null)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [offerActive, setOfferActive] = useState(true)

  const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx)
  }, [])

  const readFile = file => new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })

  const inputChangeHandler = async (eve, key) => {
    let changeEvent
    let e = eve
    if (!e) {
      e = ''
    }
    if (e && e[0] instanceof File) {
      const file = eve[0]
      const compressionOptions = {
        maxSizeMB: file.size > 8000000 ? 0.05 : 2,
        maxWidthOrHeight: 750,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, compressionOptions)
      const newPic = renameFile(compressedFile, +new Date())
      changeEvent = newPic.name
      setOfferImage(newPic)

      let imageDataUrl = await readFile(newPic)

      // apply rotation if needed
      const orientation = await getOrientation(newPic)
      const rotationAmt = ORIENTATION_TO_ANGLE[orientation]
      if (rotationAmt) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotationAmt)
      }
      setOfferImageType(newPic.type)
      setOfferImageDataUrl(imageDataUrl)
    } else if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedInfoForm = adjustFormValues(offerInfoForm, changeEvent, key)
    const adjustedPriceForm = adjustFormValues(offerPriceForm, changeEvent, key)
    const adjustedImageForm = adjustFormValues(offerImageForm, changeEvent, key)
    const adjustedControlsForm = adjustFormValues(offerControlsForm, changeEvent, key)
    setOfferInfoForm(adjustedInfoForm.adjustedForm)
    setOfferPriceForm(adjustedPriceForm.adjustedForm)
    setOfferImageForm(adjustedImageForm.adjustedForm)
    setOfferControlsForm(adjustedControlsForm.adjustedForm)
    setFormValid(adjustedInfoForm.formValid && adjustedPriceForm.formValid && adjustedImageForm.formValid && adjustedControlsForm.formValid)
    setFormTouched(true)
    setFormSaved(false)
  }

  const loadTabForm = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={formElements[formEl].value}
        elementOptions={formElements[formEl].elementOptions}
        touched={formElements[formEl].touched}
        valid={formElements[formEl].isValid}
        shouldValidate={formElements[formEl].validtationRules}
        elementSetup={formElements[formEl].elementSetup}
        errorMessage={formElements[formEl].errorMessage}
        changed={e => inputChangeHandler(e, formEl)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  const addOfferHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.addingOffer)
    setLoading(true)
    setLoadingDone(false)
    const offerInfoDetails = createFormValuesObj(offerInfoForm)
    const offerPriceDetails = createFormValuesObj(offerPriceForm)
    const offerImageDetails = createFormValuesObj(offerImageForm)
    const offerControlsDetails = createFormValuesObj(offerControlsForm)
    const offerDetails = {
      ...offerInfoDetails,
      ...offerPriceDetails,
      ...offerImageDetails,
      ...offerControlsDetails,
    }

    try {
      offerDetails.active = offerActive
      offerDetails.addedOn = new Date()
      offerDetails.code = generateRandomString(10)
      if (offerImage) {
        const croppedImageFile = await getCroppedImg(offerImageDataUrl, croppedAreaPixels, rotation, offerImageType)
        await getFirebaseStorage().ref(`/offers/${offerImage.name}`).putString(croppedImageFile, 'data_url')
        offerDetails.image = offerImage.name
      }

      await updateOffers(userId, offerDetails)
      onAddOffer(offerDetails)
      onSortOffers('desc', 'date')
      setOfferInfoForm(initialOfferInfoFormState)
      setOfferPriceForm(initialOfferPriceFormState)
      setOfferImageForm(initialOfferImageFormState)
      setOfferControlsForm(initialOfferControlsFormState)
      setTabValue(0)
      setFormTouched(false)
      onClose()

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      setLoadingMessage(pageStatics.messages.loading.addingOffer)

      onSetNotification({
        message: pageStatics.messages.notifications.offerAddedSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.offerAddedError,
        type: 'error',
      })
      throw new Error(err)
    }
  }

  const closeDialog = () => {
    onClose()
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const toggleOfferActive = () => {
    setOfferActive(prevState => !prevState)
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  if (loading) {
    return <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.addingConnection}`} />
  }

  return (
    <NotificationDialog
      type="custom"
      background="#fff"
      title={pageStatics.data.titles.addOffer.title}
      icon={<LocalOfferIcon style={{ color: '#272727' }} />}
      open={open}
      onClose={() => closeDialog()}
      actionOne={{
        clicked: e => addOfferHandler(e),
        text: pageStatics.buttons.addNewOffer,
        borderedButton: true,
        disabled: buttonDisabled,
        background: '#272727',
      }}
    >
      <Box className={`${classes.dialogContent} ${classes.formElementTextBlack}`}>
        <Box className={classes.root}>
          <Box className={`${classes.offerStatusContainer} ${formClasses.switchContainer}`}>
            <Typography variant="body1" component="p" className={formClasses.switchLabel}>
              {pageStatics.forms.addOfferDialog.offerActive}
            </Typography>
            <Switch
              edge="end"
              onChange={() => toggleOfferActive()}
              checked={offerActive}
              inputProps={{ 'aria-labelledby': 'switchListLabel_offerActive' }}
            />
          </Box>
          <AppBar position="relative" className={layoutClasses.tabsHeader}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              aria-label="links tabs"
              centered
              TabIndicatorProps={{
                style: {
                  backgroundColor: color.color.code,
                },
              }}
            >
              <Tab label={pageStatics.data.tabs.info} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonLeft}`} style={{ color: '#272727' }} {...a11yProps(0)} />
              <Tab label={pageStatics.data.tabs.price} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonRight}`} style={{ color: '#272727' }} {...a11yProps(1)} />
              <Tab label={pageStatics.data.tabs.image} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonRight}`} style={{ color: '#272727' }} {...a11yProps(2)} />
              <Tab label={pageStatics.data.tabs.controls} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonRight}`} style={{ color: '#272727' }} {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <div
            role="tabpanel"
            hidden={tabValue !== 0}
            id="simple-tabpanel-0"
            className={layoutClasses.tabPanelContainer}
            aria-labelledby="simple-tab-0"
          >
            <Grid container spacing={3}>
              {tabValue === 0 && loadTabForm(offerInfoForm)}
            </Grid>
          </div>
          <div
            role="tabpanel"
            hidden={tabValue !== 1}
            id="simple-tabpanel-1"
            className={layoutClasses.tabPanelContainer}
            aria-labelledby="simple-tab-1"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <Typography variant="body1" align="center" component="p" className={layoutClasses.panelText} style={{ textAlign: 'center' }}>
                    {pageStatics.data.description.priceTap}
                  </Typography>
                </Box>
              </Grid>
              {tabValue === 1 && loadTabForm(offerPriceForm)}
            </Grid>
          </div>
          <div
            role="tabpanel"
            hidden={tabValue !== 2}
            id="simple-tabpanel-2"
            className={layoutClasses.tabPanelContainer}
            aria-labelledby="simple-tab-2"
          >
            {tabValue === 2 && (
              <>
                {loadTabForm(offerImageForm)}
                <Box mb={2}>
                  <Typography variant="body1" align="center" component="p" className={layoutClasses.panelText} style={{ textAlign: 'center' }}>
                    {pageStatics.data.description.imageTap}
                  </Typography>
                </Box>
                <Box>
                  {offerImage && (
                    <Box className={classes.cropper}>
                      <Box className={classes.cropContainer}>
                        <Cropper
                          image={offerImageDataUrl}
                          crop={crop}
                          zoom={zoom}
                          rotation={rotation}
                          aspect={2 / 1}
                          onCropChange={setCrop}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                          onRotationChange={setRotation}
                        />
                      </Box>
                      <Box className={classes.controls}>
                        <Box className={classes.sliderContainer}>
                          <Typography
                            variant="overline"
                            classes={{ root: classes.sliderLabel }}
                            style={{ color: '#272727' }}
                          >
                            Zoom
                          </Typography>
                          <Slider
                            value={zoom}
                            min={1}
                            max={3}
                            step={0.1}
                            aria-labelledby="Zoom"
                            onChange={(e, zoomNu) => setZoom(zoomNu)}
                            classes={{
                              root: classes.sliderRoot,
                              thumb: classes.sliderThumb,
                              track: classes.sliderTrack,
                              rail: classes.sliderRail,
                              mark: classes.sliderMark,
                              markActive: classes.markActive,
                            }}
                          />
                        </Box>
                        <Box className={classes.sliderContainer}>
                          <Typography
                            variant="overline"
                            classes={{ root: classes.sliderLabel }}
                            style={{ color: '#272727' }}
                          >
                            Rotate
                          </Typography>
                          <Slider
                            value={rotation}
                            min={0}
                            max={360}
                            step={1}
                            aria-labelledby="Rotation"
                            classes={{
                              root: classes.sliderRoot,
                              thumb: classes.sliderThumb,
                              track: classes.sliderTrack,
                              rail: classes.sliderRail,
                              mark: classes.sliderMark,
                              markActive: classes.markActive,
                            }}
                            onChange={(e, rotationNu) => setRotation(rotationNu)}
                          />
                        </Box>
                      </Box>
                    </Box>
                  )}
                </Box>
              </>
            )}
          </div>
          <div
            role="tabpanel"
            hidden={tabValue !== 3}
            id="simple-tabpanel-3"
            className={layoutClasses.tabPanelContainer}
            aria-labelledby="simple-tab-3"
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <Typography variant="body1" align="center" component="p" className={layoutClasses.panelText} style={{ textAlign: 'center' }}>
                    {pageStatics.data.description.controlsTap}
                  </Typography>
                </Box>
              </Grid>
              {tabValue === 3 && loadTabForm(offerControlsForm)}
            </Grid>
          </div>
        </Box>
      </Box>
    </NotificationDialog>
  )
}

const mapDispatchToProps = dispatch => ({
  onAddOffer: offerObj => dispatch(actions.addOffer(offerObj)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onSortOffers: (value, type) => dispatch(actions.sortOffers(value, type)),
})

AddOfferDialog.defaultProps = {
  open: false,
  userId: null,
}

AddOfferDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
  onSortOffers: PropTypes.func.isRequired,
  onAddOffer: PropTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(AddOfferDialog)
