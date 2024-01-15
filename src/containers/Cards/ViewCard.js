import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { isAfter, isEqual, startOfDay } from 'date-fns';

import Box from '@material-ui/core/Box'

import { useTheme } from '@material-ui/core/styles'

import { useAuth } from '../../hooks/use-auth'
import { useColor } from '../../hooks/useDarkMode'
import { useLayoutMode } from '../../hooks/useLayoutMode'
import { useLanguage } from '../../hooks/useLang'
import { useDisplayMode } from '../../hooks/useDisplayMode'

import { Logo } from '../../layout/CustomIcons'

import { generateVcard } from '../../utilities/utils'

import {
  countLinkClicks, countTeamMemberLinkClicks, countTeamLinkClicks,
  // getCardBySuffix, getCardById, updateFollowing,
  // updateFollowers, removeFollower, removeFollowing,
  updateProfileVisitsById, countCardClicks,
} from '../../API/cards'

import { createFormElementObj, adjustFormValues, createFormValuesObj } from '../../utilities/form'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import FormElement from '../../components/Ui/FormElement'
import SkeletonContainer from '../../layout/SkeletonContainer'
import Alert from '../../layout/Alert'

import { buttonStyles } from '../../theme/buttons'
import { layoutStyles } from '../../theme/layout'
import { viewCardStyles } from './styles'

import * as actions from '../../store/actions'

const PasswordProtected = lazy(() => import('../../components/Cards/ViewCard/PasswordProtected'))
const SocialHeader = lazy(() => import('../../components/Cards/ViewCard/SocialHeader'))
const SocialView = lazy(() => import('../../components/Cards/ViewCard/SocialView'))
const BusinessHeader = lazy(() => import('../../components/Cards/ViewCard/BusinessHeader'))
const BusinessView = lazy(() => import('../../components/Cards/ViewCard/BusinessView'))
const BasicHeader = lazy(() => import('../../components/Cards/ViewCard/BasicHeader'))
const BasicView = lazy(() => import('../../components/Cards/ViewCard/BasicView'))
const SquareHeader = lazy(() => import('../../components/Cards/ViewCard/SquareHeader'))
const SquareView = lazy(() => import('../../components/Cards/ViewCard/SquareView'))

