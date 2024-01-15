import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { SortableContainer } from 'react-sortable-hoc'

import Box from '@material-ui/core/Box'
import List from '@material-ui/core/List'
// import Switch from '@material-ui/core/Switch'
// import Typography from '@material-ui/core/Typography'

import LinkDetailsDialog from './LinkDetailsDialog'

import SocialLinkItemRounded from './SocialLinkItemRounded'

// import { useLanguage } from '../../../hooks/useLang'

import { socialLinksStyles } from '../styles'

const SocialLinksList = ({
  socialLinks, links, onLinkChange, onLinkBlur, onLinkToggle, onLinkRedirect, redirect, defaultLinksToTheme, onUpdateSocialLinks,
  profileLinks, disableActions,
}) => {
  const classes = socialLinksStyles()
  // const language = useLanguage()
  // const pageStatics = language.languageVars.pages.editProfile
  const [linkDetails, setLinkDetails] = useState(null)
  const [open, setOpen] = useState(false)

  const openLinkDeatilsDialogHandler = linkData => {
    if (disableActions) {
      return
    }
    window.location.hash = '#slink'
    setLinkDetails(linkData)
    setOpen(true)
  }
  // const savedLinks = [...links]
  // console.log(links);
  // console.log(savedLinks);
  const createExistingLinks = () => socialLinks.map((link, i) => {
    const currentLink = links.filter(linkObj => linkObj.platform === link.platform)
    const currentSavedLink = profileLinks ? profileLinks.filter(linkObj => linkObj.platform === link.platform) : null
    let existingLink
    let savedLink
    if (currentLink.length > 0) {
      [existingLink] = currentLink
    } else {
      existingLink = null
    }
    if (currentSavedLink && currentSavedLink.length > 0) {
      [savedLink] = currentSavedLink
    } else {
      savedLink = null
    }
    return (
      <SocialLinkItemRounded
        index={i}
        key={link.key}
        link={link}
        existingLink={existingLink}
        savedLink={savedLink}
        onOpenDetails={openLinkDeatilsDialogHandler}
        redirect={redirect}
        defaultLinksToTheme={defaultLinksToTheme}
      />
    )
  })

  return (
    <Box>
      {
      //   <Box className={classes.defaultLinksColorContainer} mb={3}>
      //   <Typography className={classes.defaultLinksCheckboxText} component="p" variant="body1">
      //     {pageStatics.forms.socialLinks.defaultLinksToTheme}
      //   </Typography>
      //   <Switch
      //     checked={defaultLinksToTheme}
      //     onChange={() => onToggleDefaultLinksToTheme()}
      //     name="defaultColor"
      //   />
      // </Box>
      }
      <List className={classes.socialLinksContainer}>
        {createExistingLinks()}
      </List>
      {open && !disableActions && (
        <LinkDetailsDialog
          links={links}
          redirect={redirect}
          linkData={linkDetails}
          onLinkChange={onLinkChange}
          onLinkBlur={onLinkBlur}
          onLinkToggle={onLinkToggle}
          onLinkRedirect={onLinkRedirect}
          onUpdateSocialLinks={onUpdateSocialLinks}
          disableActions={disableActions}
        />
      )}
    </Box>
  )
}

SocialLinksList.defaultProps = {
  links: null,
  profileLinks: null,
  redirect: null,
  socialLinks: null,
  defaultLinksToTheme: false,
  disableActions: false,
}

SocialLinksList.propTypes = {
  links: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  redirect: PropTypes.string,
  socialLinks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onLinkChange: PropTypes.func.isRequired,
  onLinkBlur: PropTypes.func.isRequired,
  onLinkToggle: PropTypes.func.isRequired,
  onLinkRedirect: PropTypes.func.isRequired,
  defaultLinksToTheme: PropTypes.bool,
  onUpdateSocialLinks: PropTypes.func.isRequired,
  profileLinks: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  disableActions: PropTypes.bool,
}

export default SortableContainer(SocialLinksList)
