import React, {
  useEffect, useState, Suspense, lazy,
} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { useHistory } from 'react-router-dom'
import parse from 'html-react-parser'
import Geocode from 'react-geocode'

import { Wizard } from 'react-use-wizard'

import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'
// import Typography from '@material-ui/core/Typography'

// import { Logo } from '../../layout/CustomIcons'

// import ProBox from '../../components/BecomePro/ProBox'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../components/Onboarding/Header'
import SkeletonContainer from '../../layout/SkeletonContainer'
// import AddToHomeScreen from './AddToHomeScreen'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'
import { useColor, useDarkMode } from '../../hooks/useDarkMode'
// import { useLayoutMode } from '../../hooks/useLayoutMode'

import {
  socialPlatforms,
  settings,
  GOOGLE_MAPS_KEY,
} from '../../utilities/appVars'

import { breakName } from '../../utilities/utils'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { updateCard } from '../../API/cards'
import { boardUser } from '../../API/users'
import { getConnectionForms, updateConnectionSettings } from '../../API/connections'

import * as actions from '../../store/actions'

// import { proBoxStyles } from '../../components/BecomePro/styles'
// import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'

// const StepZero = lazy(() => import('../../components/Onboarding/StepZero'))
const StepCompany = lazy(() => import('../../components/Onboarding/StepCompany'))
const StepOne = lazy(() => import('../../components/Onboarding/StepOne'))
const StepThree = lazy(() => import('../../components/Onboarding/StepThree'))
const StepFour = lazy(() => import('../../components/Onboarding/StepFour'))
// const StepFive = lazy(() => import('../../components/Onboarding/StepFive'))
const StepAddToHomeScreen = lazy(() => import('../../components/Onboarding/StepAddToHomeScreen'))

