import React from 'react'
import PropTypes from 'prop-types'

import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'

import LabelIcon from '@material-ui/icons/Label'

import { analyticsStyles } from './styles'

const TagItem = ({
  display, count, color,
}) => {
  const classes = analyticsStyles()
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
          <LabelIcon style={{ color: '#ffffff' }} />
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
              {display}
            </Box>
            <Box className={classes.linkClicksCount}>
              <span>{count}</span>
              <p>{count === 1 ? 'connection' : 'connections'}</p>
            </Box>
          </Box>
        )}
      />
    </ListItem>
  )
}

TagItem.defaultProps = {
  display: null,
  color: null,
  count: null,
}

TagItem.propTypes = {
  display: PropTypes.string,
  color: PropTypes.string,
  count: PropTypes.number,
}

export default TagItem
