import React, { useEffect, useState } from 'react'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts'

import { useTheme } from '@material-ui/core/styles'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
// import Slider from '@material-ui/core/Slider'
// import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import InfoIcon from '@material-ui/icons/Info'
import LockIcon from '@material-ui/icons/Lock'
import CheckIcon from '@material-ui/icons/Check'
import {
  CardsSaved, GreenhouseGases, TreesSaved, WaterSaved,
} from '../../layout/CustomIcons'

import Header from '../../layout/Header'
import LoadingBackdrop from '../../components/Loading/LoadingBackdrop'
import InfoBox from '../../components/Ui/InfoBox'
import SkeletonContainer from '../../layout/SkeletonContainer'
import NotificationDialog from '../../layout/NotificationDialog'
import PageTitle from '../../layout/PageTitle'

import { getTotalVisitsById } from '../../API/cards'
import { getMilestones } from '../../API/milestones'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'
// import { useColor } from '../../hooks/useDarkMode'

import * as actions from '../../store/actions'

import { rewardsStyles } from './styles'
import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'

const Rewards = ({ cardData, onSetNotification }) => {
  const layoutClasses = layoutStyles()
  const buttonClasses = buttonStyles()
  const classes = rewardsStyles()

  // const color = useColor()
  const auth = useAuth()
  const theme = useTheme()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.rewards

  const [loadingVisitsDone, setLoadingVisitsDone] = useState(false)
  const [loadingVisits, setLoadingVisits] = useState(false)
  const [cardVisits, setCardVisits] = useState(0)
  const [rewardInfoOpen, setRewardInfoOpen] = useState(window.location.hash === '#rewardinfo')
  const [rewardInfoType, setRewardInfoType] = useState(null)
  const [milestones, setMilestones] = useState(null)
  const [rewardNotReadyOpen, setRewardNotReady] = useState(window.location.hash === '#rewardn')
  const [rewardReadyOpen, setRewardReady] = useState(window.location.hash === '#rewardy')
  const [selectedReward, setSelectedReward] = useState(null)

  let rewardInfoDialogIcon
  let rewardInfoDialogBackground

  switch (rewardInfoType) {
    case 'savedCards':
      rewardInfoDialogIcon = <CardsSaved fill="#ffffff" />
      rewardInfoDialogBackground = '#5db300'
      break;
    case 'greenhouseGases':
      rewardInfoDialogIcon = <GreenhouseGases fill="#ffffff" />
      rewardInfoDialogBackground = '#3483e5'
      break;
    case 'trees':
      rewardInfoDialogIcon = <TreesSaved fill="#ffffff" />
      rewardInfoDialogBackground = '#966C40'
      break;
    case 'water':
      rewardInfoDialogIcon = <WaterSaved fill="#ffffff" />
      rewardInfoDialogBackground = '#00bbbb'
      break;
    default:
      rewardInfoDialogIcon = <CardsSaved fill="#ffffff" />
      rewardInfoDialogBackground = '#5db300'
  }

  useEffect(() => {
    let mounted = true
    if (mounted && cardData.userId) {
      (async () => {
        setLoadingVisits(true)
        const visits = await getTotalVisitsById(cardData.defaultId || cardData.userId)
        const ms = await getMilestones()
        setMilestones(ms)
        setCardVisits(visits)
        setLoadingVisitsDone(true)
        setTimeout(() => setLoadingVisits(false), 1000)
      })()
    }

    return () => { mounted = false }
  }, [cardData.userId, cardData.defaultId])

  useEffect(() => {
    const onHashChange = () => {
      setRewardInfoOpen(window.location.hash === '#rewardinfo')
      setRewardNotReady(window.location.hash === '#rewardn')
      setRewardReady(window.location.hash === '#rewardy')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  // const wrapLabelInPTag = marks => marks.map(mark => ({
  //   ...mark,
  //   label: (
  //     <div className={classes.envImpactMarkContainer}>
  //       <p className={classes.envImpactMarkTitle}>
  //         {mark.label}
  //       </p>
  //       <p className={classes.envImpactMarkVisits}>
  //         {`${mark.value} visits`}
  //       </p>
  //     </div>
  //   ),
  // }))

  // const marks = wrapLabelInPTag([
  //   { value: 1000, label: '20% off' },
  //   { value: 5000, label: '75% off' },
  //   { value: 10000, label: 'Free card' },
  // ]);

  const calculateGreenhouseGasesSaved = visitsNumber => {
    const gramsPerCard = 20;
    const gramsPerKilogram = 1000;
    const kilogramsPerTon = 1000;
    const gramsSaved = visitsNumber * gramsPerCard;
    const kilogramsSaved = gramsSaved / gramsPerKilogram;
    const tonsSaved = kilogramsSaved / kilogramsPerTon;
    const co2PerTon = 1.4 * 1000 * 1000; // 1.8 metric tons of CO2 per ton of paper
    const co2Saved = tonsSaved * co2PerTon;
    return Number(co2Saved.toFixed(2)); // round to two decimal places
  }

  const calculateTreesSaved = visitsNumber => {
    const cardsPerTree = (24 * 1000) / 10; // 24 trees per ton, 1000 kg per ton, 9.5 kg per card
    const treesSaved = visitsNumber / cardsPerTree
    return parseFloat(treesSaved.toFixed(2));
  }

  const calculateWaterSaved = visitsNumber => {
    // Each ton of paper requires around 10,000 liters of water to produce
    const litersPerTon = 10000;

    // Each paper card weighs around 7 grams, or 0.007 kilograms
    const paperWeight = 0.007;

    // Calculate the number of tons of paper saved
    const paperSaved = (visitsNumber * paperWeight) / 1000;

    // Calculate the amount of water saved in liters
    const waterSaved = paperSaved * litersPerTon;

    // Round the result to two decimal places and return it
    return parseFloat(waterSaved.toFixed(2));
  }

  const closeRewardInfoHandler = () => {
    window.history.back()
  }

  const openRewardInfoHandler = rewardType => {
    setRewardInfoType(rewardType)
    window.location.hash = '#rewardinfo'
  }

  const roundNumbers = number => {
    let num = number
    const roundedNumber = Math.round(number);

    if (number !== roundedNumber) {
      num = number.toFixed(1)
    }

    return num
  }

  const closeRewardNotReadyHandler = () => {
    window.history.back()
  }

  const openRewardNotReadyHandler = () => {
    window.location.hash = '#rewardn'
  }

  const closeRewardReadyHandler = () => {
    window.history.back()
  }

  const openRewardReadyHandler = () => {
    window.location.hash = '#rewardy'
  }

  const claimRewardHandler = reward => {
    setSelectedReward(reward)
    if (cardVisits && cardVisits > 0 && cardVisits >= reward.goal) {
      openRewardReadyHandler()
    } else {
      openRewardNotReadyHandler()
    }
  }

  const copyUrl = link => {
    onSetNotification({
      message: pageStatics.messages.notifications.urlCopiedSuccess,
      type: 'success',
    })
    if (link) {
      window.open(link, selectedReward.link.includes('https') ? '_blank' : '_self');
    }
  }

  if (cardData.loading || !cardData.userId || auth.loadingAuth || loadingVisits) {
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
        <LoadingBackdrop done={loadingVisitsDone} loadingText={pageStatics.messages.loading.loadingRewards} boxed />
      </Box>
    )
  }

  return (
    <Box className={layoutClasses.pageContainer}>
      <Header title={pageStatics.data.titles.page}>
        <Box>
          <InfoBox infoList={[pageStatics.messages.info.general.first]} />
        </Box>
      </Header>
      <Box className={layoutClasses.contentContainer}>
        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title={pageStatics.data.titles.impactPanel} />
          <Box mb={2}>
            <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
              {pageStatics.data.description.impactPanel}
            </Typography>
          </Box>
          <Box className={classes.impactContainer}>
            <Grid container spacing={2}>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box
                  className={`${classes.impactSection}
                  ${classes.impactSectionSavedCards}`}
                  onClick={() => openRewardInfoHandler('savedCards')}
                >
                  <Box className={classes.impactSectionIcon}>
                    <CardsSaved fill="#ffffff" />
                  </Box>
                  <Box className={classes.impactSectionData}>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionNumber}>
                      {cardVisits && cardVisits > 0 ? cardVisits : 0}
                      <span>{pageStatics.data.titles.imapctSection.savedCardsUnit}</span>
                    </Typography>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionTitle}>
                      {pageStatics.data.titles.imapctSection.savedCards}
                    </Typography>
                  </Box>
                  <InfoIcon className={classes.impactSectionInfoIcon} />
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box
                  className={`${classes.impactSection}
                  ${classes.impactSectionGreenhouseGases}`}
                  onClick={() => openRewardInfoHandler('greenhouseGases')}
                >
                  <Box className={classes.impactSectionIcon}>
                    <GreenhouseGases fill="#ffffff" />
                  </Box>
                  <Box className={classes.impactSectionData}>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionNumber}>
                      {cardVisits && cardVisits > 0 ? calculateGreenhouseGasesSaved(cardVisits) : 0}
                      <span>{pageStatics.data.titles.imapctSection.greenhouseGasesUnit}</span>
                    </Typography>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionTitle}>
                      {pageStatics.data.titles.imapctSection.greenhouseGases}
                    </Typography>
                  </Box>
                  <InfoIcon className={classes.impactSectionInfoIcon} />
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box
                  className={`${classes.impactSection}
                  ${classes.impactSectionTrees}`}
                  onClick={() => openRewardInfoHandler('trees')}
                >
                  <Box className={classes.impactSectionIcon}>
                    <TreesSaved fill="#ffffff" />
                  </Box>
                  <Box className={classes.impactSectionData}>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionNumber}>
                      {cardVisits && cardVisits > 0 ? calculateTreesSaved(cardVisits) : 0}
                      <span>{pageStatics.data.titles.imapctSection.treesUnit}</span>
                    </Typography>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionTitle}>
                      {pageStatics.data.titles.imapctSection.trees}
                    </Typography>
                  </Box>
                  <InfoIcon className={classes.impactSectionInfoIcon} />
                </Box>
              </Grid>
              <Grid item lg={6} md={6} sm={6} xs={12}>
                <Box
                  className={`${classes.impactSection}
                  ${classes.impactSectionWater}`}
                  onClick={() => openRewardInfoHandler('water')}
                >
                  <Box className={classes.impactSectionIcon}>
                    <WaterSaved fill="#ffffff" />
                  </Box>
                  <Box className={classes.impactSectionData}>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionNumber}>
                      {cardVisits && cardVisits > 0 ? calculateWaterSaved(cardVisits) : 0}
                      <span>{pageStatics.data.titles.imapctSection.waterUnit}</span>
                    </Typography>
                    <Typography variant="body1" align="left" component="p" className={classes.impactSectionTitle}>
                      {pageStatics.data.titles.imapctSection.water}
                    </Typography>
                  </Box>
                  <InfoIcon className={classes.impactSectionInfoIcon} />
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Box className={`${layoutClasses.panel}`}>
          <PageTitle title={pageStatics.data.titles.milestonesPanel} />
          <Box mb={2}>
            <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
              {pageStatics.data.description.milestonesPanel}
            </Typography>
          </Box>
          <Box className={classes.milestonesContainer}>
            {milestones && milestones.length > 0 && milestones.map(milestoneCard => (
              <Box
                className={classes.milestoneBox}
                key={milestoneCard.goal}
                onClick={() => claimRewardHandler(milestoneCard)}
              >
                <Box
                  className={`
                    ${classes.milestoneIndicatorIconContainer}
                    ${cardVisits && cardVisits > 0 && cardVisits >= milestoneCard.goal ? classes.milestoneIndicatorIconContainerClaimed : ''}
                  `}
                >
                  {cardVisits && cardVisits > 0 && cardVisits >= milestoneCard.goal ? (
                    <CheckIcon />
                  ) : (
                    <LockIcon />
                  )}
                </Box>
                <Box
                  className={`
                    ${classes.milestoneCard}
                    ${cardVisits && cardVisits > 0 && cardVisits >= milestoneCard.goal ? classes.milestoneCardClaimed : ''}
                  `}
                >
                  <Box className={classes.milestoneData}>
                    <Typography variant="body1" align="left" component="p" className={classes.milestoneTitle}>
                      {milestoneCard.title}
                    </Typography>
                    <Typography variant="body1" align="left" component="p" className={classes.milestoneDescription}>
                      {milestoneCard.description}
                    </Typography>
                    <Button
                      className={`
                        ${buttonClasses.defaultButton}
                        ${layoutClasses.panelButton}
                        ${cardVisits && cardVisits > 0 && cardVisits >= milestoneCard.goal ? classes.milestoneButtonClaimed : classes.milestoneButtonUnclaimed}
                      `}
                    >
                      {cardVisits && cardVisits > 0 && cardVisits >= milestoneCard.goal
                        ? pageStatics.buttons.claimReward.claimed
                        : `${pageStatics.buttons.claimReward.unclaimed.first} ${cardVisits && cardVisits > 0 ? milestoneCard.goal - cardVisits : milestoneCard.goal} ${pageStatics.buttons.claimReward.unclaimed.second}`}
                    </Button>
                  </Box>
                  <Box className={classes.milestoneProgressContainer}>
                    <ResponsiveContainer width="100%" height={75}>
                      <PieChart width={75} height={75}>
                        <Pie
                          data={cardVisits && cardVisits > 0 && cardVisits >= milestoneCard.goal
                            ? [{
                              name: 'Goal',
                              value: 100,
                              color: '#00C49F',
                            }]
                            : [
                              {
                                name: 'Goal',
                                value: cardVisits && cardVisits > 0 ? (cardVisits / milestoneCard.goal) * 100 : 0,
                                color: '#00C49F',
                              },
                              {
                                name: '',
                                value: 100 - (cardVisits && cardVisits > 0 ? (cardVisits / milestoneCard.goal) * 100 : 0),
                              },
                            ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={25}
                          outerRadius={35}
                          fill="#8884d8"
                          stroke={theme.palette.background.light}
                          strokeWidth={2}
                          dataKey="value"
                          isAnimationActive={false}
                          labelLine={false}
                        >
                          <Cell key="cell-0" fill="#00C49F" />
                          <Cell key="cell-1" fill={theme.palette.background.darker} />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    {cardVisits && cardVisits > 0 && cardVisits >= milestoneCard.goal ? (
                      <Typography variant="h6" className={classes.milestonePercentage}>100%</Typography>
                    ) : (
                      <Typography variant="h6" className={classes.milestonePercentage}>{`${cardVisits && cardVisits > 0 ? (roundNumbers((cardVisits / milestoneCard.goal) * 100)) : 0}%`}</Typography>
                    )}
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {rewardInfoOpen && !!rewardInfoType && (
        <NotificationDialog
          open={rewardInfoOpen}
          onClose={closeRewardInfoHandler}
          loadingMessage="Loading..."
          title={pageStatics.data.titles.imapctSection[rewardInfoType]}
          titleColor="#fff"
          type="info"
          icon={rewardInfoDialogIcon}
          background={rewardInfoDialogBackground}
        >
          <Box>
            <Typography variant="body1" align="center" component="p" style={{ color: '#fff' }}>
              {pageStatics.data.description.imapctSection[rewardInfoType]}
            </Typography>
          </Box>
        </NotificationDialog>
      )}
      {rewardNotReadyOpen && selectedReward && (
        <NotificationDialog
          open={rewardNotReadyOpen}
          onClose={closeRewardNotReadyHandler}
          loadingMessage="Loading..."
          title={pageStatics.data.titles.rewardNotReadyDialog}
          type="warning"
        >
          <Box>
            <Typography variant="body1" align="center" component="p">
              {`${pageStatics.data.description.rewardNotReadyDialog} (Save ${selectedReward.goal} paper cards).`}
            </Typography>
          </Box>
        </NotificationDialog>
      )}
      {rewardReadyOpen && selectedReward && (
        <NotificationDialog
          open={rewardReadyOpen}
          onClose={closeRewardReadyHandler}
          loadingMessage="Loading..."
          title={selectedReward.title}
          type="success"
        >
          <Box>
            <Typography variant="body1" align="center" component="p">
              {pageStatics.data.description.rewardReadyDialog}
            </Typography>
            <Box className={classes.rewardData}>
              <Box className={`${classes.copyCode}`}>
                <Typography variant="body1" component="p" className={classes.promoCode}>
                  {selectedReward.code}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center" className={classes.codeActionsContainer}>
                {/* <CopyToClipboard
                  text={selectedReward.code}
                  onCopy={() => copyUrl()}
                  className={`${classes.copyCodeButton} ${layoutClasses.panelButton}`}
                >
                  <Typography variant="body1" component="p" className={classes.promoCode}>
                    {pageStatics.buttons.copyReward}
                  </Typography>
                </CopyToClipboard> */}
                <CopyToClipboard
                  text={selectedReward.code}
                  onCopy={() => copyUrl(selectedReward.link)}
                  className={`${classes.copyCodeButton} ${layoutClasses.panelButton}`}
                >
                  <Typography variant="body1" component="p" className={classes.promoCode}>
                    {pageStatics.buttons.useReward}
                  </Typography>
                </CopyToClipboard>
              </Box>
            </Box>
          </Box>
        </NotificationDialog>
      )}
    </Box>
  )
}

const mapStateToProps = state => ({
  cardData: state.cards,
  connections: state.connections,
  connectionTags: state.connections.connectionTags,
})

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

Rewards.defaultProps = {
  cardData: null,
}

Rewards.propTypes = {
  cardData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(Rewards)
