import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import { useLanguage } from '../../hooks/useLang'

import { layoutStyles } from '../../theme/layout'
import { buttonStyles } from '../../theme/buttons'
import { profileLinkStyles } from './styles'

import * as actions from '../../store/actions'

const ProfileLink = ({ profileUrl, color, onSetNotification }) => {
  const buttonClasses = buttonStyles()
  const classes = profileLinkStyles()
  const layoutClasses = layoutStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.shareProfile

  const copyUrl = () => {
    onSetNotification({
      message: pageStatics.messages.notifications.urlCopiedSuccess,
      type: 'success',
    })
  }

  return (
    <Box>
      <Box className={classes.profileLink}>
        <Typography variant="body1" component="p" className={classes.profileLinkText}>
          {profileUrl}
        </Typography>
      </Box>
      <Box className={classes.copyUrlContainer} mt={2}>
        <CopyToClipboard
          text={profileUrl}
          onCopy={() => copyUrl()}
          className={`${buttonClasses.defaultButton} ${classes.copyUrlButton} ${layoutClasses.panelButton}`}
          style={{
            backgroundColor: color,
          }}
        >
          <Typography variant="body1" component="p" className={classes.profileLinkButtonText}>
            {pageStatics.buttons.copyUrl}
          </Typography>
        </CopyToClipboard>
      </Box>
    </Box>
  )
}

ProfileLink.defaultProps = {
  profileUrl: null,
  color: null,
}

ProfileLink.propTypes = {
  profileUrl: PropTypes.string,
  color: PropTypes.string,
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(null, mapDispatchToProps)(ProfileLink)
