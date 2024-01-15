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

import LoadingBackdrop from '../Loading/LoadingBackdrop'
import FullScreenDialog from '../../layout/FullScreenDialog'
import FormElement from '../Ui/FormElement'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'
import { renameFile } from '../../utilities/utils'
import { getCroppedImg, getRotatedImage } from '../../utilities/canvasUtils'

import {
  getCardById, updateCard,
} from '../../API/cards'
import { getFirebaseStorage } from '../../API/firebase'

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

const EditInfo = ({
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
  const [currentImage, setCurrentImage] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [savingImage, setSavingImage] = useState(false)
  const [pictureRemoved, setPictureRemoved] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const originalState = {
    image: createFormElementObj('imageUpload', pageStatics.forms.pictureTab.image, {
      name: 'image',
      placeholder: pageStatics.forms.pictureTab.image,
      stateClass: 'cropActive',
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
  const [pictureForm, setPictureForm] = useState({ ...originalState })

  useEffect(() => {
    let mounted = true

    if (mounted && userId) {
      (async () => {
        try {
          setLoading(true)
          const data = await getCardById(userId)
          setUserInfo(data)
          if (data.image) {
            const profileStorageImage = await getFirebaseStorage().ref(`profiles/${data.image}`).getDownloadURL()
            setCurrentImage(profileStorageImage)
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

  const removePicture = e => {
    e.preventDefault()
    setPictureForm(originalState)
    setCurrentImage(null)
    setNewProfilePicture(null)
    setPictureRemoved(true)
    setFormTouched(true)
    setFormSaved(false)
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
    setCurrentImage(null)
    setImageSrc(null)
    setCrop({ x: 0, y: 0 })
    setRotation(0)
    setZoom(1)
    setPictureRemoved(false)
    setSavingImage(false)
    closeDialog()
  }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const pictureFormDetails = createFormValuesObj(pictureForm)
    const cardDetails = {
      ...userInfo,
      ...pictureFormDetails,
    }

    try {
      if (newProfilePicture) {
        setSavingImage(true)
        setLoadingMessage(pageStatics.messages.loading.uploadingNewImage)
        const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels, rotation, newProfilePictureType)
        if (userInfo.image) {
          await getFirebaseStorage().ref().child(`/profiles/${userInfo.image}`).delete()
        }
        await getFirebaseStorage().ref(`/profiles/${newProfilePicture.name}`).putString(croppedImageFile, 'data_url')
        cardDetails.image = newProfilePicture.name
        setNewProfilePicture(null)
        setPictureRemoved(false)
      } else if (pictureRemoved) {
        setSavingImage(true)
        setLoadingMessage(pageStatics.messages.loading.removingImage)
        if (userInfo.image) {
          await getFirebaseStorage().ref().child(`/profiles/${userInfo.image}`).delete()
        }
        cardDetails.image = null
        setNewProfilePicture(null)
      }

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
      title={`${userInfo && userInfo.firstName ? userInfo.firstName : ''} ${userInfo && userInfo.lastName ? userInfo.lastName : ''} Picture`}
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
          {pageStatics.buttons.updatePicture}
        </Button>
      )}
    >
      <Box>
        {loading ? (
          <LoadingBackdrop loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingProfileInfo}`} />
        ) : (
          <Box>
            <Box className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={`${layoutClasses.panel} ${userInfo && userInfo.image && !newProfilePicture ? classes.logoPanel : ''}`}>
                    {userInfo && userInfo.image && !newProfilePicture && !savingImage && !pictureRemoved && (
                      <Box className={classes.currenPictureContainerSm}>
                        <img
                          src={currentImage}
                          alt="Profile"
                        />
                      </Box>
                    )}
                    {(newProfilePicture || (savingImage && !pictureRemoved)) && (
                      <Box className={classes.cropper}>
                        <Box className={`${classes.cropContainer}`}>
                          <Cropper
                            image={imageSrc}
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
                    {((userInfo && userInfo.image && !pictureRemoved) || newProfilePicture) && (
                      <Button
                        onClick={e => removePicture(e)}
                        className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                        style={{
                          backgroundColor: color.color.code,
                        }}
                      >
                        {pageStatics.buttons.removePicture}
                      </Button>
                    )}
                  </Box>
                </Grid>
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
