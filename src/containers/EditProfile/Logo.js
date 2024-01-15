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
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'

import FormElement from '../../components/Ui/FormElement'
import InfoBox from '../../components/Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'
import NotificationDialog from '../../layout/NotificationDialog'
import SkeletonContainer from '../../layout/SkeletonContainer'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { editProfileStyles } from './styles'

import { createFormElementObj, adjustFormValues } from '../../utilities/form'
import { getCroppedImg, getRotatedImage } from '../../utilities/canvasUtils'

import { updateCard } from '../../API/cards'
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

const Logo = ({
  cardData, onSetNotification, onUpdateCard, activeProfileId,
}) => {
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile
  // const { cardId } = useParams()
  const auth = useAuth()
  const userId = auth.user.uid
  // const profileId = auth.user.uid !== cardId && auth.superAdminStatus ? cardId : userId
  // const profileId = userId
  // const isMaster = auth.accountType === 'master'
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const classes = editProfileStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.updatingLogo)
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [newProfilePictureType, setNewProfilePictureType] = useState(null)
  const [formSaved, setFormSaved] = useState(false)
  // const [profileData, setProfileData] = useState(cardData || null)
  const [currentImageCode, setCurrentImageCode] = useState(null)
  const [currentImageType, setCurrentImageType] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [logoRemoved, setLogoRemoved] = useState(false)
  const [logoStyle, setlogoStyle] = useState('circle')
  const [logoStyleChanged, setLogoStyleChanged] = useState(false)
  const [noLogoDialogOpen, setNoLogoDialogOpen] = useState(false)
  const [savingImage, setSavingImage] = useState(false)
  const [pictureForm, setPictureForm] = useState({
    logo: createFormElementObj('imageUpload', pageStatics.forms.pictureTab.image, {
      name: 'logo',
      placeholder: pageStatics.forms.pictureTab.image,
      stateClass: null,
      withView: false,
      showLabel: false,
      label: null,
      selectButtonText: 'Upload image',
      changeButtonText: 'Change image',
    },
    '',
    null,
    { required: false },
    !!cardData.userId,
    {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
  })

  useEffect(() => {
    if ((!logoStyleChanged && cardData.userId && !cardData.loading)) {
      // setLoading(true)
      // const data = await onLoadCardByUserId(userId)
      // setProfileData(data)
      const adjustedPictureForm = adjustFormValues(pictureForm, cardData, null)
      if (cardData.logo && cardData.logo.code) {
        setCurrentImageCode(cardData.logo.code)
        setCurrentImageType(cardData.logo.type)
        setlogoStyle(cardData.logo.style || 'circle')
      }
      setPictureForm(prevForm => ({ ...prevForm, ...adjustedPictureForm.adjustedForm }))
      setFormValid(adjustedPictureForm.formValid)
      // setLoadingDone(true)
      // setTimeout(() => setLoading(false), 1000)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData, formSaved])

  // useEffect(() => {
  //   let mounted = true
  //
  //   if (mounted) {
  //     (async () => {
  //       if (auth.accountType === 'master' && invitationCode) {
  //         await onLoadTeamMembers(invitationCode)
  //       }
  //     })()
  //   }
  //
  //   return () => { mounted = false }
  // }, [auth.accountType, onLoadTeamMembers, invitationCode])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

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

  const timer = ms => new Promise(res => setTimeout(res, ms))

  // const updateTeamData = async dataFromMaster => {
  //   let updatedData = null
  //   let memberDetails = null
  //   for (let i = 0; i < teamMembers.length; i += 1) {
  //     try {
  //       /* eslint-disable no-await-in-loop */
  //       setLoadingDone(false)
  //       await timer(1000)
  //       setLoadingMessage(`${pageStatics.messages.loading.updatingTeamMember.first} ${i + 1} ${pageStatics.messages.loading.updatingTeamMember.second} ${teamMembers.length}`)
  //       updatedData = {
  //         logo: dataFromMaster,
  //       }
  //       memberDetails = {
  //         ...teamMembers[i],
  //         ...updatedData,
  //       }
  //
  //       await updateCard(teamMembers[i].userId, memberDetails)
  //       setLoadingDone(true)
  //       await timer(1000)
  //     } catch (err) {
  //       onSetNotification({
  //         message: pageStatics.messages.notifications.logoUpdateError,
  //         type: 'error',
  //       })
  //     }
  //   }
  // }

  const updateCardHandler = async e => {
    e.preventDefault()
    setLoadingDone(false)
    setLoading(true)
    const data = { ...cardData }
    // const pictureFormDetails = createFormValuesObj(pictureForm)
    const cardDetails = {
      ...data,
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

        // if (isMaster) {
        //   cardDetails.teamData = {
        //     ...data.teamData,
        //     logo: {
        //       code: imageCode,
        //       type: newProfilePictureType,
        //     },
        //   }
        // }
        setLoadingMessage(pageStatics.messages.loading.uploadingNewImage)
        setNewProfilePicture(null)
      }
      cardDetails.logo.style = logoStyle
      // if (isMaster) {
      //   cardDetails.teamData.logo.style = logoStyle
      // }

      if (logoRemoved) {
        cardDetails.logo.code = null
        cardDetails.logo.type = null
        // if (isMaster) {
        //   cardDetails.teamData.logo = null
        // }
      }

      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ logo: cardDetails.logo ? { ...cardDetails.logo } : null })
      setCurrentImageCode(cardDetails.logo ? cardDetails.logo.code : null)
      setCurrentImageType(cardDetails.logo ? cardDetails.logo.type : null)

      setLoadingDone(true)
      await timer(1000)

      setLoadingMessage(pageStatics.messages.loading.updatingLogo)
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
      setSavingImage(false)

      setTimeout(() => setLoading(false), 1000)

      onSetNotification({
        message: pageStatics.messages.notifications.logoUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.logoUpdateError,
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

  // const onFileChange = async (eve, key) => {
  //   if (eve && eve[0] instanceof File) {
  //     const file = eve[0]
  //     const compressionOptions = {
  //       maxSizeMB: file.size > 8000000 ? 0.05 : 2,
  //       maxWidthOrHeight: 550,
  //       useWebWorker: true,
  //     }
  //     const compressedFile = await imageCompression(file, compressionOptions)

  //     const newPic = renameFile(compressedFile, +new Date())
  //     setNewProfilePicture(newPic)

  //     let imageDataUrl = await readFile(newPic)

  //     // apply rotation if needed
  //     const orientation = await getOrientation(newPic)
  //     const rotationAmt = ORIENTATION_TO_ANGLE[orientation]
  //     if (rotationAmt) {
  //       imageDataUrl = await getRotatedImage(imageDataUrl, rotationAmt)
  //     }
  //     setNewProfilePictureType(newPic.type)
  //     setImageSrc(imageDataUrl)
  //     const adjustedPictureForm = adjustFormValues(pictureForm, newPic.name, key)
  //     adjustedPictureForm.adjustedForm.logo.elementSetup.stateClass = 'cropActive'
  //     setPictureForm(adjustedPictureForm.adjustedForm)
  //     setFormValid(adjustedPictureForm.formValid)
  //     setFormTouched(true)
  //     setFormSaved(false)
  //     setLogoRemoved(false)
  //   }
  // }

  const readImageDimensions = file => new Promise(resolve => {
    const image = new Image();
    image.onload = () => {
      resolve({ width: image.width, height: image.height })
    };
    image.src = URL.createObjectURL(file)
  })

  const onFileChange = async (eve, key) => {
    if (eve && eve[0] instanceof File) {
      const file = eve[0]
      const compressionOptions = {
        maxSizeMB: file.size > 8000000 ? 0.05 : 2,
        maxWidthOrHeight: 1100,
        useWebWorker: true,
      }
      const { width, height } = await readImageDimensions(file)
      if (width < compressionOptions.maxWidthOrHeight || height < compressionOptions.maxWidthOrHeight) {
        compressionOptions.maxWidthOrHeight = Math.max(width, height)
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
      adjustedPictureForm.adjustedForm.logo.elementSetup.stateClass = 'cropActive'
      setPictureForm(adjustedPictureForm.adjustedForm)
      setFormValid(adjustedPictureForm.formValid)
      setFormTouched(true)
      setFormSaved(false)
      setLogoRemoved(false)
    }
  }

  const loadTabFormContent = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => (
      <FormElement
        elementType={formElements[formEl].elementType}
        label={formElements[formEl].elementLabel}
        value={!logoRemoved ? `data:${currentImageType};base64,${currentImageCode}` : null}
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
        <Header title={pageStatics.data.titles.logo}>
          <Box>
            <InfoBox infoList={[
              pageStatics.messages.info.logo.first,
              ...auth.accountType === 'master' ? [pageStatics.messages.info.logo.master] : [],
            ]}
            />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'circle', width: 150, height: 150 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'circle', width: 50, height: 50 },
                { variant: 'circle', width: 50, height: 50 },
              ]}
              />
            </Box>
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingLogo} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingLogo}`} boxed />}
      <Prompt
        when={!buttonDisabled}
        message={pageStatics.messages.notifications.savePrompt}
      />
      <Header title={pageStatics.data.titles.logo}>
        <Box>
          <InfoBox infoList={[
            pageStatics.messages.info.logo.first,
            ...auth.accountType === 'master' ? [pageStatics.messages.info.logo.master] : [],
          ]}
          />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <form>
            <Box className={classes.logoContainer}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Box className={`${layoutClasses.panel} ${cardData && cardData.logo && cardData.logo.code && !newProfilePicture && !logoRemoved ? classes.logoPanel : ''}`}>
                    <PageTitle
                      title={cardData && cardData.logo && cardData.logo.code && !newProfilePicture && !logoRemoved ? pageStatics.data.titles.currentLogo : pageStatics.data.titles.addLogo}
                    />
                    <Box mb={2}>
                      <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                        {pageStatics.data.description.logoPanel}
                      </Typography>
                    </Box>
                    {cardData && cardData.logo && cardData.logo.code && !newProfilePicture && !logoRemoved && !savingImage && (
                      <Box className={`${classes.currenLogoContainerSm} ${logoStyle === 'circle' ? classes.currenLogoContainerSmCircle : ''}`}>
                        <img
                          src={
                            `data:${cardData && cardData.logo && cardData.logo.type ? cardData.logo.type : currentImageType}
                            ;base64,${cardData && cardData.logo && cardData.logo.code ? cardData.logo.code : currentImageCode}`
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
                    {cardData && cardData.logo && cardData.logo.code && !newProfilePicture && !logoRemoved && (
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
                  {cardData && auth.isMaster && (
                    <Box className={`${layoutClasses.panel}`}>
                      <PageTitle title={pageStatics.data.titles.logoStyle} />
                      <Box className={classes.logoStyleContainer}>
                        <FormControl component="fieldset">
                          <RadioGroup aria-label="logoStyle" name="logoStyle" value={logoStyle} onChange={handleLogoStyle}>
                            <FormControlLabel value="circle" control={<Radio disabled={loading} />} label="Circle" />
                            <FormControlLabel value="square" control={<Radio disabled={loading} />} label="Square" />
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
                {pageStatics.buttons.updateLogo}
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

Logo.defaultProps = {
  cardData: null,
  activeProfileId: null,
}

Logo.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
  // onLoadCardByUserId: PropTypes.func.isRequired,
  onUpdateCard: PropTypes.func.isRequired,
  activeProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Logo)
