import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import { listStyles } from './styles'

import MyTeamCard from './MyTeamCard'
import MyTeamCardSkeleton from './MyTeamCardSkeleton'

const ConnectionsList = ({
  teamMembers, onOpenConnectionsDialog, onOpenTeamMemberAnalyticsDialog, onOpenQrDialog,
  onSetNotification, loadInvitations, onRemoveTeamMember,
}) => {
  const classes = listStyles()

  const createTeamList = () => {
    let connectionsList = []
    if (teamMembers) {
      connectionsList = teamMembers.map(teamMember => (
        <MyTeamCard
          key={teamMember.userId}
          teamMember={teamMember}
          onOpenConnectionsDialog={onOpenConnectionsDialog}
          onOpenTeamMemberAnalyticsDialog={onOpenTeamMemberAnalyticsDialog}
          onOpenQrDialog={onOpenQrDialog}
          // onToggleProfileActivity={onToggleProfileActivity}
          // onRedirectTeamMember={onRedirectTeamMember}
          onSetNotification={onSetNotification}
          loadInvitations={loadInvitations}
          onRemoveTeamMember={onRemoveTeamMember}
        />
      ))
    } else {
      connectionsList = [...Array(12)].map(() => (
        <MyTeamCardSkeleton key={Math.floor(Math.random() * 1000000)} />
      ))
    }

    return connectionsList
  }

  return (
    <div className={classes.root}>
      <List className={classes.connectionsList}>
        {createTeamList()}
      </List>
    </div>
  )
}

ConnectionsList.defaultProps = {
  teamMembers: null,
}

ConnectionsList.propTypes = {
  teamMembers: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onOpenConnectionsDialog: PropTypes.func.isRequired,
  onOpenTeamMemberAnalyticsDialog: PropTypes.func.isRequired,
  // onToggleProfileActivity: PropTypes.func.isRequired,
  // onRedirectTeamMember: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  onOpenQrDialog: PropTypes.func.isRequired,
  loadInvitations: PropTypes.func.isRequired,
  onRemoveTeamMember: PropTypes.func.isRequired,
}

export default ConnectionsList
