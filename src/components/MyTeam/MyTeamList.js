import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'

import { DataGrid } from '@mui/x-data-grid'

import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import CircularProgress from '@material-ui/core/CircularProgress'

import MoreVertIcon from '@material-ui/icons/MoreVert'

// import MembersGridToolbar from './GridToolbar'

import { useLanguage } from '../../hooks/useLang'
import { useAuth } from '../../hooks/use-auth'

import { getFirebaseFunctions, getFirebaseStorage } from '../../API/firebase'
import { redirectCard, deleteCardByuserId } from '../../API/cards'
import {
  resetInvitation,
} from '../../API/invitations'
import { deleteUserById } from '../../API/users'

import { gridStyles, connectionStyles } from './styles'

import * as vars from '../../utilities/appVars'

const ConnectionsList = ({
  teamMembers, onOpenConnectionsDialog, onOpenTeamMemberAnalyticsDialog, onOpenQrDialog,
  onSetNotification, loadInvitations, onRemoveTeamMember,
}) => {
  const gridClasses = gridStyles()
  const classes = connectionStyles()
  const history = useHistory()
  const auth = useAuth()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.myTeam

  const [isMasterRedirected, setIsMasterRedirected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [menuUser, setMenuUser] = useState(null)

  const openMenu = (e, userData) => {
    e.stopPropagation()
    setMenuUser(userData)
    setAnchorEl(e.currentTarget)
  }

  const closeViewMenu = e => {
    e.stopPropagation()
    setMenuUser(null)
    setAnchorEl(null)
  }

  const viewTeamMemberProfile = (e, row) => {
    closeViewMenu(e)
    history.push(`/${menuUser ? menuUser.urlSuffix : row.urlSuffix}`)
  }

  const openConnectionsDialog = e => {
    onOpenConnectionsDialog(menuUser)
    closeViewMenu(e)
  }

  const openQrDialog = e => {
    onOpenQrDialog(menuUser)
    closeViewMenu(e)
  }

  const openTeamMemberAnalyticsDialog = e => {
    onOpenTeamMemberAnalyticsDialog(menuUser)
    closeViewMenu(e)
  }

  const redirectTeamMemberHandler = async e => {
    closeViewMenu(e)
    let confirmMessage = pageStatics.messages.confirm.memberRedirect
    let redirectLink = `${language.languageVars.appDomain}/${auth.userUrlSuffix}`
    if (menuUser && !!menuUser.redirect && menuUser.redirect === `${language.languageVars.appDomain}/${auth.userUrlSuffix}`) {
      confirmMessage = pageStatics.messages.confirm.memberRedirectOff
      redirectLink = null
    }
    const confirmBox = window.confirm(confirmMessage)
    if (confirmBox === true) {
      setLoading(true)
      try {
        await redirectCard(menuUser.id, redirectLink)
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

  const resetInvitationHandler = async e => {
    closeViewMenu(e)
    const confirmBox = window.confirm(pageStatics.messages.confirm.resetMember)
    if (confirmBox === true) {
      setLoading(true)
      try {
        const dbFunctions = await getFirebaseFunctions()
        const deleteTeamMemberUserCall = dbFunctions.httpsCallable('deleteTeamMemberUser')
        const memberData = {
          masterId: auth.user.uid,
          memberId: menuUser.userId,
        }
        // console.log(auth.user.uid);
        await deleteUserById(menuUser.userId)
        await deleteCardByuserId(menuUser.userId)
        await deleteTeamMemberUserCall(memberData)

        if (menuUser.image) {
          await getFirebaseStorage().ref(`/profiles/${menuUser.image}`).delete()
        }
        await resetInvitation(menuUser.invitationData.code)
        onRemoveTeamMember(menuUser.userId)
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
    <Box className={gridClasses.gridWrapper}>
      {teamMembers && (
        <DataGrid
          loading={!teamMembers}
          autoHeight
          pageSize={vars.TEAM_MEMBERS_PER_PAGE}
          rows={teamMembers || []}
          getRowId={row => row.id}
          // sortModel={sortModel}
          // onSortModelChange={model => setSortModel(model)}
          // components={{
          //   Toolbar: MembersGridToolbar,
          // }}
          columns={[
            {
              field: 'lastName',
              headerName: 'Member',
              cellClassName: gridClasses.nameCell,
              flex: 1,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewTeamMemberProfile(e, row)}>
                  <Box className={classes.memberCard} display="flex" alignItems="center">
                    <Avatar className={classes.connectionItemAvatar} src={row.logo ? `data:${row.logo.type};base64,${row.logo.code}` : '/assets/images/avatar.svg'} />
                    <Box className={classes.memberName} ml={1}>
                      {`${row.lastName || ''} ${row.firstName || ''}`}
                    </Box>
                  </Box>
                </Box>
              ),
            },
            // {
            //   field: 'email',
            //   headerName: 'E-mail',
            //   cellClassName: gridClasses.nameCell,
            //   minWidth: 150,
            //   renderCell: ({ row }) => (
            //     <Box className={gridClasses.gridNameContainer} onClick={e => viewTeamMemberProfile(e)}>
            //       <Typography className={gridClasses.nameCell} style={{ maxWidth: 'initial' }} component="p" variant="body1">
            //         <span>{row.email}</span>
            //       </Typography>
            //     </Box>
            //   ),
            // },
            {
              field: 'redirect',
              headerName: 'Status',
              cellClassName: gridClasses.nameCell,
              minWidth: 120,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => viewTeamMemberProfile(e, row)}>
                  <Typography className={gridClasses.nameCell} style={{ maxWidth: 'initial' }} component="p" variant="body1">
                    {(!!row.redirect && row.redirect === `${language.languageVars.appDomain}/${auth.userUrlSuffix}`) || isMasterRedirected ? pageStatics.messages.info.memberRedirected : pageStatics.messages.info.memberActive}
                  </Typography>
                </Box>
              ),
            },
            {
              field: '',
              headerName: '',
              felx: 1,
              width: 50,
              sortable: false,
              filterable: false,
              disableColumnMenu: true,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridActionsContainer}>
                  <Box className={gridClasses.gridActionsButtons}>
                    {loading ? (
                      <CircularProgress size={20} />
                    ) : (
                      <IconButton
                        aria-label="settings"
                        className={gridClasses.menuAnchor}
                        aria-haspopup="true"
                        color="secondary"
                        onClick={e => openMenu(e, row)}
                        disabled={false}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={closeViewMenu}
                    classes={{ paper: gridClasses.cardMenu }}
                    PopoverClasses={{ root: gridClasses.connectionMenuPopover }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  >
                    <MenuItem onClick={e => viewTeamMemberProfile(e)} className={classes.cardMenuButton}>{pageStatics.buttons.viewProfile}</MenuItem>
                    <MenuItem onClick={e => openConnectionsDialog(e)} className={classes.cardMenuButton}>{`${pageStatics.buttons.teamMemberConnections}`}</MenuItem>
                    <MenuItem onClick={e => openQrDialog(e)} className={classes.cardMenuButton}>{`${pageStatics.buttons.teamMemberQr}`}</MenuItem>
                    <MenuItem onClick={e => openTeamMemberAnalyticsDialog(e)} className={classes.cardMenuButton}>{pageStatics.buttons.teamMemberAnalytics}</MenuItem>
                    <MenuItem onClick={e => redirectTeamMemberHandler(e)} className={classes.cardMenuButton}>
                      {
                        (menuUser && !!menuUser.redirect && menuUser.redirect === `${language.languageVars.appDomain}/${auth.userUrlSuffix}`) || isMasterRedirected
                          ? pageStatics.buttons.cancelRedirect
                          : pageStatics.buttons.teamMemberRedirect
                      }
                    </MenuItem>
                    <MenuItem onClick={e => resetInvitationHandler(e)} className={classes.cardMenuButton}>{pageStatics.buttons.teamMemberReset}</MenuItem>
                  </Menu>
                </Box>
              ),
            },
          ]}
          onPageChange={() => true}
          className={gridClasses.gridContainer}
          componentsProps={{
            panel: { className: gridClasses.gridPanel },
            columnMenu: { className: gridClasses.columnMenu },
          }}
          getRowClassName={params => `row-${params.getValue(params.id, 'used') ? 'used' : ''}`}
        />
      )}
    </Box>
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
