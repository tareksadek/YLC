import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import InfoBox from '../../components/Ui/InfoBox'
import SkeletonContainer from '../../layout/SkeletonContainer'
// import ProDialog from '../../components/BecomePro/ProDialog'
import PageTitle from '../../layout/PageTitle'
import CreateProfileDialog from '../../components/ProfileSwitch/CreateProfileDialog'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'
import { useLayoutMode } from '../../hooks/useLayoutMode'

import { layoutStyles } from '../../theme/layout'
import { qrStyles } from './styles'

import * as actions from '../../store/actions'
import { settings, MAX_PROFILES } from '../../utilities/appVars'

const ProfileSwitch = ({
  onLoadCard, cardData, switchTheme, profiles, activeProfileId, onActivateUserProfile, onSetNotification,
  loadingProfile, onLoadConnectionData, loadingConnections,
}) => {
  const layoutClasses = layoutStyles()
  const classes = qrStyles()

  const auth = useAuth()
  const color = useColor()
  const { switchLayout } = useLayoutMode()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.switchProfile
  // const isTheLoggedinUser = cardData.urlSuffix === auth.userUrlSuffix
  const fallBackColor = cardData && cardData.settings && cardData.settings.theme === 'light' ? '#272727' : '#ffffff'

  const isPro = auth.isSubscriber && (auth.subscriberStatus === 'active' || auth.subscriberStatus === 'succeeded' || auth.subscriberStatus === 'trialing')

  const [loadingDone, setLoadingDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [addProfileDialogOpen, setAddProfileDialogOpen] = useState(window.location.hash === '#addProfile')
  const [loadingMessage, setLoadingMessage] = useState(pageStatics.messages.loading.loadingProfiles)

  // useEffect(() => {
  //   let mounted = true

  //   if ((mounted && !cardData.userId) || !isTheLoggedinUser) {
  //     (async () => {
  //       setLoading(true)
  //       await onLoadCard(auth.user.uid)
  //       console.log('load');
  //       setLoadingDone(true)
  //       setTimeout(() => setLoading(false), 1000)
  //     })()
  //   }

  //   return () => { mounted = false }
  // }, [onLoadCard, auth.user.uid, cardData.userId, isTheLoggedinUser])

  // useEffect(() => {
  //   if (window.localStorage.getItem('originalTheme')) {
  //     switchTheme(window.localStorage.getItem('originalTheme'))
  //   }
  // }, [switchTheme])

  useEffect(() => {
    const onHashChange = () => {
      setAddProfileDialogOpen(window.location.hash === '#addProfile')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const openAddProfileDialogHandler = () => {
    window.location.hash = '#addProfile'
  }

  const closeAddProfileDialog = () => {
    window.history.back()
  }

  const createProfile = async () => {
    openAddProfileDialogHandler()
  }

  const activateProfile = async profileId => {
    setLoadingMessage(pageStatics.messages.loading.switchProfile)
    setLoading(true)
    try {
      await onActivateUserProfile(auth.user.uid, profileId)
      const card = await onLoadCard(auth.user.uid, isPro)
      await onLoadConnectionData(profileId, false)
      switchLayout(card.settings.layout)
      window.localStorage.setItem('originalTheme', card.settings.theme)
      switchTheme(card.settings.theme)
      color.switchColor(card.settings.selectedColor)
      setLoadingDone(true)
      setTimeout(() => setLoading(false), 1000)
    } catch (err) {
      setLoadingDone(true)
      setLoading(false)
      setLoadingMessage(null)
    }
  }

  if (cardData.loading || !cardData.userId || loadingProfile || loadingConnections) {
    return (
      <Box className={layoutClasses.pageContainer}>
        <Header title={pageStatics.data.titles.page}>
          <Box mb={3}>
            <InfoBox infoList={[pageStatics.messages.info.general.first, pageStatics.messages.info.general.second]} />
          </Box>
        </Header>
        <Box className={layoutClasses.contentContainer}>
          <Box className={layoutClasses.formContainer}>
            <Box className={`${layoutClasses.panel}`}>
              <SkeletonContainer list={[
                { variant: 'rect', width: 100, height: 100 },
                { variant: 'rect', width: 100, height: 100 },
                { variant: 'rect', width: 100, height: 100 },
              ]}
              />
            </Box>
          </Box>
        </Box>
        <LoadingBackdrop done={loadingDone} loadingText={pageStatics.messages.loading.loadingProfiles} />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      {loading && <LoadingBackdrop done={loadingDone} loadingText={loadingMessage} />}
      <Header title={pageStatics.data.titles.page}>
        <Box mb={3}>
          <InfoBox infoList={[pageStatics.messages.info.general.first, pageStatics.messages.info.general.second]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={layoutClasses.formContainer}>
          <Box className={`${layoutClasses.panel}`}>
            <PageTitle title={pageStatics.data.titles.profilesPanel} isPro={settings.onlyInvitations && !isPro} />
            <Box mb={2}>
              <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
                {pageStatics.data.description.profilesPanel}
              </Typography>
            </Box>
            {isPro ? (
              <Grid container spacing={3}>
                {activeProfileId && activeProfileId !== auth.user.uid ? (
                  <Grid item xs={4} md={4}>
                    <Box className={classes.profileButtonContainer}>
                      <Button
                        onClick={() => activateProfile(auth.user.uid)}
                        disabled={loading}
                      >
                        <PowerSettingsNewIcon />
                        <span>Activate</span>
                      </Button>
                      <Typography variant="body1" align="left" component="p">Default</Typography>
                    </Box>
                  </Grid>
                ) : (
                  <Grid item xs={4} md={4}>
                    <Box className={classes.profileButtonContainer}>
                      <Box className={classes.activeProfileBox}>
                        <CheckCircleIcon />
                      </Box>
                      <Typography variant="body1" align="left" component="p">Default</Typography>
                    </Box>
                  </Grid>
                )}
                {[...Array(MAX_PROFILES - 1)].map((_, i) => (
                  <Grid item xs={4} md={4} key={i}>
                    {profiles && profiles[i] ? (
                      <>
                        {profiles[i].id !== activeProfileId ? (
                          <Box className={classes.profileButtonContainer}>
                            <Button
                              onClick={() => activateProfile(profiles[i].id)}
                              disabled={loading}
                            >
                              <PowerSettingsNewIcon />
                              <span>Activate</span>
                            </Button>
                            <Typography variant="body1" align="left" component="p">{profiles[i].title}</Typography>
                          </Box>
                        ) : (
                          <Box className={classes.profileButtonContainer}>
                            <Box className={classes.activeProfileBox}>
                              <CheckCircleIcon />
                            </Box>
                            <Typography variant="body1" align="left" component="p">{profiles[i].title}</Typography>
                          </Box>
                        )}
                      </>
                    ) : (
                      <Box className={`${classes.profileButtonContainer} ${classes.addProfileButtonContainer}`}>
                        <Button
                          onClick={() => createProfile()}
                          disabled={loading}
                        >
                          <AddCircleOutlineIcon />
                          <span>Add</span>
                        </Button>
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Grid container spacing={3}>
                <Grid item xs={4} md={4}>
                  <Box className={classes.profileButtonContainer}>
                    <Box className={classes.activeProfileBox}>
                      <CheckCircleIcon />
                    </Box>
                    <Typography variant="body1" align="left" component="p">Default</Typography>
                  </Box>
                </Grid>
                {[...Array(MAX_PROFILES - 1)].map((_, i) => (
                  <Grid item xs={4} md={4} key={i + 1}>
                    {profiles && profiles[i].id !== activeProfileId ? (
                      <Box className={classes.profileButtonContainer}>
                        <Button
                          onClick={() => activateProfile(profiles[i].id)}
                          disabled={loading}
                        >
                          <PowerSettingsNewIcon />
                          <span>Activate</span>
                        </Button>
                        <Typography variant="body1" align="left" component="p">{profiles[i].title}</Typography>
                      </Box>
                    ) : (
                      <Box className={`${classes.profileButtonContainer} ${classes.addProfileButtonContainer}`}>
                        <Button
                          onClick={() => createProfile()}
                          disabled={loading}
                        >
                          <AddCircleOutlineIcon />
                          <span>Add</span>
                        </Button>
                      </Box>
                    )}
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        </Box>
      </Box>
      {/* {settings.onlyInvitations && !isPro && (
        <ProDialog
          open={proDialogOpen}
          onClose={closeProDialogHandler}
        />
      )} */}
      {addProfileDialogOpen && (
        <CreateProfileDialog
          open={addProfileDialogOpen}
          onClose={closeAddProfileDialog}
          color={color.color.code || fallBackColor}
          cardData={cardData}
          onSetNotification={onSetNotification}
          switchTheme={switchTheme}
          onLoadCard={onLoadCard}
          profileCount={profiles ? profiles.length : 0}
          isPro={isPro}
        />
      )}
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  profiles: state.profiles.profiles,
  activeProfileId: state.profiles.activeProfileId,
  loadingProfile: state.profiles.loading,
  loadingConnections: state.connections.loading,
})

const mapDispatchToProps = dispatch => ({
  onLoadCard: (userId, isPro) => dispatch(actions.loadCardByUserId(userId, isPro)),
  onActivateUserProfile: (userId, profileId) => dispatch(actions.activateUserProfile(userId, profileId)),
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
  onLoadConnectionData: (userId, loadConnections) => dispatch(actions.loadConnectionData(userId, loadConnections)),
})

ProfileSwitch.defaultProps = {
  cardData: null,
  activeProfileId: null,
  profiles: null,
  loadingProfile: false,
  loadingConnections: false,
}

ProfileSwitch.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onLoadCard: PropTypes.func.isRequired,
  switchTheme: PropTypes.func.isRequired,
  onActivateUserProfile: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  activeProfileId: PropTypes.string,
  onSetNotification: PropTypes.func.isRequired,
  loadingProfile: PropTypes.bool,
  onLoadConnectionData: PropTypes.func.isRequired,
  loadingConnections: PropTypes.bool,
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileSwitch)
