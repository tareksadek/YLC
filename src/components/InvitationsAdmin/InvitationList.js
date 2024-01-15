import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { format } from 'date-fns'

import { DataGrid } from '@mui/x-data-grid'

import { CopyToClipboard } from 'react-copy-to-clipboard'

import Box from '@material-ui/core/Box'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import MoreVertIcon from '@material-ui/icons/MoreVert'
import GradeIcon from '@material-ui/icons/Grade'
import StarIcon from '@material-ui/icons/Star'

import InvitationsGridToolbar from './GridToolbar'

import { useLanguage } from '../../hooks/useLang'

import { gridStyles } from './styles'

import * as actions from '../../store/actions'

import { cleanInvitationCode } from '../../utilities/utils'
import * as vars from '../../utilities/appVars'

const InvitationList = ({
  invitations, deleteInvitation, onOpenDetailsDialog, onSetNotification,
}) => {
  const gridClasses = gridStyles()
  const language = useLanguage()
  const pageStatics = language.languageVars.pages.patches

  const [anchorEl, setAnchorEl] = useState(null)
  const [menuUser, setMenuUser] = useState(null)
  // const [sortModel, setSortModel] = useState([
  //   {
  //     field: 'masterId',
  //     sort: 'asc',
  //   },
  // ]);

  const invitationDomain = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : `${language.languageVars.appDomain}`

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

  const openDialogue = e => {
    closeViewMenu(e)
    onOpenDetailsDialog(menuUser)
  }

  const removeInvitation = e => {
    closeViewMenu(e)
    if (menuUser.used) {
      return
    }
    deleteInvitation(menuUser.code)
  }

  const copyInvitationCode = () => {
    setMenuUser(null)
    setAnchorEl(null)
    onSetNotification({
      message: language.languageVars.pages.userInvitations.messages.notifications.invitationCodeCopiedSuccess,
      type: 'success',
    })
  }

  return (
    <Box className={gridClasses.gridWrapper}>
      {invitations && (
        <DataGrid
          loading={!invitations}
          autoHeight
          pageSize={vars.INVITATIONS_PER_PAGE}
          rows={invitations || []}
          getRowId={row => row.code}
          // sortModel={sortModel}
          // onSortModelChange={model => setSortModel(model)}
          components={{
            Toolbar: InvitationsGridToolbar,
          }}
          columns={[
            {
              field: 'masterId',
              headerName: 'Type',
              cellClassName: gridClasses.nameCell,
              minWidth: 120,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => openDialogue(e)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{row.masterInvitationId ? 'Member' : 'Master'}</span>
                    {!row.masterInvitationId && <GradeIcon style={{ fontSize: 14, color: '#ffb200' }} />}
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'used',
              headerName: 'Status',
              cellClassName: gridClasses.nameCell,
              minWidth: 120,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => openDialogue(e)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    {row.used ? (
                      <span>Used</span>
                    ) : (
                      <span>Available</span>
                    )}
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'usedOn',
              headerName: 'Used on',
              cellClassName: gridClasses.nameCell,
              minWidth: 150,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => openDialogue(e)}>
                  <Typography className={gridClasses.nameCell} component="p" variant="body1">
                    <span>{row.used && row.usedOn ? format(new Date(row.usedOn.seconds ? row.usedOn.toDate() : row.usedOn).getTime(), 'MMM dd, yyyy') : 'NA'}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'code',
              headerName: 'Code',
              cellClassName: gridClasses.nameCell,
              flex: 1,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => openDialogue(e)}>
                  <Typography className={gridClasses.nameCell} style={{ maxWidth: 'initial' }} component="p" variant="body1">
                    <span>{row.code}</span>
                  </Typography>
                </Box>
              ),
            },
            {
              field: 'alwaysPro',
              headerName: 'Type',
              cellClassName: gridClasses.nameCell,
              flex: 1,
              renderCell: ({ row }) => (
                <Box className={gridClasses.gridNameContainer} onClick={e => openDialogue(e)}>
                  <Typography className={gridClasses.nameCell} style={{ maxWidth: 'initial' }} component="p" variant="body1">
                    {row.alwaysPro ? (
                      <span>
                        <StarIcon style={{ color: '#ffb100' }} />
                        Bypass
                      </span>
                    ) : (
                      <span>
                        Default
                      </span>
                    )}
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
                    <CopyToClipboard
                      text={`${invitationDomain}/activate?tac=${menuUser && menuUser.code}`}
                      onCopy={e => copyInvitationCode(e)}
                    >
                      <MenuItem className={gridClasses.cardMenuButton}>{pageStatics.buttons.invitationsMenu.copyLinkToClipboard}</MenuItem>
                    </CopyToClipboard>
                    <CopyToClipboard
                      text={menuUser && menuUser.code && cleanInvitationCode(menuUser.code)}
                      onCopy={e => copyInvitationCode(e)}
                    >
                      <MenuItem className={gridClasses.cardMenuButton}>{pageStatics.buttons.invitationsMenu.copyCodeToClipboard}</MenuItem>
                    </CopyToClipboard>
                    <MenuItem disabled={menuUser && !menuUser.used} onClick={e => openDialogue(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.invitationsMenu.viewAndReset}</MenuItem>
                    <MenuItem disabled={menuUser && menuUser.used} onClick={e => removeInvitation(e)} className={gridClasses.cardMenuButton}>{pageStatics.buttons.invitationsMenu.remove}</MenuItem>
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

  // <Box className={classes.tableContainer}>
  //   <TableContainer>
  //     <Table className={classes.table} aria-label="simple table">
  //       <TableHead>
  //         <TableRow>
  //           <TableCell>Code</TableCell>
  //           <TableCell align="left">Status</TableCell>
  //           <TableCell align="left">Device</TableCell>
  //           <TableCell align="left">Actions</TableCell>
  //         </TableRow>
  //       </TableHead>
  //       <TableBody>
  //         {invitations && invitations.map(invitation => (
  //           <TableRow key={invitation.code} className={copiedCode === invitation.code ? classes.copiedRow : ''}>
  //             <TableCell component="th" scope="row">
  //               {!invitation.used && !invitation.connected ? (
  //                 <CopyToClipboard
  //                   text={`${invitationDomain}/activate?tac=${invitation.code}`}
  //                   onCopy={() => copyInvitationCode(invitation.code)}
  //                   className={classes.copyCode}
  //                 >
  //                   <Box>
  //                     {invitation.type === 'master' && (<b>Master</b>)}
  //                     <br />
  //                     <FileCopyIcon className={classes.tableActionIcon} />
  //                     {invitation.code}
  //                   </Box>
  //                 </CopyToClipboard>
  //               ) : (
  //                 <Box>
  //                   {invitation.type === 'master' && (<b>Master</b>)}
  //                   <br />
  //                   {invitation.code}
  //                 </Box>
  //               )}
  //             </TableCell>
  //             <TableCell align="left">
  //               {isValid(invitation) === 'Used' ? (
  //                 <span className={`${classes.invitationConnectedLabel} ${classes.invitationLabel}`}>Used</span>
  //               ) : (
  //                 <span className={`${classes.invitationLabel}`}>Available</span>
  //               )}
  //             </TableCell>
  //             {
  //               // <TableCell align="left">{format(invitation.expirationDate.toDate(), 'MMMM d, y')}</TableCell>
  //               // <TableCell align="left">{invitation.package}</TableCell>
  //             }
  //             <TableCell align="left">
  //               {invitation.connected ? (
  //                 <span className={`${classes.invitationConnectedLabel} ${classes.invitationLabel}`}>Connected</span>
  //               ) : (
  //                 <span className={`${classes.invitationUnlinkedLabel} ${classes.invitationLabel}`}>unlinked</span>
  //               )}
  //             </TableCell>
  //             <TableCell align="left">
  //               {invitation.used && (
  //                 <IconButton onClick={() => onOpenDetailsDialog(invitation)}>
  //                   <InfoIcon className={classes.tableActionIcon} />
  //                 </IconButton>
  //               )}
  //               {
  //                 // {!invitation.used && !invitation.connected && (
  //                 //   <IconButton>
  //                 //     <CopyToClipboard
  //                 //       text={`${language.languageVars.appDomain}/activate?tac=${invitation.code}`}
  //                 //       onCopy={() => copyInvitationCode()}
  //                 //     >
  //                 //       <FileCopyIcon className={classes.tableActionIcon} />
  //                 //     </CopyToClipboard>
  //                 //   </IconButton>
  //                 // )}
  //               }
  //               {
  //                 // <IconButton onClick={() => disableInvitation(invitation.code)}>
  //                 //   <BlockIcon color="primary" />
  //                 // </IconButton>
  //               }
  //               {!invitation.used && (
  //                 <IconButton aria-label="delete" onClick={() => deleteInvitation(invitation.code)}>
  //                   <DeleteIcon className={classes.tableActionIcon} />
  //                 </IconButton>
  //               )}
  //             </TableCell>
  //           </TableRow>
  //         ))}
  //       </TableBody>
  //     </Table>
  //   </TableContainer>
  // </Box>
  )
}

InvitationList.defaultProps = {
  invitations: null,
}

InvitationList.propTypes = {
  invitations: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
    PropTypes.object,
  ]))),
  deleteInvitation: PropTypes.func.isRequired,
  onOpenDetailsDialog: PropTypes.func.isRequired,
  onSetNotification: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  onSetNotification: notification => dispatch(actions.setNotification(notification)),
})

export default connect(null, mapDispatchToProps)(InvitationList)