const Onboarding = ({
  onSetNotification,
  onActivateForm,
  onLoadCardByUserId,
  layout,
  switchTheme,
  // masterInvitationId,
  code,
}) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const auth = useAuth()

  // const classes = proBoxStyles()
  const layoutClasses = layoutStyles()
  // const buttonClasses = buttonStyles()import Geocode from 'react-geocode'
  // const history = useHistory()

  const color = useColor()
  const {
    theme,
    // switchTheme,
  } = useDarkMode()
  // const {
  //   layout,
  //   // switchLayout,
  // } = useLayoutMode()

  // const { isMaster } = auth
  // const isMaster = !!code && !masterInvitationId
  // console.log(isMasterFromInv);
  // const { isMaster } = auth
  // console.log(auth);
  const userName = breakName(parse(auth.user.displayName) || '')
  const userEmail = auth.user.email

  const [loading, setLoading] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  // const [requiredInvitations, setRequiredInvitations] = useState(null)
  // const [currentPatchInvitations, setCurrentPatchInvitations] = useState(null)
  // const [createdInvitations, setCreatedInvitations] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [formSaved, setFormSaved] = useState(false)
  const [onBoardingDone, setOnboardingDone] = useState(false)
  const [connectionForms, setConnectionForms] = useState(null)
  const [selectedForm, setSelectedForm] = useState(settings.showIndustry ? null : 'HL1tL8IANmDYVC8b909Y')
  const [isMaster, setIsMaster] = useState(false)
  const [infoForm, setInfoForm] = useState({
    // ...(auth.isMaster ? null : {
    //   firstName: createFormElementObj('input',
    //     pageStatics.forms.stepOne.firstName,
    //     {
    //       type: 'text',
    //       name: 'firstName',
    //       placeholder: pageStatics.forms.stepOne.firstName,
    //     }, userName.firstName, null, { required: false }, false,
    //     {
    //       xs: 12,
    //       sm: null,
    //       md: null,
    //       lg: null,
    //       xl: null,
    //       fullWidth: true,
    //     }),
    // }),
    firstName: createFormElementObj('input',
      pageStatics.forms.stepOne.firstName,
      {
        type: 'text',
        name: 'firstName',
        placeholder: pageStatics.forms.stepOne.firstName,
      }, userName.firstName, null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    lastName: createFormElementObj('input',
      pageStatics.forms.stepOne.lastName,
      {
        type: 'text',
        name: 'lastName',
        placeholder: pageStatics.forms.stepOne.lastName,
      },
      `${userName.firstName || ''} ${userName.lastName || ''}`,
      null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    title: createFormElementObj('input',
      pageStatics.forms.stepOne.jobTitle,
      {
        type: 'text',
        name: 'jobTitle',
        placeholder: pageStatics.forms.stepOne.jobTitle,
      }, '', null, { required: false }, false,
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
  const [infoFormMaster, setInfoFormMaster] = useState({
    lastName: createFormElementObj('input',
      pageStatics.forms.stepOne.teamName,
      {
        type: 'text',
        name: 'lastName',
        placeholder: pageStatics.forms.stepOne.teamName,
      },
      `${userName.firstName || ''} ${userName.lastName || ''}`,
      null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    title: createFormElementObj('input',
      pageStatics.forms.stepOne.teamPosition,
      {
        type: 'text',
        name: 'jobTitle',
        placeholder: pageStatics.forms.stepOne.teamPosition,
      }, '', null, { required: false }, false,
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

  const [companyForm, setCompanyForm] = useState({
    organization: createFormElementObj('input', pageStatics.forms.stepCompany.organization, { type: 'text', name: 'organization', placeholder: pageStatics.forms.stepCompany.organization }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    address: createFormElementObj('input', pageStatics.forms.stepCompany.address, { type: 'text', name: 'lastName', placeholder: pageStatics.forms.stepCompany.address }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const [linksForm, setLinksForm] = useState({
    website: createFormElementObj('input', pageStatics.forms.stepThree.website, { type: 'text', name: 'website', placeholder: pageStatics.forms.stepThree.website }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    facebook: createFormElementObj('input', pageStatics.forms.stepThree.facebook, { type: 'text', name: 'facebook', placeholder: pageStatics.forms.stepThree.facebook }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    instagram: createFormElementObj('input', pageStatics.forms.stepThree.instagram, { type: 'text', name: 'instagram', placeholder: pageStatics.forms.stepThree.instagram }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    linkedin: createFormElementObj('input', pageStatics.forms.stepThree.linkedIn, { type: 'text', name: 'linkedin', placeholder: pageStatics.forms.stepThree.linkedIn }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    twitter: createFormElementObj('input', pageStatics.forms.stepThree.twitter, { type: 'text', name: 'twitter', placeholder: pageStatics.forms.stepThree.twitter }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })
  const [addressError, setAddressError] = useState(false)
  Geocode.setApiKey(GOOGLE_MAPS_KEY)

  // const [configueringInvitations, setConfigueringInvitations] = useState(true)

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

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        try {
          await auth.user.reload()
          const userClaims = await auth.getTokenClaims()
          setIsMaster(userClaims && userClaims.isMaster)
          auth.updateMasterClaim(userClaims && userClaims.isMaster)
          auth.updateInvitationCode(code)
        } catch (err) {
          throw new Error(err)
        }
      })()
    }

    return () => { mounted = false }
  }, [auth, code])

  useEffect(() => {
    // if (!configueringInvitations) {
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
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitationTheme, invitationColorName, invitationColorCode])

  // const createInvitations = useCallback(async (reqInv, curInv, patch) => {
  //   const curInvNoMaster = curInv.length - 1
  //   let createdInvs = curInv
  //   let inv
  //   if (reqInv > curInvNoMaster) {
  //     for (let i = 1; i <= (reqInv - curInvNoMaster); i += 1) {
  //       try {
  //         /* eslint-disable no-await-in-loop */
  //         inv = await generateInvitaionCode(patch.package, patch.patchId, 'single', auth.user.uid, patch.theme, patch.store, null)
  //         createdInvs = [...createdInvs, inv]
  //       } catch (err) {
  //         throw new Error(err)
  //       }
  //     }
  //   }
  //   return createdInvs
  // }, [auth.user.uid])

  // useEffect(() => {
  //   let mounted = true

  //   if (mounted) {
  //     (async () => {
  //       setLoading(true)
  //       const subscriber = await getSubscribedUser(auth.user.uid)
  //       const invitation = await getInvitationByCode(auth.invitationNumber)
  //       const patch = await getPatchByPatchId(invitation.patchId)
  //       const patchInvitations = await getPatchInvitations(invitation.patchId, null)
  //       const reqInv = subscriber[0].items[0].price.transform_quantity.divide_by

  //       if (patchInvitations.length === 1 && reqInv > patchInvitations.length) {
  //         const invitations = await createInvitations(reqInv, patchInvitations, patch)
  //         setCreatedInvitations(invitations)
  //         const templateParams = {
  //           userEmail: auth.user.email,
  //           userName: auth.user.displayName,
  //           userProfile: `${language.languageVars.appProfileURL}/${auth.userUrlSuffix}`,
  //           reqCards: reqInv - (patchInvitations.length - 1),
  //         }
  //         await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.newSubscriptionTemplateId, templateParams, MAILJS_CONFIG.userId)
  //       } else {
  //         setCreatedInvitations(patchInvitations)
  //       }
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //       setConfigueringInvitations(false)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [
  //   auth.user.uid,
  //   auth.user.email,
  //   auth.user.displayName,
  //   auth.invitationNumber,
  //   auth.userUrlSuffix,
  //   language.languageVars.appProfileURL,
  //   createInvitations,
  // ])

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        setLoading(true)
        const forms = await getConnectionForms()
        setConnectionForms(forms)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
    setFormValid(adjustedForm.formValid)
    setFormTouched(true)
    setFormSaved(false)
    setLoading(false)
  }

  const cleanUrl = url => url.replace(/ /g, '')

  const cleanSpecialChars = str => str.replace(/[#^+()$~'":*<>{}!@]/g, '')

  const isURL = str => {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  const getPlatformDomain = platform => {
    const socialLinkIndex = socialPlatforms.findIndex(socialPlatfrom => socialPlatfrom.platform === platform)
    const socialLinkDomain = socialPlatforms[socialLinkIndex].domain || ''

    return socialLinkDomain
  }

  const domainExits = (platform, url) => {
    const domain = getPlatformDomain(platform)
    const domainPart = domain.substring(0, domain.indexOf('.'))

    return url.includes(domainPart)
  }

  const validPlatformUrl = (url, platform) => {
    const isValidURL = isURL(url)
    const platformDomainExists = domainExits(platform, url)
    const linkProtocolExists = url.substring(0, 8) === 'https://' || url.substring(0, 7) === 'http://'

    return {
      isValidURL,
      platformDomainExists,
      linkProtocolExists,
    }
  }

  const linkBlurHandler = (e, platform) => {
    let inputValue = cleanUrl(e.target.value)
    const urlProps = validPlatformUrl(inputValue, platform)

    if (urlProps.isValidURL && urlProps.platformDomainExists && !urlProps.linkProtocolExists) {
      inputValue = `https://${inputValue}`
    } else if (inputValue !== '' && !urlProps.platformDomainExists && !urlProps.linkProtocolExists) {
      const domain = getPlatformDomain(platform)
      const cleanValue = cleanSpecialChars(inputValue)
      inputValue = `https://${domain}/${cleanValue}`
    }

    setLinksForm(prevForm => ({
      ...prevForm,
      ...{
        [platform]: {
          ...prevForm[platform],
          value: inputValue,
        },
      },
    }))

    setFormValid(true)
    setFormTouched(true)
  }

  // const inputBlurHandler = (e, platform, key) => {
  //   console.log(platform);
  //   const inputValue = e.target.value
  //   const isValid = inputValue.substring(0, 8) === 'https://' || inputValue.substring(0, 7) === 'http://'
  //   if (!isValid) {
  //     e.target.value = `http://${inputValue}`
  //   }
  //
  //   const adjustedForm = adjustFormValues(linksForm, e, key)
  //   setLinksForm(adjustedForm.adjustedForm)
  //   setFormValid(adjustedForm.formValid)
  //   setFormTouched(true)
  // }

  const createLinksArray = linksObject => {
    const linksArray = Object.entries(linksObject)
    let linkObj = {}
    const arrayOfLinks = []
    linksArray.map(link => {
      if (link[1] && link[1] !== '') {
        linkObj.active = true
        linkObj.originallyActive = true
        linkObj.saved = true
        linkObj.errorMessage = null
        linkObj.key = socialPlatforms.filter(sp => sp.platform === link[0])[0].key
        // eslint-disable-next-line prefer-destructuring
        linkObj.link = link[1]
        // eslint-disable-next-line prefer-destructuring
        linkObj.platform = link[0]
        linkObj.touched = true
        linkObj.valid = true
        linkObj.memberClicks = []
        arrayOfLinks.push(linkObj)
        linkObj = {}
      }
      return true
    })

    return arrayOfLinks
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

  const updateCardHandler = async e => {
    e.preventDefault()
    setLoadingDone(false)
    setLoading(true)
    const infoFormDetails = createFormValuesObj(auth.isMaster ? infoFormMaster : infoForm)
    const companyFormDetails = createFormValuesObj(companyForm)
    const linksFormDetails = createFormValuesObj(linksForm)
    const linksArray = createLinksArray(linksFormDetails)

    const { address } = companyFormDetails
    if (address && address !== '') {
      const coordinates = await getCoordinatesFromAddress(address)
      if (coordinates && !addressError) {
        companyFormDetails.marker = coordinates
      } else {
        companyFormDetails.marker = null
      }
    }

    const themeObj = {
      theme: invitationTheme || theme,
      selectedColor: selectedColorObj,
      layout: selectedLayout,
    }
    const cardDetails = {
      ...infoFormDetails,
      ...companyFormDetails,
      settings: themeObj,
      links: linksArray.length > 0 ? linksArray : null,
    }

    // if (isMaster) {
    //   cardDetails.teamData = {
    //     settings: themeObj,
    //     links: linksArray.length > 0 ? linksArray : null,
    //   }
    // }
    try {
      setLoadingMessage(pageStatics.messages.loading.updatingProfileData)
      await updateCard(auth.user.uid, cardDetails)
      if (selectedForm) {
        await updateConnectionSettings(auth.user.uid, { activeFormId: selectedForm })
        onActivateForm(selectedForm)
      }
      await boardUser(auth.user.uid)
      setFormSaved(true)
      setFormTouched(false)
      setOnboardingDone(true)
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.onboardingError,
        type: 'error',
      })
    }
  }

  const selectFormHandler = (e, form) => {
    e.preventDefault()
    setSelectedForm(form)
  }

  // const changeThemeHandler = selectedtheme => {
  //   switchTheme(selectedtheme)
  // }

  // const changeLayoutHandler = layoutMode => {
  //   switchLayout(layoutMode)
  // }

  // const changeColorHandler = colorObj => {
  //   color.switchColor(colorObj)
  // }

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  // const goToHome = () => {
  //   history.push('/')
  // }

  return (
    <Box className={layoutClasses.pageContainer}>
      {(auth.authStatus === 'processing' || loading) && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loading}`} boxed />}
      <Box className={layoutClasses.contentContainer} style={{ paddingTop: 32 }}>
        <Box className={layoutClasses.formContainer}>
          {!onBoardingDone && (
            <>
              <Header stepsCount={4} firstName={userName.firstName} hideSubtitle />
              <Wizard>
                {/* <Suspense fallback={(
                  <SkeletonContainer list={[
                    { variant: 'rect', fullWidth: true, height: 250 },
                    { variant: 'rect', width: '75%' },
                    { variant: 'rect', width: '45%', height: 35 },
                  ]}
                  />
                )}
                >
                  <StepZero
                    invitations={createdInvitations}
                    onSetNotification={onSetNotification}
                    loading={loading}
                    isMaster={isMaster}
                  />
                </Suspense> */}
                <Suspense fallback={(
                  <SkeletonContainer list={[
                    { variant: 'rect', fullWidth: true, height: 250 },
                    { variant: 'rect', width: '75%' },
                    { variant: 'rect', width: '45%', height: 35 },
                  ]}
                  />
                )}
                >
                  <StepCompany
                    inputChangeHandler={inputChangeHandler}
                    companyForm={companyForm}
                    setCompanyForm={setCompanyForm}
                    loading={loading}
                    isMaster={isMaster}
                    noSubscription
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
                  <StepOne
                    inputChangeHandler={inputChangeHandler}
                    infoForm={auth.isMaster ? infoFormMaster : infoForm}
                    setInfoForm={auth.isMaster ? setInfoFormMaster : setInfoForm}
                    loading={loading}
                    isMaster={isMaster}
                    noSubscription
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
                  <StepThree
                    inputChangeHandler={inputChangeHandler}
                    inputBlurHandler={linkBlurHandler}
                    linksForm={linksForm}
                    setLinksForm={setLinksForm}
                    buttonDisabled={!buttonDisabled}
                    loading={loading}
                    isMaster={isMaster}
                    noSubscription
                  />
                </Suspense>
                {settings.showIndustry && (
                  <Suspense fallback={(
                    <SkeletonContainer list={[
                      { variant: 'rect', fullWidth: true, height: 250 },
                      { variant: 'rect', width: '75%' },
                      { variant: 'rect', width: '45%', height: 35 },
                    ]}
                    />
                  )}
                  >
                    <StepFour
                      inputChangeHandler={inputChangeHandler}
                      buttonDisabled={!buttonDisabled}
                      loading={loading}
                      forms={connectionForms}
                      onUseForm={selectFormHandler}
                      selectedForm={selectedForm}
                      isMaster={isMaster}
                      noSubscription
                    />
                  </Suspense>
                )}
                {/* <Suspense fallback={(
                  <SkeletonContainer list={[
                    { variant: 'rect', fullWidth: true, height: 250 },
                    { variant: 'rect', width: '75%' },
                    { variant: 'rect', width: '45%', height: 35 },
                  ]}
                  />
                )}
                >
                  <StepFive
                    changeThemeHandler={changeThemeHandler}
                    changeLayoutHandler={changeLayoutHandler}
                    changeColorHandler={changeColorHandler}
                    color={color}
                    layout={layout}
                    theme={theme}
                    loading={loading}
                    onUpdate={updateCardHandler}
                    isMaster={isMaster}
                  />
                </Suspense> */}
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
                    noSubscription
                  />
                </Suspense>
              </Wizard>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )

  // return (
  //   <Box className={`${layoutClasses.pageContainer} ${classes.landingPageContainer}`}>
  //     {(auth.authStatus === 'processing' || loading) && <LoadingBackdrop done={loadingDone} loadingText="Loading..." />}
  //     <Box className={classes.landingHeader}>
  //       <Box className={classes.landingNav}>
  //         <Button
  //           onClick={() => goToHome()}
  //         >
  //           <Logo className={classes.logo} />
  //         </Button>
  //       </Box>
  //     </Box>
  //     <Box className={classes.proBoxContainer}>
  //       <Box className={classes.proBox}>
  //         <Box className={classes.proBoxHeader}>
  //           {/* <img src="/assets/images/becomePro.jpg" alt={pageStatics.data.titles.page} />
  //           <Box className={classes.proBoxHeaderData}>
  //             <Typography variant="body1" align="left" component="p" className={classes.proBoxHeaderTitle}>
  //               {pageStatics.data.titles.page}
  //             </Typography>
  //             <Typography variant="body1" align="left" component="p" className={classes.proBoxHeaderDescription}>
  //               {pageStatics.data.description.page}
  //             </Typography>
  //             <Button
  //               className={`${buttonClasses.defaultButton} ${classes.proBoxHeaderButton}`}
  //               onClick={() => goToSubscribe()}
  //               style={{
  //                 backgroundColor: color.color.code,
  //               }}
  //             >
  //               {pageStatics.buttons.becomePro}
  //             </Button>
  //           </Box> */}
  //           <Box className={classes.landingTextContainer}>
  //             <Typography variant="body1" component="p" align="center" className={classes.landingTextOne}>
  //               Thank you
  //               <span>FOR</span>
  //             </Typography>
  //             <Typography variant="body1" component="p" align="center" className={classes.landingTextOne}>
  //               <span>Subscribing</span>
  //             </Typography>
  //             {/* <Typography variant="body1" component="p" align="center" className={classes.landingTextThree}>
  //               to
  //               <span>Connect</span>
  //             </Typography>
  //             <Typography variant="body1" component="p" align="center" className={classes.landingTextFour}>
  //               {pageStatics.data.titles.subtitle}
  //             </Typography> */}
  //           </Box>
  //           <Button
  //             className={`${buttonClasses.defaultButton} ${classes.proBoxHeaderButton}`}
  //             onClick={() => goToHome()}
  //           >
  //             {pageStatics.buttons.startPro}
  //           </Button>
  //         </Box>

  //         <Box className={classes.proBoxContent}>
  //           <Box className={classes.proBoxContentHeader}>
  //             <Typography variant="body1" align="left" component="p" className={classes.proBoxContentSubTitle}>
  //               {pageStatics.data.titles.thanksSubtitle}
  //             </Typography>
  //             <Typography variant="body1" align="left" component="p" className={classes.proBoxContentTitle}>
  //               {pageStatics.data.titles.thanksTitle}
  //             </Typography>
  //           </Box>
  //           <ProBox noButton onlyFeatures noTitles />
  //           <Box mb={2} pl={2} pr={2}>
  //             <Button
  //               className={`${buttonClasses.defaultButton} ${classes.proBoxHeaderButton}`}
  //               onClick={() => goToHome()}
  //             >
  //               {pageStatics.buttons.startPro}
  //             </Button>
  //           </Box>
  //         </Box>
  //       </Box>
  //     </Box>
  //   </Box>
  // )
}

Onboarding.defaultProps = {
  // masterInvitationId: null,
  code: null,
  layout: null,
}

Onboarding.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onActivateForm: PropTypes.func.isRequired,
  onLoadCardByUserId: PropTypes.func.isRequired,
  layout: PropTypes.string,
  switchTheme: PropTypes.func.isRequired,
  // masterInvitationId: PropTypes.string,
  code: PropTypes.string,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onActivateForm: (userId, formId) => dispatch(actions.activateForm(userId, formId)),
  onLoadCardByUserId: (userId, isMaster) => dispatch(actions.loadCardByUserId(userId, isMaster)),
})

const mapStateToProps = state => ({
  masterInvitationId: state.invitations.masterInvitationId,
  code: state.invitations.code,
})

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding)
