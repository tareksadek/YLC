import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import { listStyles } from './styles'

import InvitationCard from './InvitationCard'
import InvitationCardSkeleton from './InvitationCardSkeleton'

const InvitationsList = ({
  invitations,
  onOpenDetailsDialog,
  onOpenShareDialog,
}) => {
  const classes = listStyles()

  const createUsersList = () => {
    let invitationsList = []
    if (invitations) {
      invitationsList = invitations.map(invitation => (
        <InvitationCard
          key={invitation.code}
          invitation={invitation}
          onOpenDetails={onOpenDetailsDialog}
          onOpenShare={onOpenShareDialog}
        />
      ))
    } else {
      invitationsList = [...Array(12)].map(() => (
        <InvitationCardSkeleton key={Math.floor(Math.random() * 1000000)} />
      ))
    }

    return invitationsList
  }

  return (
    <div className={classes.root}>
      <List className={classes.invitationsList}>
        {createUsersList()}
      </List>
    </div>
  )
}

InvitationsList.defaultProps = {
  invitations: null,
}

InvitationsList.propTypes = {
  invitations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onOpenDetailsDialog: PropTypes.func.isRequired,
  onOpenShareDialog: PropTypes.func.isRequired,
}

export default InvitationsList
