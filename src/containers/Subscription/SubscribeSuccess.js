import React, {
  useEffect, useState, useCallback,
} from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import parse from 'html-react-parser'
import emailjs from 'emailjs-com'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination'
import Button from '@material-ui/core/Button'

import LockOpenIcon from '@material-ui/icons/LockOpen'

import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import PageTitle from '../../layout/PageTitle'
import TeamInvitationsList from '../../components/MyTeam/TeamInvitationsList'
import Alert from '../../layout/Alert'
import Header from '../../components/Onboarding/Header'

import { Logo } from '../../layout/CustomIcons'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import {
  settings,
  defaultSettings,
  MAILJS_CONFIG,
  TEAM_INVITATIONS_PER_PAGE,
  LOGIN_PAGE,
  ONBOARDING_PAGE_MASTER,
} from '../../utilities/appVars'

import { breakName } from '../../utilities/utils'

import { getOneTimeUser } from '../../API/subscriptions'
import { generateInvitaionCode, getPatchInvitations } from '../../API/invitations'
import { generatePatchCode, addPatchMaster, getPatchByPatchId } from '../../API/invitationPatches'
import { createUserCard } from '../../API/cards'

import * as actions from '../../store/actions'

import { layoutStyles } from '../../theme/layout'
import { landingStyles } from '../Landing/styles'
import { buttonStyles } from '../../theme/buttons'
import { onboardingStyles } from '../../components/Onboarding/styles'

