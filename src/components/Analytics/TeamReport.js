import React from 'react'
import PropTypes from 'prop-types'
import {
  ResponsiveContainer, PieChart, Pie, Cell, Legend,
  BarChart, XAxis, YAxis, Tooltip, Bar, CartesianGrid,
} from 'recharts'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { useTheme } from '@material-ui/core/styles'

// import LinkItemSlider from './LinkItemSlider'
import PageTitle from '../../layout/PageTitle'
import Alert from '../../layout/Alert'

import { useLanguage } from '../../hooks/useLang'
// import { useColor } from '../../hooks/useDarkMode'

// import { socialPlatforms } from '../../utilities/appVars'

import { analyticsStyles } from './styles'
import { layoutStyles } from '../../theme/layout'

const TeamReport = ({
  teamMembers, onBarChartClick,
}) => {
  const classes = analyticsStyles()
  const layoutClasses = layoutStyles()
  const theme = useTheme()
  // const color = useColor()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam

  const totals = teamMembers && teamMembers.length > 0 ? teamMembers.reduce((accumulator, currentValue) => {
    accumulator.visits += currentValue.visits
    accumulator.uniqueConnectionsCount += (currentValue.uniqueConnectionsCount || 0)
    accumulator.clickedNo += (currentValue.clickedNo || 0)
    return accumulator
  }, { visits: 0, uniqueConnectionsCount: 0, clickedNo: 0 }) : null

  const efficiencyPercentage = totals && totals.visits && totals.visits > 0 ? ((totals.uniqueConnectionsCount * 1 + totals.clickedNo * 0.5) / totals.visits) * 100 : 0

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

  const barChartData = teamMembers.map(member => {
    const memberEfficiencyPercentage = member.visits && member.visits > 0 ? (((member.uniqueConnectionsCount || 0) * 1 + (member.clickedNo || 0) * 0.5) / member.visits) * 100 : 0
    return {
      teamMemberData: member,
      name: `${member.lastName || ''} ${member.firstName || ''}`,
      efficiency: memberEfficiencyPercentage.toFixed(2),
    }
  })

  barChartData.sort((a, b) => b.efficiency - a.efficiency)
  const handleBarClick = memberData => {
    onBarChartClick(memberData.teamMemberData)
  }

  return (
    <Box className={classes.analyticsContainer}>
      <Box className={`${layoutClasses.panel}`}>
        <PageTitle
          title={`${pageStatics.data.titles.teamAnalytics}`}
        />
        <Box>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.teamAnalytics}
          </Typography>
          <Box>
            <>
              {!efficiencyPercentage || (totals.visits && (totals.visits.length < 10 || totals.clickedNo < 2 || totals.uniqueConnectionsCount < 2)) ? (
                <Box mt={2}>
                  <Alert
                    title={pageStatics.data.placeholders.noEnoughData.title}
                    description={pageStatics.data.placeholders.noEnoughEfficiencyData.description}
                    type="warning"
                    noMargin
                  />
                </Box>
              ) : (
                <>
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
                  <Box className={classes.efficiencyChartNumbers}>
                    <Box className={classes.efficiencyChartNumberContainer}>
                      <Typography className={classes.efficiencyChartNumberTitle} variant="body2" color="textSecondary" component="p">
                        {pageStatics.data.titles.visits}
                      </Typography>
                      <Typography className={classes.efficiencyChartNumber} variant="body2" color="textSecondary" component="p">
                        {totals.visits || 0}
                      </Typography>
                    </Box>
                    <Box className={classes.efficiencyChartNumberContainer}>
                      <Typography className={classes.efficiencyChartNumberTitle} variant="body2" color="textSecondary" component="p">
                        {pageStatics.data.titles.addedToContacts}
                      </Typography>
                      <Typography className={classes.efficiencyChartNumber} variant="body2" color="textSecondary" component="p">
                        {totals.clickedNo}
                      </Typography>
                    </Box>
                    <Box className={classes.efficiencyChartNumberContainer}>
                      <Typography className={classes.efficiencyChartNumberTitle} variant="body2" color="textSecondary" component="p">
                        {pageStatics.data.titles.connections}
                      </Typography>
                      <Typography className={classes.efficiencyChartNumber} variant="body2" color="textSecondary" component="p">
                        {totals.uniqueConnectionsCount}
                      </Typography>
                    </Box>
                  </Box>
                </>
              )}
            </>
          </Box>
        </Box>
      </Box>

      <Box className={`${layoutClasses.panel}`}>
        <PageTitle
          title={`${pageStatics.data.titles.teamMembersAnalytics}`}
        />
        <Box>
          <Typography variant="body1" align="left" component="p" className={layoutClasses.panelText}>
            {pageStatics.data.description.teamMembersAnalytics}
          </Typography>
          <Box mt={2}>
            {!efficiencyPercentage || (totals.visits && (totals.visits.length < 10 || totals.clickedNo < 2 || totals.uniqueConnectionsCount < 2)) ? (
              <Alert
                title={pageStatics.data.placeholders.noEnoughData.title}
                description={pageStatics.data.placeholders.noEnoughData.description}
                type="warning"
                noMargin
              />
            ) : (
              <Box className={classes.efficiencyChartContainer} mt={4}>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart isAnimationActive data={barChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={value => `${value}%`} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} />
                    <Tooltip formatter={value => [`${Number(value) % 1 === 0 ? Number(value).toFixed(0) : Number(value).toFixed(2)}%`]} />
                    <Bar dataKey="efficiency" fill="#00C49F" barSize={20} onClick={handleBarClick} />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

TeamReport.defaultProps = {
  teamMembers: null,
}

TeamReport.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onBarChartClick: PropTypes.func.isRequired,
}

export default TeamReport
