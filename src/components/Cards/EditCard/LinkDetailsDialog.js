import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch'

import FormElement from '../../Ui/FormElement'
// import LoadingBackdrop from '../../Loading/LoadingBackdrop'
import NotificationDialog from '../../../layout/NotificationDialog'

import { customIcons } from '../../../utilities/utils'

import { useLanguage } from '../../../hooks/useLang'

import { socialPlatforms } from '../../../utilities/appVars'

// import { buttonStyles } from '../../../theme/buttons'
import { linkDetailsDialogStyles } from '../styles'

const LinkDetailsDialog = ({
  linkData, onLinkChange, onLinkBlur, links, onLinkToggle, onUpdateSocialLinks,
}) => {
  const classes = linkDetailsDialogStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const [linkToggeled, setLinkToggeled] = useState(false)
  const [linkDetailsOpen, setLinkDetailsOpen] = useState(window.location.hash === '#slink')
  const [linkValue, setLinkValue] = useState('')

  // const existingLink = linkData && linkData.existingLink ? linkData.existingLink : null
  const [currentLink] = linkData ? links.filter(linkObj => linkObj.platform === linkData.link.platform) : null
  const socialLinkIndex = linkData ? socialPlatforms.findIndex(socialPlatfrom => socialPlatfrom.platform === linkData.link.platform) : null
  const socialLinkBackgroundColor = socialLinkIndex !== null ? socialPlatforms[socialLinkIndex].color : null
  const isValidLink = currentLink && currentLink !== 'undefined' ? currentLink.valid : false
  const isActive = currentLink ? currentLink.active : false
  const isOriginallyActive = linkData && linkData.savedLink ? linkData.savedLink.originallyActive : false
  const originalValue = linkData && linkData.savedLink ? linkData.savedLink.link : ''
  const isValid = currentLink?.valid || false
  const isSaved = !!linkData.savedLink
  const sameActivityStatus = currentLink && currentLink !== undefined ? isOriginallyActive === currentLink.active : true
  const sameValue = originalValue === linkValue

  let label
  let placeholder

  if (currentLink && currentLink?.active && linkData.link.domain) {
    label = `https://${linkData.link.domain}/${pageStatics.forms.socialLinks.labelActive}`
    placeholder = pageStatics.forms.socialLinks.placeholder
  } else if (currentLink && currentLink?.active && !linkData.link.domain) {
    label = `https://${pageStatics.forms.socialLinks.labelActiveUrl}`
    placeholder = pageStatics.forms.socialLinks.placeholder
  } else {
    label = pageStatics.forms.socialLinks.labelInactive
    placeholder = pageStatics.forms.socialLinks.labelInactive
  }

  // console.log(linkData);
  // console.log(isSaved);
  // console.log(isOriginallyActive);
  // console.log(isActive);
  // console.log(linkToggeled);
  // console.log(existingLink);
  // console.log(currentLink);
  // console.log(originalValue);
  // console.log(currentLink);
  // console.log(linkValue);
  // console.log(sameValue);
  // console.log(!isValidLink);
  // console.log(sameActivityStatus);
  // console.log(sameValue && sameActivityStatus);
  // console.log(socialLinkIndex);
  // console.log(socialPlatforms[socialLinkIndex]);

  useEffect(() => {
    const onHashChange = () => {
      if (currentLink && isSaved) {
        setLinkValue(originalValue)
      }
      if (currentLink && !isSaved && isActive) {
        setLinkValue(originalValue)
        onLinkToggle(linkData.link.key, linkData.link.platform, true)()
      }
      if (isSaved && isOriginallyActive && !isActive) {
        onLinkToggle(linkData.link.key, linkData.link.platform, false)()
      }
      if (isSaved && !isOriginallyActive && isActive) {
        onLinkToggle(linkData.link.key, linkData.link.platform, true)()
      }
      if (isActive && (!isValid || !isSaved)) {
        onLinkToggle(linkData.link.key, linkData.link.platform, true)()
      }
      setLinkDetailsOpen(window.location.hash === '#slink')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [currentLink, isSaved, isActive, isValid, linkData, onLinkToggle, isOriginallyActive, originalValue])

  useEffect(() => {
    if (currentLink) {
      setLinkValue(currentLink?.link || originalValue)
    }
  }, [currentLink, originalValue])

  const closeLinkDetailsDialogHandler = () => {
    setLinkToggeled(false)
    window.history.back();
  }

  const closeDialog = () => {
    closeLinkDetailsDialogHandler()
  }

  const addLink = e => {
    onUpdateSocialLinks(e, currentLink)
    closeLinkDetailsDialogHandler()
  }

  const switchHandler = () => {
    setLinkToggeled(true)
    onLinkToggle(linkData.link.key, linkData.link.platform, false)()
  }

  if (!linkData) {
    return <></>
  }

  return (
    <NotificationDialog
      type="custom"
      background={socialLinkBackgroundColor || '#fff'}
      title={linkData.link.platform}
      titleColor={linkData.link.dark ? '#272727' : '#ffffff'}
      icon={customIcons(linkData.link.platform, 'secondary', 'small', null, { color: linkData.link.dark ? '#272727' : '#ffffff' })}
      loading={!linkData}
      loadingMessage="Processing..."
      open={linkDetailsOpen}
      onClose={() => closeDialog(currentLink?.active || false, currentLink?.valid || false, linkData.link.key, linkData.link.platform)}
      actionOne={{
        clicked: e => addLink(e, currentLink),
        text: pageStatics.buttons.saveSocialLink,
        disabled: !isValidLink || (!isOriginallyActive && sameActivityStatus) || (sameValue && sameActivityStatus),
        borderedButton: true,
        background: linkData.link.dark ? '#272727' : '#ffffff',
        textColor: linkData.link.dark ? '#272727' : '#ffffff',
        // hidden: existingLink ? !existingLink.active : true,
        hidden: (!isActive && !linkToggeled) || false,
      }}
    >
      <Box className={`${classes.dialogContent} ${linkData && linkData.link.dark && classes.linkItemDark}`}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box className={classes.LinkFormSwitchContainer} mb={3}>
              <Typography className={classes.shareButtonText} style={{ color: linkData.link.dark ? '#272727' : '#ffffff' }} component="p" variant="body1">
                {pageStatics.data.tags.activateLink}
              </Typography>
              <Switch
                edge="end"
                onChange={() => switchHandler()}
                checked={currentLink ? currentLink.active : false}
                inputProps={{ 'aria-labelledby': `switchListLabel_${linkData.link.platform}` }}
              />
            </Box>
          </Grid>
          {currentLink && currentLink.active && (
            <>
              <Grid item xs={12}>
                <Box mb={3} className={classes.linkFormContainer}>
                  <FormElement
                    elementType="input"
                    label={label}
                    value={linkValue}
                    touched={currentLink?.touched || false}
                    valid={currentLink?.valid || false}
                    errorMessage={currentLink && currentLink?.active && currentLink?.errorMessage ? currentLink.errorMessage : null}
                    shouldValidate={{ secureLink: true }}
                    elementSetup={{ type: 'text', name: 'linkURL', placeholder }}
                    changed={e => onLinkChange(e, linkData.link.platform, { required: true })}
                    blured={e => onLinkBlur(e, linkData.link.platform, { required: true })}
                    grid={{
                      xs: 12,
                      sm: null,
                      md: null,
                      lg: null,
                      xl: null,
                      fullWidth: true,
                    }}
                    disabled={!currentLink || !currentLink.active}
                  />
                </Box>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </NotificationDialog>
  )
}

LinkDetailsDialog.defaultProps = {
  linkData: null,
  links: null,
}

LinkDetailsDialog.propTypes = {
  onLinkChange: PropTypes.func.isRequired,
  onLinkBlur: PropTypes.func.isRequired,
  onLinkToggle: PropTypes.func.isRequired,
  // onLinkRedirect: PropTypes.func.isRequired,
  linkData: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onUpdateSocialLinks: PropTypes.func.isRequired,
  links: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
}

export default LinkDetailsDialog