const SubscribeSuccess = ({
  onSetNotification,
  productId,
}) => {
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.onboarding
  const auth = useAuth()
  const history = useHistory()

  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const onBoardingClasses = onboardingStyles()
  const classes = landingStyles()

  // const { isMaster } = auth
  const masterUserName = breakName(parse(auth.user.displayName) || '')
  const masterId = auth.user.uid
  const masterEmail = auth.user.email
  const masterURLSuffix = auth.userUrlSuffix
  const masterAccountSecret = auth.accountSecret
  const { withCards } = auth
  const shopProductId = auth.productId

  const [loading, setLoading] = useState(false)
  const [loadingDone, setLoadingDone] = useState(false)
  const [createdInvitations, setCreatedInvitations] = useState(null)
  const [loadingMessage, setLoadingMessage] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)

  const createInvitations = useCallback(async reqInv => {
    let invitationCodeObj
    let invitationPackage
    let masterInvitationId = null
    let createdInvs = []
    const patch = await getPatchByPatchId(masterId)
    if (!patch) {
      const alwaysPro = false
      const themeObj = {
        ...defaultSettings,
        defaultLinksToTheme: false,
      }
      const storeObj = {
        logo: null,
        logoLink: null,
        storeButtonText: null,
        storeButtonLink: null,
      }
      const patchDetails = {
        ...storeObj,
        title: masterId,
        invitationsNumber: reqInv + 1,
        invitationType: 'default',
        package: 'master',
      }
      const patchObj = await generatePatchCode(
        patchDetails.title,
        patchDetails.package,
        patchDetails.invitationsNumber,
        productId || shopProductId,
        themeObj,
        storeObj,
        alwaysPro,
        masterId,
      )

      for (let i = 1; i <= patchDetails.invitationsNumber; i += 1) {
        invitationPackage = patchDetails.package === 'master' && i === 1 ? 'master' : 'single'
        try {
          /* eslint-disable no-await-in-loop */
          invitationCodeObj = await generateInvitaionCode(
            patchDetails.package,
            patchObj.patchId,
            invitationPackage,
            null,
            masterInvitationId,
            themeObj,
            storeObj,
            productId || shopProductId,
            alwaysPro,
            i === 1,
            i === 1 ? masterId : null,
            i === 1 ? new Date() : null,
            i === 1,
          )

          masterInvitationId = (patchDetails.package === 'master' && i === 1)
            ? invitationCodeObj.code.substring(0, invitationCodeObj.code.indexOf('_'))
            : masterInvitationId

          if (patchDetails.package === 'master' && i === 1) {
            const profileData = {
              firstName: masterUserName.firstName,
              lastName: masterUserName.lastName,
              userId: masterId,
              defaultId: masterId,
              email: masterEmail,
              urlSuffix: masterURLSuffix,
              organization: null,
              logo: null,
              career: null,
              settings: null,
              defaultLinksToTheme: false,
              links: null,
              socialLinksOrder: null,
              store: storeObj || null,
              isMaster: true,
              masterProfileId: null,
              masterInvitationId,
            }
            const invitationData = {
              method: 'invitation',
              code: invitationCodeObj.code.substring(0, invitationCodeObj.code.indexOf('_')),
              parentInvitation: null,
              childInvitations: null,
              masterId,
              masterInvitationId,
              productId: productId || shopProductId,
            }
            await createUserCard(
              profileData,
              settings.onlyInvitations ? invitationData : null,
              masterAccountSecret,
              null,
            )
          }

          createdInvs = [...createdInvs, invitationCodeObj]
        } catch (err) {
          onSetNotification({
            message: `There was a problem creating new batch. ${err.message}`,
            type: 'error',
          })
        }
      }
      if (masterInvitationId) {
        await addPatchMaster(patchObj.patchId, masterInvitationId)
      }
    } else {
      createdInvs = await getPatchInvitations(masterId, null)
    }

    return createdInvs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSetNotification])

  useEffect(() => {
    let mounted = true

    if (mounted && masterId) {
      (async () => {
        setLoadingMessage(pageStatics.messages.loading.loadingInvitations)
        setLoading(true)
        const subscriber = await getOneTimeUser(auth.user.uid)
        const reqInv = subscriber[0].items[0].price.transform_quantity.divide_by
        const createdInvs = await getPatchInvitations(masterId, null)

        if (!!subscriber && !!reqInv && !createdInvitations) {
          const invitations = await createInvitations(reqInv)
          setCreatedInvitations(invitations)
          const templateParams = {
            userEmail: auth.user.email,
            userName: auth.user.displayName,
            userProfile: `${language.languageVars.appProfileURL}/${auth.userUrlSuffix}`,
            reqCards: withCards ? reqInv + 1 : 0,
          }
          await emailjs.send(MAILJS_CONFIG.serviceId, MAILJS_CONFIG.newSubscriptionTemplateId, templateParams, MAILJS_CONFIG.userId)
        } else {
          setCreatedInvitations(createdInvs)
        }
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    language.languageVars.appProfileURL,
    createInvitations,
  ])

  const pageTeamInvitations = pageNumber => {
    let teamInvitationsInPage

    if (createdInvitations && createdInvitations.length > 0) {
      teamInvitationsInPage = createdInvitations
        .filter(inv => inv.type !== 'master')
        .slice(((pageNumber - 1) * (TEAM_INVITATIONS_PER_PAGE)), ((pageNumber) * (TEAM_INVITATIONS_PER_PAGE)))
    }

    return teamInvitationsInPage
  }

  const paginationChangeHandler = (e, page) => {
    setCurrentPage(page)
    pageTeamInvitations(page)
  }

  const goToLogin = () => {
    history.push(LOGIN_PAGE)
  }

  const goToOnboardingMaster = () => {
    history.push(ONBOARDING_PAGE_MASTER)
  }

  if (!createdInvitations) {
    return (
      <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column" style={{ minHeight: 300 }}>
        <CircularProgress />
        <Box mt={2}>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.messages.loading.loadingInvitations}
          </Typography>
        </Box>
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer} style={{ paddingBottom: 0 }}>
      <Box className={classes.landingHeader}>
        <Box className={classes.landingNav}>
          <Logo className={classes.logo} />
          <Button
            disableRipple
            onClick={() => goToLogin()}
          >
            <LockOpenIcon />
          </Button>
        </Box>
      </Box>
      {(auth.authStatus === 'processing' || loading) && <LoadingBackdrop done={loadingDone} loadingText={`${loadingMessage || pageStatics.messages.loading.loading}`} boxed />}
      <Box className={layoutClasses.contentContainer} style={{ top: -10 }}>
        <Box className={layoutClasses.formContainer}>
          <Box mb={2}>
            <Header stepsCount={4} firstName={masterUserName.firstName} />
          </Box>
          {auth.withCards && (
            <Alert
              title={pageStatics.messages.notifications.stepZero.preparingCards.title}
              description={pageStatics.messages.notifications.stepZero.preparingCards.description}
              type="info"
            />
          )}
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle
              title={`${pageStatics.data.titles.stepZero}`}
            />
            <Box>
              <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                {pageStatics.data.description.stepZero}
              </Typography>
              <Box mt={1}>
                <Alert
                  description={pageStatics.messages.notifications.stepZero.invitationsList.description}
                  type="warning"
                  noMargin
                />
              </Box>
              <TeamInvitationsList
                invitations={pageTeamInvitations(currentPage)}
                onSetNotification={onSetNotification}
              />
              {(createdInvitations && createdInvitations.length - 1 > TEAM_INVITATIONS_PER_PAGE) && (
                <Box mt={1} mb={2}>
                  <Pagination count={Math.ceil(createdInvitations.filter(inv => inv.type !== 'master').length / TEAM_INVITATIONS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} />
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={`${onBoardingClasses.stepbuttonsContainer} ${onBoardingClasses.stepbuttonsContainerFull}`}>
        <Button
          onClick={() => goToOnboardingMaster()}
          className={buttonClasses.defaultButton}
        >
          {pageStatics.buttons.startOnboarding}
        </Button>
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

const mapStateToProps = state => ({
  productId: state.createAccountProcessor.productId,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onActivateForm: (userId, formId) => dispatch(actions.activateForm(userId, formId)),
  onLoadCardByUserId: (userId, isMaster) => dispatch(actions.loadCardByUserId(userId, isMaster)),
})

SubscribeSuccess.defaultProps = {
  productId: null,
}

SubscribeSuccess.propTypes = {
  onSetNotification: PropTypes.func.isRequired,
  productId: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeSuccess)
