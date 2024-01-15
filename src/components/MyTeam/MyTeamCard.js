import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Skeleton from '@material-ui/lab/Skeleton'
import Tooltip from '@material-ui/core/Tooltip'
import CircularProgress from '@material-ui/core/CircularProgress'

import ShuffleIcon from '@material-ui/icons/Shuffle'
import LockIcon from '@material-ui/icons/Lock'

import Chip from '@material-ui/core/Chip'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import BlockIcon from '@material-ui/icons/Block'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import { getFirebaseFunctions, getFirebaseStorage } from '../../API/firebase'
import { toggleMemberLock, redirectCard, deleteCardByuserId } from '../../API/cards'
import {
  resetInvitation,
} from '../../API/invitations'
import { deleteUserById } from '../../API/users'

import { layoutStyles } from '../../theme/layout'
import { connectionStyles } from './styles'

const MyTeamCard = ({
  teamMember, onOpenConnectionsDialog, onOpenTeamMemberAnalyticsDialog,
  onSetNotification, onOpenQrDialog, loadInvitations, onRemoveTeamMember,
}) => {
  const classes = connectionStyles()
  const layoutClasses = layoutStyles()
  const history = useHistory()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam
  const profileActive = teamMember.settings.active === undefined || teamMember.settings.active
  const isRedirected = !!teamMember.redirect && teamMember.redirect === `${language.languageVars.appDomain}/${auth.userUrlSuffix}`

  const [connectionMenuAnchor, setConnectionMenuAnchor] = useState(null)
  const [isMasterLocked, setIsMasterLocked] = useState(teamMember.masterLocked || false)
  const [isMasterRedirected, setIsMasterRedirected] = useState(isRedirected || false)
  const [loading, setLoading] = useState(false)

  // console.log(teamMember);

  const viewTeamMemberProfile = () => {
    history.push(`/${teamMember.urlSuffix}`)
  }

  const openConnectionMenu = e => {
    e.stopPropagation()
    setConnectionMenuAnchor(e.currentTarget)
  }

  const closeConnectionMenu = e => {
    e.stopPropagation()
    setConnectionMenuAnchor(null)
  }

  const openTeamMemberAnalyticsDialog = (e, member) => {
    closeConnectionMenu(e)
    onOpenTeamMemberAnalyticsDialog(member)
  }

  const viewMemberProfile = e => {
    closeConnectionMenu(e)
    viewTeamMemberProfile()
  }

  const openConnectionsDialog = (e, member) => {
    closeConnectionMenu(e)
    onOpenConnectionsDialog(member)
  }

  const openQrDialog = (e, member) => {
    closeConnectionMenu(e)
    onOpenQrDialog(member)
  }

  // const toggleProfileActivity = (e, teamMemberId, profileActivity) => {
  //   closeConnectionMenu(e)
  //   console.log(profileActivity);
  //   setIsMasterLocked(!profileActivity)
  //   onToggleProfileActivity(teamMemberId, profileActivity)
  // }

  // const redirectTeamMember = (e, memberId, memberRedirect) => {
  //   closeConnectionMenu(e)
  //   onRedirectTeamMember(memberId, memberRedirect)
  // }

  const redirectTeamMemberHandler = async (e, memberId) => {
    closeConnectionMenu(e)
    let confirmMessage = pageStatics.messages.confirm.memberRedirect
    let redirectLink = `${language.languageVars.appDomain}/profile/${auth.userUrlSuffix}`
    if (isMasterRedirected) {
      confirmMessage = pageStatics.messages.confirm.memberRedirectOff
      redirectLink = null
    }
    const confirmBox = window.confirm(confirmMessage)
    if (confirmBox === true) {
      setLoading(true)
      try {
        await redirectCard(memberId, redirectLink)
        setIsMasterRedirected(prevState => !prevState)
        onSetNotification({
          message: pageStatics.messages.notifications.memberRedirectSuccess,
          type: 'success',
        })
      } catch (err) {
        onSetNotification({
          message: pageStatics.messages.notifications.memberRedirectError,
          type: 'error',
        })
      }
      setLoading(false)
    }
  }

  const toggleProfileActivityHandler = async (e, profileId) => {
    closeConnectionMenu(e)
    const confirMessage = isMasterLocked ? pageStatics.messages.confirm.cancelDeactivate : pageStatics.messages.confirm.confirmDeactivate
    const confirmBox = window.confirm(confirMessage)
    if (confirmBox) {
      setLoading(true)
      try {
        await toggleMemberLock(profileId, !isMasterLocked)
        setIsMasterLocked(prevState => !prevState)
        onSetNotification({
          message: isMasterLocked ? pageStatics.messages.notifications.cancelBlockSuccess : pageStatics.messages.notifications.blockSuccess,
          type: 'success',
        })
      } catch (err) {
        onSetNotification({
          message: isMasterLocked ? pageStatics.messages.notifications.cancelBlockError : pageStatics.messages.notifications.blockError,
          type: 'error',
        })
      }
      setLoading(false)
    }
  }

  const resetInvitationHandler = async e => {
    closeConnectionMenu(e)
    const confirmBox = window.confirm(pageStatics.messages.confirm.resetMember)
    if (confirmBox === true) {
      setLoading(true)
      try {
        const dbFunctions = await getFirebaseFunctions()
        const deleteTeamMemberUserCall = dbFunctions.httpsCallable('deleteTeamMemberUser')
        const memberData = {
          masterId: auth.user.uid,
          memberId: teamMember.userId,
        }
        // console.log(auth.user.uid);
        await deleteUserById(teamMember.userId)
        await deleteCardByuserId(teamMember.userId)
        await deleteTeamMemberUserCall(memberData)

        if (teamMember.image) {
          await getFirebaseStorage().ref(`/profiles/${teamMember.image}`).delete()
        }
        await resetInvitation(teamMember.invitationData.code)
        onRemoveTeamMember(teamMember.userId)
        loadInvitations()
        setLoading(false)
        onSetNotification({
          message: pageStatics.messages.notifications.resetMemberAccountSuccess,
          type: 'success',
        })
      } catch (err) {
        setLoading(false)
        onSetNotification({
          message: pageStatics.messages.notifications.resetMemberAccountError,
          type: 'error',
        })
      }
    }
  }

  return (
    <ListItem className={classes.connectionItemContainer}>
      {!teamMember ? (
        <Box className={classes.FollowerSkeleton}>
          <Skeleton className={layoutClasses.skeleton} animation="wave" variant="circle" width={40} height={40} />
          <Skeleton className={layoutClasses.skeleton} animation="wave" height={15} width="30%" style={{ marginLeft: 8 }} />
        </Box>
      ) : (
        <>
          <ListItemAvatar className={classes.connectionItemAvatarContainer}>
            <Avatar className={classes.connectionItemAvatar} src={teamMember.logo ? `data:${teamMember.logo.type};base64,${teamMember.logo.code}` : '/assets/images/avatar.svg'} />
          </ListItemAvatar>
          <ListItemText
            disableTypography
            className={classes.connectionItemTextContainer}
            primary={(
              <Box className={classes.connectionName}>
                <Typography component="p" variant="body1" className={classes.connectionNameText}>
                  {`${teamMember.firstName} ${teamMember.lastName}`}
                </Typography>
                {isMasterRedirected && (
                  <Chip
                    size="small"
                    icon={<ShuffleIcon />}
                    label={pageStatics.data.titles.redirectChip}
                    className={classes.redirectChip}
                  />
                )}
                {isMasterLocked && (
                  <Chip
                    size="small"
                    icon={<LockIcon />}
                    label={pageStatics.data.titles.lockChip}
                    className={classes.lockChip}
                  />
                )}
              </Box>
            )}
          />
          <ListItemSecondaryAction className={classes.connectionItemActionContainer}>
            {!profileActive && <Tooltip title={pageStatics.messages.info.inactiveProfile.tooltip} placement="top"><BlockIcon className={classes.inactiveIcon} /></Tooltip>}
            {loading ? (
              <CircularProgress size={20} />
            ) : (
              <IconButton aria-label="edit" className={classes.menuAnchor} aria-haspopup="true" color="secondary" onClick={e => openConnectionMenu(e)}>
                <MoreVertIcon color="secondary" fontSize="small" />
              </IconButton>
            )}
            <Menu
              id="profile-menu"
              anchorEl={connectionMenuAnchor}
              keepMounted
              open={Boolean(connectionMenuAnchor)}
              onClose={closeConnectionMenu}
              classes={{ paper: layoutClasses.menu }}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={e => viewMemberProfile(e)} className={classes.cardMenuButton}>{pageStatics.buttons.viewProfile}</MenuItem>
              <MenuItem onClick={e => openConnectionsDialog(e, teamMember)} className={classes.cardMenuButton}>{`${pageStatics.buttons.teamMemberConnections}`}</MenuItem>
              <MenuItem onClick={e => openQrDialog(e, teamMember)} className={classes.cardMenuButton}>{`${pageStatics.buttons.teamMemberQr}`}</MenuItem>
              <MenuItem onClick={e => openTeamMemberAnalyticsDialog(e, teamMember)} className={classes.cardMenuButton}>{pageStatics.buttons.teamMemberAnalytics}</MenuItem>
              <MenuItem onClick={e => redirectTeamMemberHandler(e, teamMember.id)} className={classes.cardMenuButton}>
                {isMasterRedirected ? pageStatics.buttons.cancelRedirect : pageStatics.buttons.teamMemberRedirect}
              </MenuItem>
              <MenuItem
                onClick={e => toggleProfileActivityHandler(e, teamMember.userId)}
                className={classes.cardMenuButton}
              >
                {isMasterLocked ? pageStatics.buttons.activateProfile : pageStatics.buttons.deactivateProfile}
              </MenuItem>
              <MenuItem onClick={e => resetInvitationHandler(e)} className={classes.cardMenuButton}>{pageStatics.buttons.teamMemberReset}</MenuItem>
            </Menu>
          </ListItemSecondaryAction>
        </>
      )}
    </ListItem>
  )
}

MyTeamCard.defaultProps = {
  teamMember: null,
}

MyTeamCard.propTypes = {
  teamMember: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ])),
  onOpenConnectionsDialog: PropTypes.func.isRequired,
  onOpenTeamMemberAnalyticsDialog: PropTypes.func.isRequired,
  onOpenQrDialog: PropTypes.func.isRequired,
  // onToggleProfileActivity: PropTypes.func.isRequired,
  // onRedirectTeamMember: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
  loadInvitations: PropTypes.func.isRequired,
  onRemoveTeamMember: PropTypes.func.isRequired,
}

export default MyTeamCard