const ViewCard = ({
  card,
  loading,
  firstName,
  lastName,
  middleName,
  // namePrefix,
  // nameSuffix,
  gender,
  nickname,
  career,
  organization,
  title,
  email,
  address,
  workPhone,
  homePhone,
  workFax,
  homeFax,
  birthday,
  note,
  links,
  socialLinksOrder,
  settings,
  masterProfileId,
  connections,
  followers,
  passwordProtected,
  vCardFile,
  onLoadCardBySuffix,
  // onLoadCardById,
  // onCardClicked,
  // onLoadCounter,
  switchTheme,
  clickedNo,
  redirect,
  defaultLinksToTheme,
  bioVideo,
  logo,
  // onAddFollower,
  // onRemoveFollower,
  onSetNotification,
  image,
  connectionForms,
  connectionSettings,
  connectionTags,
  onLoadConnectionData,
  marker,
  connectionsDataLoaded,
  connectionProfileId,
}) => {
  const classes = viewCardStyles()
  const buttonClasses = buttonStyles()
  const defaultTheme = useTheme()
  // const history = useHistory()
  const auth = useAuth()
  const language = useLanguage()
  // const pageStatics = language.languageVars.pages.viewProfile
  const mode = useDisplayMode()
  const layoutClasses = layoutStyles()
  const color = useColor()
  const { layout, switchLayout } = useLayoutMode()
  const { urlSuffix } = useParams()
  const isTheLoggedinUser = auth && auth.user && auth.user.uid === card.defaultId && urlSuffix === auth.userUrlSuffix
  const profileDeactivated = settings && settings.active !== 'null' && settings.active !== undefined && !settings.active
  const isTeamMember = !!card.masterProfileId
  // const isInMyTeam = auth && auth.user && auth.user.uid === card.masterId
  const masterViewer = auth.user && auth.user.uid === masterProfileId
  const passwordInStorage = window.localStorage.getItem('profilePass') === 'null' ? null : window.localStorage.getItem('profilePass')
  // const isPro = auth.isSubscriber && (auth.subscriberStatus === 'active' || auth.subscriberStatus === 'trialing')
  let contentClass = layoutClasses.socialContentContainer
  if (layout && layout === 'business') {
    contentClass = layoutClasses.businessContentContainer
  } else if (layout && layout === 'basic') {
    contentClass = layoutClasses.basicContentContainer
  } else if (layout && layout === 'square') {
    contentClass = layoutClasses.squareContentContainer
  }

  const showLoginIcon = !auth.user && !!card.userId

  const [infoDialogOpen, setInfoDialogOpen] = useState(window.location.hash === '#info')
  const [connectDialogOpen, setConnectDialogOpen] = useState(window.location.hash === '#connect')
  const [colorCode, setColorCode] = useState(null)
  const [passwordFormLoading, setPasswordFormLoading] = useState(false)
  const [passwordFormValid, setPasswordFormValid] = useState(false)
  const [passwordFormTouched, setPasswordFormTouched] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [enteredPassword, setEnteredPassword] = useState(passwordInStorage || null)
  // const [followingInProgress, setFollowingInProgress] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    password: createFormElementObj('input', 'Profile Key',
      { type: 'text', name: 'password', placeholder: 'Profile Key' }, '', null, { required: true }, false,
      {
        xs: 12,
        sm: null,
        md: null,
        lg: null,
        xl: null,
        fullWidth: true,
      }),
  })

  let deviceType = 'desktop'

  if (/(iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
    deviceType = 'iphone'
  } else if (/android/i.test(navigator.userAgent)) {
    deviceType = 'android'
  } else {
    deviceType = 'desktop'
  }

  // useEffect(() => {
  //   let mounted = true
  //   if (mounted && auth.authStatus === 'failed') {
  //     (async () => {
  //       try {
  //         await updateProfileVisitsBySuffix(urlSuffix)
  //       } catch (err) {
  //         throw new Error(err)
  //       }
  //     })()
  //   }
  //   return () => {
  //     mounted = false
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [auth.authStatus])

  useEffect(() => {
    let mounted = true
    if (mounted && auth.authStatus === 'failed' && card.userId) {
      (async () => {
        try {
          if (window.performance.navigation.type !== 1) {
            await updateProfileVisitsById(card.userId, card.defaultId || card.userId, deviceType)
          }
        } catch (err) {
          throw new Error(err)
        }
      })()
    }
    return () => {
      mounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.authStatus, card.userId])

  // useEffect(() => {
  //   let mounted = true
  //   if ((mounted && !card.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       try {
  //         setLoadingData(true)
  //         await onLoadCard(urlSuffix, enteredPassword, null, null)
  //         // await onLoadCounter(urlSuffix)
  //         setLoadingDone(true)
  //         setTimeout(() => setLoadingData(false), 1000)
  //       } catch (err) {
  //         throw new Error(err)
  //       }
  //     })()
  //   }
  //   return () => {
  //     mounted = false
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [onLoadCard, urlSuffix, enteredPassword, card.userId])

  useEffect(() => {
    if (!isTheLoggedinUser) {
      mode.toggleMode('view')
    }
  }, [isTheLoggedinUser, mode])

  useEffect(() => {
    if ((auth.authStatus === 'loggedin' || auth.authStatus === 'failed') && (!card.userId || !isTheLoggedinUser)) {
      setLoadingData(true)
      // if (auth.authStatus === 'loggedin' && isTheLoggedinUser) {
      //   console.log('auth');
      //   onLoadCardById(auth.user.uid, isPro)
      // } else {
      onLoadCardBySuffix(urlSuffix, enteredPassword, auth.user, auth.authStatus)
      setLoadingDone(true)
      setTimeout(() => setLoadingData(false), 1000)
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoadCardBySuffix, urlSuffix, enteredPassword, auth.authStatus, isTheLoggedinUser])

  useEffect(() => {
    if (card.userId && (!connectionsDataLoaded || connectionProfileId !== card.userId || (card.passwordProtected && enteredPassword))) {
      onLoadConnectionData(card.userId, card.masterProfileId, false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [card.userId, onLoadConnectionData, connectionProfileId])

  useEffect(() => {
    let mounted = true

    if (mounted) {
      (async () => {
        try {
          if (settings) {
            switchTheme(settings.theme)
            const fallBackColor = settings.theme === 'light' ? '#272727' : '#ffffff'
            setColorCode(settings.selectedColor.code || fallBackColor)
            switchLayout(settings.layout)
          } else {
            setColorCode(color.color.code)
          }
        } catch (err) {
          throw new Error(err)
        }
      })()
    }

    return () => { mounted = false }
  }, [settings, switchTheme, switchLayout, color.color.code])

  useEffect(() => {
    const onHashChange = () => {
      setInfoDialogOpen(window.location.hash === '#info')
      setConnectDialogOpen(window.location.hash === '#connect')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  let activeForm
  const activeFormId = connectionSettings && (connectionSettings.activeFormId || connectionSettings.defaultFormId)
  const isEmbedForm = !!(connectionSettings && connectionSettings.activeFormId === 'embed' && connectionSettings.embedForm && connectionSettings.embedForm.embedCode)
  if (isEmbedForm) {
    activeForm = connectionSettings.embedForm
  } else {
    activeForm = connectionForms && connectionForms.find(connectionForm => connectionForm.id === activeFormId || connectionForm.id === connectionSettings.defaultFormId)
  }

  const userName = `${firstName || ''} ${middleName || ''} ${lastName || ''}`

  const openInfoDialogHandler = () => {
    window.location.hash = '#info'
  }

  const closeInfoDialogHandler = () => {
    window.history.back()
  }

  const openConnectDialogHandler = async () => {
    try {
      // if (auth.authStatus === 'loggedin' && urlSuffix && !isTheLoggedinUser) {
      // if (!alwaysConnect) {
      //   setFollowingInProgress(true)
      //   const followingUser = await getCardBySuffix(urlSuffix)
      //   const followerUser = await getCardById(auth.user.uid)
      //   if (followers && followers.some(e => e.userId === auth.user.uid)) {
      //     await removeFollowing(auth.user.uid, followingUser.userId)
      //     await removeFollower(followingUser.userId, auth.user.uid)
      //     onRemoveFollower(auth.user.uid)
      //     onSetNotification({
      //       message: `${language.languageVars.pages.followings.messages.notifications.removeFollowingSuccess} ${followingUser.firstName}`,
      //       type: 'success',
      //     })
      //   } else {
      //     const newFollowing = {
      //       userId: followingUser.userId,
      //       base64Photo: followingUser.base64Photo,
      //       suffix: urlSuffix,
      //       addedOn: new Date(),
      //       email: followingUser.email,
      //       firstName: followingUser.firstName,
      //       lastName: followingUser.lastName,
      //       vCardFile: followingUser.vCardFile,
      //       workPhone: followingUser.workPhone,
      //     }
      //     const newFollower = {
      //       userId: followerUser.userId,
      //       base64Photo: followerUser.base64Photo,
      //       suffix: followerUser.urlSuffix,
      //       addedOn: new Date(),
      //       email: followerUser.email,
      //       firstName: followerUser.firstName,
      //       lastName: followerUser.lastName,
      //       vCardFile: followerUser.vCardFile,
      //       workPhone: followerUser.workPhone,
      //     }
      //     onAddFollower(newFollower)
      //     await updateFollowing(auth.user.uid, newFollowing)
      //     await updateFollowers(followingUser.userId, newFollower)
      //     onSetNotification({
      //       message: `${language.languageVars.pages.followings.messages.notifications.addFollowingSuccess} ${followingUser.firstName}`,
      //       type: 'success',
      //     })
      //   }
      //   setFollowingInProgress(false)
      // } else {
      window.location.hash = '#connect'
      // }
    } catch (err) {
      onSetNotification({
        message: language.languageVars.pages.followings.messages.notifications.addFollowingError,
        type: 'success',
      })
    }
  }

  const closeConnectDialogHandler = () => { window.history.back() }

  const cardClickedHandler = async () => {
    const cardData = { ...card }
    if (card.isMaster) {
      cardData.firstName = cardData.lastName
      cardData.lastName = ''
    }
    const a = document.createElement('a')
    const vcardName = `${language.languageVars.appNameCAPS}_${cardData.firstName ? cardData.firstName.trim().split(' ').join('_') : ''}_${cardData.lastName ? cardData.lastName.trim().split(' ').join('_') : ''}.vcf`
    const file = generateVcard(cardData, cardData.links, vcardName, cardData.logo?.code || null, cardData.logo?.type || null, urlSuffix)
    const url = window.URL.createObjectURL(new Blob([file], { type: 'text/vcard' }))
    a.href = url
    a.download = vcardName;
    a.click()
    if (!auth.user) {
      await countCardClicks(urlSuffix)
    }
  }

  const passwordChangeHandler = (e, key) => {
    let changeEvent

    if (Array.isArray(e)) {
      changeEvent = e.join()
    } else if (Number.isInteger(e)) {
      changeEvent = String(e)
    } else {
      changeEvent = e
    }
    const adjustedPasswordForm = adjustFormValues(passwordForm, changeEvent, key)
    setPasswordForm(adjustedPasswordForm.adjustedForm)
    setPasswordFormValid(adjustedPasswordForm.formValid)
    setPasswordFormTouched(true)
  }

  const loadForm = (form, changeHandler) => {
    const formElements = Object.keys(form).map((formEl, i) => (
      <FormElement
        elementType={form[formEl].elementType}
        label={form[formEl].elementLabel}
        value={form[formEl].value}
        elementOptions={form[formEl].elementOptions}
        touched={form[formEl].touched}
        valid={form[formEl].isValid}
        shouldValidate={form[formEl].validtationRules}
        elementSetup={form[formEl].elementSetup}
        changed={e => changeHandler(e, formEl)}
        grid={form[formEl].grid}
        disabled={loading || form[formEl].disabled}
        errorMessage={form[formEl].errorMessage}
        key={formEl + i}
      />
    ))

    return formElements
  }

  const revealInfo = () => {
    setPasswordFormLoading(true)
    const passwordFormData = createFormValuesObj(passwordForm)
    setEnteredPassword(passwordFormData.password)
    setPasswordFormLoading(false)
  }

  const countLinkClicksHandler = async (linkUrl, linkKey, linkPlatform, linkActive) => {
    if (!isTheLoggedinUser) {
      if (isTeamMember) {
        await countTeamMemberLinkClicks(card.userId, masterProfileId, linkUrl, linkKey, linkPlatform, linkActive)
        await countTeamLinkClicks(masterProfileId, linkUrl, linkKey)
      } else {
        await countLinkClicks(urlSuffix, linkUrl)
      }
    }
  }

  // const openProDialogHandler = () => {
  //   window.location.hash = '#becomepro'
  // }

  // const goToSubscribe = () => {
  //   history.push(SUBSCRIBE_PAGE)
  // }

  const currentDate = startOfDay(new Date());
  const checkDate = new Date(new Date().getFullYear(), 10, 11); // Month is 0-based (0 = January, 9 = October)

  if (isAfter(currentDate, checkDate) || isEqual(currentDate, checkDate)) {
    return <div>&nbsp;</div>;
  }

  if ((!auth.user || !isTheLoggedinUser) && profileDeactivated) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Box className={layoutClasses.contentContainer}>
          <Box className={classes.inactiveLogoContainer}>
            <a href={language.languageVars.appParentDomain} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <Logo fill={defaultTheme.palette.background.reverse} />
            </a>
          </Box>
          <Alert
            title={language.languageVars.pages.auth.messages.info.profileDeactivated.visitorTitle}
            description={language.languageVars.pages.auth.messages.info.profileDeactivated.visitorFirst}
            type="error"
          />
          <Box display="flex" justifyContent="center" alignItems="center">
            <a className={`${buttonClasses.textButton}`} href={language.languageVars.appParentDomain} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              {language.languageVars.getTheCard}
            </a>
          </Box>
        </Box>
      </Box>
    )
  }

  // if (dataLoading || !card.userId) {
  //   return <LoadingBackdrop done={loadingDone} loadingText={language.languageVars.pages.viewProfile.messages.loading.loadingProfileData} />
  // }
  if ((!auth.user || !isTheLoggedinUser) && redirect) {
    window.location.href = redirect
    return null
  }

  // if ((!card || !card.userId || card.loading || !connections || connections.loading || loadingData)) {
  if ((!card || !card.userId || card.loading || loadingData || auth.loadingAuth)) {
    return (
      <Box className={`${layoutClasses.pageContainer} ${logo ? layoutClasses.pageContainerWithLogo : ''}`} style={{ minHeight: 600 }}>
        <SkeletonContainer list={[
          { variant: 'rect', fullWidth: true, height: 275 },
          { variant: 'circle', width: 130, height: 130 },
        ]}
        />
        <SkeletonContainer list={[
          { variant: 'rect', fullWidth: true },
          { variant: 'rect', width: '75%' },
          { variant: 'rect', width: '45%', height: 35 },
          { variant: 'rect', width: '45%', height: 35 },
          { variant: 'rect', fullWidth: true, height: 35 },
          { variant: 'rect', fullWidth: true, height: 35 },
          { variant: 'rect', fullWidth: true, height: 35 },
          { variant: 'rect', width: '15%', height: 60 },
          { variant: 'rect', width: '15%', height: 60 },
          { variant: 'rect', width: '15%', height: 60 },
          { variant: 'rect', width: '15%', height: 60 },
        ]}
        />
        <LoadingBackdrop done={loadingDone} loadingText={language.languageVars.pages.viewProfile.messages.loading.loadingProfileData} boxed />
      </Box>
    )
  }

  return (
    <Box className={`${layoutClasses.pageContainer} ${logo ? layoutClasses.pageContainerWithLogo : ''}`} style={{ minHeight: 600 }}>
      {layout && layout === 'business' && (
        <Suspense fallback={(
          <SkeletonContainer list={[
            { variant: 'rect', fullWidth: true, height: 150 },
            {
              variant: 'circle', fullWidth: true, height: 100, width: 100,
            },
          ]}
          />
        )}
        >
          <BusinessHeader
            showLoginIcon={showLoginIcon}
            image={image}
            logo={logo}
            firstName={firstName}
            userName={userName}
            authUser={auth.user}
            userColor={colorCode}
            showHelperButtons={isTheLoggedinUser}
            urlSuffix={card.urlSuffix}
            isMaster={card.isMaster}
          />
        </Suspense>
      )}

      {layout && layout === 'social' && (
        <Suspense
          fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true },
              { variant: 'rect', fullWidth: true, height: 300 },
            ]}
            />
          )}
        >
          <SocialHeader
            showLoginIcon={showLoginIcon}
            image={image}
            logo={logo}
            firstName={firstName}
            email={email}
            userName={userName}
            authUser={auth.user}
            userColor={colorCode}
            showHelperButtons={isTheLoggedinUser}
            urlSuffix={card.urlSuffix}
            isMaster={card.isMaster}
          />
        </Suspense>
      )}

      {layout && layout === 'basic' && (
        <Suspense
          fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true },
              { variant: 'rect', fullWidth: true, height: 300 },
            ]}
            />
          )}
        >
          <BasicHeader
            showLoginIcon={showLoginIcon}
            image={image}
            logo={logo}
            firstName={firstName}
            lastName={lastName}
            email={email}
            userName={userName}
            organization={organization}
            authUser={auth.user}
            colorCode={colorCode}
            showHelperButtons={isTheLoggedinUser}
            title={title}
            homePhone={homePhone}
            vCardFile={vCardFile}
            cardClickedHandler={cardClickedHandler}
            clickedNo={clickedNo}
            connectDialogOpen={connectDialogOpen}
            openConnectDialog={openConnectDialogHandler}
            closeConnectDialog={closeConnectDialogHandler}
            connectionsCount={connections ? connections.length : 0}
            canFollow={auth.authStatus === 'loggedin' && urlSuffix && !isTheLoggedinUser}
            isFollowed={(followers && auth.user) && followers.some(e => e.userId === auth.user.uid)}
            // followingInProgress={followingInProgress}
            userColor={colorCode}
            isMaster={card.isMaster}
            urlSuffix={card.urlSuffix}
          />
        </Suspense>
      )}

      {layout && layout === 'square' && (
        <Suspense fallback={(
          <SkeletonContainer list={[
            { variant: 'rect', fullWidth: true, height: 150 },
            {
              variant: 'circle', fullWidth: true, height: 100, width: 100,
            },
          ]}
          />
        )}
        >
          <SquareHeader
            showLoginIcon={showLoginIcon}
            image={image}
            logo={logo}
            firstName={firstName}
            lastName={lastName}
            userName={userName}
            authUser={auth.user}
            title={title}
            userColor={colorCode}
            showHelperButtons={isTheLoggedinUser}
            urlSuffix={card.urlSuffix}
            colorCode={colorCode}
            clickedNo={clickedNo}
            cardClickedHandler={cardClickedHandler}
            connectDialogOpen={connectDialogOpen}
            openConnectDialog={openConnectDialogHandler}
            closeConnectDialog={closeConnectDialogHandler}
            connectionsCount={connections ? connections.length : 0}
            activeForm={activeForm}
            connectionSettings={connectionSettings}
            isEmbedForm={isEmbedForm}
            connectionTags={connectionTags}
            organization={organization}
            isMaster={card.isMaster}
          />
        </Suspense>
      )}

      <Box className={`${layoutClasses.contentContainer} ${contentClass}`}>
        {auth.user && isTheLoggedinUser && isTeamMember && profileDeactivated && (
          <Box mt={2}>
            <Alert
              title={language.languageVars.pages.auth.messages.info.profileDeactivated.teamMemberTitle}
              description={language.languageVars.pages.auth.messages.info.profileDeactivated.teamMemberFirst}
              type="error"
            />
          </Box>
        )}
        {auth.user && masterViewer && profileDeactivated && (
          <Box mt={2}>
            <Alert
              title={language.languageVars.pages.auth.messages.info.profileDeactivated.masterTitle}
              description={language.languageVars.pages.auth.messages.info.profileDeactivated.masterFirst}
              type="error"
            />
          </Box>
        )}
        {auth.user && isTheLoggedinUser && !isTeamMember && !masterViewer && profileDeactivated && (
          <Box mt={2} style={{ maxWidth: 550, margin: '0 auto' }}>
            <Alert
              title={language.languageVars.pages.auth.messages.info.profileDeactivated.userTitle}
              description={language.languageVars.pages.auth.messages.info.profileDeactivated.userFirst}
              type="error"
            />
          </Box>
        )}
        {layout && layout === 'basic' && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', width: '75%' },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '75%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
            ]}
            />
          )}
          >
            <BasicView
              colorCode={colorCode}
              firstName={firstName}
              userName={userName}
              authUser={auth.user}
              vCardFile={vCardFile}
              cardClickedHandler={cardClickedHandler}
              clickedNo={clickedNo}
              email={email}
              links={links}
              socialLinksOrder={socialLinksOrder}
              middleName={middleName}
              lastName={lastName}
              gender={gender}
              nickname={nickname}
              career={career}
              organization={organization}
              title={title}
              workPhone={workPhone}
              workFax={workFax}
              homePhone={homePhone}
              homeFax={homeFax}
              birthday={birthday}
              note={note}
              connectionsCount={connections ? connections.length : 0}
              connectDialogOpen={connectDialogOpen}
              openConnectDialog={openConnectDialogHandler}
              closeConnectDialog={closeConnectDialogHandler}
              countClicks={countLinkClicksHandler}
              bioVideo={bioVideo}
              openInfoDialog={openInfoDialogHandler}
              closeInfoDialog={closeInfoDialogHandler}
              infoDialogOpen={infoDialogOpen}
              passwordProtected={passwordProtected}
              showHelperButtons={isTheLoggedinUser}
              canFollow={auth.authStatus === 'loggedin' && urlSuffix && !isTheLoggedinUser}
              isFollowed={(followers && auth.user) && followers.some(e => e.userId === auth.user.uid)}
              // followingInProgress={followingInProgress}
              logo={logo}
              activeForm={activeForm}
              connectionTags={connectionTags}
              connectionSettings={connectionSettings}
              redirect={redirect}
              isEmbedForm={isEmbedForm}
              isTheLoggedinUser={isTheLoggedinUser}
              defaultLinksToTheme={defaultLinksToTheme}
              address={address}
              marker={marker}
              settings={settings}
            />
          </Suspense>
        )}
        {layout && layout === 'business' && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', width: '75%' },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '75%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
              { variant: 'rect', width: '35%' },
            ]}
            />
          )}
          >
            <BusinessView
              colorCode={colorCode}
              firstName={firstName}
              userName={userName}
              authUser={auth.user}
              vCardFile={vCardFile}
              cardClickedHandler={cardClickedHandler}
              clickedNo={clickedNo}
              email={email}
              links={links}
              socialLinksOrder={socialLinksOrder}
              middleName={middleName}
              lastName={lastName}
              gender={gender}
              nickname={nickname}
              career={career}
              organization={organization}
              title={title}
              workPhone={workPhone}
              workFax={workFax}
              homePhone={homePhone}
              homeFax={homeFax}
              birthday={birthday}
              note={note}
              connectionsCount={connections ? connections.length : 0}
              connectDialogOpen={connectDialogOpen}
              openConnectDialog={openConnectDialogHandler}
              closeConnectDialog={closeConnectDialogHandler}
              countClicks={countLinkClicksHandler}
              bioVideo={bioVideo}
              openInfoDialog={openInfoDialogHandler}
              closeInfoDialog={closeInfoDialogHandler}
              infoDialogOpen={infoDialogOpen}
              passwordProtected={passwordProtected}
              showHelperButtons={isTheLoggedinUser}
              canFollow={auth.authStatus === 'loggedin' && urlSuffix && !isTheLoggedinUser}
              isFollowed={(followers && auth.user) && followers.some(e => e.userId === auth.user.uid)}
              // followingInProgress={followingInProgress}
              logo={logo}
              activeForm={activeForm}
              connectionTags={connectionTags}
              connectionSettings={connectionSettings}
              redirect={redirect}
              isEmbedForm={isEmbedForm}
              isTheLoggedinUser={isTheLoggedinUser}
              defaultLinksToTheme={defaultLinksToTheme}
              address={address}
              marker={marker}
              isMaster={card.isMaster}
              settings={settings}
            />
          </Suspense>
        )}
        {layout && layout === 'social' && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true },
              { variant: 'rect', width: '75%' },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '15%', height: 60 },
              { variant: 'rect', width: '15%', height: 60 },
              { variant: 'rect', width: '15%', height: 60 },
              { variant: 'rect', width: '15%', height: 60 },
            ]}
            />
          )}
          >
            <SocialView
              authUser={auth.user}
              vCardFile={vCardFile}
              cardClickedHandler={cardClickedHandler}
              clickedNo={clickedNo}
              colorCode={colorCode}
              links={links}
              socialLinksOrder={socialLinksOrder}
              userName={userName}
              firstName={firstName}
              middleName={middleName}
              lastName={lastName}
              gender={gender}
              nickname={nickname}
              career={career}
              organization={organization}
              title={title}
              email={email}
              workPhone={workPhone}
              workFax={workFax}
              homePhone={homePhone}
              homeFax={homeFax}
              birthday={birthday}
              note={note}
              address={address}
              connectionsCount={connections ? connections.length : 0}
              openInfoDialog={openInfoDialogHandler}
              closeInfoDialog={closeInfoDialogHandler}
              infoDialogOpen={infoDialogOpen}
              connectDialogOpen={connectDialogOpen}
              openConnectDialog={openConnectDialogHandler}
              closeConnectDialog={closeConnectDialogHandler}
              countClicks={countLinkClicksHandler}
              bioVideo={bioVideo}
              defaultLinksToTheme={defaultLinksToTheme}
              passwordProtected={passwordProtected}
              isTheLoggedinUser={isTheLoggedinUser}
              canFollow={auth.authStatus === 'loggedin' && urlSuffix && !isTheLoggedinUser}
              isFollowed={(followers && auth.user) && followers.some(e => e.userId === auth.user.uid)}
              // followingInProgress={followingInProgress}
              logo={logo}
              activeForm={activeForm}
              connectionTags={connectionTags}
              connectionSettings={connectionSettings}
              redirect={redirect}
              isEmbedForm={isEmbedForm}
              marker={marker}
              inTrial={auth.inTrial}
              trialEndsIn={auth.trialEndsIn}
              isMaster={card.isMaster}
              settings={settings}
            />
          </Suspense>
        )}

        {layout && layout === 'square' && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true },
              { variant: 'rect', width: '75%' },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '45%', height: 35 },
              { variant: 'rect', width: '15%', height: 60 },
              { variant: 'rect', width: '15%', height: 60 },
              { variant: 'rect', width: '15%', height: 60 },
              { variant: 'rect', width: '15%', height: 60 },
            ]}
            />
          )}
          >
            <SquareView
              authUser={auth.user}
              vCardFile={vCardFile}
              cardClickedHandler={cardClickedHandler}
              clickedNo={clickedNo}
              colorCode={colorCode}
              links={links}
              socialLinksOrder={socialLinksOrder}
              userName={userName}
              firstName={firstName}
              middleName={middleName}
              lastName={lastName}
              gender={gender}
              nickname={nickname}
              career={career}
              organization={organization}
              title={title}
              email={email}
              workPhone={workPhone}
              workFax={workFax}
              homePhone={homePhone}
              homeFax={homeFax}
              birthday={birthday}
              note={note}
              address={address}
              connectionsCount={connections ? connections.length : 0}
              openInfoDialog={openInfoDialogHandler}
              closeInfoDialog={closeInfoDialogHandler}
              infoDialogOpen={infoDialogOpen}
              connectDialogOpen={connectDialogOpen}
              openConnectDialog={openConnectDialogHandler}
              closeConnectDialog={closeConnectDialogHandler}
              countClicks={countLinkClicksHandler}
              bioVideo={bioVideo}
              defaultLinksToTheme={defaultLinksToTheme}
              passwordProtected={passwordProtected}
              isTheLoggedinUser={isTheLoggedinUser}
              canFollow={auth.authStatus === 'loggedin' && urlSuffix && !isTheLoggedinUser}
              isFollowed={(followers && auth.user) && followers.some(e => e.userId === auth.user.uid)}
              // followingInProgress={followingInProgress}
              logo={logo}
              activeForm={activeForm}
              connectionTags={connectionTags}
              connectionSettings={connectionSettings}
              redirect={redirect}
              isEmbedForm={isEmbedForm}
              marker={marker}
              inTrial={auth.inTrial}
              trialEndsIn={auth.trialEndsIn}
              settings={settings}
              isPro={card.isPro}
            />
          </Suspense>
        )}

        {/* {auth.inTrial && (
          <Box style={{ maxWidth: 550, margin: '24px auto 0 auto' }}>
            <Alert
              title={`${pageStatics.data.titles.inTrial} ${auth.trialEndsIn} ${auth.trialEndsIn === 1 ? 'Day' : 'Days'}`}
              description={pageStatics.data.description.inTrial}
              type="warning"
              buttonText={pageStatics.buttons.goPro}
              onClickHandler={() => goToSubscribe()}
              onClickTwoHandler={() => openProDialogHandler()}
              buttonTwoText={pageStatics.buttons.whyPro}
            />
          </Box>
        )} */}

        {auth.userUrlSuffix !== urlSuffix && passwordProtected && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true },
              { variant: 'rect', fullWidth: true },
            ]}
            />
          )}
          >
            <PasswordProtected
              passwordFormLoading={passwordFormLoading}
              loadForm={loadForm}
              passwordForm={passwordForm}
              passwordChangeHandler={passwordChangeHandler}
              revealInfo={revealInfo}
              color={color}
              passwordFormTouched={passwordFormTouched}
              passwordFormValid={passwordFormValid}
            />
          </Suspense>
        )}
      </Box>
      {auth.authStatus !== 'processing' && (
        <a href={language.languageVars.appParentDomain} target="_blank" rel="noreferrer" className={classes.poweredByLink}>
          {language.languageVars.appStamp}
        </a>
      )}
    </Box>
  )
}

