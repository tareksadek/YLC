import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { subDays } from 'date-fns'

import Box from '@material-ui/core/Box'
// import Button from '@material-ui/core/Button'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import InfoBox from '../../components/Ui/InfoBox'
import Report from '../../components/Analytics/Report'
import SkeletonContainer from '../../layout/SkeletonContainer'
// import ProBox from '../../components/BecomePro/ProBox'

import { getCardVisits } from '../../API/cards'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
// import { useColor } from '../../hooks/useDarkMode'

import { layoutStyles } from '../../theme/layout'
// import { buttonStyles } from '../../theme/buttons'

import * as actions from '../../store/actions'
// import * as vars from '../../utilities/appVars'
// import { settings } from '../../utilities/appVars'

const Analytics = ({
  cardData, connections, onLoadConnectionData, connectionTags,
}) => {
  const layoutClasses = layoutStyles()
  // const buttonClasses = buttonStyles()

  const history = useHistory()
  // const color = useColor()
  const auth = useAuth()
  const isMember = !auth.isMaster
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.analytics
  // const proStatics = language.languageVars.pages.becomePro
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix

  // const isPro = auth.isSubscriber && (auth.subscriberStatus === 'active' || auth.subscriberStatus === 'trialing')

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingVisitsDone, setLoadingVisitsDone] = useState(false)
  const [loadingVisits, setLoadingVisits] = useState(false)
  const [cardVisits, setCardVisits] = useState(null)

  let profileLinks = cardData && cardData.links && cardData.links.length > 0 ? cardData.links : null

  if (isMember && profileLinks && cardData.masterLinks) {
    profileLinks = cardData.links.map(link => {
      const currentLink = link
      const teamMemberLink = cardData.masterLinks.find(memberLink => memberLink.link === link.link)
      if (teamMemberLink) {
        currentLink.clicked = teamMemberLink.clicked
      } else {
        currentLink.clicked = 0
      }
      return currentLink
    })
  }

  // const profileLinks = isMember
  //   ? cardData.masterLinks || null
  //   const mappedLinks = currentMasterLinks ? currentMasterLinks.map(link => {
  //     const currentLink = link
  //     const teamMemberLink = currentTeamMemberLinks ? currentTeamMemberLinks.find(memberLink => memberLink.link === link.link) : null
  //     console.log(teamMemberLink);
  //     if (teamMemberLink) {
  //       console.log('xx');
  //       currentLink.clicked = teamMemberLink.clicked
  //     }
  //     return currentLink
  //   }) : null
  //   : cardData.links || null
  // const [profileData, setProfileData] = useState(cardData || null)

  // useEffect(() => {
  //   let mounted = true
  //   if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       try {
  //         setLoading(true)
  //         const data = await getCardById(auth.user.uid)
  //         setProfileData(data)
  //         await onLoadCard(auth.user.uid)
  //         setLoadingDone(true)
  //         setTimeout(() => setLoading(false), 1000)
  //       } catch (err) {
  //         throw new Error(err)
  //       }
  //     })()
  //   }

  //   return () => { mounted = false }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [onLoadCard, auth.user.uid, isTheLoggedinUser])

  // useEffect(() => {
  //   let mounted = true
  //   console.log(cardData.userId);
  //   if (mounted && cardData.userId) {
  //     (async () => {

  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [onLoadConnectionTags, connectionTags, cardData.userId])

  useEffect(() => {
    let mounted = true
    if (mounted && cardData.userId) {
      (async () => {
        setLoading(true)
        await onLoadConnectionData(cardData.userId, cardData.masterId, false)
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [onLoadConnectionData, cardData.userId, cardData.masterId])

  useEffect(() => {
    let mounted = true
    if (mounted && cardData.userId) {
      (async () => {
        setLoadingVisits(true)
        const visits = await getCardVisits(cardData.userId, subDays(new Date(), 365))
        setCardVisits(visits)
        setLoadingVisitsDone(true)
        setTimeout(() => setLoadingVisits(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [cardData.userId])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  const handleMenuButtons = targetURL => {
    history.push(targetURL)
  }

  // const goToSubscribe = () => {
  //   history.push(vars.SUBSCRIBE_PAGE)
  // }

  if (cardData.loading || !cardData.userId || auth.loadingAuth || loading) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.page}>
          <Box>
            <InfoBox infoList={[pageStatics.messages.info.general.first]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', width: '30%', height: 150 },
                { variant: 'rect', width: '30%', height: 150 },
                { variant: 'rect', width: '30%', height: 150 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
                { variant: 'rect', fullWidth: true, height: 50 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingAnalytics} boxed />
      </Box>
    )
  }

  // if (settings.onlyInvitations && !isPro) {
  //   return (
  //     <Box className={layoutClasses.pageContainer}>
  //       <Box className={layoutClasses.proBoxContainer} mt={9} pl={1} pr={1}>
  //         <Box pb={10}>
  //           <ProBox noButton />
  //         </Box>
  //         <Box
  //           className={layoutClasses.proBoxButtonContainer}
  //           style={{
  //             backgroundColor: color.color.code,
  //           }}
  //         >
  //           <Button
  //             className={`${buttonClasses.defaultButton}`}
  //             onClick={() => goToSubscribe()}
  //             style={{
  //               backgroundColor: color.color.code,
  //             }}
  //           >
  //             {proStatics.buttons.becomePro}
  //             <span className={buttonClasses.defaultButtonDescription}>
  //               {proStatics.buttons.becomeProOffer}
  //               <i>{proStatics.buttons.becomeProCancel}</i>
  //             </span>
  //           </Button>
  //         </Box>
  //       </Box>
  //       {loading && <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingAnalytics} />}
  //     </Box>
  //   )
  // }

  return (
    <Box className={layoutClasses.pageContainer}>
      {/* {settings.onlyInvitations && !isPro && (
        <Box className={layoutClasses.proBoxContainer}>
          <ProBox />
          <Button
            className={`${buttonClasses.defaultButton}`}
            onClick={() => goToSubscribe()}
            style={{
              backgroundColor: color.color.code,
            }}
          >
            {proStatics.buttons.becomePro}
          </Button>
        </Box>
      )} */}
      {/* {loading && <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingAnalytics} />} */}
      <Header title={pageStatics.data.titles.page}>
        <Box>
          <InfoBox infoList={[pageStatics.messages.info.general.first]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Report
            visits={cardVisits}
            visitsCount={cardData.visits}
            loadingVisits={loadingVisits}
            loadingVisitsDone={loadingVisitsDone}
            clickedNo={cardData.clickedNo || 0}
            connectionsNo={cardData.uniqueConnectionsCount || 0}
            connections={connections.connections}
            onMenuItemClicked={handleMenuButtons}
            links={cardData.links ? cardData.links : null}
            tags={connectionTags}
            socialLinksOrder={cardData.socialLinksOrder ? cardData.socialLinksOrder : null}
          />
        </Box>
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  connections: state.connections,
  connectionTags: state.connections.connectionTags,
})

const mapDispatchToProps = dispatch => ({
  onLoadCard: userId => dispatch(actions.loadCardByUserId(userId)),
  onLoadConnectionData: (userId, loadConnections) => dispatch(actions.loadConnectionData(userId, loadConnections)),
})

Analytics.defaultProps = {
  cardData: null,
  connections: null,
  connectionTags: null,
}

Analytics.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  // onLoadCard: PropTypes.func.isRequired,
  // switchTheme: PropTypes.func.isRequired,
  connections: PropTypes.objectOf(PropTypes.oneOfType([
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
  onLoadConnectionData: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
