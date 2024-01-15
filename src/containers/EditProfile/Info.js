import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import InfoBox from '../../components/Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'
import FormElement from '../../components/Ui/FormElement'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'
import SkeletonContainer from '../../layout/SkeletonContainer'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { editProfileStyles } from './styles'

import { updateCard } from '../../API/cards'
// import { getFirebaseStorage } from '../../API/firebase'
import { useColor } from '../../hooks/useDarkMode'
import { useAuth } from '../../hooks/use-auth'

// import { generateVcard } from '../../utilities/utils'

import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

const Info = ({
  cardData, onSetNotification, onUpdateCard, activeProfileId,
}) => {
  const color = useColor()
  // const { cardId } = useParams()
  const auth = useAuth()
  const userId = auth.user.uid
  // const profileId = auth.user.uid !== cardId && auth.superAdminStatus ? cardId : userId
  // const profileId = userId
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const classes = editProfileStyles()
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.updatingProfileInfo)
  // const [existingVcard, setExistingVcard] = useState(null)
  // const [newVcardName, setNewVcardName] = useState(cardData && cardData.urlSuffix ? `${language.languageVars.appNameCAPS}_${cardData.urlSuffix}.vcf` : null)
  const [formSaved, setFormSaved] = useState(false)
  // const [profileData, setProfileData] = useState(cardData || null)

  const [infoForm, setInfoForm] = useState({
    // firstName: createFormElementObj('input', pageStatics.forms.infoTab.firstName,
    //   { type: 'text', name: 'firstName', placeholder: pageStatics.forms.infoTab.firstName },
    //   '',
    //   null,
    //   { required: false },
    //   !!cardData.userId,
    //   {
    //     xs: 12,
    //     sm: null,
    //     md: null,
    //     lg: null,
    //     xl: null,
    //     fullWidth: true,
    //   }),
    organization: createFormElementObj('input', pageStatics.forms.infoTab.organization,
      { type: 'text', name: 'organization', placeholder: pageStatics.forms.infoTab.organization },
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
    ...(auth.isMaster ? null : {
      firstName: createFormElementObj('input',
        pageStatics.forms.infoTab.firstName,
        {
          type: 'text',
          name: 'firstName',
          placeholder: pageStatics.forms.infoTab.firstName,
        }, '', null, { required: false }, !!cardData.userId,
        {
          xs: 12,
          sm: null,
          md: null,
          lg: null,
          xl: null,
          fullWidth: true,
        }),
    }),
    ...(auth.isMaster ? null : {
      middleName: createFormElementObj('input',
        pageStatics.forms.infoTab.middleName,
        {
          type: 'text',
          name: 'middleName',
          placeholder: pageStatics.forms.infoTab.middleName,
        }, '', null, { required: false }, !!cardData.userId,
        {
          xs: 12,
          sm: null,
          md: null,
          lg: null,
          xl: null,
          fullWidth: true,
        }),
    }),
    // middleName: createFormElementObj('input', pageStatics.forms.infoTab.middleName,
    //   { type: 'text', name: 'middleName', placeholder: pageStatics.forms.infoTab.middleName },
    //   '',
    //   null,
    //   { required: false },
    //   !!cardData.userId,
    //   {
    //     xs: 12,
    //     sm: null,
    //     md: null,
    //     lg: null,
    //     xl: null,
    //     fullWidth: true,
    //   }),
    lastName: createFormElementObj('input',
      auth.isMaster ? pageStatics.forms.infoTab.teamName : pageStatics.forms.infoTab.lastName,
      {
        type: 'text',
        name: 'lastName',
        placeholder: auth.isMaster ? pageStatics.forms.infoTab.teamName : pageStatics.forms.infoTab.lastName,
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
    title: createFormElementObj('input',
      auth.isMaster ? pageStatics.forms.infoTab.teamPosition : pageStatics.forms.infoTab.title,
      {
        type: 'text',
        name: 'title',
        placeholder: auth.isMaster ? pageStatics.forms.infoTab.teamPosition : pageStatics.forms.infoTab.title,
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
    email: createFormElementObj('input', pageStatics.forms.contactTab.email,
      { type: 'text', name: 'email', placeholder: pageStatics.forms.contactTab.email },
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
    workPhone: createFormElementObj('input', pageStatics.forms.contactTab.workPhone,
      { type: 'tel', name: 'workPhone', placeholder: pageStatics.forms.contactTab.workPhone },
      '',
      null,
      { required: false, onlyNumber: true },
      !!cardData.userId,
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
      !!cardData.userId,
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
    if (cardData.userId && !cardData.loading) {
      // setLoading(true)
      const adjustedInfoForm = adjustFormValues(infoForm, cardData, null)
      setInfoForm(prevForm => ({ ...prevForm, ...adjustedInfoForm.adjustedForm }))
      setFormValid(adjustedInfoForm.formValid)
      // setLoadingDone(true)
      // setTimeout(() => setLoading(false), 1000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData])

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

  // const updateTeamData = async dataFromMaster => {
  //   let updatedData = null
  //   let memberDetails = null
  //   let vCardFile = null
  //   let metaData = null
  //   let memberNewVcardName = null
  //   for (let i = 0; i < teamMembers.length; i += 1) {
  //     try {
  //       /* eslint-disable no-await-in-loop */
  //       setLoadingDone(false)
  //       await timer(1000)
  //       setLoadingMessage(`${pageStatics.messages.loading.updatingTeamMember.first} ${i + 1} ${pageStatics.messages.loading.updatingTeamMember.second} ${teamMembers.length}`)
  //       updatedData = {
  //         organization: dataFromMaster.organization,
  //         career: dataFromMaster.career,
  //       }
  //       memberDetails = {
  //         ...teamMembers[i],
  //         ...updatedData,
  //       }
  //
  //       memberNewVcardName = `${language.languageVars.appNameCAPS}_${teamMembers[i].urlSuffix}.vcf`
  //
  //       vCardFile = generateVcard(memberDetails, memberDetails.links, memberNewVcardName, memberDetails.base64Photo?.code || null, memberDetails.base64Photo?.type || null)
  //       memberDetails.vCardFile = vCardFile.name
  //       metaData = {
  //         contentDisposition: 'attachment',
  //         filename: vCardFile.name,
  //         contentType: 'text/vcard',
  //       }
  //       await getFirebaseStorage().ref(`/card/${vCardFile.name}`).put(vCardFile, metaData)
  //       await updateCard(teamMembers[i].userId, memberDetails)
  //       setLoadingDone(true)
  //       await timer(1000)
  //     } catch (err) {
  //       onSetNotification({
  //         message: pageStatics.messages.notifications.profileInfoUpdateError,
  //         type: 'error',
  //       })
  //     }
  //   }
  // }
  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoadingDone(false)
    setLoading(true)
    // const data = { ...cardData }
    const infoFormDetails = createFormValuesObj(infoForm)
    const cardDetails = {
      ...cardData,
      ...infoFormDetails,
    }
    // if (isMaster) {
    //   cardDetails.teamData = {
    //     ...data.teamData,
    //     organization: infoFormDetails.organization,
    //     career: infoFormDetails.career,
    //   }
    // }
    try {
      setLoadingMessage(pageStatics.messages.loading.updatingVcard)
      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ ...infoFormDetails })

      setLoadingDone(true)

      setFormSaved(true)
      setFormTouched(false)

      setTimeout(() => setLoading(false), 1000)

      onSetNotification({
        message: pageStatics.messages.notifications.profileInfoUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.profileInfoUpdateError,
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
    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }

    const adjustedInfoForm = adjustFormValues(infoForm, changeEvent, key)
    setInfoForm(adjustedInfoForm.adjustedForm)
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

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  if (cardData.loading || !cardData.userId || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.contact}>
          <Box>
            <InfoBox infoList={[
              pageStatics.messages.info.contact.first,
              // ...auth.accountType === 'master' ? [pageStatics.messages.info.info.master] : [],
            ]}
            />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingProfileInfo} boxed />
      </Box>
    )
  }
  // console.log(auth);
  // console.log(loading);
  // console.log(loadingMessage);
  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingProfileInfo}`} boxed />}
      <Prompt
        when={!buttonDisabled}
        message={pageStatics.messages.notifications.savePrompt}
      />
      <Header title={pageStatics.data.titles.contact}>
        <Box>
          <InfoBox infoList={[
            pageStatics.messages.info.contact.first,
            // ...auth.accountType === 'master' ? [pageStatics.messages.info.info.master] : [],
          ]}
          />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <form>
            <Box className={classes.root}>
              <Box className={`${layoutClasses.panel}`}>
                <PageTitle
                  title={pageStatics.data.titles.editInfo}
                />
                <Grid container spacing={3}>
                  {loadTabFormContent(infoForm)}
                </Grid>
              </Box>
            </Box>
            <Box className={classes.editButtonContainer}>
              <Button
                color="secondary"
                onClick={e => updateInfoHandler(e)}
                disabled={buttonDisabled}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: !buttonDisabled && color.color.code,
                  minWidth: '250px',
                }}
              >
                {pageStatics.buttons.updateContact}
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
  teamMembers: state.teamMembers.teamMembers,
  activeProfileId: state.profiles.activeProfileId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadCardByUserId: userId => dispatch(actions.loadCardByUserId(userId)),
  onUpdateCard: newData => dispatch(actions.updateCard(newData)),
})

Info.defaultProps = {
  cardData: null,
  activeProfileId: null,
}

Info.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
  onUpdateCard: PropTypes.func.isRequired,
  activeProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Info)