const mapStateToProps = state => ({
  card: state.cards,
  loading: state.cards.loading,
  firstName: state.cards.firstName,
  lastName: state.cards.lastName,
  middleName: state.cards.middleName,
  // namePrefix: state.cards.namePrefix,
  // nameSuffix: state.cards.nameSuffix,
  gender: state.cards.gender,
  nickname: state.cards.nickname,
  career: state.cards.career,
  organization: state.cards.organization,
  title: state.cards.title,
  email: state.cards.email,
  workPhone: state.cards.workPhone,
  homePhone: state.cards.homePhone,
  workFax: state.cards.workFax,
  homeFax: state.cards.homeFax,
  birthday: state.cards.birthday,
  note: state.cards.note,
  address: state.cards.address,
  image: state.cards.image,
  imageFile: state.cards.imageFile,
  vCardFile: state.cards.vCardFile,
  links: state.cards.links,
  socialLinksOrder: state.cards.socialLinksOrder,
  settings: state.cards.settings,
  connections: state.connections,
  passwordProtected: state.cards.passwordProtected,
  clickedNo: state.counter.clickedNo,
  redirect: state.cards.redirect,
  defaultLinksToTheme: state.cards.defaultLinksToTheme,
  bioVideo: state.cards.bioVideo,
  base64Photo: state.cards.base64Photo,
  logo: state.cards.logo,
  followers: state.cards.followers,
  masterProfileId: state.cards.masterProfileId,
  connectionSettings: state.connections.connectionSettings,
  connectionForms: state.connections.connectionForms,
  connectionTags: state.connections.connectionTags,
  marker: state.cards.marker,
  connectionsDataLoaded: state.connections.dataLoaded,
  connectionProfileId: state.connections.profileId,
})

