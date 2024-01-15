import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import TeamInvitationItem from './TeamInvitationItem'

const TeamInvitationsList = ({
  invitations, onSetNotification,
}) => {
  const createInvitationItems = () => invitations.map((invitation, i) => (
    <TeamInvitationItem
      index={i}
      key={invitation.code}
      onSetNotification={onSetNotification}
      invitation={invitation}
    />
  ))

  return (
    <List disablePadding>
      {createInvitationItems()}
    </List>
  )
}

TeamInvitationsList.defaultProps = {
  invitations: null,
}

TeamInvitationsList.propTypes = {
  invitations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onSetNotification: PropTypes.func.isRequired,
}

export default TeamInvitationsList
