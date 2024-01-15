import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams, Prompt } from 'react-router-dom'
import { connect } from 'react-redux'

import arrayMove from 'array-move'
import imageCompression from 'browser-image-compression'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import vCardsJS from 'vcards-js'

import { format, isValid } from 'date-fns'

import { makeStyles } from '@material-ui/core/styles'
import FormElement from '../../components/Ui/FormElement'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import TabPanel from '../../components/Cards/EditCard/TabPanel'
import ProfileLinks from '../../components/Cards/EditCard/ProfileLinks'
import Header from '../../layout/Header'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { editCardStyles } from './styles'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import { getCardById, updateCard } from '../../API/cards'
import { getFirebaseStorage } from '../../API/firebase'
import { useColor } from '../../hooks/useDarkMode'

import { renameFile, imageToBase64, capitalizeFirst } from '../../utilities/utils'

import { useLanguage } from '../../hooks/useLang'

import { socialPlatforms } from '../../utilities/appVars'

import * as actions from '../../store/actions'

const tabProps = index => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
})

const EditCard = ({
  onSetNotification, links, onLoadLinks, linksChanged, onSortCustomLinks, onSortSocialLinks, onLinksFormSaved,
}) => {
  const color = useColor()
  const colorStylesObj = makeStyles(() => ({
    selectedTab: {
      borderBottomColor: color.color.code,
      borderBottomStyle: 'solid',
      borderBottomWidth: 5,
      fontWeight: 'bold',
    },
  }))
  const colorStyles = colorStylesObj()

  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const { cardId } = useParams()
  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.updatingProfileData)
  const [newProfilePicture, setNewProfilePicture] = useState(null)
  const [currentProfilePictureURL, setCurrentProfilePictureURL] = useState(null)
  const [existingProfilePicture, setExistingProfilePicture] = useState(null)
  const [existingProfilePicture64, setExistingProfilePicture64] = useState(null)
  const [newProfilePicture64, setNewProfilePicture64] = useState(null)
  const [placeholderProfilePicture64, setPlaceholderProfilePicture64] = useState(null)
  const [newProfilePictureType, setNewProfilePictureType] = useState(null)
  const [existingVcard, setExistingVcard] = useState(null)
  const [newVcardName, setNewVcardName] = useState(null)
  const [tabValue, setTabValue] = useState(0)
  const [formSaved, setFormSaved] = useState(false)
  const [socialLinks, setSocialLinks] = useState(null)
  const [allLinks, setAllLinks] = useState([])
  const classes = editCardStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()

  const [firstTabForm, setFirstTabForm] = useState({
    firstName: createFormElementObj('input', pageStatics.forms.infoTab.firstName, { type: 'text', name: 'firstName', placeholder: pageStatics.forms.infoTab.firstName }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    middleName: createFormElementObj('input', pageStatics.forms.infoTab.middleName, { type: 'text', name: 'middleName', placeholder: pageStatics.forms.infoTab.middleName }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    lastName: createFormElementObj('input', pageStatics.forms.infoTab.lastName, { type: 'text', name: 'lastName', placeholder: pageStatics.forms.infoTab.lastName }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    namePrefix: createFormElementObj('select', pageStatics.forms.infoTab.namePrefix, { name: 'namePrefix' }, '', [
      { value: 'Mr', display: 'Mr' },
      { value: 'Mrs', display: 'Mrs' },
      { value: 'Ms', display: 'Ms' },
      { value: 'Prof', display: 'Prof - Professor' },
      { value: 'Dr', display: 'Dr - Doctor' },
      { value: 'Atty', display: 'Atty - Attorney' },
      { value: 'Dean', display: 'Dean - University Dean' },
      { value: 'Col', display: 'Col - Colonel' },
      { value: 'Maj', display: 'Maj - Major' },
      { value: 'Adm', display: 'Adm - Admiral' },
      { value: 'Capt', display: 'Capt - Captain' },
      { value: 'Gov', display: 'Gov - Governor' },
    ], { required: false }, false, {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
    nameSuffix: createFormElementObj('select', pageStatics.forms.infoTab.nameSuffix, { name: 'nameSuffix' }, '', [
      { value: 'Jr', display: 'Jr' },
      { value: 'I', display: 'I' },
      { value: 'II', display: 'II' },
      { value: 'III', display: 'III' },
    ], { required: false }, false, {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
    gender: createFormElementObj('select', pageStatics.forms.infoTab.gender, { name: 'gender' }, '', [
      { value: 'male', display: 'Male' },
      { value: 'female', display: 'Female' },
      { value: 'other', display: 'Other' },
    ], { required: false }, false, {
      xs: 12,
      sm: null,
      md: null,
      lg: null,
      xl: null,
      fullWidth: true,
    }),
    nickname: createFormElementObj('input', pageStatics.forms.infoTab.nickname, { type: 'text', name: 'nickname', placeholder: pageStatics.forms.infoTab.nickname }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    organization: createFormElementObj('input', pageStatics.forms.infoTab.organization, { type: 'text', name: 'organization', placeholder: pageStatics.forms.infoTab.organization }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    title: createFormElementObj('input', pageStatics.forms.infoTab.title, { type: 'text', name: 'title', placeholder: pageStatics.forms.infoTab.title }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    birthday: createFormElementObj('date', pageStatics.forms.infoTab.birthday, { type: 'text', name: 'birthday', placeholder: pageStatics.forms.infoTab.birthday }, null, null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    note: createFormElementObj('textarea', pageStatics.forms.infoTab.note, { type: 'text', name: 'note', placeholder: pageStatics.forms.infoTab.note }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const [secondTabForm, setSecondTabForm] = useState({
    email: createFormElementObj('input', pageStatics.forms.contactTab.email, { type: 'text', name: 'email', placeholder: pageStatics.forms.contactTab.email }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    workPhone: createFormElementObj('phone', pageStatics.forms.contactTab.workPhone, { type: 'tel', name: 'workPhone', placeholder: pageStatics.forms.contactTab.workPhone }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    workFax: createFormElementObj('phone', pageStatics.forms.contactTab.workFax, { type: 'tel', name: 'workfax', placeholder: pageStatics.forms.contactTab.workFax }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    homePhone: createFormElementObj('phone', pageStatics.forms.contactTab.homePhone, { type: 'tel', name: 'homePhone', placeholder: pageStatics.forms.contactTab.homePhone }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
    homeFax: createFormElementObj('phone', pageStatics.forms.contactTab.homeFax, { type: 'tel', name: 'homeFax', placeholder: pageStatics.forms.contactTab.homeFax }, '', null, { required: false }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  const [thirdTabForm, setThirdTabForm] = useState({
    image: createFormElementObj('imageUpload', pageStatics.forms.pictureTab.image, { name: 'image', placeholder: pageStatics.forms.pictureTab.image }, newProfilePicture64 || '', null, { required: false }, false,
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
    let mounted = true

    if (mounted) {
      (async () => {
        setLoading(true)
        const data = await getCardById(cardId)
        const adjustedFirstTabForm = await adjustFormValues(firstTabForm, data, null)
        const adjustedSecondTabForm = await adjustFormValues(secondTabForm, data, null)
        const adjustedThirdTabForm = await adjustFormValues(thirdTabForm, data, null)
        if (data.image) {
          const profileImage = await getFirebaseStorage().ref(`profile/${data.image}`).getDownloadURL()
          setCurrentProfilePictureURL(profileImage)
          setExistingProfilePicture(data.image)
          setExistingProfilePicture64(data.base64Photo?.code || null)
          setNewProfilePictureType(data.base64Photo?.code || null)
        }
        if (data.vCardFile) {
          setExistingVcard(data.vCardFile)
        }
        if (data.links) {
          await onLoadLinks(data.links)
        }
        if (data.socialLinksOrder) {
          const allPlatforms = data.socialLinksOrder.concat(socialPlatforms.filter(platform => data.socialLinksOrder.map(link => link.platform).indexOf(platform.platform) < 0))
          setSocialLinks(allPlatforms)
        } else {
          setSocialLinks(socialPlatforms)
        }
        setFirstTabForm(prevForm => ({ ...prevForm, ...adjustedFirstTabForm.adjustedForm }))
        setSecondTabForm(prevForm => ({ ...prevForm, ...adjustedSecondTabForm.adjustedForm }))
        setThirdTabForm(prevForm => ({ ...prevForm, ...adjustedThirdTabForm.adjustedForm }))
        setFormValid(adjustedFirstTabForm.formValid && adjustedSecondTabForm.formValid && adjustedThirdTabForm.formValid)
        setNewVcardName(`${language.languageVars.appNameCAPS}_${data.urlSuffix}.vcf`)
        setLoading(false)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId])

  useEffect(() => {
    if (links) {
      let linksKeys = []
      Object.keys(links).forEach(key => {
        linksKeys = [...linksKeys, ...links[key]]
      })
      setAllLinks(linksKeys)
    }
  }, [links])

  const generateBirthDateObj = date => {
    let birthDateObj

    if (isValid(date)) {
      birthDateObj = date
    } else {
      birthDateObj = date.toDate()
    }

    return birthDateObj
  }

  const generateVcard = (cardDetails, base64Photo, imageType) => {
    const vCard = vCardsJS()
    let birthDate = null

    if (base64Photo) {
      const vCardImageType = imageType.split('image/').pop().toUpperCase()
      vCard.photo.embedFromString(base64Photo, vCardImageType);
    }

    if (cardDetails.birthday) {
      const birthDateObj = generateBirthDateObj(cardDetails.birthday)
      birthDate = cardDetails.birthday && new Date(format(new Date(birthDateObj), 'yyyy'), format(new Date(birthDateObj), 'M') - 1, format(new Date(birthDateObj), 'dd'))
    }

    vCard.firstName = capitalizeFirst(cardDetails.firstName)
    vCard.middleName = capitalizeFirst(cardDetails.middleName)
    vCard.lastName = capitalizeFirst(cardDetails.lastName)
    vCard.namePrefix = capitalizeFirst(cardDetails.namePrefix)
    vCard.nameSuffix = cardDetails.nameSuffix
    vCard.gender = capitalizeFirst(cardDetails.gender)
    vCard.nickname = capitalizeFirst(cardDetails.nickname)
    vCard.organization = capitalizeFirst(cardDetails.organization)
    vCard.title = capitalizeFirst(cardDetails.title)
    vCard.workPhone = cardDetails.workPhone
    vCard.homePhone = cardDetails.homePhone
    vCard.workFax = cardDetails.workFax
    vCard.homeFax = cardDetails.homeFax
    vCard.birthday = birthDate
    vCard.note = capitalizeFirst(cardDetails.note)
    vCard.email = cardDetails.email

    if (allLinks.length > 0) {
      allLinks.map(link => {
        if (link.active) {
          vCard.socialUrls[link.linkTitle ? link.linkTitle : link.platform] = link.link
        }
        return true
      })
    }

    const blob = new Blob(
      [vCard.getFormattedString()],
      { type: 'text/vcard;charset=utf-8' },
    )

    return new File([blob], newVcardName, { type: 'text/vcard', lastModified: new Date().getTime() })
  }

  const updateCardHandler = async e => {
    e.preventDefault()
    setLoading(true)
    const firstTabDetails = createFormValuesObj(firstTabForm)
    const secondTabDetails = createFormValuesObj(secondTabForm)
    const secondTabKeys = Object.keys(secondTabDetails)
    secondTabKeys.forEach(key => {
      if (secondTabDetails[key] === '+') {
        secondTabDetails[key] = ''
      }
    })
    const thirdTabDetails = createFormValuesObj(thirdTabForm)
    const cardLinks = allLinks.length > 0 ? allLinks.filter(link => link.link !== '' && link.link !== 'http://' && link.link !== 'https://') : null
    const cardDetails = {
      ...firstTabDetails,
      ...secondTabDetails,
      ...thirdTabDetails,
      links: cardLinks,
      socialLinksOrder: socialLinks,
    }
    try {
      if (newProfilePicture) {
        setLoadingMessage(pageStatics.messages.loading.analyzingImageFile)
        cardDetails.base64Photo = {}
        cardDetails.base64Photo.code = newProfilePicture64
        cardDetails.base64Photo.type = newProfilePictureType
        if (existingProfilePicture) {
          setLoadingMessage(pageStatics.messages.loading.replacingOldImage)
          await getFirebaseStorage().ref(`profile/${existingProfilePicture}`).delete()
        }
        setLoadingMessage(pageStatics.messages.loading.uploadingNewImage)
        await getFirebaseStorage().ref(`/profile/${newProfilePicture.name}`).put(newProfilePicture)
        setExistingProfilePicture(newProfilePicture.name)
        setNewProfilePicture(null)
      }

      if (existingVcard) {
        setLoadingMessage(pageStatics.messages.loading.updatingProfileData)
        const confirmVcardFileExists = await getFirebaseStorage().ref(`card/${existingVcard}`).listAll()
        if (confirmVcardFileExists.items.length > 0) {
          await getFirebaseStorage().ref(`card/${existingVcard}`).delete()
        }
      }

      const vCardFile = generateVcard(cardDetails, newProfilePicture64 || existingProfilePicture64 || null, newProfilePictureType)
      cardDetails.vCardFile = vCardFile.name
      const metaData = {
        contentDisposition: 'attachment',
        filename: vCardFile.name,
        contentType: 'text/vcard',
      }
      setLoadingMessage(pageStatics.messages.loading.updatingProfileData)
      await getFirebaseStorage().ref(`/card/${vCardFile.name}`).put(vCardFile, metaData)
      await updateCard(cardId, cardDetails)

      onLinksFormSaved()

      setLoading(false)
      setFormSaved(true)
      setFormTouched(false)

      onSetNotification({
        message: pageStatics.messages.notifications.profileUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.profileUpdateError,
        type: 'error',
      })
    }
  }

  const inputChangeHandler = async (eve, key) => {
    let changeEvent
    let e = eve
    if (!e) {
      e = ''
    }
    if (e && e[0] instanceof File) {
      const compressionOptions = {
        maxSizeMB: 5,
        maxWidthOrHeight: 750,
        useWebWorker: true,
      }
      const compressedFile = await imageCompression(e[0], compressionOptions)
      const newPic = renameFile(compressedFile, +new Date())
      let imageCode
      changeEvent = newPic.name
      setNewProfilePicture(newPic)
      imageToBase64(newPic, image64Code => {
        if (newPic.type === 'image/png') {
          imageCode = image64Code.split('data:image/png;base64,').pop()
        } else {
          imageCode = `/9j/${image64Code.split('/9j/').pop()}`
        }
        setNewProfilePicture64(imageCode)
        setPlaceholderProfilePicture64(image64Code)
        setNewProfilePictureType(newPic.type)
      })
    } else if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedFirstTabForm = adjustFormValues(firstTabForm, changeEvent, key)
    const adjustedSecondTabForm = adjustFormValues(secondTabForm, changeEvent, key)
    const adjustedThirdTabForm = adjustFormValues(thirdTabForm, changeEvent, key)
    setFirstTabForm(adjustedFirstTabForm.adjustedForm)
    setSecondTabForm(adjustedSecondTabForm.adjustedForm)
    setThirdTabForm(adjustedThirdTabForm.adjustedForm)
    setFormValid(adjustedFirstTabForm.formValid && adjustedSecondTabForm.formValid && adjustedThirdTabForm.formValid)
    setFormTouched(true)
    setFormSaved(false)
  }

  const loadTabFormContent = formElements => {
    const form = Object.keys(formElements).map((formEl, i) => {
      let imageValue
      if (placeholderProfilePicture64) {
        imageValue = placeholderProfilePicture64
      } else if (currentProfilePictureURL) {
        imageValue = currentProfilePictureURL
      }
      return (
        <Grid item xs={12} key={formEl + i}>
          <Box mb={3}>
            <FormElement
              elementType={formElements[formEl].elementType}
              label={formElements[formEl].elementLabel}
              value={formEl === 'image' ? imageValue : formElements[formEl].value}
              elementOptions={formElements[formEl].elementOptions}
              touched={formElements[formEl].touched}
              valid={formElements[formEl].isValid}
              errorMessage={formElements[formEl].errorMessage}
              shouldValidate={formElements[formEl].validtationRules}
              elementSetup={formElements[formEl].elementSetup}
              changed={e => inputChangeHandler(e, formEl)}
              grid={formElements[formEl].grid}
              disabled={loading}
            />
          </Box>
        </Grid>
      )
    })

    return form
  }

  const socialLinksSort = (oldIndex, newIndex) => {
    if (oldIndex !== newIndex) {
      setFormTouched(true)
      setFormSaved(false)
      setSocialLinks(arrayMove(socialLinks, oldIndex, newIndex))
      onSortSocialLinks()
    }
  }

  const customLinksSort = (oldIndex, newIndex) => {
    if (oldIndex !== newIndex) {
      setFormTouched(true)
      setFormSaved(false)
      onSortCustomLinks(oldIndex, newIndex)
    }
  }

  const changeTabHandler = (event, val) => { setTabValue(val) }
  const isLinksValid = allLinks.length > 0 ? allLinks.filter(link => !link.valid).length === 0 : false
  // console.log(allLinks);
  // console.log(`is form touched: ${formTouched}`);
  // console.log(`is form valid: ${formValid}`);
  // console.log(`links changed: ${linksChanged}`);
  // console.log(`links valid: ${isLinksValid}`);
  // console.log(`is form saved: ${formSaved}`);
  // console.log(`links changed but not valid: ${(formSaved && linksChanged && !isLinksValid)}`);
  // console.log(`form touched and not valid: ${(formTouched && !formValid)}`);
  // console.log(`form not touched and links did not change: ${(!formTouched && !linksChanged)}`);
  // console.log(`links changed but not valid: ${(linksChanged && !isLinksValid)}`);
  const buttonDisabled = (formSaved && !linksChanged) || (formTouched && !formValid) || (!formTouched && !linksChanged) || (linksChanged && !isLinksValid) || loading
  return (
    <Box className={layoutClasses.pageContainer}>
      <Prompt
        when={!buttonDisabled}
        message={language.languageVars.prompt.unsavedChanges}
      />
      <Header title={pageStatics.data.titles.page} />
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          {loading && <LoadingBackdrop loadingText={`${formTouched || linksChanged ? loadingMessage : pageStatics.messages.loading.loadingProfileData}`} />}
          <form>
            <Box className={classes.root}>
              <AppBar position="static">
                <Tabs value={tabValue} onChange={changeTabHandler} centered aria-label="simple tabs example">
                  <Tab label={pageStatics.data.tabs.info} {...tabProps(0)} classes={{ root: classes.editCardTab, selected: colorStyles.selectedTab }} />
                  <Tab label={pageStatics.data.tabs.contact} {...tabProps(1)} classes={{ root: classes.editCardTab, selected: colorStyles.selectedTab }} />
                  <Tab label={pageStatics.data.tabs.picture} {...tabProps(2)} classes={{ root: classes.editCardTab, selected: colorStyles.selectedTab }} />
                  <Tab label={pageStatics.data.tabs.links} {...tabProps(3)} classes={{ root: classes.editCardTab, selected: colorStyles.selectedTab }} />
                </Tabs>
              </AppBar>
              <TabPanel value={tabValue} index={0} classes={{ root: classes.tabContentContainer }} style={{ position: 'absolute' }}>
                <Grid container spacing={3}>
                  {loadTabFormContent(firstTabForm)}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={1}>
                <Grid container spacing={3}>
                  {loadTabFormContent(secondTabForm)}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={2}>
                <Grid container spacing={3}>
                  {loadTabFormContent(thirdTabForm)}
                </Grid>
              </TabPanel>
              <TabPanel value={tabValue} index={3}>
                <ProfileLinks socialLinksOrder={socialLinks} onSort={socialLinksSort} onCustomSort={customLinksSort} />
              </TabPanel>
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
                {pageStatics.buttons.updateProfile}
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  links: state.links.links,
  linksChanged: state.links.changed,
  linksValid: state.links.linksValid,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadLinks: cardLinks => dispatch(actions.loadLinks(cardLinks)),
  onSortCustomLinks: (oldIndex, newIndex) => dispatch(actions.sortCustomLinks(oldIndex, newIndex)),
  onSortSocialLinks: () => dispatch(actions.sortSocialLinks()),
  onLinksFormSaved: () => dispatch(actions.linksSaved()),
})

EditCard.defaultProps = {
  links: null,
  linksChanged: false,
  linksValid: false,
}

EditCard.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  onLoadLinks: PropTypes.func.isRequired,
  onSortCustomLinks: PropTypes.func.isRequired,
  onSortSocialLinks: PropTypes.func.isRequired,
  onLinksFormSaved: PropTypes.func.isRequired,
  links: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])))),
  linksChanged: PropTypes.bool,
  linksValid: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(EditCard)
