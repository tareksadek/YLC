import React, {
  useState, useCallback, useEffect, Suspense, lazy,
} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

import imageCompression from 'browser-image-compression'
import { getOrientation } from 'get-orientation/browser'
import { Wizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'

import { breakName, renameFile } from '../../utilities/utils'
import { getCroppedImg, getRotatedImage } from '../../utilities/canvasUtils'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor, useDarkMode } from '../../hooks/useDarkMode'
// import { useLayoutMode } from '../../hooks/useLayoutMode'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../components/Onboarding/Header'
import SkeletonContainer from '../../layout/SkeletonContainer'
// import AddToHomeScreen from './AddToHomeScreen'

import { updateCard } from '../../API/cards'
import { boardUser } from '../../API/users'

import * as actions from '../../store/actions'

import { layoutStyles } from '../../theme/layout'

const StepOne = lazy(() => import('../../components/Onboarding/StepOne'))
const StepTwo = lazy(() => import('../../components/Onboarding/StepTwo'))
const StepAddToHomeScreen = lazy(() => import('../../components/Onboarding/StepAddToHomeScreen'))

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
}

const OnboardingMember = ({
  onSetNotification,
  onLoadCardByUserId,
  layout,
  switchTheme,
}) => {
  const layoutClasses = layoutStyles()
  const auth = useAuth()
  const { isMaster } = auth
  const userName = breakName(auth.user.displayName)
  const userEmail = auth.user.email
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const color = useColor()
  const { theme } = useDarkMode()
  // const { switchLayout } = useLayoutMode()
  // const history = useHistory()
  const invitationTheme = window.localStorage.getItem('invitationTheme')
  const invitationColorName = window.localStorage.getItem('invitationColorName')
  const invitationColorCode = window.localStorage.getItem('invitationColorCode')
  const invitationLayout = window.localStorage.getItem('invitationLayout')

  let selectedColorObj = {
    code: '#272727',
    name: 'default',
  }
  if (invitationColorName && invitationColorCode) {
    selectedColorObj = {
      code: invitationColorCode,
      name: invitationColorName,
    }
  } else if (color && color.color && color.color !== '') {
    selectedColorObj = color.color
  }

  let selectedLayout = 'social'
  if (invitationLayout) {
    selectedLayout = invitationLayout
  } else if (layout && layout !== '') {
    selectedLayout = layout
  }

  const [infoForm, setInfoForm] = useState({
    firstName: createFormElementObj('input', pageStatics.forms.stepOne.firstName, { type: 'text', name: 'firstName', placeholder: pageStatics.forms.stepOne.firstName }, userName.firstName, null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    lastName: createFormElementObj('input', pageStatics.forms.stepOne.lastName, { type: 'text', name: 'lastName', placeholder: pageStatics.forms.stepOne.lastName }, userName.lastName, null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    email: createFormElementObj('input', pageStatics.forms.stepOne.email, { type: 'text', name: 'email', placeholder: pageStatics.forms.stepOne.email }, userEmail, null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    homePhone: createFormElementObj('input', pageStatics.forms.stepOne.workPhone, { type: 'tel', name: 'homePhone', placeholder: pageStatics.forms.stepOne.workPhone }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const [pictureForm, setPictureForm] = useState({
    profileImage: createFormElementObj('imageUpload', pageStatics.forms.stepTwo.picture, {
      name: 'profileImage',
      placeholder: pageStatics.forms.stepTwo.picture,
      stateClass: 'cropActive',
      withView: false,
      showLabel: false,
      label: null,
      selectButtonText: 'Select image',
      changeButtonText: 'Change',
    }, '', null, { required: false }, false,
    {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
  })

  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [newProfilePictureType, setNewProfilePictureType] = useState(null)
  const [imageSrc, setImageSrc] = useState(null)
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [onBoardingDone, setOnboardingDone] = useState(false)

  // useEffect(() => {
  //   if (invitationLayout !== 'null') {
  //     switchLayout(invitationLayout)
  //   }
  //   if (invitationTheme !== 'null') {
  //     switchTheme(invitationTheme)
  //   }
  //   if (invitationColorCode !== 'null' && invitationColorName !== 'null') {
  //     color.switchColor({ code: invitationColorCode, name: invitationColorName })
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  useEffect(() => {
    window.localStorage.removeItem('package')
    window.localStorage.removeItem('accountType')
    window.localStorage.removeItem('invitationCode')
    window.localStorage.removeItem('authType')
    window.localStorage.removeItem('patch')
    if (invitationTheme) {
      switchTheme(invitationTheme)
    }
    if (invitationColorName && invitationColorCode) {
      const colorObj = {
        name: invitationColorName,
        code: invitationColorCode,
      }
      color.switchColor(colorObj)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationTheme, invitationColorName, invitationColorCode])

  const onCropComplete = useCallback((croppedArea, croppedAreaPx) => {
    setCroppedAreaPixels(croppedAreaPx)
  }, [])

  const readFile = file => new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result), false)
    reader.readAsDataURL(file)
  })

  const onFileChange = async (eve, key) => {
    if (eve && eve[0] instanceof File) {
      const file = eve[0]
      const compressionOptions = {
        maxSizeMB: file.size > 8000000 ? 0.05 : 0.2,
        maxWidthOrHeight: 750,
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
      setFormTouched(true)
    }
  }

  const inputChangeHandler = async (eve, key, form, setForm) => {
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

    const adjustedForm = adjustFormValues(form, changeEvent, key)
    setForm(adjustedForm.adjustedForm)
    setFormTouched(true)
    setLoading(false)
  }

  const updateCardHandler = async e => {
    e.preventDefault()
    setLoadingDone(false)
    setLoading(true)
    const infoFormDetails = createFormValuesObj(infoForm)
    const pictureFormDetails = createFormValuesObj(pictureForm)
    const themeObj = {
      theme: invitationTheme || theme,
      selectedColor: selectedColorObj,
      layout: selectedLayout,
    }
    const cardDetails = {
      ...infoFormDetails,
      ...pictureFormDetails,
      settings: themeObj,
    }
    try {
      let imageCode = null
      if (newProfilePicture) {
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

      // const existingCard = await getCardById(auth.user.uid)
      // const existingOrganization = existingCard.organization || null
      // const existingIndustry = existingCard.career || null
      // cardDetails.organization = existingOrganization
      // cardDetails.career = existingIndustry
      // const existingLinks = existingCard.links && existingCard.links.length > 0 ? [...existingCard.links] : null
      // cardDetails.links = existingCard.links && existingCard.links.length > 0 ? [...existingCard.links] : null

      // // const confirmVcardFileExists = await getFirebaseStorage().ref(`card/${language.languageVars.appNameCAPS}_${auth.userUrlSuffix}.vcf`).listAll()
      // // if (confirmVcardFileExists.items.length > 0) {
      // //   await getFirebaseStorage().ref(`card/${language.languageVars.appNameCAPS}_${auth.userUrlSuffix}.vcf`).delete()
      // // }

      // const vCardFile = generateVcard(cardDetails, existingLinks, `${language.languageVars.appNameCAPS}_${auth.userUrlSuffix}.vcf`, imageCode || null, newProfilePictureType)
      // cardDetails.vCardFile = vCardFile.name
      // const metaData = {
      //   contentDisposition: 'attachment',
      //   filename: vCardFile.name,
      //   contentType: 'text/vcard',
      // }
      setLoadingMessage(pageStatics.messages.loading.updatingProfileData)
      // await getFirebaseStorage().ref(`/card/${vCardFile.name}`).put(vCardFile, metaData)
      await updateCard(auth.user.uid, cardDetails)
      await boardUser(auth.user.uid)
      setFormTouched(false)
      setOnboardingDone(true)
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
      // history.push(`/profile/${auth.userUrlSuffix}`)
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.onboardingError,
        type: 'error',
      })
    }
  }

  if (auth.isBoarded) {
    return <Redirect to={`/profile/${auth.userUrlSuffix}`} />
  }

  if (loading) {
    return <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingProfileData}`} boxed />
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          {!onBoardingDone && (
            <>
              <Header stepsCount={3} firstName={userName.firstName} />
              <Wizard>
                <Suspense fallback={(
                  <SkeletonContainer list={[
                    { variant: 'rect', fullWidth: true, height: 250 },
                    { variant: 'rect', width: '75%' },
                    { variant: 'rect', width: '45%', height: 35 },
                  ]}
                  />
                )}
                >
                  <StepOne
                    inputChangeHandler={inputChangeHandler}
                    infoForm={infoForm}
                    setInfoForm={setInfoForm}
                    loading={loading}
                    isMaster={isMaster}
                  />
                </Suspense>
                <Suspense fallback={(
                  <SkeletonContainer list={[
                    { variant: 'rect', fullWidth: true, height: 250 },
                    { variant: 'rect', width: '75%' },
                    { variant: 'rect', width: '45%', height: 35 },
                  ]}
                  />
                )}
                >
                  <StepTwo
                    onFileChange={onFileChange}
                    loading={loading}
                    pictureForm={pictureForm}
                    setPictureForm={setPictureForm}
                    newProfilePicture={newProfilePicture}
                    imageSrc={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    setCrop={setCrop}
                    setZoom={setZoom}
                    setRotation={setRotation}
                    onCropComplete={onCropComplete}
                    onUpdate={updateCardHandler}
                    isMaster={isMaster}
                  />
                </Suspense>
                <Suspense fallback={(
                  <SkeletonContainer list={[
                    { variant: 'rect', fullWidth: true, height: 250 },
                    { variant: 'rect', width: '75%' },
                    { variant: 'rect', width: '45%', height: 35 },
                  ]}
                  />
                )}
                >
                  <StepAddToHomeScreen
                    onLoadCard={onLoadCardByUserId}
                    onUpdate={updateCardHandler}
                    isMaster={isMaster}
                  />
                </Suspense>
              </Wizard>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCardByUserId: (userId, isMaster) => dispatch(actions.loadCardByUserId(userId, isMaster)),
})

OnboardingMember.defaultProps = {
  layout: null,
}

OnboardingMember.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onLoadCardByUserId: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
  layout: PropTypes.string,
}

export default connect(null, mapDispatchToProps)(OnboardingMember)
