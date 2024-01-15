import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import { customLinksStyles } from '../styles'

const CustomLinks = ({
  links, profileType, countClicks, colorCode,
}) => {
  const classes = customLinksStyles()

  const countLinkClicks = (link, linkKey, linkPlatform, linkActive) => {
    countClicks(link, linkKey, linkPlatform, linkActive)
    window.open(link, '_blank')
  }

  return (
    <Box className={classes.viewCardData}>
      <List className={`${classes.linksContainer} ${profileType === 'business' ? classes.linksContainerBusiness : ''}`} component="div">
        {
          links.filter(link => link.platform === 'custom').map(link => (
            <ListItem
              button
              key={link.key}
              className={`${classes.link} ${classes.linkItem} ${profileType === 'social' && classes.socialLink} ${profileType === 'business' ? classes.businessLink : ''} ${profileType === 'basic' ? classes.basicLink : ''}`}
              onClick={() => countLinkClicks(link.link, link.key, link.platform, link.active)}
              style={{
                borderColor: colorCode,
                color: colorCode,
              }}
            >
              <ListItemText
                id={`switchListLabel_${link.linkType}`}
                primary={link.linkTitle !== '' ? link.linkTitle : link.linkType}
              />
              <Box className={classes.linkArrow}>
                <ArrowForwardIosIcon style={{ color: colorCode }} />
              </Box>
            </ListItem>
          ))
        }
      </List>
    </Box>
  )
}

CustomLinks.defaultProps = {
  links: null,
  profileType: null,
  colorCode: null,
}

CustomLinks.propTypes = {
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  profileType: PropTypes.string,
  countClicks: PropTypes.func.isRequired,
  colorCode: PropTypes.string,
}

export default CustomLinks
