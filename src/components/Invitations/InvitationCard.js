import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Chip from '@material-ui/core/Chip'

import DraftsIcon from '@material-ui/icons/Drafts'
import InfoIcon from '@material-ui/icons/Info'
import FaceIcon from '@material-ui/icons/Face'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import ShareIcon from '@material-ui/icons/Share'

import { useAuth } from '../../hooks/use-auth'
import { useLanguage } from '../../hooks/useLang'

import * as actions from '../../store/actions'

import { invitationStyles } from './styles'

const InvitationCard = ({
  invitation,
  onOpenDetails,
  onOpenShare,
  onSetNotification,
}) => {
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.userInvitations

  const classes = invitationStyles()

  const copyInvitationCode = () => {
    onSetNotification({
      message: pageStatics.messages.notifications.invitationCodeCopiedSuccess,
      type: 'success',
    })
  }

  return (
    <ListItem className={classes.connectionItemContainer}>
      <ListItemAvatar className={classes.connectionItemAvatarContainer}>
        <Avatar className={classes.connectionItemAvatar}>
          <DraftsIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        disableTypography
        className={classes.connectionItemTextContainer}
        primary={(
          <Box className={`${classes.connectionName} ${classes.invitationData} ${invitation.used && classes.usedInvitationData}`}>
            <Typography component="p" variant="body1">
              {`${language.languageVars.appDomain}/activationCode/${invitation.code}`}
              {invitation.used ? (
                <span className={`${classes.usedInvitation} ${classes.invitationLabel}`}>{pageStatics.data.labels.usedInvitation}</span>
              ) : (
                <span className={`${classes.availableInvitation} ${classes.invitationLabel}`}>{pageStatics.data.labels.availableInvitation}</span>
              )}
            </Typography>
          </Box>
        )}
      />
      <ListItemSecondaryAction className={classes.connectionItemActionContainer}>
        {!invitation.used && (
          <>
            <Button
              size="small"
              className={`${classes.connectionItemAction} ${classes.connectionItemNote}`}
              startIcon={<FileCopyIcon />}
            >
              <CopyToClipboard
                text={`${language.languageVars.appDomain}/activationCode/${invitation.code}`}
                onCopy={() => copyInvitationCode()}
              >
                <Typography component="p" variant="body1">
                  {pageStatics.buttons.copyInvitationLink}
                </Typography>
              </CopyToClipboard>
            </Button>
            <Button
              size="small"
              className={`${classes.connectionItemAction} ${classes.connectionItemNote}`}
              startIcon={<ShareIcon />}
              onClick={() => onOpenShare(`${language.languageVars.appDomain}/activationCode/${invitation.code}`)}
            >
              <Typography component="p" variant="body1">
                {pageStatics.buttons.shareInvitationLink}
              </Typography>
            </Button>
          </>
        )}
        {(invitation.used && invitation.usedBy !== auth.user.uid) && (
          <Button
            size="small"
            className={`${classes.connectionItemAction} ${classes.connectionItemNote}`}
            startIcon={<InfoIcon />}
            onClick={() => onOpenDetails(invitation)}
          >
            <Typography component="p" variant="body1">
              {pageStatics.buttons.inviteeInfo}
            </Typography>
          </Button>
        )}
        {
          invitation.usedBy === auth.user.uid && (
            <Chip
              className={classes.yourInvitationChip}
              icon={<FaceIcon />}
              label={pageStatics.data.labels.yourInvitation}
              disabled
            />
          )
        }
      </ListItemSecondaryAction>
    </ListItem>
  )
}

InvitationCard.defaultProps = {
  invitation: null,
}

InvitationCard.propTypes = {
  invitation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onOpenDetails: PropTypes.func.isRequired,
  onOpenShare: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(null, mapDispatchToProps)(InvitationCard)
