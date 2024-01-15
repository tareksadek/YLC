import React from 'react'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import FileCopyIcon from '@material-ui/icons/FileCopy'
import EmailIcon from '@material-ui/icons/Email'

import { useLanguage } from '../../hooks/useLang'

import { cleanInvitationCode } from '../../utilities/utils'

import { teamInvitationsStyles } from './styles'

const TeamInvitationItem = ({
  invitation, onSetNotification,
}) => {
  const classes = teamInvitationsStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam
  const activationLink = process.env.NODE_ENV === 'development' ? 'http://localhost:3000/activate?tac=' : `${language.languageVars.appActivationURL}`

  const copyInvitationCode = () => {
    onSetNotification({
      message: language.languageVars.pages.userInvitations.messages.notifications.invitationCodeCopiedSuccess,
      type: 'success',
    })
  }

  return (
    <ListItem
      classes={{
        container: `${classes.linkItemSquare} ${classes.invitationItem}`,
      }}
    >
      <ListItemText
        disableTypography
        id={`switchListLabel_${invitation.code}`}
        primary={(
          <Box className={classes.invitationCopyContainer}>
            <CopyToClipboard
              // text={`${activationLink}${invitation.code}`}
              text={cleanInvitationCode(invitation.code)}
              onCopy={() => copyInvitationCode()}
              className={classes.copyCode}
            >
              <Box>
                <FileCopyIcon className={classes.tableActionIcon} />
                {cleanInvitationCode(invitation.code)}
              </Box>
            </CopyToClipboard>
          </Box>
        )}
      />
      <ListItemSecondaryAction
        className={classes.invitationItemActions}
      >
        {/* eslint-disable-next-line */}
        <a href={`mailto:?subject=${parse(pageStatics.messages.memberEmail.subject)}&body=${encodeURIComponent(parse(pageStatics.messages.memberEmail.body.first))}%0D%0A${encodeURIComponent(cleanInvitationCode(invitation.code))}%0D%0A${encodeURIComponent(pageStatics.messages.memberEmail.body.second)}%0D%0A${parse(pageStatics.messages.memberEmail.body.third)}%0D%0A${activationLink}${invitation.code}`}>
          <EmailIcon />
        </a>
        {/* <a href={`
          mailto:?subject=${parse(pageStatics.messages.memberEmail.subject)}&
          body=${parse(pageStatics.messages.memberEmail.body.first)}
          %0D%0A${cleanInvitationCode(invitation.code)}
          %0D%0A${parse(pageStatics.messages.memberEmail.body.second)}
          %0D%0A${parse(pageStatics.messages.memberEmail.body.third)}
          %0D%0A${activationLink}${invitation.code}
        `}
        >
          <EmailIcon />
        </a> */}
        {/* <a href="mailto:?subject=YoYo&body=hello">
          <EmailIcon />
        </a> */}
      </ListItemSecondaryAction>
    </ListItem>
  )
}

TeamInvitationItem.defaultProps = {
  invitation: null,
}

TeamInvitationItem.propTypes = {
  invitation: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onSetNotification: PropTypes.func.isRequired,
}

export default TeamInvitationItem