const mapDispatchToProps = dispatch => ({
  onLoadCardBySuffix: (suffix, password, isAuthenticated, authStatus) => dispatch(actions.loadCard(suffix, password, isAuthenticated, authStatus)),
  // onLoadCardById: (userId, isPro) => dispatch(actions.loadCardByUserId(userId, isPro)),
  onLoadCounter: suffix => dispatch(actions.loadCounter(suffix)),
  // onCardClicked: suffix => dispatch(actions.incrementCardClicks(suffix)),
  // onAddFollower: follower => dispatch(actions.addFollower(follower)),
  // onRemoveFollower: followerId => dispatch(actions.removeFollower(followerId)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadTeamMembers: masterId => dispatch(actions.loadTeamMembers(masterId)),
  onLoadConnectionData: (userId, masterId, loadConnections) => dispatch(actions.loadConnectionData(userId, masterId, loadConnections)),
})

ViewCard.defaultProps = {
  card: null,
  loading: false,
  firstName: null,
  lastName: null,
  middleName: null,
  // namePrefix: null,
  // nameSuffix: null,
  gender: null,
  nickname: null,
  career: null,
  organization: null,
  title: null,
  email: null,
  workPhone: null,
  homePhone: null,
  workFax: null,
  homeFax: null,
  birthday: null,
  note: null,
  vCardFile: null,
  links: null,
  socialLinksOrder: null,
  settings: null,
  connections: null,
  passwordProtected: false,
  clickedNo: 0,
  redirect: null,
  defaultLinksToTheme: false,
  bioVideo: null,
  image: null,
  logo: null,
  followers: null,
  masterProfileId: null,
  address: null,
  connectionForms: null,
  connectionSettings: null,
  connectionTags: null,
  marker: null,
  connectionsDataLoaded: false,
  connectionProfileId: null,
}

