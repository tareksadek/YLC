import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  format, subDays,
  // startOfToday, sub, startOfMonth, startOfYear,
} from 'date-fns'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer,
  PieChart, Pie, Cell, Tooltip, Legend,
} from 'recharts'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import List from '@material-ui/core/List'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'
import Collapse from '@material-ui/core/Collapse'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { useTheme } from '@material-ui/core/styles'

import LinkItemSlider from './LinkItemSlider'
// import TagItemSlider from './TagItemSlider'
import Alert from '../../layout/Alert'

import { useLanguage } from '../../hooks/useLang'
import { useColor } from '../../hooks/useDarkMode'

import { socialPlatforms } from '../../utilities/appVars'

import { analyticsStyles } from './styles'

const Report = ({
  clickedNo, connectionsNo, links, visits, visitsCount,
  // tags, connections,
  loadingVisits, loadingVisitsDone,
}) => {
  const classes = analyticsStyles()

  const theme = useTheme()
  const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.analytics

  // console.log(teamMemberAnalytics);
  // console.log(teamAnalytics);
  const activeLinks = links && links.length > 0 && links.filter(link => link.active)
  const sortedLinks = links && links.length > 0 ? links.sort((a, b) => (b.clicked || 0) - (a.clicked || 0)) : null
  const maxClicked = links && links.length > 0 ? links.reduce((max, link) => (link.clicked && link.clicked > max ? link.clicked : max), 0) : null
  // const sortedTags = tags && tags.length > 0 && tags.map(tag => {
  //   const z = tag
  //   if (connections && connections.length > 0) {
  //     z.count = connections.filter(connection => (connection.tags && connection.tags.length > 0 ? connection.tags.includes(tag.id) : null)).length
  //   } else {
  //     z.count = 0
  //   }
  //   return z
  // }).sort((a, b) => (b.count || 0) - (a.count || 0))
  // const maxTagCount = tags && tags.length > 0 && tags.reduce((max, tag) => (tag.count && tag.count > max ? tag.count : max), 0)

  const [expanded, setExpanded] = useState({
    envImpact: true,
    visitTime: true,
    efficiency: true,
    links: true,
    labels: true,
  })
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('week')
  const [chartData, setChartData] = useState([])
  const [visitsPeriod, setVisitsPeriod] = useState(null)

  useEffect(() => {
    const timePeriods = {
      week: 7,
      month: 30,
      year: 365,
    }
    const fromDate = subDays(new Date(), timePeriods[selectedTimePeriod])
    if (visits && visits.length > 0) {
      const filteredVisits = visits.filter(visit => visit.date.toDate() >= fromDate)
      const groupedVisits = filteredVisits.reduce((accumulator, visit) => {
        const date = format(visit.date.toDate(), 'dd/MM/yyyy')
        if (!accumulator[date]) {
          accumulator[date] = { date, visits: 0 }
        }
        accumulator[date].visits += visit.count
        return accumulator
      }, {})
      const data = Object.values(groupedVisits)
      data.sort((a, b) => {
        const dateA = new Date(a.date.split('/').reverse().join('-'))
        const dateB = new Date(b.date.split('/').reverse().join('-'))
        return dateA - dateB;
      })
      setChartData(data)

      const visitsPastWeek = visits.filter(visit => visit.date.toDate() >= subDays(new Date(), timePeriods.week)).length
      const visitsPastMonth = visits.filter(visit => visit.date.toDate() >= subDays(new Date(), timePeriods.month)).length
      const visitsPastYear = visits.filter(visit => visit.date.toDate() >= subDays(new Date(), timePeriods.year)).length
      setVisitsPeriod({
        pastWeek: visitsPastWeek,
        pastMonth: visitsPastMonth,
        pastYear: visitsPastYear,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visits, selectedTimePeriod])

  const efficiencyPercentage = visits && visits.length > 0 ? ((connectionsNo * 1 + clickedNo * 0.5) / visits.length) * 100 : 0

  const COLORS = ['#00C49F', theme.palette.background.darker]

  const data = [
    { name: 'Efficiency', value: efficiencyPercentage, color: '#00C49F' },
    { name: '', value: 100 - efficiencyPercentage },
  ];

  const renderLegend = ({ payload }) => payload.map(entry => {
    if (entry.value === 'Efficiency') {
      return (
        <Box key={entry.value} className={classes.efficiencyChartLegendContainer}>
          <span style={{ backgroundColor: entry.color }}>&nbsp;</span>
          {entry.value}
        </Box>
      )
    }
    return null
  })

  const timePeriodHandler = timePeriod => {
    setSelectedTimePeriod(timePeriod)
  }

  const expandPanelHandler = panel => {
    setExpanded(prevState => ({
      ...prevState,
      [panel]: !prevState[panel],
    }))
  }

  return (
    <Box className={classes.analyticsContainer}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card
            classes={{
              root: classes.analyticsCard,
            }}
          >
            <CardHeader
              title={pageStatics.data.titles.efficiency}
              subheader={pageStatics.data.description.efficiency}
              action={(
                <IconButton
                  className={expanded.efficiency ? classes.expandedCard : classes.ClosedCard}
                  onClick={() => expandPanelHandler('efficiency')}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
              classes={{
                title: classes.analyticsCardTitle,
                subheader: classes.analyticsCardSubheader,
                action: classes.analyticsCardAction,
                root: classes.analyticsCardHeader,
              }}
            />
            <Collapse in={expanded.efficiency} timeout="auto" unmountOnExit>
              <CardContent
                classes={{
                  root: classes.analyticsCardContent,
                }}
              >
                {loadingVisits && !loadingVisitsDone ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  <>
                    {visits && (visits.length < 10 || clickedNo < 2 || connectionsNo < 2) ? (
                      <Alert
                        title={pageStatics.data.placeholders.noEnoughData.title}
                        description={pageStatics.data.placeholders.noEnoughData.description}
                        type="warning"
                      />
                    ) : (
                      <Box className={classes.efficiencyChartContainer}>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart width={300} height={300}>
                            <Pie
                              data={data}
                              cx="50%"
                              cy="50%"
                              innerRadius={70}
                              outerRadius={100}
                              fill="#8884d8"
                              stroke={theme.palette.background.default}
                              strokeWidth={0}
                              dataKey="value"
                              isAnimationActive
                              labelLine={false}
                            >
                              {data.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[index % COLORS.length]}
                                  style={{
                                    filter: entry.name === 'Efficiency' ? `drop-shadow(-5px 10px 8px ${theme.palette.background.chartShadow})` : `drop-shadow(-5px 10px 8px ${theme.palette.background.chartShadow})`,
                                  }}
                                />
                              ))}
                            </Pie>
                            <Legend content={renderLegend} iconType="circle" />
                            {/* <Tooltip content={renderTooltip} /> */}
                          </PieChart>
                        </ResponsiveContainer>
                        <Typography variant="h6" className={classes.efficiencyChartPercentage}>{`${efficiencyPercentage % 1 === 0 ? efficiencyPercentage.toFixed(0) : efficiencyPercentage.toFixed(2)}%`}</Typography>
                      </Box>
                    )}
                    <Box className={classes.efficiencyChartNumbers}>
                      <Box className={classes.efficiencyChartNumberContainer}>
                        <Typography className={classes.efficiencyChartNumberTitle} variant="body2" color="textSecondary" component="p">
                          {pageStatics.data.titles.visits}
                        </Typography>
                        <Typography className={classes.efficiencyChartNumber} variant="body2" color="textSecondary" component="p">
                          {visitsCount || 0}
                        </Typography>
                      </Box>
                      <Box className={classes.efficiencyChartNumberContainer}>
                        <Typography className={classes.efficiencyChartNumberTitle} variant="body2" color="textSecondary" component="p">
                          {pageStatics.data.titles.addedToContacts}
                        </Typography>
                        <Typography className={classes.efficiencyChartNumber} variant="body2" color="textSecondary" component="p">
                          {clickedNo}
                        </Typography>
                      </Box>
                      <Box className={classes.efficiencyChartNumberContainer}>
                        <Typography className={classes.efficiencyChartNumberTitle} variant="body2" color="textSecondary" component="p">
                          {pageStatics.data.titles.connections}
                        </Typography>
                        <Typography className={classes.efficiencyChartNumber} variant="body2" color="textSecondary" component="p">
                          {connectionsNo}
                        </Typography>
                      </Box>
                    </Box>
                  </>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>

        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Card
            classes={{
              root: classes.analyticsCard,
            }}
          >
            <CardHeader
              title={pageStatics.data.titles.visitsTime}
              subheader={pageStatics.data.description.visitsTime}
              action={(
                <IconButton
                  className={expanded.visitTime ? classes.expandedCard : classes.ClosedCard}
                  onClick={() => expandPanelHandler('visitTime')}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
              classes={{
                title: classes.analyticsCardTitle,
                subheader: classes.analyticsCardSubheader,
                action: classes.analyticsCardAction,
                root: classes.analyticsCardHeader,
              }}
            />
            <Collapse in={expanded.visitTime} timeout="auto" unmountOnExit>
              <CardContent
                classes={{
                  root: classes.analyticsCardContent,
                }}
              >
                <Box className={classes.totalVisitsContainer}>
                  <Typography className={classes.totalVisits} variant="body2" color="textSecondary" component="p">
                    {visitsCount || 0}
                  </Typography>
                  <Typography className={classes.totalVisitsDescription} variant="body2" color="textSecondary" component="p">
                    {pageStatics.data.description.totalVisits}
                  </Typography>
                </Box>
                {loadingVisits && !loadingVisitsDone ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  <>
                    {visits && visits.length < 10 ? (
                      <Alert
                        title={pageStatics.data.placeholders.noEnoughDataTime.title}
                        description={pageStatics.data.placeholders.noEnoughDataTime.description}
                        type="warning"
                      />
                    ) : (
                      <Box className={classes.chartContainer}>
                        <ButtonGroup variant="contained" aria-label="outlined button group" className={classes.visitsTimeButtons}>
                          <Button
                            onClick={() => timePeriodHandler('week')}
                            className={selectedTimePeriod === 'week' ? classes.selectedVisitsTimeButton : ''}
                          >
                            {`${pageStatics.buttons.visitsTime.pastWeek}`}
                            <span>{visitsPeriod && visitsPeriod.pastWeek}</span>
                          </Button>
                          <Button
                            onClick={() => timePeriodHandler('month')}
                            className={selectedTimePeriod === 'month' ? classes.selectedVisitsTimeButton : ''}
                          >
                            {`${pageStatics.buttons.visitsTime.pastMonth}`}
                            <span>{visitsPeriod && visitsPeriod.pastMonth}</span>
                          </Button>
                          <Button
                            onClick={() => timePeriodHandler('year')}
                            className={selectedTimePeriod === 'year' ? classes.selectedVisitsTimeButton : ''}
                          >
                            {`${pageStatics.buttons.visitsTime.pastYear}`}
                            <span>{visitsPeriod && visitsPeriod.pastYear}</span>
                          </Button>
                        </ButtonGroup>
                        {chartData && chartData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={300} className={classes.lineChartContainer}>
                            <LineChart isAnimationActive data={chartData} label={chartData && chartData.length > 0 ? null : <Box>&nbsp;</Box>}>
                              <XAxis dataKey="date" />
                              <YAxis width={20} />
                              <CartesianGrid strokeDasharray="3 3" />
                              <Tooltip />
                              <Line type="monotone" dataKey="visits" stroke="#00C49F" activeDot={{ r: 8 }} />
                            </LineChart>
                          </ResponsiveContainer>
                        ) : (
                          <Box className={classes.noChartData}>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {pageStatics.data.description.noVisits}
                            </Typography>
                          </Box>
                        )}
                      </Box>
                    )}
                  </>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>

        {/* <Grid item xs={12}>
          <Card
            classes={{
              root: classes.analyticsCard,
            }}
          >
            <CardHeader
              title={pageStatics.data.titles.envImpact}
              subheader={pageStatics.data.description.envImpact}
              action={(
                <IconButton
                  className={expanded.envImpact ? classes.expandedCard : classes.ClosedCard}
                  onClick={() => expandPanelHandler('envImpact')}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
              classes={{
                title: classes.analyticsCardTitle,
                subheader: classes.analyticsCardSubheader,
                action: classes.analyticsCardAction,
                root: classes.analyticsCardHeader,
              }}
            />
            <Collapse in={expanded.envImpact} timeout="auto" unmountOnExit>
              <CardContent
                classes={{
                  root: classes.analyticsCardContent,
                }}
              >
                {loadingVisits && !loadingVisitsDone ? (
                  <CircularProgress color="secondary" size={20} />
                ) : (
                  <>
                    <Box className={classes.envImpactContainer}>
                      <Box className={classes.envImpactFilledArea}>&nbsp;</Box>
                      <Slider
                        classes={{
                          root: classes.envImpactRoot,
                          thumb: classes.envImpactThumb,
                          active: classes.envImpactActive,
                          valueLabel: classes.envImpactValueLabel,
                          track: classes.envImpactTrack,
                          rail: classes.envImpactRail,
                          mark: classes.envImpactMark,
                          markLabel: classes.envImpactMarkLabel,
                        }}
                        value={visits && visits.length > 0 ? visits.length : 0}
                        aria-labelledby="environmental-impact-slider"
                        step={1000}
                        marks={marks}
                        min={0}
                        max={10000}
                        disabled
                        valueLabelDisplay="on"
                      />
                    </Box>
                    <Box className={classes.claimRewardButton} mt={2}>
                      <Button
                        className={`${buttonClasses.defaultButton} ${layoutClasses.panelButton}`}
                        onClick={() => claimRewardHandler()}
                        style={{
                          backgroundColor: color.color.code,
                        }}
                      >
                        {pageStatics.buttons.claimReward}
                      </Button>
                    </Box>
                  </>
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Grid> */}

        <Grid item xs={12}>
          <Card
            classes={{
              root: classes.analyticsCard,
            }}
          >
            <CardHeader
              title={pageStatics.data.titles.links}
              subheader={pageStatics.data.description.linksPanel}
              action={(
                <IconButton
                  className={expanded.links ? classes.expandedCard : classes.ClosedCard}
                  onClick={() => expandPanelHandler('links')}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
              classes={{
                title: classes.analyticsCardTitle,
                subheader: classes.analyticsCardSubheader,
                action: classes.analyticsCardAction,
                root: classes.analyticsCardHeader,
              }}
            />
            <Collapse in={expanded.links} timeout="auto" unmountOnExit>
              <CardContent
                classes={{
                  root: classes.analyticsCardContent,
                }}
              >
                {activeLinks && activeLinks.length > 0 ? (
                  <List className={classes.analyticsLinksList}>
                    {
                      sortedLinks.filter(link => link.active).map(link => (
                        <LinkItemSlider
                          key={`${link.link}_${link.key}`}
                          link={link.link}
                          color={link.platform === 'custom' ? color.color.code : socialPlatforms.find(socialPlatform => socialPlatform.platform === link.platform).color}
                          platform={link.platform}
                          clicked={link.clicked || 0}
                          linkTitle={link.linkTitle || link.platform}
                          maxClicked={maxClicked}
                        />
                      ))
                    }
                  </List>
                ) : (
                  <Alert
                    title={pageStatics.messages.notifications.noLinks.title}
                    description={pageStatics.messages.notifications.noLinks.description}
                    type="warning"
                  />
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Grid>

        {/* <Grid item xs={12}>
          <Card
            classes={{
              root: classes.analyticsCard,
            }}
          >
            <CardHeader
              title={pageStatics.data.titles.tags}
              subheader={pageStatics.data.description.tagsPanel}
              action={(
                <IconButton
                  className={expanded.labels ? classes.expandedCard : classes.ClosedCard}
                  onClick={() => expandPanelHandler('labels')}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              )}
              classes={{
                title: classes.analyticsCardTitle,
                subheader: classes.analyticsCardSubheader,
                action: classes.analyticsCardAction,
                root: classes.analyticsCardHeader,
              }}
            />
            <Collapse in={expanded.labels} timeout="auto" unmountOnExit>
              <CardContent
                classes={{
                  root: classes.analyticsCardContent,
                }}
              >
                {sortedTags && sortedTags.length > 0 ? (
                  <List className={classes.analyticsLinksList}>
                    {
                      sortedTags.map(tag => (
                        <TagItemSlider
                          key={tag.id}
                          display={tag.display}
                          color={tag.color}
                          count={tag.count}
                          maxCount={maxTagCount}
                        />
                      ))
                    }
                  </List>
                ) : (
                  <Alert
                    title={pageStatics.messages.notifications.noTags.title}
                    description={pageStatics.messages.notifications.noTags.description}
                    type="warning"
                  />
                )}
              </CardContent>
            </Collapse>
          </Card>
        </Grid> */}
      </Grid>
      {/* <NotificationDialog
        open={rewardNotReadyOpen}
        onClose={closeRewardNotReadyHandler}
        loadingMessage="Loading..."
        title={pageStatics.data.titles.rewardNotReadyDialog}
        type="warning"
      >
        <Box>
          <Typography variant="body1" align="center" component="p">
            {pageStatics.data.description.rewardNotReadyDialog.first}
            {`${visits && visits.length > 0 && visits.length < 1000}` && ' 1000 '}
            {pageStatics.data.description.rewardNotReadyDialog.second}
          </Typography>
        </Box>
      </NotificationDialog> */}
    </Box>
  )
}

Report.defaultProps = {
  clickedNo: null,
  connectionsNo: null,
  links: null,
  visits: null,
  // tags: null,
  // connections: null,
  loadingVisits: false,
  loadingVisitsDone: false,
  visitsCount: null,
}

Report.propTypes = {
  clickedNo: PropTypes.number,
  connectionsNo: PropTypes.number,
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  visits: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  // tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.array,
  //   PropTypes.bool,
  //   PropTypes.object,
  // ]))),
  // connections: PropTypes.arrayOf(PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.number,
  //   PropTypes.array,
  //   PropTypes.bool,
  //   PropTypes.object,
  // ])),
  loadingVisits: PropTypes.bool,
  loadingVisitsDone: PropTypes.bool,
  visitsCount: PropTypes.number,
}

export default Report
