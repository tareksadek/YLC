import React from 'react'
import PropTypes from 'prop-types'

import { SortableElement } from 'react-sortable-hoc'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Switch from '@material-ui/core/Switch'

import FormElement from '../../Ui/FormElement'
import DragHandle from './DragHandle'

import { customIcons } from '../../../utilities/utils'

import { socialPlatforms } from '../../../utilities/appVars'

import { useLanguage } from '../../../hooks/useLang'

import { socialLinksStyles } from '../styles'

const SocialLinkItem = ({
  link, existingLink, loading, onLinkChange, onLinkBlur, onLinkToggle,
}) => {
  const classes = socialLinksStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.editProfile

  const socialLinkIndex = socialPlatforms.findIndex(socialPlatfrom => socialPlatfrom.platform === link.platform)
  const socialLinkBackgroundColor = socialPlatforms[socialLinkIndex].color

  return (
    <ListItem className={`${classes.linkItem} ${link.dark && classes.linkItemDark}`} style={{ backgroundColor: socialLinkBackgroundColor }}>
      <DragHandle color={link.dark ? '#000000' : '#ffffff'} />
      <ListItemIcon className={classes.linkItemIcon}>
        {customIcons(link.platform, 'secondary', 'small', null, { color: '#ffffff' })}
      </ListItemIcon>
      <ListItemText
        id={`switchListLabel_${link.platform}`}
        primary={link.platform}
        classes={{
          primary: link.dark ? classes.linkItemPrimaryTextDark : classes.linkItemPrimaryText,
          secondary: link.dark ? classes.linkItemSecondaryTextDark : classes.linkItemSecondaryText,
        }}
        disableTypography={!!(existingLink && existingLink.active)}
        secondary={existingLink && existingLink.active ? (
          <Grid item xs={12}>
            <Box mb={3}>
              <FormElement
                elementType="input"
                label={pageStatics.forms.socialLinks.label}
                value={existingLink ? existingLink.link : ''}
                touched={existingLink.touched}
                valid={existingLink.valid}
                errorMessage={existingLink.errorMessage && existingLink.errorMessage}
                shouldValidate={{ secureLink: true }}
                elementSetup={{ type: 'text', name: 'linkURL', placeholder: pageStatics.forms.socialLinks.label }}
                changed={e => onLinkChange(e, link.platform, { required: false })}
                blured={e => onLinkBlur(e, link.platform, { required: false })}
                grid={{
                  xs: 12,
                  sm: null,
                  md: null,
                  lg: null,
                  xl: null,
                  fullWidth: true,
                }}
                disabled={loading}
              />
            </Box>
          </Grid>
        ) : (pageStatics.forms.socialLinks.disablled)}
      />
      <ListItemSecondaryAction className={`${classes.linkItemSwitch} ${link.dark && classes.linkItemSwitchDark}`}>
        <Switch
          edge="end"
          onChange={onLinkToggle(link.key, link.platform)}
          checked={existingLink ? existingLink.active : false}
          inputProps={{ 'aria-labelledby': `switchListLabel_${link.platform}` }}
        />
      </ListItemSecondaryAction>
    </ListItem>
  )
}

SocialLinkItem.defaultProps = {
  link: null,
  existingLink: null,
  loading: false,
}

SocialLinkItem.propTypes = {
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
  loading: PropTypes.bool,
  onLinkChange: PropTypes.func.isRequired,
  onLinkBlur: PropTypes.func.isRequired,
  onLinkToggle: PropTypes.func.isRequired,
}

export default SortableElement(SocialLinkItem)