ViewCard.propTypes = {
  card: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  loading: PropTypes.bool,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  middleName: PropTypes.string,
  // namePrefix: PropTypes.string,
  // nameSuffix: PropTypes.string,
  gender: PropTypes.string,
  nickname: PropTypes.string,
  career: PropTypes.string,
  organization: PropTypes.string,
  title: PropTypes.string,
  email: PropTypes.string,
  workPhone: PropTypes.string,
  homePhone: PropTypes.string,
  workFax: PropTypes.string,
  homeFax: PropTypes.string,
  birthday: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  note: PropTypes.string,
  image: PropTypes.string,
  vCardFile: PropTypes.string,
  onLoadCardBySuffix: PropTypes.func.isRequired,
  // onLoadCardById: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  socialLinksOrder: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  settings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  connections: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  passwordProtected: PropTypes.bool,
  // onCardClicked: PropTypes.func.isRequired,
  // onLoadCounter: PropTypes.func.isRequired,
  clickedNo: PropTypes.number,
  switchTheme: PropTypes.func.isRequired,
  redirect: PropTypes.string,
  defaultLinksToTheme: PropTypes.bool,
  bioVideo: PropTypes.string,
  logo: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // onAddFollower: PropTypes.func.isRequired,
  // onRemoveFollower: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onLoadConnectionData: PropTypes.func.isRequired,
  followers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  masterProfileId: PropTypes.string,
  address: PropTypes.string,
  connectionForms: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  connectionSettings: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  connectionTags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  marker: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
    PropTypes.func,
  ])),
  connectionsDataLoaded: PropTypes.bool,
  connectionProfileId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCard)
