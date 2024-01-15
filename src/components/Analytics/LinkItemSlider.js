import React from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'
import Slider from '@material-ui/core/Slider'
import Typography from '@material-ui/core/Typography'

import { customIcons } from '../../utilities/utils'

import { analyticsStyles } from './styles'

const LinkItemSlider = ({
  link, color, platform, clicked, linkTitle, maxClicked,
}) => {
  const classes = analyticsStyles()
  const tiktokPlatformIcon = 'tiktokSocial'
  const socialLinkBackgroundColor = color

  const linksStyles = makeStyles(() => ({
    railBackground: {
      backgroundColor: color,
    },
  }))
  const linksClasses = linksStyles()

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
          //     {linkTitle || platform}
          //     <span>{link}</span>
          //   </Box>
          //   <Box className={classes.linkClicksCount}>
          //     <span>{clicked}</span>
          //     <p>{clicked === 1 ? 'click' : 'clicks'}</p>
          //   </Box>
          // </Box>
          <Box className={classes.linkItemSliderContainer}>
            <Box className={classes.linkItemSlider}>
              <Avatar
                className={classes.linkItemAvatar}
                style={{
                  color: '#ffffff',
                  background: socialLinkBackgroundColor,
                }}
              >
                {customIcons(platform === 'tiktok' ? tiktokPlatformIcon : platform, 'primary', 'small', null, {
                  color: '#ffffff',
                  fontSize: 20,
                  stroke: platform === 'snapchat' ? '#272727' : 'none',
                })}
              </Avatar>
              <Slider
                classes={{
                  root: classes.envImpactRoot,
                  thumb: classes.envImpactThumb,
                  active: classes.envImpactActive,
                  valueLabel: classes.envImpactValueLabel,
                  track: `${classes.envImpactTrack} ${linksClasses.railBackground}`,
                  rail: `${classes.envImpactRail}`,
                  mark: classes.envImpactMark,
                  markLabel: classes.envImpactMarkLabel,
                }}
                value={clicked}
                aria-labelledby={linkTitle || platform}
                step={1000}
                min={0}
                max={maxClicked}
                disabled
                valueLabelDisplay="on"
              />
            </Box>
            <Typography variant="body1" className={classes.linkItemSliderLink}>{link}</Typography>
          </Box>
        )}
      />
    </ListItem>
  )
}

LinkItemSlider.defaultProps = {
  link: null,
  platform: null,
  color: null,
  clicked: null,
  linkTitle: null,
  maxClicked: null,
}

LinkItemSlider.propTypes = {
  link: PropTypes.string,
  color: PropTypes.string,
  platform: PropTypes.string,
  clicked: PropTypes.number,
  linkTitle: PropTypes.string,
  maxClicked: PropTypes.number,
}

export default LinkItemSlider
