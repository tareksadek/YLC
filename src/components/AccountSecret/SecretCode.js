import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

import InfoBox from '../Ui/InfoBox'

import { useLanguage } from '../../hooks/useLang'

import { buttonStyles } from '../../theme/buttons'
import { profileLinkStyles } from './styles'

import * as actions from '../../store/actions'

const SecretCode = ({ secretCode, color, onSetNotification }) => {
  const buttonClasses = buttonStyles()
  const classes = profileLinkStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.accountSecret

  const copyUrl = () => {
    onSetNotification({
      message: pageStatics.messages.notifications.codeCopiedSuccess,
      type: 'success',
    })
  }

  return (
    <Box className={classes.profileLinkContainer}>
      <Box mb={3}>
        <InfoBox infoList={[pageStatics.messages.info.general.first, pageStatics.messages.info.general.second]} />
      </Box>
      <Box className={classes.profileLink}>
        <Typography variant="body1" component="p" className={classes.profileLinkText}>
          {secretCode}
        </Typography>
      </Box>
      <Box className={classes.copyUrlContainer} mt={3}>
        <CopyToClipboard
          text={secretCode}
          onCopy={() => copyUrl()}
          className={`${buttonClasses.defaultButton} ${classes.copyUrlButton}`}
          style={{
            backgroundColor: color,
          }}
        >
          <Typography variant="body1" component="p" className={classes.profileLinkButtonText}>
            {pageStatics.buttons.copyCode}
          </Typography>
        </CopyToClipboard>
      </Box>
    </Box>
  )
}

SecretCode.defaultProps = {
  secretCode: null,
  color: null,
}

SecretCode.propTypes = {
  secretCode: PropTypes.string,
  color: PropTypes.string,
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(null, mapDispatchToProps)(SecretCode)
