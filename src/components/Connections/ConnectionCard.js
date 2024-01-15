import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'

import Skeleton from '@material-ui/lab/Skeleton'

import { getCardById } from '../../API/cards'

import { layoutStyles } from '../../theme/layout'
import { connectionStyles } from './styles'

const ConnectionCard = ({
  connection,
  onAdd,
  onRemove,
  onReadNote,
  onEditDetails,
  onAssignTag,
  isFollowList,
  disableRemove,
  disableEdit,
}) => {
  const classes = connectionStyles()
  const layoutClasses = layoutStyles()

  const [connectionMenuAnchor, setConnectionMenuAnchor] = useState(null)
  const [followerCard, setFollowerCard] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let mounted = true
    if (isFollowList && !followerCard) {
      setLoading(true)
      if (mounted) {
        (async () => {
          const followerCardData = await getCardById(connection.userId)
          setFollowerCard(followerCardData)
          setLoading(false)
        })()
      }
    }
    return () => { mounted = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, isFollowList])

  const openConnectionMenu = e => {
    e.stopPropagation()
    setConnectionMenuAnchor(e.currentTarget)
  }

  const closeConnectionMenu = e => {
    e.stopPropagation()
    setConnectionMenuAnchor(null)
  }

  const viewDetails = (e, connectionData) => {
    closeConnectionMenu(e)
    onReadNote(connectionData)
  }

  const editDetails = (e, connectionData) => {
    closeConnectionMenu(e)
    onEditDetails(connectionData)
  }

  const assignTag = (e, connectionData) => {
    closeConnectionMenu(e)
    onAssignTag(connectionData)
  }

  const addToContacts = (e, vCard) => {
    closeConnectionMenu(e)
    onAdd(vCard)
  }

  const removeConnection = (e, connectionData) => {
    closeConnectionMenu(e)
    onRemove(connectionData)
  }

  let followerAvatar

  if (followerCard) {
    followerAvatar = followerCard.base64Photo ? `data:${followerCard.base64Photo.type};base64,${followerCard.base64Photo.code}` : '/assets/images/avatar.svg'
  } else {
    followerAvatar = connection.base64Photo ? `data:${connection.base64Photo.type};base64,${connection.base64Photo.code}` : '/assets/images/avatar.svg'
  }

  return (
    <ListItem className={classes.connectionItemContainer}>
      {loading ? (
        <Box className={classes.FollowerSkeleton}>
          <Skeleton className={layoutClasses.skeleton} animation="wave" variant="circle" width={40} height={40} />
          <Skeleton className={layoutClasses.skeleton} animation="wave" height={15} width="30%" style={{ marginLeft: 8 }} />
        </Box>
      ) : (
        <>
          <ListItemAvatar className={classes.connectionItemAvatarContainer}>
            <Avatar className={classes.connectionItemAvatar} src={followerAvatar} />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            className={classes.connectionItemTextContainer}
            primary={(
              <Box className={classes.connectionName}>
                <Typography component="p" variant="body1" className={classes.connectionNameText}>
                  {followerCard ? `${followerCard.firstName} ${followerCard.lastName}` : `${connection.firstName} ${connection.lastName}`}
                </Typography>
              </Box>
            )}
            secondary={(
              <Box className={classes.connectionDetails}>
                <Typography component="p" variant="body1">
                  {followerCard ? followerCard.workPhone : connection.workPhone}
                </Typography>
              </Box>
            )}
          />
          <ListItemSecondaryAction className={classes.connectionItemActionContainer}>
            <IconButton aria-label="edit" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={e => openConnectionMenu(e)}>
              <MoreVertIcon color="secondary" fontSize="small" />
            </IconButton>
            <Menu
              id="profile-menu"
              anchorEl={connectionMenuAnchor}
              keepMounted
              open={Boolean(connectionMenuAnchor)}
              onClose={closeConnectionMenu}
              classes={{ paper: layoutClasses.menu }}
              PopoverClasses={{ root: classes.connectionMenuPopover }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {isFollowList && (
                <MenuItem onClick={e => viewDetails(e, followerCard.urlSuffix)} className={classes.cardMenuButton}>View profile</MenuItem>
              )}
              {!isFollowList && (
                <MenuItem onClick={e => viewDetails(e, connection)} className={classes.cardMenuButton}>View details</MenuItem>
              )}
              {!isFollowList && !disableEdit && (
                <MenuItem onClick={e => editDetails(e, connection)} className={classes.cardMenuButton}>Edit details</MenuItem>
              )}
              {!isFollowList && !disableEdit && (
                <MenuItem onClick={e => assignTag(e, connection)} className={classes.cardMenuButton}>Assign label</MenuItem>
              )}
              <MenuItem onClick={e => addToContacts(e, connection)} className={classes.cardMenuButton}>Add to contacts</MenuItem>
              {!disableRemove && (
                <MenuItem onClick={e => removeConnection(e, connection)} className={classes.cardMenuButton}>{isFollowList ? 'Unfollow' : 'Delete'}</MenuItem>
              )}
            </Menu>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  )
}

ConnectionCard.defaultProps = {
  connection: null,
  isFollowList: false,
  disableRemove: false,
  disableEdit: false,
}

ConnectionCard.propTypes = {
  connection: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onReadNote: PropTypes.func.isRequired,
  onEditDetails: PropTypes.func.isRequired,
  onAssignTag: PropTypes.func.isRequired,
  isFollowList: PropTypes.bool,
  disableRemove: PropTypes.bool,
  disableEdit: PropTypes.bool,
}

export default ConnectionCard
