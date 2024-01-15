import React from 'react'
import PropTypes from 'prop-types'

import { SortableElement } from 'react-sortable-hoc'

import ListItem from '@material-ui/core/ListItem'
// import Badge from '@material-ui/core/Badge'

import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import LinkIcon from '@material-ui/icons/Link'
import { customIcons } from '../../../utilities/utils'

import { useColor } from '../../../hooks/useDarkMode'

import { socialPlatforms } from '../../../utilities/appVars'

import { socialLinksStyles } from '../styles'

const SocialLinkItemRounded = ({
  link, existingLink, savedLink, onOpenDetails, redirect, defaultLinksToTheme,
}) => {
  const classes = socialLinksStyles()
  const color = useColor()

  const socialLinkIndex = socialPlatforms.findIndex(socialPlatfrom => socialPlatfrom.platform === link.platform)
  const socialLinkBackgroundColor = socialPlatforms[socialLinkIndex].color

  return (
    <ListItem
      className={`${classes.linkItem} ${link.dark && classes.linkItemDark} ${(!existingLink || !existingLink.active || !existingLink.valid || !existingLink.link) && classes.disabledItem}`}
      onClick={() => onOpenDetails({ link, existingLink, savedLink })}
      style={{ backgroundColor: defaultLinksToTheme ? color.color.code : socialLinkBackgroundColor }}
    >
      {
        // <Badge
        //   badgeContent={existingLink && existingLink.clicked ? existingLink.clicked : 0}
        //   showZero
        //   max={999}
        //   className={classes.linkItemBadge}
        //   classes={{
        //     root: classes.linkItemBadge,
        //   }}
        // />
      }
      {redirect && existingLink && redirect === existingLink.link && (
        <span className={classes.redirectStatus}>
          <SwapHorizIcon />
        </span>
      )}
      {existingLink && existingLink.link && !existingLink.active && (
        <span className={classes.redirectStatus}>
          <LinkIcon />
        </span>
      )}
      {customIcons(
        link.platform,
        'secondary',
        'small',
        null,
        { color: `${existingLink && existingLink.active ? '#ffffff' : '#dddddd'}`, stroke: link.platform === 'snapchat' && existingLink && existingLink.active ? '#272727' : 'none' },
      )}
    </ListItem>
  )
}

SocialLinkItemRounded.defaultProps = {
  link: null,
  existingLink: null,
  savedLink: null,
  redirect: null,
  defaultLinksToTheme: false,
}

SocialLinkItemRounded.propTypes = {
  link: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  existingLink: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  savedLink: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onOpenDetails: PropTypes.func.isRequired,
  redirect: PropTypes.string,
  defaultLinksToTheme: PropTypes.bool,
}

export default SortableElement(SocialLinkItemRounded)
