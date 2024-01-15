import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

import LabelIcon from '@material-ui/icons/Label'

import { analyticsStyles } from './styles'

const TagItemSlider = ({
  display, count, color, maxCount,
}) => {
  const classes = analyticsStyles()

  const tagStyles = makeStyles(() => ({
    railBackground: {
      backgroundColor: color,
    },
  }))
  const tagClasses = tagStyles()

  return (
    <ListItem className={`${classes.analyticsLinkItem}`}>
      <ListItemText
        classes={{
          primary: classes.analyticsItemPrimaryText,
          secondary: classes.analyticsItemSecondaryText,
        }}
        primary={(
          // <Box className={classes.linkClicksContainer}>
          //   <Box className={classes.linkClicksPlatform}>
          //     {display}
          //   </Box>
          //   <Box className={classes.linkClicksCount}>
          //     <span>{count}</span>
          //     <p>{count === 1 ? 'connection' : 'connections'}</p>
          //   </Box>
          // </Box>
          <Box className={classes.linkItemSliderContainer}>
            <Box className={classes.linkItemSlider}>
              <Avatar
                className={classes.linkItemAvatar}
                style={{
                  color: '#ffffff',
                  background: color,
                }}
              >
                <LabelIcon style={{ color: '#ffffff' }} />
              </Avatar>
              <Slider
                classes={{
                  root: classes.envImpactRoot,
                  thumb: classes.envImpactThumb,
                  active: classes.envImpactActive,
                  valueLabel: classes.envImpactValueLabel,
                  track: `${classes.envImpactTrack} ${tagClasses.railBackground}`,
                  rail: `${classes.envImpactRail}`,
                  mark: classes.envImpactMark,
                  markLabel: classes.envImpactMarkLabel,
                }}
                value={count}
                aria-labelledby={display}
                step={1000}
                min={0}
                max={maxCount}
                disabled
                valueLabelDisplay="on"
              />
            </Box>
            <Typography variant="body1" className={classes.linkItemSliderLink} style={{ textTransform: 'capitalize' }}>{display}</Typography>
          </Box>
        )}
      />
    </ListItem>
  )
}

TagItemSlider.defaultProps = {
  display: null,
  color: null,
  count: null,
  maxCount: null,
}

TagItemSlider.propTypes = {
  display: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.number,
  maxCount: PropTypes.number,
}

export default TagItemSlider
