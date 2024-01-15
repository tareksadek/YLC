import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import { connect } from 'react-redux'

import imageCompression from 'browser-image-compression'
import Cropper from 'react-easy-crop'
import { getOrientation } from 'get-orientation/browser'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

import FormElement from '../../components/Ui/FormElement'
import InfoBox from '../../components/Ui/InfoBox'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'
import PageTitle from '../../layout/PageTitle'
import SkeletonContainer from '../../layout/SkeletonContainer'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { editProfileStyles } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'
import { getCroppedImg, getRotatedImage } from '../../utilities/canvasUtils'

import { updateCard } from '../../API/cards'
import { getFirebaseStorage } from '../../API/firebase'
import { useColor } from '../../hooks/useDarkMode'
import { useAuth } from '../../hooks/use-auth'

import { renameFile } from '../../utilities/utils'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
}

const Picture = ({
  cardData, onSetNotification, switchTheme, onUpdateCard, activeProfileId,
}) => {
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile
  // const { cardId } = useParams()
  const auth = useAuth()
  const userId = auth.user.uid
  // const profileId = auth.user.uid !== cardId && auth.superAdminStatus ? cardId : userId
  // const profileId = userId
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix
  const classes = editProfileStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.updatingProfilePicture)
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [newProfilePictureType, setNewProfilePictureType] = useState(null)
  // const [existingVcard, setExistingVcard] = useState(null)
  // const [newVcardName, setNewVcardName] = useState(cardData && cardData.urlSuffix ? `${language.languageVars.appNameCAPS}_${cardData.urlSuffix}.vcf` : null)
  const [formSaved, setFormSaved] = useState(false)
  // const [profileData, setProfileData] = useState(cardData || null)
  const [loadingCurrentImage, setLoadingCurrentImage] = useState(false)
  const [currentImage, setCurrentImage] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [savingImage, setSavingImage] = useState(false)
  const [pictureRemoved, setPictureRemoved] = useState(false)
  const defaultPictureForm = {
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
  const [pictureForm, setPictureForm] = useState({ ...defaultPictureForm })

  useEffect(() => {
    let mounted = true

    if ((mounted && cardData.userId && !cardData.loading)) {
      (async () => {
        // setLoading(true)
        // const data = await onLoadCardByUserId(userId)
        // setProfileData(data)
        const adjustedPictureForm = await adjustFormValues(pictureForm, cardData, null)
        if (cardData.image) {
          const profileStorageImage = await getFirebaseStorage().ref(`profiles/${cardData.image}`).getDownloadURL()
          setCurrentImage(profileStorageImage)
        }
        // if (data.vCardFile) {
        //   setExistingVcard(data.vCardFile)
        // }
        setPictureForm(prevForm => ({ ...prevForm, ...adjustedPictureForm.adjustedForm }))
        setFormValid(adjustedPictureForm.formValid)
        // setNewVcardName(`${language.languageVars.appNameCAPS}_${data.urlSuffix}.vcf`)
        // setLoadingDone(true)
        // setTimeout(() => setLoading(false), 1000)
      })()
    }

    if (mounted && cardData.image && !cardData.loading) {
      (async () => {
        setLoadingCurrentImage(true)
        const profileStorageImage = await getFirebaseStorage().ref(`profiles/${cardData.image}`).getDownloadURL()
        setLoadingCurrentImage(false)
        setCurrentImage(profileStorageImage)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData])

  useEffect(() => {
    if (window.localStorage.getItem('originalTheme')) {
      switchTheme(window.localStorage.getItem('originalTheme'))
    }
  }, [switchTheme])

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
    setPictureForm(defaultPictureForm)
    setCurrentImage(null)
    setNewProfilePicture(null)
    setPictureRemoved(true)
    setFormTouched(true)
    setFormSaved(false)
  }

  const updateCardHandler = async e => {
    e.preventDefault()
    setLoadingMessage(pageStatics.messages.loading.analyzingImageFile)
    setLoadingDone(false)
    setLoading(true)
    const data = { ...cardData }
    const pictureFormDetails = createFormValuesObj(pictureForm)
    const cardDetails = {
      ...data,
      ...pictureFormDetails,
    }
    try {
      if (newProfilePicture) {
        setSavingImage(true)
        setLoadingMessage(pageStatics.messages.loading.uploadingNewImage)
        const croppedImageFile = await getCroppedImg(imageSrc, croppedAreaPixels, rotation, newProfilePictureType, null, 1100)
        if (cardData.image) {
          await getFirebaseStorage().ref().child(`/profiles/${cardData.image}`).delete()
        }
        await getFirebaseStorage().ref(`/profiles/${newProfilePicture.name}`).putString(croppedImageFile, 'data_url')
        cardDetails.image = newProfilePicture.name
        setNewProfilePicture(null)
        setPictureRemoved(false)
      } else if (pictureRemoved) {
        setSavingImage(true)
        setLoadingMessage(pageStatics.messages.loading.removingImage)
        if (cardData.image) {
          await getFirebaseStorage().ref().child(`/profiles/${cardData.image}`).delete()
        }
        cardDetails.image = null
        setNewProfilePicture(null)
      }

      setLoadingMessage(pageStatics.messages.loading.updatingVcard)
      await updateCard(activeProfileId || userId, cardDetails)

      await onUpdateCard({ image: newProfilePicture ? newProfilePicture.name : null })

      setFormSaved(true)
      setFormTouched(false)
      setSavingImage(false)

      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)

      onSetNotification({
        message: pageStatics.messages.notifications.profilePictureUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.profilePictureUpdateError,
        type: 'error',
      })
    }
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

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  // if (auth.user && userId !== cardId && !auth.superAdminStatus) {
  //   return <Redirect to="/auth" />
  // }

  if (!cardData.userId || cardData.loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.teamPicture}>
          <Box>
            <InfoBox infoList={[pageStatics.messages.info.teamPicture.first]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', width: 250, height: 150 },
              ]}
              />
            </Box>
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingProfilePicture} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingProfilePicture}`} boxed />}
      <Prompt
        when={!buttonDisabled}
        message={pageStatics.messages.notifications.savePrompt}
      />
      <Header title={pageStatics.data.titles.teamPicture}>
        <Box>
          <InfoBox infoList={[pageStatics.messages.info.teamPicture.first]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <form>
            <Box className={classes.root}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={`${layoutClasses.panel} ${cardData && cardData.image && !newProfilePicture ? classes.logoPanel : ''}`}>
                    <PageTitle
                      title={cardData && cardData.image && !newProfilePicture ? pageStatics.data.titles.currentImage : pageStatics.data.titles.addImage}
                    />
                    <Box mb={2}>
                      <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                        {pageStatics.data.description.picturePanel}
                      </Typography>
                    </Box>
                    {cardData && cardData.image && !newProfilePicture && !savingImage && !pictureRemoved && (
                      <Box className={classes.currenPictureContainerSm}>
                        {loadingCurrentImage && <CircularProgress className={layoutClasses.centeredCircularProgress} size={20} color="primary" />}
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
                    {((cardData && cardData.image && !pictureRemoved) || newProfilePicture) && (
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
            <Box className={classes.editButtonContainer}>
              <Button
                color="secondary"
                onClick={e => updateCardHandler(e)}
                disabled={buttonDisabled}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: !buttonDisabled && color.color.code,
                  minWidth: '250px',
                }}
              >
                {pageStatics.buttons.updateTeamBanner}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  activeProfileId: state.profiles.activeProfileId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCardByUserId: userId => dispatch(actions.loadCardByUserId(userId)),
  onUpdateCard: newData => dispatch(actions.updateCard(newData)),
})

Picture.defaultProps = {
  cardData: null,
  activeProfileId: null,
}

Picture.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  // onLoadCardByUserId: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onUpdateCard: PropTypes.func.isRequired,
  activeProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Picture)
