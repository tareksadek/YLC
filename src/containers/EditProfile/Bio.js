import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Prompt } from 'react-router-dom'
import { connect } from 'react-redux'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import FormElement from '../../components/Ui/FormElement'
import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import Header from '../../layout/Header'
import InfoBox from '../../components/Ui/InfoBox'
import PageTitle from '../../layout/PageTitle'
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

const Bio = ({
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
  // const isMaster = auth.accountType === 'master'
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  const [formValid, setFormValid] = useState(false)
  const [formTouched, setFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.updatingProfileBio)
  const [formSaved, setFormSaved] = useState(false)
  // const [profileData, setProfileData] = useState(cardData || null)

  const [bioForm, setBioForm] = useState({
    bioVideo: createFormElementObj('video', 'Video Url',
      { type: 'text', name: 'email', placeholder: 'Video Url' },
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
    if ((cardData.userId && !cardData.loading)) {
      // setLoading(true)
      // const data = await onLoadCardByUserId(userId)
      // setProfileData(data)
      const adjustedBioForm = adjustFormValues(bioForm, cardData, null)
      // if (data.vCardFile) {
      //   setExistingVcard(data.vCardFile)
      // }
      setBioForm(prevForm => ({ ...prevForm, ...adjustedBioForm.adjustedForm }))
      setFormValid(adjustedBioForm.formValid)
      // setNewVcardName(`${language.languageVars.appNameCAPS}_${data.urlSuffix}.vcf`)
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

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

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
  //         bioVideo: dataFromMaster.bioVideo,
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
  //         message: pageStatics.messages.notifications.profileBioUpdateError,
  //         type: 'error',
  //       })
  //     }
  //   }
  // }

  const updateInfoHandler = async e => {
    e.preventDefault()
    setLoadingDone(false)
    setLoading(true)
    const data = { ...cardData }
    const bioFormDetails = createFormValuesObj(bioForm)
    const cardDetails = {
      ...data,
      ...bioFormDetails,
    }

    try {
      setLoadingMessage(pageStatics.messages.loading.updatingVcard)
      await updateCard(activeProfileId || userId, cardDetails)
      await onUpdateCard({ ...bioFormDetails })

      setLoadingDone(true)

      setFormSaved(true)
      setFormTouched(false)
      setTimeout(() => setLoading(false), 1000)

      onSetNotification({
        message: pageStatics.messages.notifications.profileBioUpdateSuccess,
        type: 'success',
      })
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      onSetNotification({
        message: pageStatics.messages.notifications.profileBioUpdateError,
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

    const adjustedcontactForm = adjustFormValues(bioForm, changeEvent, key)
    setBioForm(adjustedcontactForm.adjustedForm)
    setFormValid(adjustedcontactForm.formValid)
    setFormTouched(true)
    setFormSaved(false)
  }

  const loadTabFormContent = formElements => Object.keys(formElements).map((formEl, i) => (
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

  const buttonDisabled = formSaved || (formTouched && !formValid) || !formTouched || loading

  // if (auth.user && userId !== cardId && !auth.superAdminStatus) {
  //   return <Redirect to="/auth" />
  // }

  if (!cardData.userId || cardData.loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.teamVideo}>
          <Box>
            <InfoBox infoList={[
              pageStatics.messages.info.teamVideo.first,
              // ...auth.accountType === 'master' ? [pageStatics.messages.info.bio.master] : [],
            ]}
            />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 250 },
              ]}
              />
            </Box>
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingProfileBio} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={`${formTouched ? loadingMessage : pageStatics.messages.loading.loadingProfileBio}`} boxed />}
      <Prompt
        when={!buttonDisabled}
        message={pageStatics.messages.notifications.savePrompt}
      />
      <Header title={pageStatics.data.titles.teamVideo}>
        <Box>
          <InfoBox infoList={[
            pageStatics.messages.info.teamVideo.first,
            // ...auth.accountType === 'master' ? [pageStatics.messages.info.bio.master] : [],
          ]}
          />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <form>
            <Box className={classes.root}>
              <Grid container spacing={3}>
                <Box className={`${layoutClasses.panel}`}>
                  <PageTitle title={cardData && cardData.bioVideo ? pageStatics.data.titles.currentVideo : pageStatics.data.titles.addVideo} />
                  {loadTabFormContent(bioForm)}
                </Box>
              </Grid>
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
                {pageStatics.buttons.updateTeamVideo}
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

Bio.defaultProps = {
  cardData: null,
  activeProfileId: null,
}

Bio.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(Bio)
