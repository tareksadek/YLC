import React from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'

import SocialLinkItem from './SocialLinkItem'

import { socialPlatforms } from '../../../utilities/appVars'

import { socialLinksViewStyles } from '../styles'

const SocialLinks = ({
  socialLinksOrder, links, colorCode, profileType, countClicks, defaultLinksToTheme,
}) => {
  const classes = socialLinksViewStyles()
  const socialLinksCount = links.filter(link => link.platform !== 'custom' && link.active).length

  return (
    <Box
      className={
        `${classes.viewCardLinksContainer}
         ${socialLinksCount < 7 && classes.socialViewCardLinksContainerCentered}
         ${profileType === 'social' && classes.socialViewCardLinksContainer}
         ${profileType === 'basic' && classes.basicViewCardLinksContainer}`
      }
    >
      {
        socialLinksOrder ? (
          socialLinksOrder.map(socialLink => links.filter(link => link.platform === socialLink.platform && link.platform !== 'custom' && link.active).map(link => (
            <SocialLinkItem
              key={link.key}
              link={link.link}
              linkKey={link.key}
              linkPlatform={link.platform}
              linkActive={link.active}
              profileType={profileType}
              colorCode={colorCode}
              color={socialPlatforms.find(linkItem => linkItem.platform === socialLink.platform).iconColor}
              platform={link.platform}
              countClicks={countClicks}
              defaultLinksToTheme={defaultLinksToTheme}
            />
          )))
        ) : (
          socialPlatforms.map(socialLink => links.filter(link => link.platform === socialLink.platform && link.platform !== 'custom' && link.active).map(link => (
            <SocialLinkItem
              key={link.key}
              link={link.link}
              linkKey={link.key}
              linkPlatform={link.platform}
              linkActive={link.active}
              profileType={profileType}
              colorCode={colorCode}
              color={socialLink.color}
              platform={link.platform}
              countClicks={countClicks}
              defaultLinksToTheme={defaultLinksToTheme}
            />
          )))
        )
      }
    </Box>
  )
}

SocialLinks.defaultProps = {
  links: null,
  socialLinksOrder: null,
  colorCode: null,
  profileType: null,
  defaultLinksToTheme: false,
}

SocialLinks.propTypes = {
  socialLinksOrder: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  links: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  colorCode: PropTypes.string,
  profileType: PropTypes.string,
  countClicks: PropTypes.func.isRequired,
  defaultLinksToTheme: PropTypes.bool,
}

export default SocialLinks
