import React from 'react'
import PropTypes from 'prop-types'

import List from '@material-ui/core/List'

import { listStyles } from './styles'

import ConnectionCard from './ConnectionCard'
import ConnectionCardSkeleton from './ConnectionCardSkeleton'

const ConnectionsList = ({
  connections,
  onAdd,
  onRemove,
  onOpenNoteDialog,
  onOpenEditDialog,
  onOpenAssignDialog,
  isFollowList,
  disableRemove,
  disableEdit,
}) => {
  const classes = listStyles()

  const createUsersList = () => {
    let connectionsList = []
    if (connections) {
      connectionsList = connections.map(connection => (
        <ConnectionCard
          key={connection.userId || `${connection.firstName}_${connection.workPhone}`}
          connection={connection}
          onAdd={onAdd}
          onRemove={onRemove}
          onReadNote={onOpenNoteDialog}
          onEditDetails={onOpenEditDialog}
          onAssignTag={onOpenAssignDialog}
          isFollowList={isFollowList}
          disableRemove={disableRemove}
          disableEdit={disableEdit}
        />
      ))
    } else {
      connectionsList = [...Array(12)].map(() => (
        <ConnectionCardSkeleton key={Math.floor(Math.random() * 1000000)} />
      ))
    }

    return connectionsList
  }

  return (
    <div className={classes.root}>
      <List className={classes.connectionsList}>
        {createUsersList()}
      </List>
    </div>
  )
}

ConnectionsList.defaultProps = {
  connections: null,
  isFollowList: false,
  disableRemove: false,
  disableEdit: false,
}

ConnectionsList.propTypes = {
  connections: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onOpenNoteDialog: PropTypes.func.isRequired,
  onOpenEditDialog: PropTypes.func.isRequired,
  onOpenAssignDialog: PropTypes.func.isRequired,
  isFollowList: PropTypes.bool,
  disableRemove: PropTypes.bool,
  disableEdit: PropTypes.bool,
}

export default ConnectionsList
