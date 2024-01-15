import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'

import { customIcons } from '../../utilities/utils'

import { analyticsStyles } from './styles'

const LinkItem = ({
  link, color, platform, clicked, linkTitle,
}) => {
  const classes = analyticsStyles()
  const tiktokPlatformIcon = 'tiktokSocial'
  const socialLinkBackgroundColor = color

  return (
    <ListItem className={`${classes.analyticsLinkItem}`}>
      <ListItemAvatar>
        <Avatar
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
      </ListItemAvatar>
      <ListItemText
        classes={{
          primary: classes.analyticsItemPrimaryText,
          secondary: classes.analyticsItemSecondaryText,
        }}
        primary={(
          <Box className={classes.linkClicksContainer}>
            <Box className={classes.linkClicksPlatform}>
              {linkTitle || platform}
              <span>{link}</span>
            </Box>
            <Box className={classes.linkClicksCount}>
              <span>{clicked}</span>
              <p>{clicked === 1 ? 'click' : 'clicks'}</p>
            </Box>
          </Box>
        )}
      />
    </ListItem>
  )
}

LinkItem.defaultProps = {
  link: null,
  platform: null,
  color: null,
  clicked: null,
  linkTitle: null,
}

LinkItem.propTypes = {
  link: PropTypes.string,
  color: PropTypes.string,
  platform: PropTypes.string,
  clicked: PropTypes.number,
  linkTitle: PropTypes.string,
}

export default LinkItem
