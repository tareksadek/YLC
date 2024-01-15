import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import imageCompression from 'browser-image-compression'
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import FormElement from '../Ui/FormElement'
import NotificationDialog from '../../layout/NotificationDialog'

import { createFormElementObj, adjustFormValues } from '../../utilities/form'
import { renameFile } from '../../utilities/utils'
import { getCroppedImg, getRotatedImage } from '../../utilities/canvasUtils'

import {
  getCardById, updateCard,
} from '../../API/cards'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { editProfileStyles } from '../../containers/EditProfile/styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
}

const EditLogo = ({
  closeDialog, dialogOpen, onSetNotification, userId,
}) => {
  const classes = editProfileStyles()
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
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [newProfilePictureType, setNewProfilePictureType] = useState(null)
  const [currentImageCode, setCurrentImageCode] = useState(null)
  const [currentImageType, setCurrentImageType] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [logoRemoved, setLogoRemoved] = useState(false)
  const [logoStyle, setlogoStyle] = useState('square')
  const [logoStyleChanged, setLogoStyleChanged] = useState(false)
  const [noLogoDialogOpen, setNoLogoDialogOpen] = useState(false)
  const [savingImage, setSavingImage] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const originalState = {
    logo: createFormElementObj('imageUpload', pageStatics.forms.pictureTab.image, {
      name: 'logo',
      placeholder: pageStatics.forms.pictureTab.image,
      stateClass: null,
      withView: false,
      showLabel: false,
      label: null,
      selectButtonText: 'Upload image',
      changeButtonText: 'Change',
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
  const [pictureForm, setPictureForm] = useState({ ...originalState })

  useEffect(() => {
    let mounted = true

    if (mounted && !logoStyleChanged && userId) {
      (async () => {
        try {
          setLoading(true)
          const data = await getCardById(userId)
          setUserInfo(data)
          if (data.logo && data.logo.code) {
            setCurrentImageCode(data.logo.code)
            setCurrentImageType(data.logo.type)
            setlogoStyle(data.logo.style || 'square')
          }
          const adjustedInfoForm = adjustFormValues(pictureForm, data, null)
          setPictureForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
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

  const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx)
  }, [])

  const readFile = file => new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })

  const closeNoLogoDialogHandler = () => {
    setNoLogoDialogOpen(false)
  }

  const openNoLogoDialogHandler = () => {
    setNoLogoDialogOpen(true)
  }

  const handleLogoStyle = e => {
    if ((!currentImageCode && !newProfilePicture) || logoRemoved) {
      openNoLogoDialogHandler()
      return
    }
    setlogoStyle(e.target.value)
    setFormTouched(true)
    setFormValid(true)
    setFormSaved(false)
    setLogoStyleChanged(true)
  }

  const onFileChange = async (eve, key) => {
    if (eve && eve[0] instanceof File) {
      const file = eve[0]
      const compressionOptions = {
        maxSizeMB: file.size > 8000000 ? 0.05 : 2,
        maxWidthOrHeight: 550,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(file, compressionOptions)

      const newPic = renameFile(compressedFile, +new Date())
      setNewProfilePicture(newPic)

      let imageDataUrl = await readFile(newPic)

      // apply rotation if needed
      const orientation = await getOrientation(newPic)
      const rotationAmt = ORIENTATION_TO_ANGLE[orientation]
      if (rotationAmt) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotationAmt)
      }
      setNewProfilePictureType(newPic.type)
      setImageSrc(imageDataUrl)
      const adjustedPictureForm = adjustFormValues(pictureForm, newPic.name, key)
      setPictureForm(adjustedPictureForm.adjustedForm)
      setFormValid(adjustedPictureForm.formValid)
      setFormTouched(true)
      setFormSaved(false)
    }
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
        changed={e => onFileChange(e, formEl)}
        grid={formElements[formEl].grid}
        disabled={loading}
        key={formEl + i}
      />
    ))

    return form
  }

  const cleanClose = () => {
    setPictureForm(originalState)
    setNewProfilePicture(null)
    setNewProfilePictureType(null)
    setCurrentImageCode(null)
    setCurrentImageType(null)
    setImageSrc(null)
    setCrop({ x: 0, y: 0 })
    setRotation(0)
    setZoom(1)
    setlogoStyle('square')
    setLogoStyleChanged(false)
    setNoLogoDialogOpen(false)
    setSavingImage(false)
    closeDialog()
  }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoading(true)
    // const pictureFormDetails = createFormValuesObj(pictureForm)
    const cardDetails = {
      ...userInfo,
    }

    try {
      let imageCode = null
      if (newProfilePicture) {
        setSavingImage(true)
        const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels, rotation, newProfilePictureType)
        if (newProfilePictureType === 'image/png') {
          imageCode = croppedImageFile.split('data:image/png;base64,').pop()
        } else {
          imageCode = `/9j/${croppedImageFile.split('/9j/').pop()}`
        }
        setLoadingMessage(pageStatics.messages.loading.analyzingImageFile)
        cardDetails.logo = {}
        cardDetails.logo.code = imageCode
        cardDetails.logo.type = newProfilePictureType

        setLoadingMessage(pageStatics.messages.loading.uploadingNewImage)
        setNewProfilePicture(null)
      }
      cardDetails.logo.style = logoStyle

      if (logoRemoved) {
        cardDetails.logo.code = null
        cardDetails.logo.type = null
      }

      setLoadingMessage(pageStatics.messages.loading.updatingVcard)
      await updateCard(userId, cardDetails)

      setCurrentImageCode(cardDetails.logo ? cardDetails.logo.code : null)
      setCurrentImageType(cardDetails.logo ? cardDetails.logo.type : null)

      setPictureForm(prevForm => ({
        ...prevForm,
        logo: {
          ...prevForm.logo,
          elementSetup: {
            ...prevForm.logo.elementSetup,
            stateClass: null,
          },
        },
      }))

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

  const removeLogoHandler = () => {
    setLogoRemoved(true)
    setFormTouched(true)
    setFormValid(true)
    setFormSaved(false)
  }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  return (
    <FullScreenDialog
      open={dialogOpen}
      onClose={cleanClose}
      title={`${userInfo && userInfo.firstName ? userInfo.firstName : ''} ${userInfo && userInfo.lastName ? userInfo.lastName : ''} Logo`}
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
          {pageStatics.buttons.updateLogo}
        </Button>
      )}
    >
      <Box>
        {loading ? (
          <LoadingBackdrop loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingProfileInfo}`} />
        ) : (
          <Box>
            <Box className={classes.logoContainer}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={`${layoutClasses.panel} ${userInfo && userInfo.logo && userInfo.logo.code && !newProfilePicture && !logoRemoved ? classes.logoPanel : ''}`}>
                    {userInfo && userInfo.logo && userInfo.logo.code && !newProfilePicture && !logoRemoved && !savingImage && (
                      <Box className={`${classes.currenLogoContainerSm} ${logoStyle === 'circle' ? classes.currenLogoContainerSmCircle : ''}`}>
                        <img
                          src={
                            `data:${userInfo && userInfo.logo && userInfo.logo.type ? userInfo.logo.type : currentImageType}
                            ;base64,${userInfo && userInfo.logo && userInfo.logo.code ? userInfo.logo.code : currentImageCode}`
                          }
                          alt="Profile"
                        />
                      </Box>
                    )}
                    {(newProfilePicture || savingImage) && (
                      <Box className={classes.cropper}>
                        <Box className={`${classes.cropContainer} ${logoStyle === 'circle' ? classes.circleCropContainer : ''}`}>
                          <Cropper
                            image={imageSrc}
                            crop={crop}
                            zoom={zoom}
                            rotation={rotation}
                            aspect={1 / 1}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                            onRotationChange={setRotation}
                          />
                        </Box>
                        {!loading && (
                          <Box className={classes.controls}>
                            <Box className={classes.sliderContainer}>
                              <Typography
                                variant="overline"
                                classes={{ root: classes.sliderLabel }}
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
                        )}
                      </Box>
                    )}
                    {loadTabFormContent(pictureForm)}
                    {userInfo && userInfo.logo && userInfo.logo.code && !newProfilePicture && !logoRemoved && (
                      <Button
                        color="secondary"
                        onClick={e => removeLogoHandler(e)}
                        className={`${buttonClasses.defaultButton} ${classes.removeLogoButton} ${layoutClasses.panelButton}`}
                        style={{
                          color: color.color.code,
                          borerColor: color.color.code,
                        }}
                        disabled={loading}
                      >
                        {pageStatics.buttons.removeLogo}
                      </Button>
                    )}
                  </Box>
                  {userInfo && (
                    <Box className={`${layoutClasses.panel}`}>
                      <Box className={classes.logoStyleContainer}>
                        <FormControl component="fieldset">
                          <RadioGroup aria-label="logoStyle" name="logoStyle" value={logoStyle} onChange={handleLogoStyle}>
                            <FormControlLabel value="square" control={<Radio disabled={loading} />} label="Square" />
                            <FormControlLabel value="circle" control={<Radio disabled={loading} />} label="Circle" />
                          </RadioGroup>
                        </FormControl>
                      </Box>
                    </Box>
                  )}
                </Grid>
              </Grid>
              <NotificationDialog
                open={noLogoDialogOpen}
                onClose={closeNoLogoDialogHandler}
                title={pageStatics.messages.notifications.noLogo.title}
                type="warning"
              >
                <Box>
                  <Typography variant="body1" align="center" component="p">
                    {pageStatics.messages.notifications.noLogo.description}
                  </Typography>
                </Box>
              </NotificationDialog>
            </Box>
          </Box>
        )}
      </Box>
    </FullScreenDialog>
  )
}

EditLogo.defaultProps = {
  dialogOpen: false,
  userId: null,
}

EditLogo.propTypes = {
  dialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  userId: PropTypes.string,
}

export default EditLogo
