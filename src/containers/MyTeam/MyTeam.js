import React, {
  useEffect, useState, lazy, Suspense,
} from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { subDays } from 'date-fns'

import Box from '@material-ui/core/Box'
import Pagination from '@material-ui/lab/Pagination'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import SkeletonContainer from '../../layout/SkeletonContainer'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'
import InfoBox from '../../components/Ui/InfoBox'
import TeamInvitationsList from '../../components/MyTeam/TeamInvitationsList'
import RequestInvitationsDialog from '../../components/MyTeam/RequestInvitationsDialog'
import QRdrawer from '../../components/MyTeam/QRdrawer'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

// import { getCounterById } from '../../API/counter'
// import { updateAccountActivity } from '../../API/users'
import { getTeamMemberLinksById, getLinksById, getCardVisits } from '../../API/cards'
import { getCardConnections } from '../../API/connections'
import { getInvitationByCode, getPatchInvitations } from '../../API/invitations'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
// import { connectionsStyles } from './styles'

import {
  // TEAM_MEMBERS_PER_PAGE,
  TEAM_INVITATIONS_PER_PAGE,
} from '../../utilities/appVars'

import * as actions from '../../store/actions'

// const SearchMyTeam = lazy(() => import('../../components/MyTeam/SearchMyTeam'))
// const SortMyTeam = lazy(() => import('../../components/MyTeam/SortMyTeam'))
const MyTeamList = lazy(() => import('../../components/MyTeam/MyTeamList'))
const TeamMemberConnections = lazy(() => import('../../components/MyTeam/TeamMemberConnections'))
const TeamMemberAnalytics = lazy(() => import('../../components/MyTeam/TeamMemberAnalytics'))
const TeamReport = lazy(() => import('../../components/Analytics/TeamReport'))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MyTeam = ({
  cardData, teamMembers, onLoadTeamMembers, onSortTeamMembers, switchTheme, onSetNotification,
  onLoadConnectionTags, connectionTags, onRemoveTeamMember,
  // links,
}) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  // const classes = connectionsStyles()
  const auth = useAuth()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam

  const [tabValue, setTabValue] = useState(1)
  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingTeamMembers)
  // const [currentPage, setCurrentPage] = useState(1)
  // const [searchedTeamMembers, setSearchedTeamMembers] = useState(null)
  const [connectionsDialogOpen, setConnectionsDialogOpen] = useState(window.location.hash === '#tmconnect')
  const [memberName, setMemberName] = useState(null)
  const [memberSuffix, setMemberSuffix] = useState(null)
  const [memberConnectionsLoading, setMemberConnectionsLoading] = useState(false)
  const [memberConnections, setMemberConnections] = useState(null)
  const [teamMemberAnalyticsDialogOpen, setTeamMemberAnalyticsDialogOpen] = useState(window.location.hash === '#tmanalytics')
  const [teamMemberAnalytics, setTeamMemberAnalytics] = useState(null)
  const [invitations, setInvitations] = useState(null)
  const [reloadInvitations, setReloadInvitations] = useState(false)
  const [loadingInvitations, setLoadingInvitations] = useState(false)
  // const [manageSubscription, setManageSubscription] = useState(false)
  const [currentInvitationsPage, setCurrentInvitationsPage] = useState(1)
  const [requestUpgradeDialogOpen, setRequestUpgradeDialogOpen] = useState(window.location.hash === '#requpg')
  const [qrDialogOpen, setQrDialogOpen] = useState(window.location.hash === '#qrmem')

  const teamMembersInvitations = invitations && invitations.length > 0 ? invitations.filter(inv => !inv.usedBy) : null
  // const [isTeamReport, setIsTeamReport] = useState(false)

  // useEffect(() => {
  //   let mounted = true

  //   if (mounted && !cardData.userId) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadCard(auth.user.uid)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [onLoadCard, auth.user.uid, cardData.userId])

  useEffect(() => {
    let mounted = true

    if (mounted && !teamMembers) {
      (async () => {
        setLoading(true)
        const members = await onLoadTeamMembers(auth.user.uid)
        await onLoadConnectionTags(auth.user.uid)
        if (members && members.length > 0) {
          setTabValue(0)
        }
        onSortTeamMembers('asc', 'firstName')
        setLoadingDone(true)
        setTimeout(() => setLoading(false), 1000)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSortTeamMembers, switchTheme, auth.invitationCode, onLoadTeamMembers])

  useEffect(() => {
    let mounted = true

    if (mounted || reloadInvitations) {
      (async () => {
        setLoadingInvitations(true)
        const invitation = await getInvitationByCode(cardData.invitationCode || auth.invitationNumber)
        const patchInvitations = await getPatchInvitations(invitation.patchId, null)
        setInvitations(patchInvitations)
        setLoadingInvitations(false)
      })()
    }

    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSortTeamMembers, switchTheme, auth.invitationCode, onLoadTeamMembers, reloadInvitations])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  useEffect(() => {
    const onHashChange = () => {
      setConnectionsDialogOpen(window.location.hash === '#tmconnect')
      setTeamMemberAnalyticsDialogOpen(window.location.hash === '#tmanalytics')
      setRequestUpgradeDialogOpen(window.location.hash === '#requpg')
      setQrDialogOpen(window.location.hash === '#qrmem')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // const pageMyTeam = pageNumber => {
  //   let teamMembersInPage

  //   if (searchedTeamMembers) {
  //     return searchedTeamMembers
  //   }

  //   if (teamMembers) {
  //     teamMembersInPage = teamMembers.slice(((pageNumber - 1) * (TEAM_MEMBERS_PER_PAGE)), ((pageNumber) * (TEAM_MEMBERS_PER_PAGE)))
  //   }

  //   return teamMembersInPage
  // }

  // const searchTeamMembersHandler = searchKeyword => {
  //   const searchFor = searchKeyword.toLowerCase()

  //   if (searchFor.length >= 3) {
  //     setSearchedTeamMembers(teamMembers.filter(teamMemberCard => {
  //       const searchName = `${teamMemberCard.firstName} ${teamMemberCard.lastName}`
  //       const searchEmail = teamMemberCard.email
  //       const searchPhone = teamMemberCard.workPhone
  //       if (searchName.toLowerCase().includes(searchFor) || searchEmail.toLowerCase().includes(searchFor) || searchPhone.includes(searchFor)) {
  //         return true
  //       }

  //       return false
  //     }))
  //   } else {
  //     setSearchedTeamMembers(null)
  //     // setCurrentPage(1)
  //   }

  //   return false
  // }

  // const clearSearchHandler = () => {
  //   setSearchedTeamMembers(null)
  // }

  // const paginationChangeHandler = (e, page) => {
  //   // setCurrentPage(page)
  //   pageMyTeam(page)
  // }

  // const sortMyTeam = (value, type) => {
  //   onSortTeamMembers(value, type)
  // }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const openConnectionsDialogHandler = async teamMember => {
    setMemberName(`${teamMember.firstName} ${teamMember.lastName}`)
    window.location.hash = '#tmconnect'
    setMemberConnectionsLoading(true)
    try {
      const currentMemberConnections = await getCardConnections(teamMember.userId)
      setMemberConnections(currentMemberConnections)
      setMemberConnectionsLoading(false)
    } catch (err) {
      onSetNotification({
        message: pageStatics.messages.notifications.loadMemberConnectionsError,
        type: 'error',
      })
    }
  }

  const closeConnectionsDialogHandler = () => {
    window.history.back()
  }

  const openTeamMemberAnalyticsDialogHandler = async teamMember => {
    const teamMemberData = { ...teamMember }

    setLoading(true)
    setLoadingMessage(pageStatics.messages.loading.loadingAnalytics)
    setLoadingDone(false)

    try {
      // const currentMemberConnections = await getCardConnections(teamMember.userId)
      const currentTeamMemberLinks = await getTeamMemberLinksById(teamMember.userId)
      const currentMasterLinks = await getLinksById(auth.user.uid)
      const currentMemberVisits = await getCardVisits(teamMember.userId, subDays(new Date(), 365))
      const mappedLinks = currentMasterLinks ? currentMasterLinks.map(link => {
        const currentLink = link
        const teamMemberLink = currentTeamMemberLinks ? currentTeamMemberLinks.find(memberLink => memberLink.link === link.link) : null
        if (teamMemberLink) {
          currentLink.clicked = teamMemberLink.clicked
        } else {
          currentLink.clicked = 0
        }
        return currentLink
      }) : null
      // teamMemberData.connections = currentMemberConnections
      // teamMemberData.connectionsTotal = currentMemberConnections.length
      teamMemberData.visitsArray = currentMemberVisits
      // setMemberConnections(currentMemberConnections)

      setTeamMemberAnalytics({
        ...teamMemberData,
        ...(!teamMember.isTeamReport && { masterLinks: mappedLinks || null }),
      })
      setMemberName(`${teamMemberData.firstName || ''} ${teamMemberData.lastName || ''}`)
      window.location.hash = '#tmanalytics'
    } catch (err) {
      throw new Error(err)
    }

    setLoadingDone(true)
    setTimeout(() => setLoading(false), 1000)
  }

  const closeTeamMemberAnalyticsDialogHandler = () => {
    window.history.back()
  }

  const pageTeamInvitations = pageNumber => {
    let teamInvitationsInPage

    if (teamMembersInvitations) {
      teamInvitationsInPage = teamMembersInvitations.filter(inv => !inv.usedBy).slice(((pageNumber - 1) * (TEAM_INVITATIONS_PER_PAGE)), ((pageNumber) * (TEAM_INVITATIONS_PER_PAGE)))
    }

    return teamInvitationsInPage
  }

  const invitationsPaginationChangeHandler = (e, page) => {
    setCurrentInvitationsPage(page)
    pageTeamInvitations(page)
  }

  // const redirectTeamMemberHandler = async (memberId, memberRedirect) => {
  //   let confirmMessage = pageStatics.messages.confirm.memberRedirect
  //   if (memberRedirect) {
  //     confirmMessage = pageStatics.messages.confirm.memberRedirectOff
  //   }
  //   const confirmBox = window.confirm(confirmMessage)
  //   if (confirmBox === true) {
  //     setLoading(true)
  //     setLoadingMessage(pageStatics.messages.loading.redirectingMemberProfile)
  //     setLoadingDone(false)
  //     const redirectLink = `${language.languageVars.appDomain}/profile/${auth.userUrlSuffix}`

  //     try {
  //       setLoadingMessage(pageStatics.messages.loading.redirectingProfile)
  //       await redirectCard(memberId, redirectLink)
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //       onSetNotification({
  //         message: pageStatics.messages.notifications.memberRedirectSuccess,
  //         type: 'success',
  //       })
  //     } catch (err) {
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //       onSetNotification({
  //         message: pageStatics.messages.notifications.memberRedirectError,
  //         type: 'error',
  //       })
  //     }
  //   }
  // }

  // const generateTeamReport = async () => {
  //   setLoadingDone(false)
  //   setLoading(true)
  //   setLoadingMessage(pageStatics.messages.loading.loadingAnalytics)
  //   setIsTeamReport(true)
  //   let teamReport = {}
  //   let totalAddedToContacts = 0
  //   const exisitingLinks = links.map(link => ({
  //     clicked: 0,
  //     link: link.link,
  //     platform: link.platform,
  //     active: link.active,
  //   }))
  //   for (let i = 0; i < teamMembers.length; i += 1) {
  //     try {
  //       /* eslint-disable no-await-in-loop */
  //       const counter = await getCounterById(teamMembers[i].userId)
  //       totalAddedToContacts += counter.clickedNo

  //       const memberLinks = cardData.teamData.links || null
  //       exisitingLinks.forEach(masterlink => {
  //         const masterlinkAlias = masterlink
  //         if (memberLinks) {
  //           const memberLink = memberLinks.find(l => l.link === masterlinkAlias.link)
  //           let clickedNu = memberLink.memberClicks.reduce((accumulator, clickObject) => accumulator + clickObject.clicked, 0)
  //           // let clickedNu = memberLink.memberClicks.find(c => c.link === masterlinkAlias.link)?.clicked || 0
  //           if (clickedNu === 'undefined') {
  //             clickedNu = 0
  //           }
  //           masterlinkAlias.clicked = clickedNu
  //         } else {
  //           masterlinkAlias.clicked = 0
  //         }
  //       })
  //     } catch (err) {
  //       throw new Error(err)
  //     }
  //   }

  //   teamReport = {
  //     isTeamReport: true,
  //     firstName: 'Team',
  //     lastName: '',
  //     addedToContacts: totalAddedToContacts,
  //     links: exisitingLinks,
  //   }

  //   await openTeamMemberAnalyticsDialogHandler(teamReport)
  // }

  const sortMemberConnections = (sortValue, sortType) => {
    let newConnections = null
    if (memberConnections) {
      newConnections = [...memberConnections].sort((a, b) => {
        const comp1 = sortType === 'date' ? a.addedOn.seconds : String(a[sortType]).toLowerCase()
        const comp2 = sortType === 'date' ? b.addedOn.seconds : String(b[sortType]).toLowerCase()
        const arg1 = sortValue === 'desc' ? comp1 > comp2 : comp1 < comp2
        const arg2 = sortValue === 'asc' ? comp2 > comp1 : comp2 < comp1
        if (arg1) {
          return 1
        }
        if (arg2) {
          return -1
        }
        return 0
      })
    }
    setMemberConnections(newConnections)
  }

  // const toggleProfileActivityHandler = async (profileId, blockedByMaster) => {
  //   const confirMessage = blockedByMaster ? pageStatics.messages.confirm.cancelDeactivate : pageStatics.messages.confirm.confirmDeactivate
  //   const confirmBox = window.confirm(confirMessage)
  //   if (confirmBox) {
  //     setLoadingDone(false)
  //     setLoading(true)
  //     setLoadingMessage(pageStatics.messages.loading.processing)
  //     try {
  //       await toggleMemberLock(profileId, blockedByMaster)
  //       onSetNotification({
  //         message: blockedByMaster ? pageStatics.messages.notifications.cancelBlockSuccess : pageStatics.messages.notifications.blockSuccess,
  //         type: 'success',
  //       })
  //     } catch (err) {
  //       console.log(err);
  //       onSetNotification({
  //         message: blockedByMaster ? pageStatics.messages.notifications.cancelBlockError : pageStatics.messages.notifications.blockError,
  //         type: 'error',
  //       })
  //     }
  //     setLoadingDone(true)
  //     setTimeout(() => setLoading(false), 1000)
  //     setLoadingMessage(pageStatics.messages.loading.loadingTeamMembers)
  //   }
  // }

  // const manageSubscriptionHandler = async () => {
  //   try {
  //     setManageSubscription(true)
  //     await sendToCustomerPortal()
  //   } catch (err) {
  //     console.log(err);
  //     throw new Error()
  //   }
  // }

  const openRequestUpgradeDialogHandler = () => {
    window.location.hash = '#requpg'
  }

  const closeRequestUpgradeDialogHandler = () => {
    window.history.back()
  }

  const openQrDialogHandler = teamMember => {
    setMemberName(`${teamMember.firstName} ${teamMember.lastName || ''}`)
    setMemberSuffix(teamMember.urlSuffix)
    window.location.hash = '#qrmem'
  }

  const closeQrDialogHandler = () => {
    window.history.back()
  }

  const loadInvitations = () => {
    setReloadInvitations(true)
  }

  if (loading || auth.loadingAuth) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.page}>
          <Box>
            <InfoBox
              infoList={[
                pageStatics.messages.info.general.first,
                pageStatics.messages.info.general.second,
                // pageStatics.messages.info.general.third,
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
              ]}
              />
            </Box>
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 50 },
            ]}
            />
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} boxed />}
      {/* {manageSubscription && <LoadingBackdrop done={!manageSubscription} loadingText={pageStatics.messages.loading.manageSubscription} />} */}
      <Header title={pageStatics.data.titles.page}>
        <Box>
          <InfoBox
            infoList={[
              pageStatics.messages.info.general.first,
              pageStatics.messages.info.general.second,
              // pageStatics.messages.info.general.third,
            ]}
          />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        {!loading && (
          <Box className={layoutClasses.formContainer}>
            <AppBar position="relative" className={layoutClasses.tabsHeader}>
              <Tabs
                value={tabValue}
                onChange={handleTabChange}
                aria-label="members tabs"
                centered
                TabIndicatorProps={{
                  style: {
                    backgroundColor: color.color.code,
                  },
                }}
              >
                <Tab label={pageStatics.data.tabs.members} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonLeft}`} style={{ paddingTop: 20 }} {...a11yProps(0)} />
                <Tab label={pageStatics.data.tabs.invitations} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonLeft}`} style={{ paddingTop: 20 }} {...a11yProps(1)} />
                <Tab label={pageStatics.data.tabs.analytics} className={`${layoutClasses.tabButton} ${layoutClasses.tabButtonLeft}`} style={{ paddingTop: 20 }} {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <div
              role="tabpanel"
              hidden={tabValue !== 0}
              id="simple-tabpanel-0"
              className={layoutClasses.tabPanelContainer}
              aria-labelledby="simple-tab-0"
            >
              {tabValue === 0 && (
                <>
                  {(teamMembers && teamMembers.length > 0) ? (
                    <Box className={`${layoutClasses.panel}`}>
                      <PageTitle
                        title={pageStatics.data.titles.panel}
                      />
                      <Box mb={2}>
                        <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                          {pageStatics.data.description.teamPanel}
                        </Typography>
                      </Box>
                      {/* <Suspense fallback={(
                        <SkeletonContainer list={[
                          { variant: 'rect', fullWidth: true },
                        ]}
                        />
                      )}
                      >
                        <SearchMyTeam onSearch={searchTeamMembersHandler} onClear={clearSearchHandler} />
                      </Suspense>
                      <Suspense fallback={(
                        <SkeletonContainer list={[
                          { variant: 'rect', width: '20%' },
                          { variant: 'rect', width: '20%' },
                          { variant: 'rect', width: '20%' },
                          { variant: 'rect', width: '20%' },
                        ]}
                        />
                      )}
                      >
                        <SortMyTeam onSort={sortMyTeam} />
                      </Suspense> */}
                      <Suspense fallback={(
                        <SkeletonContainer list={[
                          { variant: 'circle', width: 50, height: 50 },
                          { variant: 'rect', fullWidth: true, height: 150 },
                          { variant: 'circle', width: 50, height: 50 },
                          { variant: 'rect', fullWidth: true, height: 150 },
                          { variant: 'circle', width: 50, height: 50 },
                          { variant: 'rect', fullWidth: true, height: 150 },
                        ]}
                        />
                      )}
                      >
                        <MyTeamList
                          teamMembers={teamMembers}
                          onOpenConnectionsDialog={openConnectionsDialogHandler}
                          onOpenTeamMemberAnalyticsDialog={openTeamMemberAnalyticsDialogHandler}
                          // onToggleProfileActivity={toggleProfileActivityHandler}
                          // onRedirectTeamMember={redirectTeamMemberHandler}
                          connectionsCount={memberConnections ? memberConnections.length : 0}
                          onSetNotification={onSetNotification}
                          onOpenQrDialog={openQrDialogHandler}
                          loadInvitations={loadInvitations}
                          onRemoveTeamMember={onRemoveTeamMember}
                        />
                      </Suspense>
                      {/* {(teamMembers && teamMembers.length > 0 && !searchedTeamMembers) && (
                        <Box mt={1} mb={2}><Pagination count={Math.ceil(teamMembers.length / TEAM_MEMBERS_PER_PAGE)} variant="outlined" onChange={paginationChangeHandler} /></Box>
                      )} */}
                    </Box>
                  ) : (
                    <Alert
                      title={pageStatics.messages.info.noTeamMembers.title}
                      description={pageStatics.messages.info.noTeamMembers.first}
                      type="warning"
                    />
                  )}
                </>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={tabValue !== 1}
              id="simple-tabpanel-1"
              className={layoutClasses.tabPanelContainer}
              aria-labelledby="simple-tab-1"
            >
              {tabValue === 1 && (
                <Box className={`${layoutClasses.panel}`}>
                  <PageTitle
                    title={`${pageStatics.data.titles.teamInvitations}`}
                  />
                  <Box>
                    <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                      {pageStatics.data.description.teamInvitations}
                    </Typography>
                    {loadingInvitations ? (
                      <Box display="flex" alignItems="center" justifyContent="center"><CircularProgress /></Box>
                    ) : (
                      <>
                        {invitations && invitations.length > 0 ? (
                          <Box>
                            <TeamInvitationsList
                              invitations={pageTeamInvitations(currentInvitationsPage)}
                              onSetNotification={onSetNotification}
                            />
                            {(teamMembersInvitations && teamMembersInvitations.length > TEAM_INVITATIONS_PER_PAGE) && (
                              <Box mt={1} mb={2}><Pagination count={Math.ceil(teamMembersInvitations.length / TEAM_INVITATIONS_PER_PAGE)} variant="outlined" onChange={invitationsPaginationChangeHandler} /></Box>
                            )}
                          </Box>
                        ) : (
                          <Box>
                            <Alert
                              title={pageStatics.messages.info.noTeamMembersInvitations.title}
                              description={pageStatics.messages.info.noTeamMembersInvitations.first}
                              type="warning"
                            />
                          </Box>
                        )}
                        <Button
                          className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                          onClick={() => openRequestUpgradeDialogHandler()}
                          style={{
                            backgroundColor: color.color.code,
                          }}
                        >
                          {pageStatics.buttons.manageSubscription}
                        </Button>
                      </>
                    )}
                  </Box>
                </Box>
              )}
            </div>
            <div
              role="tabpanel"
              hidden={tabValue !== 2}
              id="simple-tabpanel-2"
              className={layoutClasses.tabPanelContainer}
              aria-labelledby="simple-tab-2"
            >
              {tabValue === 2 && (
                <Suspense fallback={(
                  <SkeletonContainer list={[
                    { variant: 'circle', width: 50, height: 50 },
                    { variant: 'rect', fullWidth: true, height: 150 },
                    { variant: 'circle', width: 50, height: 50 },
                    { variant: 'rect', fullWidth: true, height: 150 },
                    { variant: 'circle', width: 50, height: 50 },
                    { variant: 'rect', fullWidth: true, height: 150 },
                  ]}
                  />
                )}
                >
                  <TeamReport
                    teamMembers={teamMembers}
                    onBarChartClick={openTeamMemberAnalyticsDialogHandler}
                  />
                </Suspense>
              )}
            </div>
            {/* <Box className={classes.editButtonContainer}>
              <Button
                color="secondary"
                onClick={() => generateTeamReport()}
                className={buttonClasses.defaultButton}
                style={{
                  backgroundColor: color.color.code,
                  minWidth: '250px',
                  width: '100%',
                }}
              >
                {pageStatics.buttons.teamReport}
              </Button>
            </Box> */}
          </Box>
        )}
        {teamMemberAnalytics && !loading && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 150 },
            ]}
            />
          )}
          >
            <TeamMemberAnalytics
              open={teamMemberAnalyticsDialogOpen}
              onClose={closeTeamMemberAnalyticsDialogHandler}
              memberName={memberName}
              memberAnalytics={teamMemberAnalytics}
              isTeamReport={false}
              tags={connectionTags}
            />
          </Suspense>
        )}
        {memberConnections && (
          <Suspense fallback={(
            <SkeletonContainer list={[
              { variant: 'rect', fullWidth: true, height: 150 },
            ]}
            />
          )}
          >
            <TeamMemberConnections
              open={connectionsDialogOpen}
              onClose={closeConnectionsDialogHandler}
              connections={memberConnections}
              memberName={memberName}
              onSortConnections={sortMemberConnections}
              memberConnectionsLoading={memberConnectionsLoading}
              auth={auth}
              connectionTags={connectionTags}
              cardData={cardData}
            />
          </Suspense>
        )}
        <RequestInvitationsDialog
          onSetNotification={onSetNotification}
          color={color.color.code}
          open={requestUpgradeDialogOpen}
          onClose={closeRequestUpgradeDialogHandler}
        />
        {memberSuffix && (
          <QRdrawer
            dialogOpen={qrDialogOpen}
            onClose={closeQrDialogHandler}
            memberName={memberName}
            memberSuffix={memberSuffix}
          />
        )}
      </Box>
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  teamMembers: state.teamMembers.teamMembers,
  links: state.cards.links,
  connectionTags: state.connections.connectionTags,
})

const mapDispatchToProps = dispatch => ({
  onLoadTeamMembers: masterId => dispatch(actions.loadTeamMembers(masterId)),
  onSortTeamMembers: (value, type) => dispatch(actions.sortTeamMembers(value, type)),
  onRemoveTeamMember: memberId => dispatch(actions.removeTeamMember(memberId)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onToggleTeamMemberProfileActivity: (profileId, active) => dispatch(actions.toggleTeamMemberProfileActivity(profileId, active)),
  onLoadConnectionTags: userId => dispatch(actions.loadConnectionTags(userId)),
})

MyTeam.defaultProps = {
  cardData: null,
  teamMembers: null,
  // links: null,
  connectionTags: null,
}

MyTeam.propTypes = {
  switchTheme: PropTypes.func.isRequired,
  onSortTeamMembers: PropTypes.func.isRequired,
  onLoadTeamMembers: PropTypes.func.isRequired,
  onRemoveTeamMember: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onLoadConnectionTags: PropTypes.func.isRequired,
  teamMembers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  // links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.array,
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]))),
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
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
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)
